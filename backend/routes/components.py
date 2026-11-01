import json
from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from backend.database import get_db
from backend.models.component import Component
from backend.services.entity_resolution import resolve_entity, verify_entity_merge_safety, KNOWN_ALIASES

router = APIRouter(prefix="/components", tags=["components"])

class AliasResolutionRequest(BaseModel):
    query: str
    target_component: Optional[str] = None

class AddAliasRequest(BaseModel):
    alias: str

DEFAULT_COMPONENTS = [
    {
        "component_id": "HPU",
        "common_name": "Hydraulic Power Unit",
        "aliases": ["Hydraulic Unit", "HP unit", "Hydraulic Power Pack", "the unit", "power pack"],
        "location": "Skid A, Bay 2",
        "status": "Active",
        "notes": "Primary hydraulic pressure source for the press circuit. Supplies pressurized fluid regulated by PLC-03.",
        "document_references": ["operator_manual.pdf", "maintenance_manual.pdf", "system_diagram_hydraulic.pdf", "ECN-1042.pdf"],
        "revision_history": [
            {"revision": "3.0", "change": "Initial setpoint 180 bar with PS-04"},
            {"revision": "3.2", "change": "Setpoint revised to 200 bar with PS-04A per ECN-1042"}
        ],
        "related_components": ["PLC-03", "PS-04A", "IV-21", "Main Reservoir", "Auxiliary Reservoir"]
    },
    {
        "component_id": "IV-21",
        "common_name": "Isolation Valve 21",
        "aliases": ["Isolation Valve", "IV21", "IV-21 Solenoid"],
        "location": "Hydraulic Module",
        "status": "Active",
        "notes": "Isolates the HPU from the downstream press circuit. Must be OPEN prior to HPU startup.",
        "document_references": ["operator_manual.pdf", "maintenance_manual.pdf", "system_diagram_hydraulic.pdf", "wiring_diagram.pdf"],
        "revision_history": [
            {"revision": "All", "change": "Required open interlock prior to start"}
        ],
        "related_components": ["HPU", "PLC-03"]
    },
    {
        "component_id": "PS-04A",
        "common_name": "Pressure Sensor 04A",
        "aliases": ["P04A", "PS04A", "P.S.04-A", "pressure xdcr", "pressure transducer loop"],
        "location": "HPU discharge line",
        "status": "Active",
        "notes": "Discharge pressure transducer installed per ECN-1042. Uses upgraded signal conditioning. Requires firmware >= 3.2.",
        "document_references": ["ECN-1042.pdf", "operator_manual.pdf", "maintenance_manual.pdf", "system_diagram_hydraulic.pdf", "wiring_diagram.pdf", "screen_03_diagnostics.png"],
        "revision_history": [
            {"revision": "3.2", "change": "Replaced PS-04 to correct 18-month signal drift. Setpoint 200 bar."}
        ],
        "related_components": ["HPU", "PLC-03", "PS-04"]
    },
    {
        "component_id": "PS-04",
        "common_name": "Pressure Sensor 04",
        "aliases": ["PRESSURE SENSOR 04", "P04", "PS04"],
        "location": "HPU discharge line",
        "status": "Superseded",
        "notes": "Legacy sensor used on software revisions prior to 3.2. Subject to signal drift after 18 months. Superseded by PS-04A.",
        "document_references": ["legacy_manual_v1.html", "ECN-1042.pdf", "component_register.xlsx"],
        "revision_history": [
            {"revision": "3.0", "change": "Original factory equipment with 180 bar setpoint"},
            {"revision": "3.2", "change": "Superseded by PS-04A per ECN-1042"}
        ],
        "related_components": ["HPU", "PS-04A"]
    },
    {
        "component_id": "PS-40",
        "common_name": "Pressure Sensor 40",
        "aliases": ["P40", "PS40"],
        "location": "Coolant Loop, Skid B",
        "status": "Active",
        "notes": "Monitors coolant loop pressure on Skid B. NOT related to HPU discharge circuit. Do NOT confuse with PS-04 or PS-04A.",
        "document_references": ["component_register.xlsx", "configuration_export.json"],
        "revision_history": [
            {"revision": "3.0", "change": "Coolant system dedicated monitoring"}
        ],
        "related_components": ["Coolant Loop"]
    },
    {
        "component_id": "PLC-03",
        "common_name": "HCS Controller",
        "aliases": ["Controller", "Aegis Controller", "PLC03"],
        "location": "Control Cabinet 1",
        "status": "Active",
        "notes": "Industrial controller supervising startup sequencing, safety interlocks, and alarm evaluation.",
        "document_references": ["operator_manual.pdf", "maintenance_manual.pdf", "system_diagram_electrical.png", "wiring_diagram.pdf"],
        "revision_history": [
            {"revision": "3.2.1", "change": "Current production firmware"}
        ],
        "related_components": ["HPU", "IV-21", "PS-04A", "Q1", "T1"]
    },
    {
        "component_id": "TB-7",
        "common_name": "Terminal Block 7",
        "aliases": ["TB7"],
        "location": "Control Cabinet 1",
        "status": "Active",
        "notes": "Wiring reference used in AEG-DWG-W03; corresponds to the PS-04A signal loop.",
        "document_references": ["wiring_diagram.pdf", "component_register.xlsx"],
        "revision_history": [],
        "related_components": ["PLC-03", "PS-04A"]
    },
    {
        "component_id": "Q1",
        "common_name": "Main Disconnect",
        "aliases": ["480V Disconnect"],
        "location": "Control Cabinet 1",
        "status": "Active",
        "notes": "480V incoming supply disconnect switch.",
        "document_references": ["system_diagram_electrical.png", "component_register.xlsx"],
        "revision_history": [],
        "related_components": ["T1", "PLC-03"]
    },
    {
        "component_id": "T1",
        "common_name": "Control Transformer",
        "aliases": ["Control XFMR"],
        "location": "Control Cabinet 1",
        "status": "Active",
        "notes": "480:120V control power transformer.",
        "document_references": ["system_diagram_electrical.png", "component_register.xlsx"],
        "revision_history": [],
        "related_components": ["Q1", "PLC-03"]
    },
    {
        "component_id": "Auxiliary Reservoir",
        "common_name": "Auxiliary Reservoir",
        "aliases": ["Aux Reservoir"],
        "location": "Line 4/5 Hydraulic Rack",
        "status": "Active",
        "notes": "Top-up fluid storage during peak demand. Line 4/5-specific detail not in standard Operator Manual (introduced in training slide).",
        "document_references": ["training_slide_excerpt.pptx", "system_diagram_hydraulic.pdf"],
        "revision_history": [],
        "related_components": ["HPU", "Main Reservoir"]
    }
]

