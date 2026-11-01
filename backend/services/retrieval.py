import re
from typing import List, Dict, Any, Optional
from sqlalchemy.orm import Session
from backend.models.claim import KnowledgeClaim
from backend.models.document import Document
from backend.models.chunk import Chunk
from backend.services.embeddings import embedding_service
from backend.services.entity_resolution import resolve_entity

def retrieve_hybrid_context(
    query: str,
    db: Session,
    top_k: int = 5,
    revision_filter: Optional[str] = None
) -> Dict[str, Any]:
    """
    Combines:
    1. Entity resolution & canonical identifier matching
    2. Structured Knowledge Claims retrieval from SQLite
    3. Semantic vector search across document chunks in ChromaDB
    4. Trust weighting & provenance aggregation
    """
    query_lower = query.lower()
    
    # 1. Resolve any mentioned entity
    resolved_entity = resolve_entity(query)
    canonical_id = resolved_entity["canonical_id"] if resolved_entity else None

    # 2. Query structured claims
    claims_query = db.query(KnowledgeClaim)
    matching_claims = []
    
    if canonical_id:
        claims_query_res = claims_query.filter(KnowledgeClaim.entity_name == canonical_id).all()
        for c in claims_query_res:
            matching_claims.append({
                "claim_id": c.claim_id,
                "entity_name": c.entity_name,
                "attribute": c.attribute,
                "value": c.value,
                "unit": c.unit,
                "source_document": c.source_document,
                "page_number": c.page_number,
                "source_section": c.source_section,
                "document_revision": c.document_revision,
                "applicable_software_rev": c.applicable_software_rev,
                "confidence_score": c.confidence_score,
                "original_text": c.original_text,
                "provenance": f"{c.source_document} (p. {c.page_number}, {c.source_section})"
            })

    # Also search claims by keywords
    keywords = [w for w in re.findall(r"\w+", query_lower) if len(w) > 3]
    for kw in keywords:
        kw_claims = db.query(KnowledgeClaim).filter(
            (KnowledgeClaim.attribute.ilike(f"%{kw}%")) |
            (KnowledgeClaim.value.ilike(f"%{kw}%")) |
            (KnowledgeClaim.entity_name.ilike(f"%{kw}%"))
        ).limit(5).all()
        for c in kw_claims:
            if not any(mc["claim_id"] == c.claim_id for mc in matching_claims):
                matching_claims.append({
                    "claim_id": c.claim_id,
                    "entity_name": c.entity_name,
                    "attribute": c.attribute,
                    "value": c.value,
                    "unit": c.unit,
                    "source_document": c.source_document,
                    "page_number": c.page_number,
                    "source_section": c.source_section,
                    "document_revision": c.document_revision,
                    "applicable_software_rev": c.applicable_software_rev,
                    "confidence_score": c.confidence_score,
                    "original_text": c.original_text,
                    "provenance": f"{c.source_document} (p. {c.page_number}, {c.source_section})"
                })

    # 3. Vector semantic search from ChromaDB
    chroma_results = embedding_service.search(query=query, top_k=top_k)
    semantic_chunks = []
    for cr in chroma_results:
        chunk_id = cr.get("id")
        doc_id = cr.get("metadata", {}).get("document_id")
        doc = db.query(Document).filter(Document.id == doc_id).first() if doc_id else None
        
        doc_name = doc.filename if doc else "Document"
        trust_level = doc.trust_level if doc else "MEDIUM"
        trust_score = doc.trust_score if doc else 0.7

        semantic_chunks.append({
            "chunk_id": chunk_id,
            "document_name": doc_name,
            "trust_level": trust_level,
            "trust_score": trust_score,
            "page_number": cr.get("metadata", {}).get("page_number", 1),
            "section": cr.get("metadata", {}).get("section", ""),
            "content": cr.get("content", ""),
            "similarity": cr.get("similarity", 0.0)
        })

    # 4. Synthesize citations list
    citations = []
    seen_citations = set()

    for c in matching_claims:
        key = (c["source_document"], c["page_number"])
        if key not in seen_citations:
            seen_citations.add(key)
            citations.append({
                "document": c["source_document"],
                "page": c["page_number"],
                "section": c["source_section"],
                "revision": c["document_revision"],
                "excerpt": c["original_text"]
            })

    for sc in semantic_chunks:
        key = (sc["document_name"], sc["page_number"])
        if key not in seen_citations:
            seen_citations.add(key)
            citations.append({
                "document": sc["document_name"],
                "page": sc["page_number"],
                "section": sc["section"],
                "revision": "Current",
                "excerpt": sc["content"][:200] + "..." if len(sc["content"]) > 200 else sc["content"]
            })

    return {
        "resolved_entity": resolved_entity,
        "claims": matching_claims,
        "semantic_chunks": semantic_chunks,
        "citations": citations
    }
