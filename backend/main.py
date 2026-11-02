import os
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.config import settings
from backend.database import Base, engine, SessionLocal
from backend.models import *
from backend.routes import (
    documents,
    chat,
    components,
    knowledge,
    evaluation,
    reports,
    dashboard
)
from backend.services.conflict_detection import scan_and_register_conflicts
from backend.routes.components import seed_components_if_empty
from backend.services.evaluation import run_evaluation_suite
from backend.services.ingestion import (
    compute_file_hash,
    assess_trust_and_category,
    extract_content,
    chunk_document_pages
)
from backend.services.extraction import extract_structured_claims
from backend.services.embeddings import embedding_service

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="AI-Powered Technical Knowledge & Document Intelligence Platform for Aegis Series-7 HCS"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(dashboard.router, prefix=settings.API_PREFIX)
app.include_router(documents.router, prefix=settings.API_PREFIX)
app.include_router(chat.router, prefix=settings.API_PREFIX)
app.include_router(components.router, prefix=settings.API_PREFIX)
app.include_router(knowledge.router, prefix=settings.API_PREFIX)
app.include_router(evaluation.router, prefix=settings.API_PREFIX)
app.include_router(reports.router, prefix=settings.API_PREFIX)

@app.get("/")
def root():
    return {
        "platform": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "status": "ONLINE",
        "description": "Aegis Series-7 Hydraulic Control System Knowledge & Intelligence Engine",
        "interactive_api_docs": "/docs",
        "redoc_docs": "/redoc",
        "frontend_ui": "http://localhost:5173",
        "endpoints": {
            "dashboard_stats": f"{settings.API_PREFIX}/dashboard/stats",
            "documents": f"{settings.API_PREFIX}/documents",
            "chat": f"{settings.API_PREFIX}/chat",
            "components": f"{settings.API_PREFIX}/components",
            "knowledge": f"{settings.API_PREFIX}/knowledge",
            "evaluation": f"{settings.API_PREFIX}/evaluation",
            "reports": f"{settings.API_PREFIX}/reports"
        }
    }

@app.on_event("startup")
def startup_event():
    # 1. Create DB tables
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        # 2. Seed Components and Conflicts
        seed_components_if_empty(db)
        scan_and_register_conflicts(db)

        # 3. Auto-seed Aegis dataset if documents table is empty
        doc_count = db.query(Document).count()
        if doc_count < 20 and settings.DEFAULT_DATASET_DIR.exists():
            print(f"Auto-seeding Aegis Series-7 dataset from {settings.DEFAULT_DATASET_DIR}...")
            for root, dirs, files in os.walk(settings.DEFAULT_DATASET_DIR):
                for f in files:
                    full_path = os.path.join(root, f)
                    ext = os.path.splitext(f)[1].replace(".", "").lower()
                    if not ext:
                        continue

                    file_hash = compute_file_hash(full_path)
                    existing = db.query(Document).filter(Document.file_hash == file_hash).first()
                    if existing:
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
                        status="PROCESSING"
                    )
                    db.add(doc)
                    db.commit()
                    db.refresh(doc)

                    # Ingest synchronously
                    documents.process_document_sync(doc.id, db)
            
            print(f"Seeded {db.query(Document).count()} documents.")
            
            # Run initial evaluation
            print("Executing initial evaluation benchmark...")
            run_evaluation_suite(db)
            print("Initial evaluation completed.")

    finally:
        db.close()

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "system": "Aegis Intelligence Platform",
        "version": settings.VERSION,
        "database": "connected"
    }

if __name__ == "__main__":
    uvicorn.run("backend.main:app", host=settings.HOST, port=settings.PORT, reload=settings.DEBUG)