def seed_components_if_empty(db: Session):
    count = db.query(Component).count()
    if count == 0:
        for item in DEFAULT_COMPONENTS:
            comp = Component(
                component_id=item["component_id"],
                common_name=item["common_name"],
                aliases=json.dumps(item["aliases"]),
                location=item["location"],
                status=item["status"],
                notes=item["notes"],
                document_references=json.dumps(item["document_references"]),
                revision_history=json.dumps(item["revision_history"]),
                related_components=json.dumps(item["related_components"])
            )
            db.add(comp)
        db.commit()

@router.get("")
def list_components(
    search: Optional[str] = None,
    status: Optional[str] = None,
    db: Session = Depends(get_db)
):
    seed_components_if_empty(db)
    query = db.query(Component)
    if status:
        query = query.filter(Component.status == status)
    if search:
        query = query.filter(
            (Component.component_id.ilike(f"%{search}%")) |
            (Component.common_name.ilike(f"%{search}%")) |
            (Component.location.ilike(f"%{search}%")) |
            (Component.aliases.ilike(f"%{search}%"))
        )
    comps = query.all()
    return [
        {
            "id": c.id,
            "component_id": c.component_id,
            "common_name": c.common_name,
            "aliases": json.loads(c.aliases or "[]"),
            "location": c.location,
            "status": c.status,
            "notes": c.notes,
            "document_references": json.loads(c.document_references or "[]"),
            "revision_history": json.loads(c.revision_history or "[]"),
            "related_components": json.loads(c.related_components or "[]"),
            "created_at": c.created_at.isoformat()
        }
        for c in comps
    ]

@router.get("/{comp_id}")
def get_component(comp_id: str, db: Session = Depends(get_db)):
    seed_components_if_empty(db)
    comp = db.query(Component).filter(
        (Component.component_id == comp_id) | (Component.id == int(comp_id) if comp_id.isdigit() else False)
    ).first()
    if not comp:
        raise HTTPException(status_code=404, detail="Component not found")

    return {
        "id": comp.id,
        "component_id": comp.component_id,
        "common_name": comp.common_name,
        "aliases": json.loads(comp.aliases or "[]"),
        "location": comp.location,
        "status": comp.status,
        "notes": comp.notes,
        "document_references": json.loads(comp.document_references or "[]"),
        "revision_history": json.loads(comp.revision_history or "[]"),
        "related_components": json.loads(comp.related_components or "[]"),
        "created_at": comp.created_at.isoformat()
    }

@router.post("/resolve-alias")
def test_alias_resolution(req: AliasResolutionRequest):
    resolution = resolve_entity(req.query)
    safety_check = None
    if req.target_component and resolution:
        can_merge, reason = verify_entity_merge_safety(req.target_component, resolution["canonical_id"])
        safety_check = {"can_merge": can_merge, "rationale": reason}

    return {
        "query": req.query,
        "resolution": resolution,
        "safety_check": safety_check
    }

@router.post("/{comp_id}/add-alias")
def add_alias(comp_id: str, req: AddAliasRequest, db: Session = Depends(get_db)):
    comp = db.query(Component).filter(Component.component_id == comp_id).first()
    if not comp:
        raise HTTPException(status_code=404, detail="Component not found")

    aliases = json.loads(comp.aliases or "[]")
    if req.alias not in aliases:
        aliases.append(req.alias)
        comp.aliases = json.dumps(aliases)
        db.commit()

    return {"message": "Alias added", "aliases": aliases}

