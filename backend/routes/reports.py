import os
from typing import Optional, Dict, Any
from fastapi import APIRouter, HTTPException, Response
from pydantic import BaseModel
from backend.services.reports import generate_markdown_report, generate_pdf_report
from backend.config import settings

router = APIRouter(prefix="/reports", tags=["reports"])

class ReportGenerateRequest(BaseModel):
    title: Optional[str] = "Aegis Series-7 Technical System Report"
    system: Optional[str] = "Aegis Series-7 Hydraulic Control System"
    executive_summary: Optional[str] = None
    technical_findings: Optional[str] = None

@router.post("/generate")
def create_report(req: ReportGenerateRequest):
    data = req.dict()
    md_content = generate_markdown_report(data)
    
    pdf_filename = f"aegis_technical_report.pdf"
    pdf_path = settings.REPORTS_DIR / pdf_filename
    generate_pdf_report(data, str(pdf_path))

    return {
        "title": req.title,
        "markdown": md_content,
        "pdf_available": True,
        "pdf_download_url": "/api/reports/download-pdf"
    }

@router.get("/download-pdf")
def download_pdf():
    pdf_path = settings.REPORTS_DIR / "aegis_technical_report.pdf"
    if not pdf_path.exists():
        # Generate default
        generate_pdf_report({}, str(pdf_path))

    with open(pdf_path, "rb") as f:
        pdf_bytes = f.read()

    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={"Content-Disposition": "attachment; filename=aegis_technical_report.pdf"}
    )

@router.get("/download-md")
def download_md():
    md_content = generate_markdown_report({})
    return Response(
        content=md_content,
        media_type="text/markdown",
        headers={"Content-Disposition": "attachment; filename=aegis_technical_report.md"}
    )
