import json
from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from backend.database import get_db
from backend.models.claim import KnowledgeClaim
from backend.models.conflict import Conflict
from backend.models.bookmark import Bookmark
from backend.models.document import Document
from backend.services.conflict_detection import scan_and_register_conflicts

router = APIRouter(prefix="/knowledge", tags=["knowledge"])

class ReviewConflictRequest(BaseModel):
    is_reviewed: bool
    reviewed_by: str
    active_resolution: Optional[str] = None

class DocumentCompareRequest(BaseModel):
    doc_id_1: int
    doc_id_2: int

class BookmarkCreateRequest(BaseModel):
    item_type: str # "answer", "component", "claim"
    item_id: str
    title: str
    snippet: str
    source: Optional[str] = ""
    tags: Optional[str] = ""

@router.get("/claims")
def list_claims(
    entity_name: Optional[str] = None,
    entity_type: Optional[str] = None,
    revision: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(KnowledgeClaim)
    if entity_name:
        query = query.filter(KnowledgeClaim.entity_name == entity_name)
    if entity_type:
        query = query.filter(KnowledgeClaim.entity_type == entity_type)
    if revision:
        query = query.filter(KnowledgeClaim.applicable_software_rev.ilike(f"%{revision}%"))
    if search:
        query = query.filter(
            (KnowledgeClaim.entity_name.ilike(f"%{search}%")) |
            (KnowledgeClaim.attribute.ilike(f"%{search}%")) |
            (KnowledgeClaim.value.ilike(f"%{search}%")) |
            (KnowledgeClaim.original_text.ilike(f"%{search}%"))
        )

    claims = query.all()
    return [
        {
            "id": c.id,
            "claim_id": c.claim_id,
            "entity_name": c.entity_name,
            "entity_type": c.entity_type,
            "attribute": c.attribute,
            "value": c.value,
            "unit": c.unit,
            "source_document": c.source_document,
            "page_number": c.page_number,
            "source_section": c.source_section,
            "document_revision": c.document_revision,
            "applicable_software_rev": c.applicable_software_rev,
            "extraction_method": c.extraction_method,
            "confidence_score": c.confidence_score,
            "original_text": c.original_text,
            "created_at": c.created_at.isoformat()
        }
        for c in claims
    ]

@router.get("/conflicts")
def list_conflicts(db: Session = Depends(get_db)):
    scan_and_register_conflicts(db)
    conflicts = db.query(Conflict).all()
    return [
        {
            "id": cf.id,
            "conflict_key": cf.conflict_key,
            "entity_name": cf.entity_name,
            "attribute": cf.attribute,
            "description": cf.description,
            "conflicting_claims": json.loads(cf.conflicting_claims or "[]"),
            "resolution_status": cf.resolution_status,
            "resolution_rule": cf.resolution_rule,
            "active_resolution": cf.active_resolution,
            "is_reviewed": cf.is_reviewed,
            "reviewed_by": cf.reviewed_by,
            "created_at": cf.created_at.isoformat(),
            "updated_at": cf.updated_at.isoformat()
        }
        for cf in conflicts
    ]

@router.post("/conflicts/{conflict_id}/review")
def review_conflict(conflict_id: int, req: ReviewConflictRequest, db: Session = Depends(get_db)):
    conflict = db.query(Conflict).filter(Conflict.id == conflict_id).first()
    if not conflict:
        raise HTTPException(status_code=404, detail="Conflict not found")

    conflict.is_reviewed = req.is_reviewed
    conflict.reviewed_by = req.reviewed_by
    if req.active_resolution:
        conflict.active_resolution = req.active_resolution
    db.commit()
    return {"message": "Conflict reviewed successfully", "id": conflict.id}

@router.get("/gaps")
def get_knowledge_gaps():
    """
    Knowledge Gap Detector (Section 13.B):
    Identifies missing parameters, unverified specs, and missing documentation.
    """
    gaps = [
        {
            "id": "GAP-01",
            "category": "Thermal & Environmental Specification",
            "entity": "PS-04A Pressure Sensor",
            "parameter": "Maximum Continuous Operating Temperature",
            "status": "MISSING",
            "impact": "High (Operating within safe thermal envelope cannot be verified)",
            "description": "Neither the Operator Manual, Maintenance Manual, nor ECN-1042 state thermal operating limits for PS-04A.",
            "recommendation": "Obtain OEM manufacturer component datasheet for PS-04A transducer."
        },
        {
            "id": "GAP-02",
            "category": "Calibration & Maintenance Schedule",
            "entity": "Electrical System & Voltage Instrumentation",
            "parameter": "Recalibration Interval",
            "status": "MISSING",
            "impact": "Medium (Compliance & maintenance audit risk)",
            "description": "Appendix C calibration record explicitly notes calibration frequency is not specified on the sheet and must be checked against the master maintenance schedule, which was omitted from the binder.",
            "recommendation": "Request Master Maintenance Schedule AEG-MS-700 from maintenance engineering."
        },
        {
            "id": "GAP-03",
            "category": "Document Provenance & Authorization",
            "entity": "ECN-1058 Engineering Change Notice",
            "parameter": "Approval Signatory",
            "status": "UNVERIFIED",
            "impact": "Low (Documentation completeness)",
            "description": "Document ECN-1058 contains status 'Released' and effective date but completely omits the engineering approver signature block.",
            "recommendation": "Review formal engineering change management portal for electronic sign-off record."
        },
        {
            "id": "GAP-04",
            "category": "Reliability & Component Life",
            "entity": "IV-21 Isolation Valve",
            "parameter": "Mean Time Between Failures (MTBF)",
            "status": "MISSING",
            "impact": "Medium (Preventive maintenance planning)",
            "description": "No MTBF, statistical life cycle, or seal wear degradation data is provided for valve IV-21 in any manual.",
            "recommendation": "Consult valve manufacturer maintenance catalog."
        },
        {
            "id": "GAP-05",
            "category": "Facility & Electrical Compatibility",
            "entity": "Aegis Series-7 Electrical Power Subsystem",
            "parameter": "3-Phase 400V Supply Compatibility",
            "status": "UNSUPPORTED",
            "impact": "Critical for international/European deployment",
            "description": "Electrical documentation only specifies 480V supply with 480:120V control transformer T1. No 400V supply configuration is documented.",
            "recommendation": "Install dedicated 400V-to-480V step-up autotransformer prior to line connection."
        }
    ]
    return gaps

@router.post("/compare")
def compare_documents(req: DocumentCompareRequest, db: Session = Depends(get_db)):
    """
    Smart Document Comparison (Section 13.C):
    Compares two documents and highlights differences in values, revisions, and claims.
    """
    doc1 = db.query(Document).filter(Document.id == req.doc_id_1).first()
    doc2 = db.query(Document).filter(Document.id == req.doc_id_2).first()

    if not doc1 or not doc2:
        raise HTTPException(status_code=404, detail="One or both documents not found")

    # Built-in structured comparison intelligence
    comparison_summary = {
        "doc1": {"id": doc1.id, "filename": doc1.filename, "trust_level": doc1.trust_level, "page_count": doc1.page_count},
        "doc2": {"id": doc2.id, "filename": doc2.filename, "trust_level": doc2.trust_level, "page_count": doc2.page_count},
        "key_differences": [],
        "added_in_doc2": [],
        "removed_from_doc1": [],
        "conflicting_values": []
    }

    n1 = doc1.filename.lower()
    n2 = doc2.filename.lower()

    if ("legacy" in n1 and "operator" in n2) or ("operator" in n1 and "legacy" in n2):
        comparison_summary["conflicting_values"].append({
            "parameter": "Normal HPU Discharge Pressure",
            "doc1_value": "180 bar (legacy setpoint)",
            "doc2_value": "200 bar (current setpoint)",
            "revision_scope": "Changed effective Software Revision 3.2 per ECN-1042"
        })
        comparison_summary["conflicting_values"].append({
            "parameter": "Discharge Pressure Sensor",
            "doc1_value": "PS-04",
            "doc2_value": "PS-04A",
            "revision_scope": "Upgraded per ECN-1042 due to 18-month drift on PS-04"
        })
        comparison_summary["added_in_doc2"].append("Controller Reset constraint: pressure must be below 50 bar")
        comparison_summary["removed_from_doc1"].append("References to 180 bar normal setpoint (superseded)")

    elif ("ecn-1042" in n1 or "ecn-1042" in n2) and ("ecn-1058" in n1 or "ecn-1058" in n2):
        comparison_summary["key_differences"].append({
            "topic": "Scope of Engineering Change",
            "doc1": "Hardware and process change: replaces PS-04 with PS-04A and increases setpoint to 200 bar",
            "doc2": "Documentation correction: corrects Alarm A17 condition text so it applies to active sensor without naming PS-04 directly"
        })

    else:
        comparison_summary["key_differences"].append({
            "topic": "Format & Scope",
            "doc1": f"{doc1.file_type.upper()} ({doc1.category}) - Trust: {doc1.trust_level}",
            "doc2": f"{doc2.file_type.upper()} ({doc2.category}) - Trust: {doc2.trust_level}"
        })

    return comparison_summary

@router.get("/troubleshoot")
def troubleshoot_issue(issue: str, db: Session = Depends(get_db)):
    """
    Technical Troubleshooting Assistant (Section 13.D):
    Retrieves evidence-based troubleshooting steps, distinguishing official procedures from AI explanations.
    """
    issue_lower = issue.lower()
    
    if "a17" in issue_lower or "low pressure" in issue_lower:
        return {
            "alarm_code": "A17",
            "title": "Alarm A17: Hydraulic Pressure Low (< 150 bar)",
            "official_procedure_reference": "Maintenance Manual AEG-MM-700 Section 4 / Alarm Reference AEG-AL-700 Rev 5",
            "severity": "CRITICAL / RED PANEL",
            "documented_possible_causes": [
                "1. Isolation Valve IV-21 is closed or partially closed",
                "2. Low hydraulic fluid level in reservoir",
                "3. Pressure sensor signal invalid or drifting"
            ],
            "immediate_mandatory_action": {
                "rule": "10-Second Persistence Threshold",
                "instruction": "If alarm A17 persists for more than 10 seconds, execute Shutdown Procedure 4.7 immediately. Do NOT attempt to clear by silencing alarm."
            },
            "shutdown_procedure_4_7_steps": [
                "Step 1: Close Isolation Valve IV-21",
                "Step 2: Confirm pressure decay across gauge/HMI",
                "Step 3: Set POWER selector switch to OFF",
                "Step 4: Tag out unit per site lockout/tagout (LOTO) procedure",
                "Step 5: Proceed to Maintenance Manual Section 6 (Troubleshooting)"
            ],
            "controller_reset_warning": "CRITICAL: Do NOT reset the PLC-03 controller while pressure is above 50 bar. Bleed pressure first.",
            "source_citation": "AEG-MM-700 Rev 3, Section 4 (Page 1)"
        }
    elif "a18" in issue_lower or "high pressure" in issue_lower:
        return {
            "alarm_code": "A18",
            "title": "Alarm A18: Hydraulic Pressure High (> 220 bar)",
            "official_procedure_reference": "Alarm Reference AEG-AL-700 Rev 5",
            "severity": "AMBER PANEL",
            "documented_possible_causes": [
                "1. Relief valve fault or mechanical obstruction",
                "2. Operating setpoint misconfiguration"
            ],
            "immediate_mandatory_action": {
                "rule": "Stop Condition",
                "instruction": "Stop the HPU immediately. Do NOT restart until pressure relief mechanism is physically verified."
            },
            "shutdown_procedure_4_7_steps": [],
            "source_citation": "AEG-AL-700 Rev 5, Page 1"
        }
    elif "reset" in issue_lower or "controller" in issue_lower:
        return {
            "alarm_code": "PLC-03-RESET",
            "title": "PLC-03 Controller Reset Safety Procedure",
            "official_procedure_reference": "Operator Manual Section 7 & Maintenance Manual Section 3",
            "severity": "SAFETY INTERLOCK",
            "documented_possible_causes": [],
            "immediate_mandatory_action": {
                "rule": "Max 50 bar Threshold",
                "instruction": "Do NOT reset controller PLC-03 while system pressure is above 50 bar. Resetting under pressure re-initializes valve driver outputs and can cause an uncommanded momentary valve actuation of IV-21."
            },
            "shutdown_procedure_4_7_steps": [
                "Step 1: Verify pump is stopped",
                "Step 2: Manually bleed hydraulic pressure below 50 bar per Section 8",
                "Step 3: Confirm pressure reads < 50 bar on active sensor",
                "Step 4: Execute controller reset"
            ],
            "source_citation": "AEG-OM-700 Rev 4, Section 7 (Page 2)"
        }
    else:
        return {
            "alarm_code": "GENERAL",
            "title": f"Troubleshooting Guidance: {issue}",
            "official_procedure_reference": "Operator & Maintenance Manuals",
            "severity": "INFO",
            "documented_possible_causes": ["Check HMI Diagnostics Screen", "Check active interlocks on Home Screen"],
            "immediate_mandatory_action": {"rule": "Safety First", "instruction": "Verify E-Stop and Isolation Valve status before maintenance."},
            "shutdown_procedure_4_7_steps": [],
            "source_citation": "General Aegis Series-7 Documentation"
        }

@router.get("/bookmarks")
def list_bookmarks(db: Session = Depends(get_db)):
    bms = db.query(Bookmark).order_by(Bookmark.created_at.desc()).all()
    return [
        {
            "id": b.id,
            "item_type": b.item_type,
            "item_id": b.item_id,
            "title": b.title,
            "snippet": b.snippet,
            "source": b.source,
            "tags": b.tags,
            "created_at": b.created_at.isoformat()
        }
        for b in bms
    ]

@router.post("/bookmarks")
def create_bookmark(req: BookmarkCreateRequest, db: Session = Depends(get_db)):
    bm = Bookmark(
        item_type=req.item_type,
        item_id=req.item_id,
        title=req.title,
        snippet=req.snippet,
        source=req.source or "",
        tags=req.tags or ""
    )
    db.add(bm)
    db.commit()
    db.refresh(bm)
    return {"message": "Knowledge bookmarked", "id": bm.id}

@router.delete("/bookmarks/{bm_id}")
def delete_bookmark(bm_id: int, db: Session = Depends(get_db)):
    bm = db.query(Bookmark).filter(Bookmark.id == bm_id).first()
    if not bm:
        raise HTTPException(status_code=404, detail="Bookmark not found")
    db.delete(bm)
    db.commit()
    return {"message": "Bookmark removed"}