@router.get("/graph/visualization")
def get_knowledge_graph_data(db: Session = Depends(get_db)):
    """
    Returns graph nodes and edges for React Flow interactive knowledge graph.
    """
    seed_components_if_empty(db)

    nodes = [
        {"id": "HPU", "type": "componentNode", "data": {"label": "Hydraulic Power Unit (HPU)", "type": "Component", "status": "Active", "location": "Skid A, Bay 2"}, "position": {"x": 350, "y": 200}},
        {"id": "PLC-03", "type": "controllerNode", "data": {"label": "PLC-03 (HCS Controller)", "type": "Controller", "status": "Active", "location": "Control Cabinet 1"}, "position": {"x": 350, "y": 50}},
        {"id": "PS-04A", "type": "sensorNode", "data": {"label": "PS-04A (Pressure Sensor)", "type": "Sensor", "status": "Active (>= 3.2)", "location": "HPU discharge line"}, "position": {"x": 150, "y": 200}},
        {"id": "PS-04", "type": "supersededNode", "data": {"label": "PS-04 (Legacy Sensor)", "type": "Sensor", "status": "Superseded (< 3.2)", "location": "HPU discharge line"}, "position": {"x": 0, "y": 200}},
        {"id": "PS-40", "type": "sensorNode", "data": {"label": "PS-40 (Coolant Sensor)", "type": "Sensor", "status": "Active", "location": "Coolant Loop, Skid B"}, "position": {"x": 650, "y": 350}},
        {"id": "IV-21", "type": "valveNode", "data": {"label": "IV-21 (Isolation Valve)", "type": "Valve", "status": "Active", "location": "Hydraulic Module"}, "position": {"x": 550, "y": 200}},
        {"id": "A17", "type": "alarmNode", "data": {"label": "Alarm A17 (<150 bar Low Press)", "type": "Alarm", "status": "Active", "location": "Software Alarm"}, "position": {"x": 150, "y": 350}},
        {"id": "A18", "type": "alarmNode", "data": {"label": "Alarm A18 (>220 bar High Press)", "type": "Alarm", "status": "Active", "location": "Software Alarm"}, "position": {"x": 350, "y": 350}},
        {"id": "ECN-1042", "type": "ecnNode", "data": {"label": "ECN-1042 (Sensor & 200 bar)", "type": "ECN", "status": "Released", "location": "Engineering Bulletin"}, "position": {"x": 50, "y": 50}},
        {"id": "ECN-1058", "type": "ecnNode", "data": {"label": "ECN-1058 (A17 Condition Text)", "type": "ECN", "status": "Released", "location": "Engineering Bulletin"}, "position": {"x": 50, "y": 450}},
        {"id": "Q1", "type": "electricalNode", "data": {"label": "Q1 (Main Disconnect 480V)", "type": "Electrical", "status": "Active", "location": "Control Cabinet 1"}, "position": {"x": 600, "y": 50}},
        {"id": "T1", "type": "electricalNode", "data": {"label": "T1 (Transformer 480:120V)", "type": "Electrical", "status": "Active", "location": "Control Cabinet 1"}, "position": {"x": 750, "y": 50}},
        {"id": "Aux_Res", "type": "reservoirNode", "data": {"label": "Auxiliary Reservoir (Line 4/5)", "type": "Reservoir", "status": "Active", "location": "Line 4/5"}, "position": {"x": 500, "y": 350}}
    ]

    edges = [
        {"id": "e_plc_hpu", "source": "PLC-03", "target": "HPU", "label": "supervises/regulates", "animated": True},
        {"id": "e_plc_ps04a", "source": "PLC-03", "target": "PS-04A", "label": "monitors 4-20mA loop", "animated": True},
        {"id": "e_plc_iv21", "source": "PLC-03", "target": "IV-21", "label": "valve driver signal", "animated": True},
        {"id": "e_hpu_iv21", "source": "HPU", "target": "IV-21", "label": "supplies fluid to"},
        {"id": "e_hpu_ps04a", "source": "HPU", "target": "PS-04A", "label": "discharge pressure"},
        {"id": "e_ecn1042_ps04a", "source": "ECN-1042", "target": "PS-04A", "label": "introduces in rev 3.2"},
        {"id": "e_ps04_ps04a", "source": "PS-04", "target": "PS-04A", "label": "superseded by", "style": {"strokeDasharray": "5,5"}},
        {"id": "e_ecn1042_hpu", "source": "ECN-1042", "target": "HPU", "label": "raises setpoint to 200 bar"},
        {"id": "e_ps04a_a17", "source": "PS-04A", "target": "A17", "label": "trips if < 150 bar"},
        {"id": "e_ecn1058_a17", "source": "ECN-1058", "target": "A17", "label": "corrects sensor text"},
        {"id": "e_q1_t1", "source": "Q1", "target": "T1", "label": "480V supply"},
        {"id": "e_t1_plc", "source": "T1", "target": "PLC-03", "label": "120V control power"},
        {"id": "e_aux_hpu", "source": "Aux_Res", "target": "HPU", "label": "peak top-up fluid"}
    ]

    return {"nodes": nodes, "edges": edges}
