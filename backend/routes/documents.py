import os
import shutil
import json
from pathlib import Path
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, BackgroundTasks
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models.document import Document
from backend.models.chunk import Chunk
from backend.models.claim import KnowledgeClaim
from backend.config import settings
from backend.services.ingestion import (
    compute_file_hash,
    assess_trust_and_category,
    extract_content,
    chunk_document_pages
)
from backend.services.extraction import extract_structured_claims
from backend.services.embeddings import embedding_service

router = APIRouter(prefix="/documents", tags=["documents"])

def process_document_sync(doc_id: int, db: Session):
    doc = db.query(Document).filter(Document.id == doc_id).first()
    if not doc:
        return

    try:
        doc.status = "PROCESSING"
        db.commit()

        # 1. Extraction
        extracted = extract_content(doc.file_path, doc.file_type)
        doc.extracted_text = extracted.get("text", "")
        doc.tables_json = json.dumps(extracted.get("tables", []))
        doc.page_count = extracted.get("metadata", {}).get("page_count", 1)
        doc.metadata_json = json.dumps(extracted.get("metadata", {}))

        # 2. Chunking
        chunks_data = chunk_document_pages(extracted.get("pages", []))
        
        # Delete existing chunks
        db.query(Chunk).filter(Chunk.document_id == doc.id).delete()
        embedding_service.delete_document(doc.id)

        created_chunks = []
        for c in chunks_data:
            chunk_rec = Chunk(
                document_id=doc.id,
                chunk_index=c["chunk_index"],
                content=c["content"],
                section=c["section"],
                page_number=c["page_number"],
                token_count=c["token_count"]
            )
            db.add(chunk_rec)
            db.flush()
            created_chunks.append({
                "id": f"{doc.id}_{chunk_rec.id}",
                "document_id": doc.id,
                "chunk_index": chunk_rec.chunk_index,
                "content": chunk_rec.content,
                "section": chunk_rec.section,
                "page_number": chunk_rec.page_number
            })

        doc.chunk_count = len(created_chunks)

        # 3. Embeddings in ChromaDB
        if created_chunks:
            embedding_service.add_chunks(created_chunks)

        # 4. Structured Knowledge Claims
        claims_data = extract_structured_claims(doc.filename, extracted, doc.trust_level)
        for clm in claims_data:
            existing_clm = db.query(KnowledgeClaim).filter(KnowledgeClaim.claim_id == clm["claim_id"]).first()
            if not existing_clm:
                claim_rec = KnowledgeClaim(
                    claim_id=clm["claim_id"],
                    entity_name=clm["entity_name"],
                    entity_type=clm["entity_type"],
                    attribute=clm["attribute"],
                    value=clm["value"],
                    unit=clm.get("unit", ""),
                    source_document=clm["source_document"],
                    page_number=clm.get("page_number", 1),
                    source_section=clm.get("source_section", ""),
                    document_revision=clm.get("document_revision", ""),
                    applicable_software_rev=clm.get("applicable_software_rev", "all"),
                    extraction_method=clm.get("extraction_method", "rule_based"),
                    confidence_score=clm.get("confidence_score", 1.0),
                    original_text=clm.get("original_text", "")
                )
                db.add(claim_rec)

        doc.status = "PROCESSED"
        doc.error_message = None
        db.commit()

    except Exception as e:
        doc.status = "FAILED"
        doc.error_message = str(e)
        db.commit()

@router.get("")
def list_documents(
    file_type: Optional[str] = None,
    status: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Document)
    if file_type:
        query = query.filter(Document.file_type == file_type.lower())
    if status:
        query = query.filter(Document.status == status.upper())
    if search:
        query = query.filter(Document.filename.ilike(f"%{search}%"))

    docs = query.order_by(Document.created_at.desc()).all()
    return [
        {
            "id": d.id,
            "filename": d.filename,
            "file_type": d.file_type,
            "file_size": d.file_size,
            "category": d.category,
            "trust_level": d.trust_level,
            "trust_score": d.trust_score,
            "status": d.status,
            "page_count": d.page_count,
            "chunk_count": d.chunk_count,
            "error_message": d.error_message,
            "created_at": d.created_at.isoformat() if d.created_at else None
        }
        for d in docs
    ]

