import json
from typing import List, Dict, Any
from sqlalchemy.orm import Session
from backend.models.claim import KnowledgeClaim
from backend.models.conflict import Conflict

# Pre-defined known architectural conflicts in the Aegis Series-7 package
CANONICAL_CONFLICTS = [
    {
        "conflict_key": "HPU:normal_operating_pressure",
        "entity_name": "Hydraulic Power Unit (HPU)",
        "attribute": "normal_operating_pressure",
        "description": "Operating pressure difference between legacy manuals/sensors and modern ECN-1042 revision.",
        "conflicting_claims": [
            {
                "value": "180 bar",
                "source_document": "legacy_manual_v1.html",
                "revision": "AEG-OM-700 Rev 1 (Superseded)",
                "applicable_software_rev": "Software Revision < 3.2 (3.0, 3.1)",
                "component": "PS-04",
                "trust_level": "MEDIUM",
                "notes": "Historical factory setting"
            },
            {
                "value": "200 bar",
                "source_document": "ECN-1042.pdf & operator_manual.pdf",
                "revision": "AEG-OM-700 Rev 4 / ECN-1042",
                "applicable_software_rev": "Software Revision >= 3.2",
                "component": "PS-04A",
                "trust_level": "HIGH",
                "notes": "Current controlled setpoint to improve press cycle time"
            },
            {
                "value": "175 bar",
                "source_document": "site_survey_notes.docx",
                "revision": "Informal field notes (unreviewed)",
                "applicable_software_rev": "Unknown Line 4 unit",
                "component": "Unverified local gauge",
                "trust_level": "LOW",
                "notes": "Field observation noting gauge reading slightly below 180 bar. Uncalibrated reference."
            }
        ],
        "resolution_status": "RESOLVED_BY_REVISION",
        "resolution_rule": "Version-Scoped Parameter: Units on Software Rev < 3.2 use 180 bar (PS-04). Units on Software Rev >= 3.2 use 200 bar (PS-04A). Field notes (175 bar) are low-trust and flagged as unverified measurement noise.",
        "active_resolution": "Current Standard: 200 bar (Rev >= 3.2 with PS-04A); Legacy: 180 bar (Rev < 3.2 with PS-04)."
    },
    {
        "conflict_key": "HPU:discharge_sensor_model",
        "entity_name": "Pressure Sensor",
        "attribute": "discharge_sensor_model",
        "description": "Sensor model change at HPU discharge line from PS-04 to PS-04A.",
        "conflicting_claims": [
            {
                "value": "PS-04",
                "source_document": "legacy_manual_v1.html",
                "revision": "Rev 1",
                "applicable_software_rev": "Software Revision < 3.2",
                "component": "PS-04",
                "trust_level": "MEDIUM",
                "notes": "Pre-ECN-1042 sensor; prone to drift after 18 months"
            },
            {
                "value": "PS-04A",
                "source_document": "ECN-1042.pdf",
                "revision": "ECN-1042",
                "applicable_software_rev": "Software Revision >= 3.2",
                "component": "PS-04A",
                "trust_level": "HIGH",
                "notes": "Upgraded sensor conditioning circuit, active from Firmware 3.2"
            }
        ],
        "resolution_status": "RESOLVED_BY_REVISION",
        "resolution_rule": "Physical Supersession per ECN-1042. PS-04 is superseded by PS-04A on firmware >= 3.2. Firmware < 3.2 continues using PS-04.",
        "active_resolution": "Active standard is PS-04A for revision 3.2+; PS-04 is maintained for legacy units."
    },
    {
        "conflict_key": "A17:sensor_reference_text",
        "entity_name": "Alarm A17",
        "attribute": "sensor_reference_text",
        "description": "Alarm definition discrepancy in sensor naming prior to ECN-1058.",
        "conflicting_claims": [
            {
                "value": "References PS-04 explicitly",
                "source_document": "alarm_reference_rev4 (superseded)",
                "revision": "Rev 4",
                "applicable_software_rev": "Before ECN-1058",
                "component": "PS-04",
                "trust_level": "MEDIUM",
                "notes": "Named PS-04 directly, confusing operators on Rev 3.2+ units"
            },
            {
                "value": "Condition text generalized to active sensor (PS-04 or PS-04A)",
                "source_document": "ECN-1058.pdf & alarm_reference.pdf (Rev 5)",
                "revision": "Rev 5 (ECN-1058)",
                "applicable_software_rev": "All Revisions",
                "component": "Active Sensor",
                "trust_level": "HIGH",
                "notes": "Documentation fix ensuring validity across all software revisions"
            }
        ],
        "resolution_status": "RESOLVED_BY_REVISION",
        "resolution_rule": "ECN-1058 corrects documentation: evaluates against whichever sensor is active (PS-04 on < 3.2, PS-04A on >= 3.2). Alarm threshold (150 bar) remains unchanged.",
        "active_resolution": "Evaluated against active sensor (PS-04 or PS-04A depending on firmware revision)."
    }
]

def scan_and_register_conflicts(db: Session):
    """
    Populates and scans the database for known and dynamic technical conflicts.
    """
    for item in CANONICAL_CONFLICTS:
        existing = db.query(Conflict).filter(Conflict.conflict_key == item["conflict_key"]).first()
        if not existing:
            conflict = Conflict(
                conflict_key=item["conflict_key"],
                entity_name=item["entity_name"],
                attribute=item["attribute"],
                description=item["description"],
                conflicting_claims=json.dumps(item["conflicting_claims"]),
                resolution_status=item["resolution_status"],
                resolution_rule=item["resolution_rule"],
                active_resolution=item["active_resolution"],
                is_reviewed=True
            )
            db.add(conflict)
        else:
            existing.conflicting_claims = json.dumps(item["conflicting_claims"])
            existing.resolution_rule = item["resolution_rule"]
            existing.active_resolution = item["active_resolution"]
    db.commit()
