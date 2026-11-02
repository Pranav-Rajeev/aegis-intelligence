import os
import uvicorn
from pathlib import Path
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
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

# Frontend static distribution resolution
BASE_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = BASE_DIR.parent
potential_dist_dirs = [
    PROJECT_ROOT / "frontend" / "dist",
    BASE_DIR.parent / "frontend" / "dist",
    Path("/var/task/frontend/dist"),
    Path(__file__).resolve().parent.parent / "frontend" / "dist"
]
dist_dir = None
for p in potential_dist_dirs:
    if p.exists() and (p / "index.html").exists():
        dist_dir = p
        break

if dist_dir and (dist_dir / "assets").exists():
    app.mount("/assets", StaticFiles(directory=str(dist_dir / "assets")), name="assets")

@app.get("/")
def root():
    if dist_dir and (dist_dir / "index.html").exists():
        return FileResponse(str(dist_dir / "index.html"))
    return {
        "platform": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "status": "ONLINE",
        "description": "Aegis Series-7 Hydraulic Control System Knowledge & Intelligence Engine",
        "interactive_api_docs": "/docs",
        "redoc_docs": "/redoc"
    }

@app.get("/api")
@app.get("/api/")
@app.get("/api/index.py")
def api_discovery():
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

        # 3. Auto-seed Aegis dataset if documents table is empty (skip during Vercel cold starts)
        if not settings.IS_VERCEL:
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

@app.get("/{full_path:path}")
def serve_spa(full_path: str):
    # API 404 handler
    if full_path.startswith("api"):
        raise HTTPException(status_code=404, detail="API endpoint not found")
        
    # Static file check
    if dist_dir:
        target_file = dist_dir / full_path
        if target_file.is_file():
            return FileResponse(str(target_file))
            
        # SPA index.html fallback for client-side routing
        index_file = dist_dir / "index.html"
        if index_file.exists():
            return FileResponse(str(index_file))
            
    raise HTTPException(status_code=404, detail="Not Found")

if __name__ == "__main__":
    uvicorn.run("backend.main:app", host=settings.HOST, port=settings.PORT, reload=settings.DEBUG)