@router.get("/{doc_id}")
def get_document(doc_id: int, db: Session = Depends(get_db)):
    doc = db.query(Document).filter(Document.id == doc_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")

    return {
        "id": doc.id,
        "filename": doc.filename,
        "file_type": doc.file_type,
        "file_size": doc.file_size,
        "category": doc.category,
        "trust_level": doc.trust_level,
        "trust_score": doc.trust_score,
        "status": doc.status,
        "page_count": doc.page_count,
        "chunk_count": doc.chunk_count,
        "error_message": doc.error_message,
        "metadata": json.loads(doc.metadata_json or "{}"),
        "tables": json.loads(doc.tables_json or "[]"),
        "extracted_text_preview": doc.extracted_text[:4000] if doc.extracted_text else "",
        "created_at": doc.created_at.isoformat() if doc.created_at else None
    }

@router.post("/upload")
def upload_document(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # Max file size 50MB check
    filename = file.filename
    ext = os.path.splitext(filename)[1].replace(".", "").lower()
    allowed_exts = ["pdf", "docx", "doc", "xlsx", "xls", "csv", "html", "htm", "txt", "json", "pptx", "png", "jpg", "jpeg"]
    if ext not in allowed_exts:
        raise HTTPException(status_code=400, detail=f"Unsupported format '{ext}'. Allowed: {', '.join(allowed_exts)}")

    save_path = settings.UPLOAD_DIR / filename
    with open(save_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    file_size = os.path.getsize(save_path)
    file_hash = compute_file_hash(str(save_path))

    # Duplicate check
    existing = db.query(Document).filter(Document.file_hash == file_hash).first()
    if existing:
        return {
            "message": "File already exists (duplicate hash detected)",
            "document_id": existing.id,
            "status": existing.status
        }

    category, trust_level, trust_score = assess_trust_and_category(str(save_path))

    doc = Document(
        filename=filename,
        file_path=str(save_path),
        file_type=ext,
        file_size=file_size,
        file_hash=file_hash,
        category=category,
        trust_level=trust_level,
        trust_score=trust_score,
        status="UPLOADED"
    )
    db.add(doc)
    db.commit()
    db.refresh(doc)

    background_tasks.add_task(process_document_sync, doc.id, db)

    return {
        "message": "Document uploaded and queued for processing",
        "document_id": doc.id,
        "status": "PROCESSING"
    }

@router.post("/{doc_id}/reprocess")
def reprocess_document(doc_id: int, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    doc = db.query(Document).filter(Document.id == doc_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")

    doc.status = "PROCESSING"
    db.commit()
    background_tasks.add_task(process_document_sync, doc.id, db)
    return {"message": "Document re-processing queued", "document_id": doc.id}

@router.delete("/{doc_id}")
def delete_document(doc_id: int, db: Session = Depends(get_db)):
    doc = db.query(Document).filter(Document.id == doc_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")

    embedding_service.delete_document(doc.id)
    db.query(Chunk).filter(Chunk.document_id == doc.id).delete()
    db.delete(doc)
    db.commit()
    return {"message": "Document and associated embeddings deleted"}

@router.post("/seed-dataset")
def seed_dataset(db: Session = Depends(get_db)):
    """
    Ingests all 20 files from the Aegis Series-7 package.
    """
    base_dir = settings.DEFAULT_DATASET_DIR
    if not base_dir.exists():
        raise HTTPException(status_code=404, detail=f"Dataset directory not found at {base_dir}")

    ingested = []
    for root, dirs, files in os.walk(base_dir):
        for f in files:
            full_path = os.path.join(root, f)
            ext = os.path.splitext(f)[1].replace(".", "").lower()
            if not ext:
                continue

            file_hash = compute_file_hash(full_path)
            existing = db.query(Document).filter(Document.file_hash == file_hash).first()
            if existing:
                ingested.append(existing.filename)
                continue

            category, trust_level, trust_score = assess_trust_and_category(full_path)
            doc = Document(
                filename=f,
                file_path=full_path,
                file_type=ext,
                file_size=os.path.getsize(full_path),
                file_hash=file_hash,
                category=category,
                trust_level=trust_level,
                trust_score=trust_score,
                status="UPLOADED"
            )
            db.add(doc)
            db.commit()
            db.refresh(doc)

            process_document_sync(doc.id, db)
            ingested.append(f)

    return {"message": f"Successfully ingested {len(ingested)} documents", "documents": ingested}
