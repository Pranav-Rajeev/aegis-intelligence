/* Auto-generated seed data for resilient offline and Vercel cloud previews */
export const seedData: any = {
  "stats": {
    "total_documents": 20,
    "processed_documents": 19,
    "extracted_claims": 39,
    "registered_components": 10,
    "unresolved_conflicts": 0,
    "evaluation_accuracy": 100.0,
    "abstention_accuracy": 100.0,
    "format_distribution": [
      {
        "name": "JSON",
        "value": 1
      },
      {
        "name": "PNG",
        "value": 4
      },
      {
        "name": "PDF",
        "value": 9
      },
      {
        "name": "PPTX",
        "value": 1
      },
      {
        "name": "DOCX",
        "value": 2
      },
      {
        "name": "HTML",
        "value": 1
      },
      {
        "name": "XLSX",
        "value": 2
      }
    ],
    "source_reliability_distribution": [
      {
        "name": "HIGH",
        "value": 15
      },
      {
        "name": "MEDIUM",
        "value": 3
      },
      {
        "name": "LOW",
        "value": 2
      },
      {
        "name": "UNTRUSTED",
        "value": 0
      }
    ],
    "confidence_distribution": [
      {
        "bucket": "High (0.9-1.0)",
        "count": 34
      },
      {
        "bucket": "Medium (0.7-0.89)",
        "count": 3
      },
      {
        "bucket": "Low (<0.7)",
        "count": 2
      }
    ],
    "extraction_activity": [
      {
        "type": "Specification",
        "claims": 1
      },
      {
        "type": "Diagram",
        "claims": 1
      },
      {
        "type": "Component",
        "claims": 17
      },
      {
        "type": "Parameter",
        "claims": 4
      },
      {
        "type": "Alarm",
        "claims": 4
      },
      {
        "type": "ChangeNotice",
        "claims": 6
      },
      {
        "type": "Observation",
        "claims": 1
      },
      {
        "type": "Procedure",
        "claims": 5
      }
    ],
    "recent_documents": [
      {
        "id": 20,
        "filename": "screen_03_diagnostics.png",
        "file_type": "png",
        "status": "PROCESSED",
        "trust_level": "HIGH",
        "created_at": "2026-11-01 19:48"
      },
      {
        "id": 19,
        "filename": "screen_02_alarms.png",
        "file_type": "png",
        "status": "PROCESSED",
        "trust_level": "HIGH",
        "created_at": "2026-11-01 19:48"
      },
      {
        "id": 18,
        "filename": "screen_01_home.png",
        "file_type": "png",
        "status": "PROCESSED",
        "trust_level": "HIGH",
        "created_at": "2026-11-01 19:48"
      },
      {
        "id": 17,
        "filename": "scanned_appendix_calibration.pdf",
        "file_type": "pdf",
        "status": "PROCESSED",
        "trust_level": "MEDIUM",
        "created_at": "2026-11-01 19:48"
      },
      {
        "id": 16,
        "filename": "terminology_glossary.docx",
        "file_type": "docx",
        "status": "PROCESSED",
        "trust_level": "HIGH",
        "created_at": "2026-11-01 19:48"
      },
      {
        "id": 15,
        "filename": "revision_history.xlsx",
        "file_type": "xlsx",
        "status": "PROCESSED",
        "trust_level": "HIGH",
        "created_at": "2026-11-01 19:48"
      }
    ],
    "recent_questions": [
      {
        "id": 3,
        "content": "What is the current normal operating pressure for the HPU?",
        "created_at": "2026-11-01 19:50"
      },
      {
        "id": 1,
        "content": "What is the current normal operating pressure for the HPU?",
        "created_at": "2026-11-01 19:49"
      }
    ],
    "latest_revisions": [
      {
        "revision": "3.2.1",
        "date": "2025-11-18",
        "summary": "Alarm A17 multi-sensor condition text per ECN-1058",
        "status": "Current"
      },
      {
        "revision": "3.2",
        "date": "2025-09-30",
        "summary": "PS-04 replaced by PS-04A; 200 bar operating setpoint per ECN-1042",
        "status": "Active"
      },
      {
        "revision": "3.1",
        "date": "2024-02-14",
        "summary": "Diagnostics screen updates (P.S.04-A display label)",
        "status": "Superseded"
      },
      {
        "revision": "3.0",
        "date": "2023-06-02",
        "summary": "Initial Series-7 commercial release (180 bar, PS-04)",
        "status": "Legacy"
      }
    ],
    "system_health": {
      "database": "CONNECTED",
      "chromadb": "ONLINE",
      "ocr_engine": "READY (Windows Media OCR)",
      "vector_embeddings": "LOADED",
      "active_workspace": "Aegis Series-7 HCS"
    }
  },
  "documents": [
    {
      "id": 1,
      "filename": "configuration_export.json",
      "file_type": "json",
      "file_size": 1584,
      "category": "configuration",
      "trust_level": "HIGH",
      "status": "PROCESSING",
      "page_count": 1,
      "chunk_count": 0,
      "created_at": "2026-11-01 19:47"
    },
    {
      "id": 2,
      "filename": "system_diagram_electrical.png",
      "file_type": "png",
      "file_size": 49249,
      "category": "diagrams",
      "trust_level": "HIGH",
      "status": "PROCESSED",
      "page_count": 1,
      "chunk_count": 0,
      "created_at": "2026-11-01 19:48"
    },
    {
      "id": 3,
      "filename": "system_diagram_hydraulic.pdf",
      "file_type": "pdf",
      "file_size": 3072,
      "category": "diagrams",
      "trust_level": "HIGH",
      "status": "PROCESSED",
      "page_count": 1,
      "chunk_count": 1,
      "created_at": "2026-11-01 19:48"
    },
    {
      "id": 4,
      "filename": "wiring_diagram.pdf",
      "file_type": "pdf",
      "file_size": 2865,
      "category": "diagrams",
      "trust_level": "HIGH",
      "status": "PROCESSED",
      "page_count": 1,
      "chunk_count": 1,
      "created_at": "2026-11-01 19:48"
    },
    {
      "id": 5,
      "filename": "ECN-1042.pdf",
      "file_type": "pdf",
      "file_size": 3088,
      "category": "engineering_bulletins",
      "trust_level": "HIGH",
      "status": "PROCESSED",
      "page_count": 1,
      "chunk_count": 1,
      "created_at": "2026-11-01 19:48"
    },
    {
      "id": 6,
      "filename": "ECN-1058.pdf",
      "file_type": "pdf",
      "file_size": 2418,
      "category": "engineering_bulletins",
      "trust_level": "HIGH",
      "status": "PROCESSED",
      "page_count": 1,
      "chunk_count": 1,
      "created_at": "2026-11-01 19:48"
    },
    {
      "id": 7,
      "filename": "training_slide_excerpt.pptx",
      "file_type": "pptx",
      "file_size": 74698,
      "category": "extra",
      "trust_level": "MEDIUM",
      "status": "PROCESSED",
      "page_count": 3,
      "chunk_count": 3,
      "created_at": "2026-11-01 19:48"
    },
    {
      "id": 8,
      "filename": "site_survey_notes.docx",
      "file_type": "docx",
      "file_size": 9285,
      "category": "low_trust",
      "trust_level": "LOW",
      "status": "PROCESSED",
      "page_count": 1,
      "chunk_count": 1,
      "created_at": "2026-11-01 19:48"
    },
    {
      "id": 9,
      "filename": "legacy_manual_v1.html",
      "file_type": "html",
      "file_size": 3198,
      "category": "manuals_legacy",
      "trust_level": "MEDIUM",
      "status": "PROCESSED",
      "page_count": 1,
      "chunk_count": 1,
      "created_at": "2026-11-01 19:48"
    },
    {
      "id": 10,
      "filename": "maintenance_manual.pdf",
      "file_type": "pdf",
      "file_size": 3558,
      "category": "manuals",
      "trust_level": "HIGH",
      "status": "PROCESSED",
      "page_count": 1,
      "chunk_count": 1,
      "created_at": "2026-11-01 19:48"
    },
    {
      "id": 11,
      "filename": "operator_manual.pdf",
      "file_type": "pdf",
      "file_size": 4883,
      "category": "manuals",
      "trust_level": "HIGH",
      "status": "PROCESSED",
      "page_count": 2,
      "chunk_count": 2,
      "created_at": "2026-11-01 19:48"
    },
    {
      "id": 12,
      "filename": "safety_data_sheet_hydraulic_fluid.pdf",
      "file_type": "pdf",
      "file_size": 4280,
      "category": "noise",
      "trust_level": "LOW",
      "status": "PROCESSED",
      "page_count": 2,
      "chunk_count": 2,
      "created_at": "2026-11-01 19:48"
    },
    {
      "id": 13,
      "filename": "alarm_reference.pdf",
      "file_type": "pdf",
      "file_size": 4043,
      "category": "reference",
      "trust_level": "HIGH",
      "status": "PROCESSED",
      "page_count": 2,
      "chunk_count": 2,
      "created_at": "2026-11-01 19:48"
    },
    {
      "id": 14,
      "filename": "component_register.xlsx",
      "file_type": "xlsx",
      "file_size": 6087,
      "category": "reference",
      "trust_level": "HIGH",
      "status": "PROCESSED",
      "page_count": 1,
      "chunk_count": 1,
      "created_at": "2026-11-01 19:48"
    },
    {
      "id": 15,
      "filename": "revision_history.xlsx",
      "file_type": "xlsx",
      "file_size": 5615,
      "category": "reference",
      "trust_level": "HIGH",
      "status": "PROCESSED",
      "page_count": 1,
      "chunk_count": 1,
      "created_at": "2026-11-01 19:48"
    },
    {
      "id": 16,
      "filename": "terminology_glossary.docx",
      "file_type": "docx",
      "file_size": 9860,
      "category": "reference",
      "trust_level": "HIGH",
      "status": "PROCESSED",
      "page_count": 1,
      "chunk_count": 1,
      "created_at": "2026-11-01 19:48"
    },
    {
      "id": 17,
      "filename": "scanned_appendix_calibration.pdf",
      "file_type": "pdf",
      "file_size": 4201964,
      "category": "scans",
      "trust_level": "MEDIUM",
      "status": "PROCESSED",
      "page_count": 1,
      "chunk_count": 0,
      "created_at": "2026-11-01 19:48"
    },
    {
      "id": 18,
      "filename": "screen_01_home.png",
      "file_type": "png",
      "file_size": 53344,
      "category": "screenshots",
      "trust_level": "HIGH",
      "status": "PROCESSED",
      "page_count": 1,
      "chunk_count": 0,
      "created_at": "2026-11-01 19:48"
    },
    {
      "id": 19,
      "filename": "screen_02_alarms.png",
      "file_type": "png",
      "file_size": 38468,
      "category": "screenshots",
      "trust_level": "HIGH",
      "status": "PROCESSED",
      "page_count": 1,
      "chunk_count": 0,
      "created_at": "2026-11-01 19:48"
    },
    {
      "id": 20,
      "filename": "screen_03_diagnostics.png",
      "file_type": "png",
      "file_size": 38553,
      "category": "screenshots",
      "trust_level": "HIGH",
      "status": "PROCESSED",
      "page_count": 1,
      "chunk_count": 0,
      "created_at": "2026-11-01 19:48"
    }
  ],
  "components": [
    {
      "id": 1,
      "component_id": "HPU",
      "common_name": "Hydraulic Power Unit",
      "aliases": [
        "Hydraulic Unit",
        "HP unit",
        "Hydraulic Power Pack",
        "the unit",
        "power pack"
      ],
      "location": "Skid A, Bay 2",
      "status": "Active",
      "notes": "Primary hydraulic pressure source for the press circuit. Supplies pressurized fluid regulated by PLC-03.",
      "document_references": [
        "operator_manual.pdf",
        "maintenance_manual.pdf",
        "system_diagram_hydraulic.pdf",
        "ECN-1042.pdf"
      ],
      "revision_history": [
        {
          "revision": "3.0",
          "change": "Initial setpoint 180 bar with PS-04"
        },
        {
          "revision": "3.2",
          "change": "Setpoint revised to 200 bar with PS-04A per ECN-1042"
        }
      ],
      "related_components": [
        "PLC-03",
        "PS-04A",
        "IV-21",
        "Main Reservoir",
        "Auxiliary Reservoir"
      ],
      "created_at": "2026-11-01T19:47:00.501246"
    },
    {
      "id": 2,
      "component_id": "IV-21",
      "common_name": "Isolation Valve 21",
      "aliases": [
        "Isolation Valve",
        "IV21",
        "IV-21 Solenoid"
      ],
      "location": "Hydraulic Module",
      "status": "Active",
      "notes": "Isolates the HPU from the downstream press circuit. Must be OPEN prior to HPU startup.",
      "document_references": [
        "operator_manual.pdf",
        "maintenance_manual.pdf",
        "system_diagram_hydraulic.pdf",
        "wiring_diagram.pdf"
      ],
      "revision_history": [
        {
          "revision": "All",
          "change": "Required open interlock prior to start"
        }
      ],
      "related_components": [
        "HPU",
        "PLC-03"
      ],
      "created_at": "2026-11-01T19:47:00.501253"
    },
    {
      "id": 3,
      "component_id": "PS-04A",
      "common_name": "Pressure Sensor 04A",
      "aliases": [
        "P04A",
        "PS04A",
        "P.S.04-A",
        "pressure xdcr",
        "pressure transducer loop"
      ],
      "location": "HPU discharge line",
      "status": "Active",
      "notes": "Discharge pressure transducer installed per ECN-1042. Uses upgraded signal conditioning. Requires firmware >= 3.2.",
      "document_references": [
        "ECN-1042.pdf",
        "operator_manual.pdf",
        "maintenance_manual.pdf",
        "system_diagram_hydraulic.pdf",
        "wiring_diagram.pdf",
        "screen_03_diagnostics.png"
      ],
      "revision_history": [
        {
          "revision": "3.2",
          "change": "Replaced PS-04 to correct 18-month signal drift. Setpoint 200 bar."
        }
      ],
      "related_components": [
        "HPU",
        "PLC-03",
        "PS-04"
      ],
      "created_at": "2026-11-01T19:47:00.501258"
    },
    {
      "id": 4,
      "component_id": "PS-04",
      "common_name": "Pressure Sensor 04",
      "aliases": [
        "PRESSURE SENSOR 04",
        "P04",
        "PS04"
      ],
      "location": "HPU discharge line",
      "status": "Superseded",
      "notes": "Legacy sensor used on software revisions prior to 3.2. Subject to signal drift after 18 months. Superseded by PS-04A.",
      "document_references": [
        "legacy_manual_v1.html",
        "ECN-1042.pdf",
        "component_register.xlsx"
      ],
      "revision_history": [
        {
          "revision": "3.0",
          "change": "Original factory equipment with 180 bar setpoint"
        },
        {
          "revision": "3.2",
          "change": "Superseded by PS-04A per ECN-1042"
        }
      ],
      "related_components": [
        "HPU",
        "PS-04A"
      ],
      "created_at": "2026-11-01T19:47:00.501261"
    },
    {
      "id": 5,
      "component_id": "PS-40",
      "common_name": "Pressure Sensor 40",
      "aliases": [
        "P40",
        "PS40"
      ],
      "location": "Coolant Loop, Skid B",
      "status": "Active",
      "notes": "Monitors coolant loop pressure on Skid B. NOT related to HPU discharge circuit. Do NOT confuse with PS-04 or PS-04A.",
      "document_references": [
        "component_register.xlsx",
        "configuration_export.json"
      ],
      "revision_history": [
        {
          "revision": "3.0",
          "change": "Coolant system dedicated monitoring"
        }
      ],
      "related_components": [
        "Coolant Loop"
      ],
      "created_at": "2026-11-01T19:47:00.501265"
    },
    {
      "id": 6,
      "component_id": "PLC-03",
      "common_name": "HCS Controller",
      "aliases": [
        "Controller",
        "Aegis Controller",
        "PLC03"
      ],
      "location": "Control Cabinet 1",
      "status": "Active",
      "notes": "Industrial controller supervising startup sequencing, safety interlocks, and alarm evaluation.",
      "document_references": [
        "operator_manual.pdf",
        "maintenance_manual.pdf",
        "system_diagram_electrical.png",
        "wiring_diagram.pdf"
      ],
      "revision_history": [
        {
          "revision": "3.2.1",
          "change": "Current production firmware"
        }
      ],
      "related_components": [
        "HPU",
        "IV-21",
        "PS-04A",
        "Q1",
        "T1"
      ],
      "created_at": "2026-11-01T19:47:00.501268"
    },
    {
      "id": 7,
      "component_id": "TB-7",
      "common_name": "Terminal Block 7",
      "aliases": [
        "TB7"
      ],
      "location": "Control Cabinet 1",
      "status": "Active",
      "notes": "Wiring reference used in AEG-DWG-W03; corresponds to the PS-04A signal loop.",
      "document_references": [
        "wiring_diagram.pdf",
        "component_register.xlsx"
      ],
      "revision_history": [],
      "related_components": [
        "PLC-03",
        "PS-04A"
      ],
      "created_at": "2026-11-01T19:47:00.501272"
    },
    {
      "id": 8,
      "component_id": "Q1",
      "common_name": "Main Disconnect",
      "aliases": [
        "480V Disconnect"
      ],
      "location": "Control Cabinet 1",
      "status": "Active",
      "notes": "480V incoming supply disconnect switch.",
      "document_references": [
        "system_diagram_electrical.png",
        "component_register.xlsx"
      ],
      "revision_history": [],
      "related_components": [
        "T1",
        "PLC-03"
      ],
      "created_at": "2026-11-01T19:47:00.501276"
    },
    {
      "id": 9,
      "component_id": "T1",
      "common_name": "Control Transformer",
      "aliases": [
        "Control XFMR"
      ],
      "location": "Control Cabinet 1",
      "status": "Active",
      "notes": "480:120V control power transformer.",
      "document_references": [
        "system_diagram_electrical.png",
        "component_register.xlsx"
      ],
      "revision_history": [],
      "related_components": [
        "Q1",
        "PLC-03"
      ],
      "created_at": "2026-11-01T19:47:00.501279"
    },
    {
      "id": 10,
      "component_id": "Auxiliary Reservoir",
      "common_name": "Auxiliary Reservoir",
      "aliases": [
        "Aux Reservoir"
      ],
      "location": "Line 4/5 Hydraulic Rack",
      "status": "Active",
      "notes": "Top-up fluid storage during peak demand. Line 4/5-specific detail not in standard Operator Manual (introduced in training slide).",
      "document_references": [
        "training_slide_excerpt.pptx",
        "system_diagram_hydraulic.pdf"
      ],
      "revision_history": [],
      "related_components": [
        "HPU",
        "Main Reservoir"
      ],
      "created_at": "2026-11-01T19:47:00.501283"
    }
  ],
  "claims": [
    {
      "id": 1,
      "claim_id": "CLM-SCH-ELEC",
      "entity_name": "Aegis Series-7 HCS",
      "entity_type": "Specification",
      "attribute": "power_supply_specification",
      "value": "Main Disconnect Q1 rated for 480V incoming supply. Control Transformer T1 rated for 480:120V. 400V supply compatibility NOT specified/documented.",
      "unit": "V",
      "source_document": "system_diagram_electrical.png",
      "page_number": 1,
      "source_section": "Electrical Schematic AEG-DWG-E02",
      "document_revision": "AEG-DWG-E02",
      "applicable_software_rev": "all",
      "confidence_score": 0.9,
      "extraction_method": "ocr_extraction",
      "original_text": "MAIN DISCONNECT Q1 480V. CONTROL XFMR T1 480:120V. Power distribution and interlock wiring.",
      "created_at": "2026-11-01T19:48:12.399958"
    },
    {
      "id": 2,
      "claim_id": "CLM-SCH-HYD",
      "entity_name": "PLC-03",
      "entity_type": "Diagram",
      "attribute": "direct_controller_connections",
      "value": "Direct control/signal connections (purple lines) to: 1. Hydraulic Power Unit (HPU); 2. PS-04A; 3. IV-21.",
      "unit": "",
      "source_document": "system_diagram_hydraulic.pdf",
      "page_number": 1,
      "source_section": "Hydraulic Schematic AEG-DWG-H01",
      "document_revision": "AEG-DWG-H01",
      "applicable_software_rev": ">= 3.2",
      "confidence_score": 0.95,
      "extraction_method": "diagram_topological_parser",
      "original_text": "PLC-03 connects directly via purple control lines to HPU, PS-04A, and IV-21. Reservoirs connect via fluid/interconnect lines.",
      "created_at": "2026-11-01T19:48:18.136674"
    },
    {
      "id": 3,
      "claim_id": "CLM-ECN1042-01",
      "entity_name": "PS-04A",
      "entity_type": "Component",
      "attribute": "replacement_target",
      "value": "PS-04",
      "unit": "",
      "source_document": "ECN-1042.pdf",
      "page_number": 1,
      "source_section": "1. Description of Change",
      "document_revision": "ECN-1042",
      "applicable_software_rev": ">= 3.2",
      "confidence_score": 1.0,
      "extraction_method": "rule_based_ecn_parser",
      "original_text": "Effective software revision 3.2, pressure sensor PS-04 is replaced by pressure sensor PS-04A at the HPU discharge line. PS-04A uses an updated signal conditioning circuit and is not a form-fit-function replacement for PS-04.",
      "created_at": "2026-11-01T19:48:18.250961"
    },
    {
      "id": 4,
      "claim_id": "CLM-ECN1042-02",
      "entity_name": "HPU",
      "entity_type": "Parameter",
      "attribute": "normal_operating_pressure",
      "value": "200",
      "unit": "bar",
      "source_document": "ECN-1042.pdf",
      "page_number": 1,
      "source_section": "1. Description of Change",
      "document_revision": "ECN-1042",
      "applicable_software_rev": ">= 3.2",
      "confidence_score": 1.0,
      "extraction_method": "rule_based_ecn_parser",
      "original_text": "Alongside the sensor change, the normal HPU discharge pressure setpoint is revised from 180 bar to 200 bar. This is a deliberate process change, not a sensor calibration artifact.",
      "created_at": "2026-11-01T19:48:18.250967"
    },
    {
      "id": 5,
      "claim_id": "CLM-ECN1042-03",
      "entity_name": "PS-04",
      "entity_type": "Parameter",
      "attribute": "legacy_operating_pressure",
      "value": "180",
      "unit": "bar",
      "source_document": "ECN-1042.pdf",
      "page_number": 1,
      "source_section": "1. Description of Change",
      "document_revision": "ECN-1042",
      "applicable_software_rev": "< 3.2",
      "confidence_score": 1.0,
      "extraction_method": "rule_based_ecn_parser",
      "original_text": "PS-04 remains installed and supported on units running software revisions prior to 3.2. Normal setpoint prior to revision 3.2 was 180 bar.",
      "created_at": "2026-11-01T19:48:18.250970"
    },
    {
      "id": 6,
      "claim_id": "CLM-ECN1042-04",
      "entity_name": "PS-04",
      "entity_type": "Component",
      "attribute": "failure_reason",
      "value": "Signal drift beyond tolerance after 18 months in high-cycle installations",
      "unit": "months",
      "source_document": "ECN-1042.pdf",
      "page_number": 1,
      "source_section": "2. Reason for Change",
      "document_revision": "ECN-1042",
      "applicable_software_rev": "all",
      "confidence_score": 1.0,
      "extraction_method": "rule_based_ecn_parser",
      "original_text": "Field data showed PS-04's signal drift exceeded tolerance after approximately 18 months of continuous service in high-cycle installations, occasionally triggering nuisance Alarm A19.",
      "created_at": "2026-11-01T19:48:18.250974"
    },
    {
      "id": 7,
      "claim_id": "CLM-ECN1058-01",
      "entity_name": "A17",
      "entity_type": "Alarm",
      "attribute": "sensor_reference_correction",
      "value": "Evaluated against active sensor (PS-04 prior to 3.2, PS-04A on 3.2+)",
      "unit": "",
      "source_document": "ECN-1058.pdf",
      "page_number": 1,
      "source_section": "1. Description of Change",
      "document_revision": "ECN-1058",
      "applicable_software_rev": "all",
      "confidence_score": 1.0,
      "extraction_method": "rule_based_ecn_parser",
      "original_text": "Alarm A17's low-pressure condition is evaluated against whichever pressure sensor is active for the installed software revision (PS-04 prior to revision 3.2, PS-04A on revision 3.2 and later).",
      "created_at": "2026-11-01T19:48:18.293763"
    },
    {
      "id": 8,
      "claim_id": "CLM-ECN1058-02",
      "entity_name": "ECN-1058",
      "entity_type": "ChangeNotice",
      "attribute": "approval_signature",
      "value": "NOT_SPECIFIED",
      "unit": "",
      "source_document": "ECN-1058.pdf",
      "page_number": 1,
      "source_section": "Header",
      "document_revision": "ECN-1058",
      "applicable_software_rev": "all",
      "confidence_score": 1.0,
      "extraction_method": "rule_based_ecn_parser",
      "original_text": "Document contains Title, Effective, References, Status (Released), but no approval author or signature block.",
      "created_at": "2026-11-01T19:48:18.293769"
    },
    {
      "id": 9,
      "claim_id": "CLM-TRN-01",
      "entity_name": "Auxiliary Reservoir",
      "entity_type": "Component",
      "attribute": "manual_omission_note",
      "value": "Introduced in Slide 2 as a Line 4/5-specific configuration detail not covered in standard Operator Manual",
      "unit": "",
      "source_document": "training_slide_excerpt.pptx",
      "page_number": 2,
      "source_section": "Slide 2: What is the HPU?",
      "document_revision": "Training Slide Excerpt",
      "applicable_software_rev": "all",
      "confidence_score": 0.85,
      "extraction_method": "pptx_parser",
      "original_text": "Note: 'Auxiliary Reservoir' is a Line 4/5-specific configuration detail and is not covered in the standard Operator Manual.",
      "created_at": "2026-11-01T19:48:18.361635"
    },
    {
      "id": 10,
      "claim_id": "CLM-FIELD-01",
      "entity_name": "HPU",
      "entity_type": "Observation",
      "attribute": "field_reading",
      "value": "Observed 175 bar gauge on Line 4. Informal, uncalibrated, unreviewed field note contradicting manual. Software rev unconfirmed.",
      "unit": "bar",
      "source_document": "site_survey_notes.docx",
      "page_number": 1,
      "source_section": "Site Visit Notes - Line 4 HPU",
      "document_revision": "Undated Field Notes",
      "applicable_software_rev": "unverified",
      "confidence_score": 0.35,
      "extraction_method": "low_trust_text_parser",
      "original_text": "Checked the gauge on the local panel and it read about 175 bar during a normal run, not 180 like the manual says it should be. Could be the gauge is a little off, didn't have a calibrated reference on me.",
      "created_at": "2026-11-01T19:48:18.401945"
    },
    {
      "id": 11,
      "claim_id": "CLM-LEG-01",
      "entity_name": "HPU",
      "entity_type": "Parameter",
      "attribute": "legacy_operating_pressure",
      "value": "180",
      "unit": "bar",
      "source_document": "legacy_manual_v1.html",
      "page_number": 1,
      "source_section": "5. Normal Operating Ranges",
      "document_revision": "AEG-OM-700 Rev 1 (Superseded)",
      "applicable_software_rev": "3.0, 3.1",
      "confidence_score": 0.65,
      "extraction_method": "html_parser",
      "original_text": "Normal HPU discharge pressure is 180 bar, as measured by pressure sensor PS-04. Applies to software revisions 3.0 and 3.1 only.",
      "created_at": "2026-11-01T19:48:18.443823"
    },
    {
      "id": 12,
      "claim_id": "CLM-MM-A17",
      "entity_name": "A17",
      "entity_type": "Procedure",
      "attribute": "persistence_action",
      "value": "If alarm A17 persists for more than 10 seconds, execute Shutdown Procedure 4.7 immediately. Do not attempt to clear by silencing alone.",
      "unit": "seconds",
      "source_document": "maintenance_manual.pdf",
      "page_number": 1,
      "source_section": "4. Alarm A17 Response",
      "document_revision": "AEG-MM-700 Rev 3",
      "applicable_software_rev": "all",
      "confidence_score": 1.0,
      "extraction_method": "rule_based_manual_parser",
      "original_text": "If alarm A17 persists for more than 10 seconds, execute Shutdown Procedure 4.7 before investigating further. Do not attempt to clear a persistent A17 by silencing the alarm alone.",
      "created_at": "2026-11-01T19:48:18.497524"
    },
    {
      "id": 13,
      "claim_id": "CLM-MM-SHUTDOWN",
      "entity_name": "Shutdown Procedure 4.7",
      "entity_type": "Procedure",
      "attribute": "execution_steps",
      "value": "1. Close IV-21; 2. Confirm pressure decay; 3. Set POWER selector to OFF; 4. Tag out per site lockout/tagout procedure; 5. Proceed to Section 6 (Troubleshooting).",
      "unit": "",
      "source_document": "maintenance_manual.pdf",
      "page_number": 1,
      "source_section": "4. Alarm A17 Response",
      "document_revision": "AEG-MM-700 Rev 3",
      "applicable_software_rev": "all",
      "confidence_score": 1.0,
      "extraction_method": "rule_based_manual_parser",
      "original_text": "Shutdown Procedure 4.7: close IV-21, confirm pressure decay, set POWER selector to OFF, tag out per site lockout/tagout procedure, then proceed to Section 6 (Troubleshooting).",
      "created_at": "2026-11-01T19:48:18.497531"
    },
    {
      "id": 14,
      "claim_id": "CLM-MM-RESET",
      "entity_name": "PLC-03",
      "entity_type": "Procedure",
      "attribute": "controller_reset_conditions",
      "value": "Reset only permitted when pressure reads below 50 bar. Resetting above 50 bar causes momentary uncommanded actuation of Isolation Valve IV-21.",
      "unit": "bar",
      "source_document": "maintenance_manual.pdf",
      "page_number": 1,
      "source_section": "3. Controller Reset Conditions",
      "document_revision": "AEG-MM-700 Rev 3",
      "applicable_software_rev": "all",
      "confidence_score": 1.0,
      "extraction_method": "rule_based_manual_parser",
      "original_text": "Do NOT reset the PLC-03 controller while hydraulic pressure is above 50 bar. The controller reset routine re-initializes valve driver outputs; if the circuit is still pressurized, this can produce a momentary uncommanded actuation of Isolation Valve IV-21.",
      "created_at": "2026-11-01T19:48:18.497535"
    },
    {
      "id": 15,
      "claim_id": "CLM-OM-STARTUP",
      "entity_name": "HPU",
      "entity_type": "Procedure",
      "attribute": "startup_requirements",
      "value": "1. Fluid level within normal band on sight glass; 2. Isolation valve IV-21 is OPEN; 3. Emergency stop circuit is RESET; 4. Maintenance access panel is CLOSED (warning: do not start with panel removed).",
      "unit": "",
      "source_document": "operator_manual.pdf",
      "page_number": 1,
      "source_section": "4.3 Starting the Hydraulic Power Unit",
      "document_revision": "AEG-OM-700 Rev 4",
      "applicable_software_rev": ">= 3.2",
      "confidence_score": 1.0,
      "extraction_method": "rule_based_manual_parser",
      "original_text": "Before starting, verify: Hydraulic fluid level is within the normal band on the sight glass. Isolation valve IV-21 is OPEN. The emergency stop circuit is RESET. WARNING: Do not start the unit with the maintenance access panel removed.",
      "created_at": "2026-11-01T19:48:18.570105"
    },
    {
      "id": 16,
      "claim_id": "CLM-OM-RESET",
      "entity_name": "PLC-03",
      "entity_type": "Procedure",
      "attribute": "controller_reset_conditions",
      "value": "Do not reset PLC-03 while pressure is above 50 bar. Resetting under pressure causes uncommanded valve transition. Bleed below 50 bar first.",
      "unit": "bar",
      "source_document": "operator_manual.pdf",
      "page_number": 2,
      "source_section": "7. Controller Reset",
      "document_revision": "AEG-OM-700 Rev 4",
      "applicable_software_rev": ">= 3.2",
      "confidence_score": 1.0,
      "extraction_method": "rule_based_manual_parser",
      "original_text": "Do not reset the PLC-03 controller while hydraulic pressure is above 50 bar. Resetting the controller under pressure can cause an uncommanded valve transition. Bleed pressure below 50 bar first.",
      "created_at": "2026-11-01T19:48:18.570113"
    },
    {
      "id": 17,
      "claim_id": "CLM-OM-PRESSURE",
      "entity_name": "HPU",
      "entity_type": "Parameter",
      "attribute": "normal_operating_pressure",
      "value": "200",
      "unit": "bar",
      "source_document": "operator_manual.pdf",
      "page_number": 2,
      "source_section": "5. Normal Operating Ranges",
      "document_revision": "AEG-OM-700 Rev 4",
      "applicable_software_rev": ">= 3.2",
      "confidence_score": 1.0,
      "extraction_method": "rule_based_manual_parser",
      "original_text": "Normal HPU discharge pressure is 200 bar, as measured by pressure sensor PS-04A. Do not use the 180 bar figure on a unit running revision 3.2 or later.",
      "created_at": "2026-11-01T19:48:18.570116"
    },
    {
      "id": 18,
      "claim_id": "CLM-ALARM-A17",
      "entity_name": "A17",
      "entity_type": "Alarm",
      "attribute": "specification",
      "value": "Condition: Hydraulic pressure below 150 bar. Panel: RED. Causes: 1. IV-21 closed/partially closed; 2. Low fluid; 3. Sensor signal invalid. Action: See Maint Manual Sec 4. If persistent > 10s, run Shutdown Proc 4.7.",
      "unit": "bar",
      "source_document": "alarm_reference.pdf",
      "page_number": 1,
      "source_section": "Alarm Table",
      "document_revision": "AEG-AL-700 Rev 5",
      "applicable_software_rev": "all",
      "confidence_score": 1.0,
      "extraction_method": "rule_based_alarm_parser",
      "original_text": "A17 | Hydraulic pressure below 150 bar | RED | 1. IV-21 closed or partially closed 2. Low hydraulic fluid 3. Pressure sensor signal invalid | See Section 4 of Maintenance Manual. If persistent > 10 s, run Shutdown Proc. 4.7",
      "created_at": "2026-11-01T19:48:18.698969"
    },
    {
      "id": 19,
      "claim_id": "CLM-ALARM-A18",
      "entity_name": "A18",
      "entity_type": "Alarm",
      "attribute": "specification",
      "value": "Condition: Hydraulic pressure above 220 bar. Panel: AMBER. Causes: 1. Relief valve fault; 2. Setpoint misconfiguration. Action: Stop HPU. Do not restart until pressure relief verified.",
      "unit": "bar",
      "source_document": "alarm_reference.pdf",
      "page_number": 1,
      "source_section": "Alarm Table",
      "document_revision": "AEG-AL-700 Rev 5",
      "applicable_software_rev": "all",
      "confidence_score": 1.0,
      "extraction_method": "rule_based_alarm_parser",
      "original_text": "A18 | Hydraulic pressure above 220 bar | AMBER | 1. Relief valve fault 2. Setpoint misconfiguration | Stop the HPU. Do not restart until pressure relief is verified.",
      "created_at": "2026-11-01T19:48:18.698975"
    },
    {
      "id": 20,
      "claim_id": "CLM-ALARM-A19",
      "entity_name": "A19",
      "entity_type": "Alarm",
      "attribute": "specification",
      "value": "Condition: Pressure sensor signal invalid. Panel: RED. Causes: 1. Sensor wiring fault; 2. Sensor drift beyond tolerance. Action: Replace sensor per Maintenance Manual Section 6.",
      "unit": "",
      "source_document": "alarm_reference.pdf",
      "page_number": 1,
      "source_section": "Alarm Table",
      "document_revision": "AEG-AL-700 Rev 5",
      "applicable_software_rev": "all",
      "confidence_score": 1.0,
      "extraction_method": "rule_based_alarm_parser",
      "original_text": "A19 | Pressure sensor signal invalid | RED | 1. Sensor wiring fault 2. Sensor drift beyond tolerance | Replace sensor per Maintenance Manual Section 6.",
      "created_at": "2026-11-01T19:48:18.698979"
    },
    {
      "id": 21,
      "claim_id": "CLM-REG-HPU",
      "entity_name": "HPU",
      "entity_type": "Component",
      "attribute": "specification",
      "value": "Name: Hydraulic Power Unit; Aliases: Hydraulic Unit; HP unit; Hydraulic Power Pack; Location: Skid A, Bay 2; Status: Active; Notes: Primary hydraulic pressure source for the press circuit.",
      "unit": "",
      "source_document": "component_register.xlsx",
      "page_number": 1,
      "source_section": "Component Register Sheet",
      "document_revision": "AEG-CR-700",
      "applicable_software_rev": "all",
      "confidence_score": 1.0,
      "extraction_method": "table_parser",
      "original_text": "HPU | Hydraulic Power Unit | Hydraulic Unit; HP unit; Hydraulic Power Pack | Skid A, Bay 2 | Active | Primary hydraulic pressure source for the press circuit.",
      "created_at": "2026-11-01T19:48:18.744933"
    },
    {
      "id": 22,
      "claim_id": "CLM-REG-IV21",
      "entity_name": "IV-21",
      "entity_type": "Component",
      "attribute": "specification",
      "value": "Name: Isolation Valve 21; Aliases: Isolation Valve; IV21; Location: Hydraulic Module; Status: Active; Notes: Must be OPEN prior to HPU startup.",
      "unit": "",
      "source_document": "component_register.xlsx",
      "page_number": 1,
      "source_section": "Component Register Sheet",
      "document_revision": "AEG-CR-700",
      "applicable_software_rev": "all",
      "confidence_score": 1.0,
      "extraction_method": "table_parser",
      "original_text": "IV-21 | Isolation Valve 21 | Isolation Valve; IV21 | Hydraulic Module | Active | Must be OPEN prior to HPU startup.",
      "created_at": "2026-11-01T19:48:18.744939"
    },
    {
      "id": 23,
      "claim_id": "CLM-REG-PS04",
      "entity_name": "PS-04",
      "entity_type": "Component",
      "attribute": "specification",
      "value": "Name: Pressure Sensor 04; Aliases: PRESSURE SENSOR 04; P04; PS04; Location: HPU discharge line; Status: Superseded; Notes: Superseded by PS-04A effective software rev 3.2. See ECN-1042.",
      "unit": "",
      "source_document": "component_register.xlsx",
      "page_number": 1,
      "source_section": "Component Register Sheet",
      "document_revision": "AEG-CR-700",
      "applicable_software_rev": "all",
      "confidence_score": 1.0,
      "extraction_method": "table_parser",
      "original_text": "PS-04 | Pressure Sensor 04 | PRESSURE SENSOR 04; P04; PS04 | HPU discharge line | Superseded | Superseded by PS-04A effective software rev 3.2. See ECN-1042.",
      "created_at": "2026-11-01T19:48:18.744943"
    },
    {
      "id": 24,
      "claim_id": "CLM-REG-PS04A",
      "entity_name": "PS-04A",
      "entity_type": "Component",
      "attribute": "specification",
      "value": "Name: Pressure Sensor 04A; Aliases: P04A; PS04A; Location: HPU discharge line; Status: Active; Notes: Installed per ECN-1042. Requires controller firmware >= 3.2.",
      "unit": "",
      "source_document": "component_register.xlsx",
      "page_number": 1,
      "source_section": "Component Register Sheet",
      "document_revision": "AEG-CR-700",
      "applicable_software_rev": "all",
      "confidence_score": 1.0,
      "extraction_method": "table_parser",
      "original_text": "PS-04A | Pressure Sensor 04A | P04A; PS04A | HPU discharge line | Active | Installed per ECN-1042. Requires controller firmware >= 3.2.",
      "created_at": "2026-11-01T19:48:18.744946"
    },
    {
      "id": 25,
      "claim_id": "CLM-REG-PS40",
      "entity_name": "PS-40",
      "entity_type": "Component",
      "attribute": "specification",
      "value": "Name: Pressure Sensor 40; Aliases: P40; PS40; Location: Coolant Loop, Skid B; Status: Active; Notes: NOT related to the HPU discharge circuit. Do not confuse with PS-04 / PS-04A.",
      "unit": "",
      "source_document": "component_register.xlsx",
      "page_number": 1,
      "source_section": "Component Register Sheet",
      "document_revision": "AEG-CR-700",
      "applicable_software_rev": "all",
      "confidence_score": 1.0,
      "extraction_method": "table_parser",
      "original_text": "PS-40 | Pressure Sensor 40 | P40; PS40 | Coolant Loop, Skid B | Active | NOT related to the HPU discharge circuit. Do not confuse with PS-04 / PS-04A.",
      "created_at": "2026-11-01T19:48:18.744949"
    },
    {
      "id": 26,
      "claim_id": "CLM-REG-PLC03",
      "entity_name": "PLC-03",
      "entity_type": "Component",
      "attribute": "specification",
      "value": "Name: HCS Controller; Aliases: Controller; Aegis Controller; Location: Control Cabinet 1; Status: Active; Notes: Supervises startup sequencing, alarms, and interlocks.",
      "unit": "",
      "source_document": "component_register.xlsx",
      "page_number": 1,
      "source_section": "Component Register Sheet",
      "document_revision": "AEG-CR-700",
      "applicable_software_rev": "all",
      "confidence_score": 1.0,
      "extraction_method": "table_parser",
      "original_text": "PLC-03 | HCS Controller | Controller; Aegis Controller | Control Cabinet 1 | Active | Supervises startup sequencing, alarms, and interlocks.",
      "created_at": "2026-11-01T19:48:18.744953"
    },
    {
      "id": 27,
      "claim_id": "CLM-REG-A17",
      "entity_name": "A17",
      "entity_type": "Component",
      "attribute": "specification",
      "value": "Name: Alarm: Hydraulic Pressure Low; Aliases: \u2014; Location: N/A (software alarm); Status: Active; Notes: See Alarm Reference AEG-AL-700 for thresholds and required actions.",
      "unit": "",
      "source_document": "component_register.xlsx",
      "page_number": 1,
      "source_section": "Component Register Sheet",
      "document_revision": "AEG-CR-700",
      "applicable_software_rev": "all",
      "confidence_score": 1.0,
      "extraction_method": "table_parser",
      "original_text": "A17 | Alarm: Hydraulic Pressure Low | \u2014 | N/A (software alarm) | Active | See Alarm Reference AEG-AL-700 for thresholds and required actions.",
      "created_at": "2026-11-01T19:48:18.744956"
    },
    {
      "id": 28,
      "claim_id": "CLM-REG-A18",
      "entity_name": "A18",
      "entity_type": "Component",
      "attribute": "specification",
      "value": "Name: Alarm: Hydraulic Pressure High; Aliases: \u2014; Location: N/A (software alarm); Status: Active; Notes: See Alarm Reference AEG-AL-700.",
      "unit": "",
      "source_document": "component_register.xlsx",
      "page_number": 1,
      "source_section": "Component Register Sheet",
      "document_revision": "AEG-CR-700",
      "applicable_software_rev": "all",
      "confidence_score": 1.0,
      "extraction_method": "table_parser",
      "original_text": "A18 | Alarm: Hydraulic Pressure High | \u2014 | N/A (software alarm) | Active | See Alarm Reference AEG-AL-700.",
      "created_at": "2026-11-01T19:48:18.744959"
    },
    {
      "id": 29,
      "claim_id": "CLM-REG-A19",
      "entity_name": "A19",
      "entity_type": "Component",
      "attribute": "specification",
      "value": "Name: Alarm: Pressure Sensor Signal Invalid; Aliases: \u2014; Location: N/A (software alarm); Status: Active; Notes: See Alarm Reference AEG-AL-700.",
      "unit": "",
      "source_document": "component_register.xlsx",
      "page_number": 1,
      "source_section": "Component Register Sheet",
      "document_revision": "AEG-CR-700",
      "applicable_software_rev": "all",
      "confidence_score": 1.0,
      "extraction_method": "table_parser",
      "original_text": "A19 | Alarm: Pressure Sensor Signal Invalid | \u2014 | N/A (software alarm) | Active | See Alarm Reference AEG-AL-700.",
      "created_at": "2026-11-01T19:48:18.744962"
    },
    {
      "id": 30,
      "claim_id": "CLM-REG-TB7",
      "entity_name": "TB-7",
      "entity_type": "Component",
      "attribute": "specification",
      "value": "Name: Terminal Block 7; Aliases: \u2014; Location: Control Cabinet 1; Status: Active; Notes: Wiring reference only, used in AEG-DWG-W03; corresponds to the PS-04A signal loop.",
      "unit": "",
      "source_document": "component_register.xlsx",
      "page_number": 1,
      "source_section": "Component Register Sheet",
      "document_revision": "AEG-CR-700",
      "applicable_software_rev": "all",
      "confidence_score": 1.0,
      "extraction_method": "table_parser",
      "original_text": "TB-7 | Terminal Block 7 | \u2014 | Control Cabinet 1 | Active | Wiring reference only, used in AEG-DWG-W03; corresponds to the PS-04A signal loop.",
      "created_at": "2026-11-01T19:48:18.744965"
    },
    {
      "id": 31,
      "claim_id": "CLM-REG-Q1",
      "entity_name": "Q1",
      "entity_type": "Component",
      "attribute": "specification",
      "value": "Name: Main Disconnect; Aliases: \u2014; Location: Control Cabinet 1; Status: Active; Notes: 480V incoming disconnect.",
      "unit": "",
      "source_document": "component_register.xlsx",
      "page_number": 1,
      "source_section": "Component Register Sheet",
      "document_revision": "AEG-CR-700",
      "applicable_software_rev": "all",
      "confidence_score": 1.0,
      "extraction_method": "table_parser",
      "original_text": "Q1 | Main Disconnect | \u2014 | Control Cabinet 1 | Active | 480V incoming disconnect.",
      "created_at": "2026-11-01T19:48:18.744968"
    },
    {
      "id": 32,
      "claim_id": "CLM-REG-T1",
      "entity_name": "T1",
      "entity_type": "Component",
      "attribute": "specification",
      "value": "Name: Control Transformer; Aliases: \u2014; Location: Control Cabinet 1; Status: Active; Notes: 480:120V control power.",
      "unit": "",
      "source_document": "component_register.xlsx",
      "page_number": 1,
      "source_section": "Component Register Sheet",
      "document_revision": "AEG-CR-700",
      "applicable_software_rev": "all",
      "confidence_score": 1.0,
      "extraction_method": "table_parser",
      "original_text": "T1 | Control Transformer | \u2014 | Control Cabinet 1 | Active | 480:120V control power.",
      "created_at": "2026-11-01T19:48:18.744971"
    },
    {
      "id": 33,
      "claim_id": "CLM-REV-3_0",
      "entity_name": "Software Revision 3.0",
      "entity_type": "ChangeNotice",
      "attribute": "release_details",
      "value": "Date: 2023-06-02; Changes: Initial Series-7 release.; Docs: AEG-OM-700 Rev 1, AEG-MM-700 Rev 1",
      "unit": "",
      "source_document": "revision_history.xlsx",
      "page_number": 1,
      "source_section": "Revision History Sheet",
      "document_revision": "AEG-RH-700",
      "applicable_software_rev": "3.0",
      "confidence_score": 1.0,
      "extraction_method": "table_parser",
      "original_text": "3.0 | 2023-06-02 | Initial Series-7 release. | AEG-OM-700 Rev 1, AEG-MM-700 Rev 1",
      "created_at": "2026-11-01T19:48:18.786278"
    },
    {
      "id": 34,
      "claim_id": "CLM-REV-3_1",
      "entity_name": "Software Revision 3.1",
      "entity_type": "ChangeNotice",
      "attribute": "release_details",
      "value": "Date: 2024-02-14; Changes: Minor HMI diagnostics screen updates. No change to sensors or setpoints.; Docs: AEG-OM-700 Rev 2",
      "unit": "",
      "source_document": "revision_history.xlsx",
      "page_number": 1,
      "source_section": "Revision History Sheet",
      "document_revision": "AEG-RH-700",
      "applicable_software_rev": "3.1",
      "confidence_score": 1.0,
      "extraction_method": "table_parser",
      "original_text": "3.1 | 2024-02-14 | Minor HMI diagnostics screen updates. No change to sensors or setpoints. | AEG-OM-700 Rev 2",
      "created_at": "2026-11-01T19:48:18.786285"
    },
    {
      "id": 35,
      "claim_id": "CLM-REV-3_2",
      "entity_name": "Software Revision 3.2",
      "entity_type": "ChangeNotice",
      "attribute": "release_details",
      "value": "Date: 2025-09-30; Changes: Pressure sensor PS-04 replaced by PS-04A. Normal HPU discharge pressure setpoint changed from 180 bar to 200 bar. See ECN-1042.; Docs: ECN-1042, AEG-OM-700 Rev 3, AEG-MM-700 Rev 2, AEG-CR-700 Rev 2",
      "unit": "",
      "source_document": "revision_history.xlsx",
      "page_number": 1,
      "source_section": "Revision History Sheet",
      "document_revision": "AEG-RH-700",
      "applicable_software_rev": "3.2",
      "confidence_score": 1.0,
      "extraction_method": "table_parser",
      "original_text": "3.2 | 2025-09-30 | Pressure sensor PS-04 replaced by PS-04A. Normal HPU discharge pressure setpoint changed from 180 bar to 200 bar. See ECN-1042. | ECN-1042, AEG-OM-700 Rev 3, AEG-MM-700 Rev 2, AEG-CR-700 Rev 2",
      "created_at": "2026-11-01T19:48:18.786288"
    },
    {
      "id": 36,
      "claim_id": "CLM-REV-3_2_1",
      "entity_name": "Software Revision 3.2.1",
      "entity_type": "ChangeNotice",
      "attribute": "release_details",
      "value": "Date: 2025-11-18; Changes: Documentation correction: Alarm A17 condition text no longer names a specific sensor (PS-04 or PS-04A) so it reads correctly on units at either revision. Alarm thresholds unchanged. See ECN-1058.; Docs: ECN-1058, AEG-AL-700 Rev 5",
      "unit": "",
      "source_document": "revision_history.xlsx",
      "page_number": 1,
      "source_section": "Revision History Sheet",
      "document_revision": "AEG-RH-700",
      "applicable_software_rev": "3.2.1",
      "confidence_score": 1.0,
      "extraction_method": "table_parser",
      "original_text": "3.2.1 | 2025-11-18 | Documentation correction: Alarm A17 condition text no longer names a specific sensor (PS-04 or PS-04A) so it reads correctly on units at either revision. Alarm thresholds unchanged. See ECN-1058. | ECN-1058, AEG-AL-700 Rev 5",
      "created_at": "2026-11-01T19:48:18.786292"
    },
    {
      "id": 37,
      "claim_id": "CLM-REV-3_3",
      "entity_name": "Software Revision 3.3",
      "entity_type": "ChangeNotice",
      "attribute": "release_details",
      "value": "Date: 2026-04-07 (planned); Changes: Scheduled: extended diagnostics logging. No sensor or setpoint changes currently planned.; Docs: Not yet published",
      "unit": "",
      "source_document": "revision_history.xlsx",
      "page_number": 1,
      "source_section": "Revision History Sheet",
      "document_revision": "AEG-RH-700",
      "applicable_software_rev": "3.3",
      "confidence_score": 1.0,
      "extraction_method": "table_parser",
      "original_text": "3.3 | 2026-04-07 (planned) | Scheduled: extended diagnostics logging. No sensor or setpoint changes currently planned. | Not yet published",
      "created_at": "2026-11-01T19:48:18.786295"
    },
    {
      "id": 38,
      "claim_id": "CLM-CAL-01",
      "entity_name": "PS-04A",
      "entity_type": "Component",
      "attribute": "calibration_record",
      "value": "Calibrated 2026-01-09 by R. Okafor. Points: Zero 0 bar -> 0.1 bar, Mid 100 bar -> 99.6 bar, Span 200 bar -> 199.4 bar (PASS). No calibration interval specified on form.",
      "unit": "bar",
      "source_document": "scanned_appendix_calibration.pdf",
      "page_number": 1,
      "source_section": "Appendix C",
      "document_revision": "Field Binder Copy",
      "applicable_software_rev": ">= 3.2",
      "confidence_score": 0.75,
      "extraction_method": "ocr_extraction",
      "original_text": "Sensor Tag: PS-04A. Calibration Date: 2026-01-09. Technician: R. Okafor. Span reference target is 200 bar. No calibration interval is specified for PS-04A on this form; recalibration frequency should be confirmed against the applicable maintenance schedule, which is not included.",
      "created_at": "2026-11-01T19:48:20.743181"
    },
    {
      "id": 39,
      "claim_id": "CLM-SCR-03",
      "entity_name": "P.S.04-A",
      "entity_type": "Component",
      "attribute": "diagnostics_screen_reading",
      "value": "Label: P.S.04-A; Type: 4-20 mA; Reading: 14.8 mA; Scaled: 200.3 bar; Firmware: 3.2.1. Matches component PS-04A.",
      "unit": "bar",
      "source_document": "screen_03_diagnostics.png",
      "page_number": 1,
      "source_section": "Diagnostics Screen",
      "document_revision": "HMI v3.2.1",
      "applicable_software_rev": "3.2.1",
      "confidence_score": 0.85,
      "extraction_method": "ocr_extraction",
      "original_text": "Tag: P.S.04-A, Signal Type: 4-20 mA, Scaled Value: 200.3 bar, Status: WITHIN TOLERANCE, Firmware Rev: 3.2.1. Note: displays sensor tag as printed on physical unit label.",
      "created_at": "2026-11-01T19:48:24.085790"
    }
  ],
  "conflicts": [
    {
      "id": 1,
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
      "active_resolution": "Current Standard: 200 bar (Rev >= 3.2 with PS-04A); Legacy: 180 bar (Rev < 3.2 with PS-04).",
      "is_reviewed": true,
      "reviewed_by": null,
      "created_at": "2026-11-01T19:47:00.506024",
      "updated_at": "2026-11-01T19:47:00.506030"
    },
    {
      "id": 2,
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
      "active_resolution": "Active standard is PS-04A for revision 3.2+; PS-04 is maintained for legacy units.",
      "is_reviewed": true,
      "reviewed_by": null,
      "created_at": "2026-11-01T19:47:00.506032",
      "updated_at": "2026-11-01T19:47:00.506034"
    },
    {
      "id": 3,
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
      "active_resolution": "Evaluated against active sensor (PS-04 or PS-04A depending on firmware revision).",
      "is_reviewed": true,
      "reviewed_by": null,
      "created_at": "2026-11-01T19:47:00.506035",
      "updated_at": "2026-11-01T19:47:00.506038"
    }
  ],
  "graph": {
    "nodes": [
      {
        "id": "HPU",
        "type": "componentNode",
        "data": {
          "label": "Hydraulic Power Unit (HPU)",
          "type": "Component",
          "status": "Active",
          "location": "Skid A, Bay 2"
        },
        "position": {
          "x": 350,
          "y": 200
        }
      },
      {
        "id": "PLC-03",
        "type": "controllerNode",
        "data": {
          "label": "PLC-03 (HCS Controller)",
          "type": "Controller",
          "status": "Active",
          "location": "Control Cabinet 1"
        },
        "position": {
          "x": 350,
          "y": 50
        }
      },
      {
        "id": "PS-04A",
        "type": "sensorNode",
        "data": {
          "label": "PS-04A (Pressure Sensor)",
          "type": "Sensor",
          "status": "Active (>= 3.2)",
          "location": "HPU discharge line"
        },
        "position": {
          "x": 150,
          "y": 200
        }
      },
      {
        "id": "PS-04",
        "type": "supersededNode",
        "data": {
          "label": "PS-04 (Legacy Sensor)",
          "type": "Sensor",
          "status": "Superseded (< 3.2)",
          "location": "HPU discharge line"
        },
        "position": {
          "x": 0,
          "y": 200
        }
      },
      {
        "id": "PS-40",
        "type": "sensorNode",
        "data": {
          "label": "PS-40 (Coolant Sensor)",
          "type": "Sensor",
          "status": "Active",
          "location": "Coolant Loop, Skid B"
        },
        "position": {
          "x": 650,
          "y": 350
        }
      },
      {
        "id": "IV-21",
        "type": "valveNode",
        "data": {
          "label": "IV-21 (Isolation Valve)",
          "type": "Valve",
          "status": "Active",
          "location": "Hydraulic Module"
        },
        "position": {
          "x": 550,
          "y": 200
        }
      },
      {
        "id": "A17",
        "type": "alarmNode",
        "data": {
          "label": "Alarm A17 (<150 bar Low Press)",
          "type": "Alarm",
          "status": "Active",
          "location": "Software Alarm"
        },
        "position": {
          "x": 150,
          "y": 350
        }
      },
      {
        "id": "A18",
        "type": "alarmNode",
        "data": {
          "label": "Alarm A18 (>220 bar High Press)",
          "type": "Alarm",
          "status": "Active",
          "location": "Software Alarm"
        },
        "position": {
          "x": 350,
          "y": 350
        }
      },
      {
        "id": "ECN-1042",
        "type": "ecnNode",
        "data": {
          "label": "ECN-1042 (Sensor & 200 bar)",
          "type": "ECN",
          "status": "Released",
          "location": "Engineering Bulletin"
        },
        "position": {
          "x": 50,
          "y": 50
        }
      },
      {
        "id": "ECN-1058",
        "type": "ecnNode",
        "data": {
          "label": "ECN-1058 (A17 Condition Text)",
          "type": "ECN",
          "status": "Released",
          "location": "Engineering Bulletin"
        },
        "position": {
          "x": 50,
          "y": 450
        }
      },
      {
        "id": "Q1",
        "type": "electricalNode",
        "data": {
          "label": "Q1 (Main Disconnect 480V)",
          "type": "Electrical",
          "status": "Active",
          "location": "Control Cabinet 1"
        },
        "position": {
          "x": 600,
          "y": 50
        }
      },
      {
        "id": "T1",
        "type": "electricalNode",
        "data": {
          "label": "T1 (Transformer 480:120V)",
          "type": "Electrical",
          "status": "Active",
          "location": "Control Cabinet 1"
        },
        "position": {
          "x": 750,
          "y": 50
        }
      },
      {
        "id": "Aux_Res",
        "type": "reservoirNode",
        "data": {
          "label": "Auxiliary Reservoir (Line 4/5)",
          "type": "Reservoir",
          "status": "Active",
          "location": "Line 4/5"
        },
        "position": {
          "x": 500,
          "y": 350
        }
      }
    ],
    "edges": [
      {
        "id": "e_plc_hpu",
        "source": "PLC-03",
        "target": "HPU",
        "label": "supervises/regulates",
        "animated": true
      },
      {
        "id": "e_plc_ps04a",
        "source": "PLC-03",
        "target": "PS-04A",
        "label": "monitors 4-20mA loop",
        "animated": true
      },
      {
        "id": "e_plc_iv21",
        "source": "PLC-03",
        "target": "IV-21",
        "label": "valve driver signal",
        "animated": true
      },
      {
        "id": "e_hpu_iv21",
        "source": "HPU",
        "target": "IV-21",
        "label": "supplies fluid to"
      },
      {
        "id": "e_hpu_ps04a",
        "source": "HPU",
        "target": "PS-04A",
        "label": "discharge pressure"
      },
      {
        "id": "e_ecn1042_ps04a",
        "source": "ECN-1042",
        "target": "PS-04A",
        "label": "introduces in rev 3.2"
      },
      {
        "id": "e_ps04_ps04a",
        "source": "PS-04",
        "target": "PS-04A",
        "label": "superseded by",
        "style": {
          "strokeDasharray": "5,5"
        }
      },
      {
        "id": "e_ecn1042_hpu",
        "source": "ECN-1042",
        "target": "HPU",
        "label": "raises setpoint to 200 bar"
      },
      {
        "id": "e_ps04a_a17",
        "source": "PS-04A",
        "target": "A17",
        "label": "trips if < 150 bar"
      },
      {
        "id": "e_ecn1058_a17",
        "source": "ECN-1058",
        "target": "A17",
        "label": "corrects sensor text"
      },
      {
        "id": "e_q1_t1",
        "source": "Q1",
        "target": "T1",
        "label": "480V supply"
      },
      {
        "id": "e_t1_plc",
        "source": "T1",
        "target": "PLC-03",
        "label": "120V control power"
      },
      {
        "id": "e_aux_hpu",
        "source": "Aux_Res",
        "target": "HPU",
        "label": "peak top-up fluid"
      }
    ]
  },
  "gaps": [
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
  ],
  "evaluation_runs": [
    {
      "id": 5,
      "run_timestamp": "2026-11-01 20:14:43",
      "total_questions": 23,
      "completed_questions": 23,
      "overall_score": 1.0,
      "precision_at_k": 1.0,
      "recall_at_k": 1.0,
      "answer_correctness": 1.0,
      "citation_correctness": 1.0,
      "unsupported_claim_rate": 0.0,
      "abstention_accuracy": 1.0,
      "processing_success_rate": 1.0,
      "status": "COMPLETED"
    },
    {
      "id": 4,
      "run_timestamp": "2026-11-01 20:14:43",
      "total_questions": 23,
      "completed_questions": 23,
      "overall_score": 1.0,
      "precision_at_k": 1.0,
      "recall_at_k": 1.0,
      "answer_correctness": 1.0,
      "citation_correctness": 1.0,
      "unsupported_claim_rate": 0.0,
      "abstention_accuracy": 1.0,
      "processing_success_rate": 1.0,
      "status": "COMPLETED"
    },
    {
      "id": 3,
      "run_timestamp": "2026-11-01 20:14:42",
      "total_questions": 23,
      "completed_questions": 23,
      "overall_score": 1.0,
      "precision_at_k": 1.0,
      "recall_at_k": 1.0,
      "answer_correctness": 1.0,
      "citation_correctness": 1.0,
      "unsupported_claim_rate": 0.0,
      "abstention_accuracy": 1.0,
      "processing_success_rate": 1.0,
      "status": "COMPLETED"
    },
    {
      "id": 2,
      "run_timestamp": "2026-11-01 19:49:37",
      "total_questions": 23,
      "completed_questions": 23,
      "overall_score": 1.0,
      "precision_at_k": 1.0,
      "recall_at_k": 1.0,
      "answer_correctness": 1.0,
      "citation_correctness": 1.0,
      "unsupported_claim_rate": 0.0,
      "abstention_accuracy": 1.0,
      "processing_success_rate": 1.0,
      "status": "COMPLETED"
    },
    {
      "id": 1,
      "run_timestamp": "2026-11-01 19:48:24",
      "total_questions": 23,
      "completed_questions": 23,
      "overall_score": 0.9174,
      "precision_at_k": 1.0,
      "recall_at_k": 0.913,
      "answer_correctness": 0.913,
      "citation_correctness": 1.0,
      "unsupported_claim_rate": 0.0435,
      "abstention_accuracy": 0.8,
      "processing_success_rate": 1.0,
      "status": "COMPLETED"
    }
  ],
  "evaluation_detail": {
    "run": {
      "id": 5,
      "run_timestamp": "2026-11-01 20:14:43",
      "total_questions": 23,
      "completed_questions": 23,
      "overall_score": 1.0,
      "precision_at_k": 1.0,
      "recall_at_k": 1.0,
      "answer_correctness": 1.0,
      "citation_correctness": 1.0,
      "unsupported_claim_rate": 0.0,
      "abstention_accuracy": 1.0,
      "processing_success_rate": 1.0,
      "status": "COMPLETED"
    },
    "results": [
      {
        "id": 93,
        "question_id": 1,
        "question_text": "What must be true before starting the Hydraulic Power Unit?",
        "expected_answer": "Fluid level in normal band, IV-21 is open, emergency stop reset, maintenance panel closed.",
        "actual_answer": "Before starting the Hydraulic Power Unit (HPU), four essential verification conditions must be satisfied: (1) Hydraulic fluid level must be within the normal band on the sight glass, (2) Isolation valve IV-21 must be OPEN, (3) The emergency stop circuit must be RESET, and (4) The maintenance access panel must be CLOSED.",
        "evidence": [
          {
            "document": "operator_manual.pdf",
            "page": 1,
            "section": "4.3 Starting the Hydraulic Power Unit",
            "revision": "AEG-OM-700 Rev 4",
            "excerpt": "Before starting, verify: Hydraulic fluid level is within the normal band on the sight glass. Isolation valve IV-21 is OPEN. The emergency stop circuit is RESET. WARNING: Do not start the unit with the maintenance access panel removed."
          },
          {
            "document": "configuration_export.json",
            "page": 1,
            "section": "startup_interlocks",
            "revision": "Config Dump 3.2.1",
            "excerpt": "\"valve_iv21_required_state\": \"OPEN\", \"estop_required_state\": \"RESET\", \"maintenance_panel_required_state\": \"CLOSED\", \"fluid_level_required_band\": \"NORMAL\""
          }
        ],
        "is_correct": true,
        "citation_valid": true,
        "is_abstention_case": false,
        "abstention_correct": true,
        "unsupported_claims_found": false,
        "confidence_score": 1.0,
        "evaluation_notes": "Section 4.3 of the Operator Manual (AEG-OM-700 Rev 4) specifies the pre-start checklist, emphasizing with a safety warning that the unit must never be started with the maintenance panel removed. These conditions also directly match the startup interlocks monitored by PLC-03 and displayed on the HMI Home screen."
      },
      {
        "id": 94,
        "question_id": 2,
        "question_text": "What is the current normal operating pressure for the HPU, and under what conditions does that apply?",
        "expected_answer": "200 bar, applies to software revision 3.2 and later equipped with PS-04A.",
        "actual_answer": "The current normal operating pressure for the HPU is 200 bar. This setpoint applies specifically to units running software revision 3.2 or later that are fitted with pressure sensor PS-04A (installed per ECN-1042).",
        "evidence": [
          {
            "document": "ECN-1042.pdf",
            "page": 1,
            "section": "1. Description of Change",
            "revision": "ECN-1042",
            "excerpt": "Alongside the sensor change, the normal HPU discharge pressure setpoint is revised from 180 bar to 200 bar. This is a deliberate process change, not a sensor calibration artifact."
          },
          {
            "document": "operator_manual.pdf",
            "page": 2,
            "section": "5. Normal Operating Ranges",
            "revision": "AEG-OM-700 Rev 4",
            "excerpt": "Normal HPU discharge pressure is 200 bar, as measured by pressure sensor PS-04A. Do not use the 180 bar figure on a unit running revision 3.2 or later."
          }
        ],
        "is_correct": true,
        "citation_valid": true,
        "is_abstention_case": false,
        "abstention_correct": true,
        "unsupported_claims_found": false,
        "confidence_score": 1.0,
        "evaluation_notes": "ECN-1042 and Operator Manual Rev 4 establish that the normal setpoint was revised from 180 bar to 200 bar alongside the sensor upgrade to improve press cycle times on post-2024 Series-7 units. Units on legacy software revisions (prior to 3.2) equipped with PS-04 operate at 180 bar."
      },
      {
        "id": 95,
        "question_id": 3,
        "question_text": "What does alarm A17 indicate, and what are its possible causes?",
        "expected_answer": "Indicates Hydraulic Pressure Low (<150 bar). Causes: IV-21 closed/partially closed, low fluid, sensor signal invalid.",
        "actual_answer": "Alarm A17 indicates 'Hydraulic Pressure Low' (hydraulic discharge pressure falling below 150 bar). Its three documented possible causes are: (1) Isolation Valve IV-21 closed or partially closed, (2) Low hydraulic fluid level in the reservoir, and (3) Pressure sensor signal invalid or malfunctioning.",
        "evidence": [
          {
            "document": "alarm_reference.pdf",
            "page": 1,
            "section": "Alarm Table",
            "revision": "AEG-AL-700 Rev 5",
            "excerpt": "A17 | Hydraulic pressure below 150 bar | RED | Possible Causes: 1. IV-21 closed or partially closed 2. Low hydraulic fluid 3. Pressure sensor signal invalid"
          }
        ],
        "is_correct": true,
        "citation_valid": true,
        "is_abstention_case": false,
        "abstention_correct": true,
        "unsupported_claims_found": false,
        "confidence_score": 1.0,
        "evaluation_notes": "Alarm Reference AEG-AL-700 Rev 5 lists A17 as an active red panel indication. Per ECN-1058, this condition is evaluated against whichever pressure sensor is active for the installed firmware revision (PS-04 or PS-04A)."
      },
      {
        "id": 96,
        "question_id": 4,
        "question_text": "Is PS-04 the same component as PS-04A?",
        "expected_answer": "No, PS-04A is the upgraded successor sensor with updated conditioning circuit per ECN-1042.",
        "actual_answer": "No, PS-04 is not the same component as PS-04A. PS-04A is an updated successor transducer introduced in ECN-1042, featuring an upgraded signal conditioning circuit to eliminate the 18-month signal drift issue that affected PS-04.",
        "evidence": [
          {
            "document": "ECN-1042.pdf",
            "page": 1,
            "section": "1. Description of Change",
            "revision": "ECN-1042",
            "excerpt": "PS-04A uses an updated signal conditioning circuit and is not a form-fit-function replacement for PS-04; controller firmware must be at revision 3.2 or later to read PS-04A correctly."
          },
          {
            "document": "component_register.xlsx",
            "page": 1,
            "section": "Components Sheet",
            "revision": "AEG-CR-700",
            "excerpt": "PS-04 Status: Superseded by PS-04A effective software rev 3.2. PS-04A Status: Active, installed per ECN-1042."
          }
        ],
        "is_correct": true,
        "citation_valid": true,
        "is_abstention_case": false,
        "abstention_correct": true,
        "unsupported_claims_found": false,
        "confidence_score": 1.0,
        "evaluation_notes": "ECN-1042 explicitly states: 'PS-04A uses an updated signal conditioning circuit and is not a form-fit-function replacement for PS-04; controller firmware must be at revision 3.2 or later to read PS-04A correctly.' PS-04 remains installed on legacy units running firmware < 3.2 and operates at 180 bar, whereas PS-04A operates at 200 bar on revision 3.2+."
      },
      {
        "id": 97,
        "question_id": 5,
        "question_text": "Which document introduced the change from PS-04 to PS-04A?",
        "expected_answer": "Engineering Change Notice ECN-1042.",
        "actual_answer": "Engineering Change Notice ECN-1042 introduced the change from sensor PS-04 to PS-04A (effective software revision 3.2).",
        "evidence": [
          {
            "document": "ECN-1042.pdf",
            "page": 1,
            "section": "Header & Section 1",
            "revision": "ECN-1042",
            "excerpt": "ECN Number: ECN-1042. Title: Pressure Sensor Replacement and Operating Pressure Revision. Effective: Software Revision 3.2."
          },
          {
            "document": "revision_history.xlsx",
            "page": 1,
            "section": "Revision History",
            "revision": "AEG-RH-700",
            "excerpt": "Software Rev 3.2 (2025-09-30): Pressure sensor PS-04 replaced by PS-04A. Normal HPU discharge pressure setpoint changed from 180 bar to 200 bar. See ECN-1042."
          }
        ],
        "is_correct": true,
        "citation_valid": true,
        "is_abstention_case": false,
        "abstention_correct": true,
        "unsupported_claims_found": false,
        "confidence_score": 1.0,
        "evaluation_notes": "ECN-1042 specifies the replacement of PS-04 with PS-04A at the HPU discharge line to correct long-term sensor drift and establishes the revised 200 bar setpoint. This change is also cross-referenced in Revision History, Operator Manual Rev 4, and Maintenance Manual Rev 3."
      },
      {
        "id": 98,
        "question_id": 6,
        "question_text": "Which components connect directly to the HCS controller, according to the hydraulic schematic?",
        "expected_answer": "Hydraulic Power Unit (HPU), Pressure Sensor PS-04A, and Isolation Valve IV-21.",
        "actual_answer": "According to the hydraulic schematic (AEG-DWG-H01), the components that connect directly to the PLC-03 controller (indicated by purple control/signal lines) are: (1) Hydraulic Power Unit (HPU), (2) Pressure Sensor PS-04A, and (3) Isolation Valve IV-21.",
        "evidence": [
          {
            "document": "system_diagram_hydraulic.pdf",
            "page": 1,
            "section": "Schematic Legend",
            "revision": "AEG-DWG-H01",
            "excerpt": "\u2014 purple lines: control/signal connections to PLC-03; grey lines: hydraulic fluid path; tan line: reservoir interconnect. PLC-03 connects to HPU, PS-04A, and IV-21."
          }
        ],
        "is_correct": true,
        "citation_valid": true,
        "is_abstention_case": false,
        "abstention_correct": true,
        "unsupported_claims_found": false,
        "confidence_score": 1.0,
        "evaluation_notes": "The schematic legend defines purple lines as control/signal connections to PLC-03, while grey lines denote hydraulic fluid paths and tan lines denote reservoir interconnects. The Main Reservoir and Auxiliary Reservoir connect via fluid paths, not direct control/signal lines to PLC-03."
      },
      {
        "id": 99,
        "question_id": 7,
        "question_text": "What action is required if alarm A17 persists for more than 10 seconds?",
        "expected_answer": "Execute Shutdown Procedure 4.7 immediately.",
        "actual_answer": "If alarm A17 persists for more than 10 seconds, the required action is to immediately execute Shutdown Procedure 4.7 before investigating further. Do not attempt to clear a persistent A17 by merely silencing the alarm.",
        "evidence": [
          {
            "document": "maintenance_manual.pdf",
            "page": 1,
            "section": "4. Alarm A17 Response",
            "revision": "AEG-MM-700 Rev 3",
            "excerpt": "If alarm A17 persists for more than 10 seconds, execute Shutdown Procedure 4.7 before investigating further. Shutdown Procedure 4.7: close IV-21, confirm pressure decay, set POWER selector to OFF, tag out per site lockout/tagout procedure, then proceed to Section 6."
          },
          {
            "document": "alarm_reference.pdf",
            "page": 1,
            "section": "Footnote *",
            "revision": "AEG-AL-700 Rev 5",
            "excerpt": "Shutdown Procedure 4.7 applies only when A17 persists beyond 10 seconds."
          }
        ],
        "is_correct": true,
        "citation_valid": true,
        "is_abstention_case": false,
        "abstention_correct": true,
        "unsupported_claims_found": false,
        "confidence_score": 1.0,
        "evaluation_notes": "Section 4 of Maintenance Manual AEG-MM-700 defines Shutdown Procedure 4.7 as: (1) Close IV-21, (2) Confirm pressure decay, (3) Set POWER selector to OFF, (4) Tag out per site lockout/tagout procedure, and (5) Proceed to Section 6 (Troubleshooting). Transient dips clearing within 10s do not require shutdown."
      },
      {
        "id": 100,
        "question_id": 8,
        "question_text": "Under what circumstances must the controller not be reset?",
        "expected_answer": "Must not be reset while hydraulic pressure is above 50 bar.",
        "actual_answer": "The PLC-03 controller must NOT be reset while hydraulic pressure is above 50 bar. A controller reset is only permitted after pressure has been bled below 50 bar.",
        "evidence": [
          {
            "document": "operator_manual.pdf",
            "page": 2,
            "section": "7. Controller Reset",
            "revision": "AEG-OM-700 Rev 4",
            "excerpt": "Do not reset the PLC-03 controller while hydraulic pressure is above 50 bar. Resetting the controller under pressure can cause an uncommanded valve transition. Bleed pressure below 50 bar first."
          },
          {
            "document": "maintenance_manual.pdf",
            "page": 1,
            "section": "3. Controller Reset Conditions",
            "revision": "AEG-MM-700 Rev 3",
            "excerpt": "Do NOT reset the PLC-03 controller while hydraulic pressure is above 50 bar. The controller reset routine re-initializes valve driver outputs; if the circuit is still pressurized, this can produce a momentary uncommanded actuation of Isolation Valve IV-21."
          },
          {
            "document": "configuration_export.json",
            "page": 1,
            "section": "controller_reset",
            "revision": "Config Dump 3.2.1",
            "excerpt": "\"max_pressure_bar_allowed_for_reset\": 50, \"note\": \"reset is blocked in firmware above max_pressure_bar_allowed_for_reset\""
          }
        ],
        "is_correct": true,
        "citation_valid": true,
        "is_abstention_case": false,
        "abstention_correct": true,
        "unsupported_claims_found": false,
        "confidence_score": 1.0,
        "evaluation_notes": "Both Operator Manual Section 7 and Maintenance Manual Section 3 state that resetting the controller while the system is pressurized can cause a momentary, uncommanded valve transition/actuation of Isolation Valve IV-21 because the reset routine re-initializes valve driver outputs. Firmware also enforces this block (configured at max 50 bar)."
      },
      {
        "id": 101,
        "question_id": 9,
        "question_text": "What was the operating pressure threshold before software revision 3.2, and what changed it?",
        "expected_answer": "180 bar, changed to 200 bar by ECN-1042.",
        "actual_answer": "Before software revision 3.2, the normal operating pressure threshold was 180 bar. It was changed to 200 bar by Engineering Change Notice ECN-1042.",
        "evidence": [
          {
            "document": "ECN-1042.pdf",
            "page": 1,
            "section": "1. Description of Change",
            "revision": "ECN-1042",
            "excerpt": "Alongside the sensor change, the normal HPU discharge pressure setpoint is revised from 180 bar to 200 bar. This is a deliberate process change, not a sensor calibration artifact."
          },
          {
            "document": "legacy_manual_v1.html",
            "page": 1,
            "section": "5. Normal Operating Ranges",
            "revision": "AEG-OM-700 Rev 1",
            "excerpt": "Normal HPU discharge pressure is 180 bar, as measured by pressure sensor PS-04. Applies to software revisions 3.0 and 3.1 only."
          }
        ],
        "is_correct": true,
        "citation_valid": true,
        "is_abstention_case": false,
        "abstention_correct": true,
        "unsupported_claims_found": false,
        "confidence_score": 1.0,
        "evaluation_notes": "ECN-1042 introduced a deliberate process change raising the setpoint from 180 bar to 200 bar to improve press cycle times on Series-7 units manufactured after 2024, concurrent with replacing sensor PS-04 with PS-04A."
      },
      {
        "id": 102,
        "question_id": 10,
        "question_text": "Which alarm is associated with a pressure sensor reading below 150 bar?",
        "expected_answer": "Alarm A17 (Hydraulic Pressure Low).",
        "actual_answer": "Alarm A17 (Hydraulic Pressure Low) is associated with a pressure sensor reading falling below 150 bar.",
        "evidence": [
          {
            "document": "alarm_reference.pdf",
            "page": 1,
            "section": "Alarm Table",
            "revision": "AEG-AL-700 Rev 5",
            "excerpt": "Alarm: A17 | Condition: Hydraulic pressure below 150 bar | Panel Indication: RED"
          },
          {
            "document": "configuration_export.json",
            "page": 1,
            "section": "sensors",
            "revision": "Config Dump 3.2.1",
            "excerpt": "\"sensor_ps04a_alarm_low_bar\": 150"
          }
        ],
        "is_correct": true,
        "citation_valid": true,
        "is_abstention_case": false,
        "abstention_correct": true,
        "unsupported_claims_found": false,
        "confidence_score": 1.0,
        "evaluation_notes": "Alarm Reference AEG-AL-700 Rev 5 and configuration_export.json establish 150 bar as the low-pressure trigger threshold for Alarm A17."
      },
      {
        "id": 103,
        "question_id": 11,
        "question_text": "According to the component register, what is the location of the isolation valve IV-21?",
        "expected_answer": "Hydraulic Module.",
        "actual_answer": "According to the Component Register (AEG-CR-700), the location of Isolation Valve IV-21 is the 'Hydraulic Module'.",
        "evidence": [
          {
            "document": "component_register.xlsx",
            "page": 1,
            "section": "Components Sheet",
            "revision": "AEG-CR-700",
            "excerpt": "('IV-21', 'Isolation Valve 21', 'Isolation Valve; IV21', 'Hydraulic Module', 'Active', 'Must be OPEN prior to HPU startup.')"
          }
        ],
        "is_correct": true,
        "citation_valid": true,
        "is_abstention_case": false,
        "abstention_correct": true,
        "unsupported_claims_found": false,
        "confidence_score": 1.0,
        "evaluation_notes": "In component_register.xlsx, IV-21 is listed with Common Name 'Isolation Valve 21', Location 'Hydraulic Module', and Status 'Active'."
      },
      {
        "id": 104,
        "question_id": 12,
        "question_text": "Does the training slide deck introduce any component or alarm not found in the manuals?",
        "expected_answer": "Yes, Auxiliary Reservoir. No new alarms.",
        "actual_answer": "Yes, the training slide deck introduces one component not found in the standard manuals: the 'Auxiliary Reservoir'. It does not introduce any new alarms.",
        "evidence": [
          {
            "document": "training_slide_excerpt.pptx",
            "page": 2,
            "section": "Slide 2: What is the HPU?",
            "revision": "Training Slide Excerpt",
            "excerpt": "Note: 'Auxiliary Reservoir' is a Line 4/5-specific configuration detail and is not covered in the standard Operator Manual."
          }
        ],
        "is_correct": true,
        "citation_valid": true,
        "is_abstention_case": false,
        "abstention_correct": true,
        "unsupported_claims_found": false,
        "confidence_score": 1.0,
        "evaluation_notes": "Slide 2 of training_slide_excerpt.pptx explicitly notes: \"Note: 'Auxiliary Reservoir' is a Line 4/5-specific configuration detail and is not covered in the standard Operator Manual.\" No new alarms are presented in the slide excerpt."
      },
      {
        "id": 105,
        "question_id": 13,
        "question_text": "What sensor ID appears on the diagnostics screenshot, and does it match a known component?",
        "expected_answer": "P.S.04-A, matches PS-04A.",
        "actual_answer": "The sensor ID appearing on the diagnostics screenshot is 'P.S.04-A'. Yes, it matches the known component PS-04A (Pressure Sensor 04A).",
        "evidence": [
          {
            "document": "screen_03_diagnostics.png",
            "page": 1,
            "section": "Diagnostics Screen OCR",
            "revision": "HMI SW Rev 3.2.1",
            "excerpt": "Tag: P.S.04-A | Signal Type: 4-20 mA | Scaled Value: 200.3 bar | Status: WITHIN TOLERANCE | Firmware Rev: 3.2.1 | Note: this screen displays the sensor tag as printed on the physical unit label."
          },
          {
            "document": "component_register.xlsx",
            "page": 1,
            "section": "Components Sheet",
            "revision": "AEG-CR-700",
            "excerpt": "Component ID: PS-04A | Known Aliases: P04A; PS04A"
          }
        ],
        "is_correct": true,
        "citation_valid": true,
        "is_abstention_case": false,
        "abstention_correct": true,
        "unsupported_claims_found": false,
        "confidence_score": 1.0,
        "evaluation_notes": "A caption note at the bottom of screen_03_diagnostics.png explains: 'Note: this screen displays the sensor tag as printed on the physical unit label.' This represents a formatting variant/alias for PS-04A."
      },
      {
        "id": 106,
        "question_id": 14,
        "question_text": "Per the revision history, when did software revision 3.2 take effect, and what changed alongside it?",
        "expected_answer": "September 30, 2025. PS-04 replaced by PS-04A, setpoint changed 180 -> 200 bar.",
        "actual_answer": "Software revision 3.2 took effect on September 30, 2025 (2025-09-30). Alongside it, pressure sensor PS-04 was replaced by PS-04A, and the normal HPU discharge pressure setpoint was changed from 180 bar to 200 bar per ECN-1042.",
        "evidence": [
          {
            "document": "revision_history.xlsx",
            "page": 1,
            "section": "Revision History",
            "revision": "AEG-RH-700",
            "excerpt": "('3.2', '2025-09-30', 'Pressure sensor PS-04 replaced by PS-04A. Normal HPU discharge pressure setpoint changed from 180 bar to 200 bar. See ECN-1042.', 'ECN-1042, AEG-OM-700 Rev 3, AEG-MM-700 Rev 2, AEG-CR-700 Rev 2')"
          }
        ],
        "is_correct": true,
        "citation_valid": true,
        "is_abstention_case": false,
        "abstention_correct": true,
        "unsupported_claims_found": false,
        "confidence_score": 1.0,
        "evaluation_notes": "Revision History (AEG-RH-700) and ECN-1042 document the September 30, 2025 release date, noting updates to Operator Manual Rev 3, Maintenance Manual Rev 2, and Component Register Rev 2."
      },
      {
        "id": 107,
        "question_id": 15,
        "question_text": "What does sensor_ps04a_threshold_bar in the configuration export correspond to in the operator manual's terminology?",
        "expected_answer": "Normal HPU discharge pressure / operating pressure setpoint (200 bar).",
        "actual_answer": "In the operator manual's terminology, 'sensor_ps04a_threshold_bar' corresponds to the 'Normal HPU discharge pressure' or 'operating pressure setpoint' (configured at 200 bar).",
        "evidence": [
          {
            "document": "configuration_export.json",
            "page": 1,
            "section": "sensors / revision_applicability",
            "revision": "Config Dump 3.2.1",
            "excerpt": "\"sensor_ps04a_threshold_bar\": 200, \"revision_applicability\": {\"sensor_ps04a_threshold_bar\": {\"applies_from_firmware\": \"3.2\"}}"
          },
          {
            "document": "operator_manual.pdf",
            "page": 2,
            "section": "5. Normal Operating Ranges",
            "revision": "AEG-OM-700 Rev 4",
            "excerpt": "Normal HPU discharge pressure is 200 bar, as measured by pressure sensor PS-04A."
          }
        ],
        "is_correct": true,
        "citation_valid": true,
        "is_abstention_case": false,
        "abstention_correct": true,
        "unsupported_claims_found": false,
        "confidence_score": 1.0,
        "evaluation_notes": "Section 5 of Operator Manual AEG-OM-700 Rev 4 refers to this as the 'Normal HPU discharge pressure... measured by pressure sensor PS-04A'. The Terminology Glossary defines 'Setpoint' as the configured target value against which live measurements are compared."
      },
      {
        "id": 108,
        "question_id": 16,
        "question_text": "Does the 200 bar threshold apply to all Aegis HCS units, or only some?",
        "expected_answer": "Only some: units running software rev >= 3.2 with PS-04A.",
        "actual_answer": "The 200 bar threshold applies to only some Aegis HCS units. Specifically, it applies only to units running software revision 3.2 or later that have pressure sensor PS-04A installed.",
        "evidence": [
          {
            "document": "ECN-1042.pdf",
            "page": 1,
            "section": "1. Description of Change",
            "revision": "ECN-1042",
            "excerpt": "PS-04 remains installed and supported on units running software revisions prior to 3.2. Do not install PS-04A on a controller running firmware older than 3.2."
          },
          {
            "document": "legacy_manual_v1.html",
            "page": 1,
            "section": "Scope",
            "revision": "Rev 1 (Superseded)",
            "excerpt": "Applies to software revisions 3.0 and 3.1 only. Normal HPU discharge pressure is 180 bar."
          }
        ],
        "is_correct": true,
        "citation_valid": true,
        "is_abstention_case": false,
        "abstention_correct": true,
        "unsupported_claims_found": false,
        "confidence_score": 1.0,
        "evaluation_notes": "ECN-1042 states that PS-04 remains installed and supported on units running software revisions prior to 3.2, which continue to operate at the legacy 180 bar setpoint. ECN-1042 also notes that the 200 bar setpoint was introduced to improve press cycle time on Series-7 units manufactured after 2024."
      },
      {
        "id": 109,
        "question_id": 17,
        "question_text": "Is PS-04 the same as PS-40?",
        "expected_answer": "No, PS-40 is on the Coolant Loop, Skid B, unrelated to HPU discharge sensor PS-04.",
        "actual_answer": "No, PS-04 is completely different from PS-40. PS-04 is the legacy discharge pressure sensor for the HPU, whereas PS-40 is a separate sensor installed on the Coolant Loop, Skid B.",
        "evidence": [
          {
            "document": "component_register.xlsx",
            "page": 1,
            "section": "Components Sheet",
            "revision": "AEG-CR-700",
            "excerpt": "('PS-40', 'Pressure Sensor 40', 'P40; PS40', 'Coolant Loop, Skid B', 'Active', 'NOT related to the HPU discharge circuit. Do not confuse with PS-04 / PS-04A.')"
          },
          {
            "document": "configuration_export.json",
            "page": 1,
            "section": "sensors",
            "revision": "Config Dump 3.2.1",
            "excerpt": "\"sensor_ps40_zone\": \"coolant_loop\", \"sensor_ps40_note\": \"unrelated to HPU discharge circuit; do not map to sensor_ps04a_* keys\""
          }
        ],
        "is_correct": true,
        "citation_valid": true,
        "is_abstention_case": false,
        "abstention_correct": true,
        "unsupported_claims_found": false,
        "confidence_score": 1.0,
        "evaluation_notes": "The Component Register (AEG-CR-700) explicitly warns: 'NOT related to the HPU discharge circuit. Do not confuse with PS-04 / PS-04A.' Similarly, configuration_export.json notes: 'unrelated to HPU discharge circuit; do not map to sensor_ps04a_* keys'."
      },
      {
        "id": 110,
        "question_id": 18,
        "question_text": "What was the pressure limit before revision 3.2?",
        "expected_answer": "180 bar.",
        "actual_answer": "Before software revision 3.2, the normal operating pressure setpoint was 180 bar (measured by sensor PS-04).",
        "evidence": [
          {
            "document": "legacy_manual_v1.html",
            "page": 1,
            "section": "5. Normal Operating Ranges",
            "revision": "Rev 1",
            "excerpt": "Normal HPU discharge pressure is 180 bar, as measured by pressure sensor PS-04."
          },
          {
            "document": "configuration_export.json",
            "page": 1,
            "section": "revision_applicability",
            "revision": "Config Dump 3.2.1",
            "excerpt": "\"sensor_ps04_legacy_threshold_bar\": {\"value\": 180, \"applies_before_firmware\": \"3.2\"}"
          }
        ],
        "is_correct": true,
        "citation_valid": true,
        "is_abstention_case": false,
        "abstention_correct": true,
        "unsupported_claims_found": false,
        "confidence_score": 1.0,
        "evaluation_notes": "Legacy manual v1, ECN-1042, and configuration_export.json confirm that prior to software revision 3.2, the normal HPU discharge pressure setpoint was 180 bar."
      },
      {
        "id": 111,
        "question_id": 19,
        "question_text": "What is the maximum continuous operating temperature of PS-04A?",
        "expected_answer": "Information not found / not specified in the documentation package.",
        "actual_answer": "INFORMATION NOT FOUND: The maximum continuous operating temperature of PS-04A is not specified in the provided Aegis Series-7 documentation package.",
        "evidence": [],
        "is_correct": true,
        "citation_valid": true,
        "is_abstention_case": true,
        "abstention_correct": true,
        "unsupported_claims_found": false,
        "confidence_score": 1.0,
        "evaluation_notes": "A thorough search across all manuals (AEG-OM-700, AEG-MM-700), engineering change notices (ECN-1042, ECN-1058), component registers, wiring diagrams, and calibration records reveals no temperature rating or continuous operating temperature range for sensor PS-04A."
      },
      {
        "id": 112,
        "question_id": 20,
        "question_text": "What is the calibration interval for the electrical system diagram's voltage sensor?",
        "expected_answer": "Information not found / not specified in documentation (no voltage sensor calibration interval).",
        "actual_answer": "INFORMATION NOT FOUND: The calibration interval for any electrical system voltage sensor is not specified in the provided documentation. Furthermore, the electrical schematic does not define a calibrated voltage sensor.",
        "evidence": [
          {
            "document": "scanned_appendix_calibration.pdf",
            "page": 1,
            "section": "Technician Notes",
            "revision": "Field Binder Copy",
            "excerpt": "No calibration interval is specified for PS-04A on this form; recalibration frequency should be confirmed against the applicable maintenance schedule, which is not included in this binder."
          }
        ],
        "is_correct": true,
        "citation_valid": true,
        "is_abstention_case": true,
        "abstention_correct": true,
        "unsupported_claims_found": false,
        "confidence_score": 1.0,
        "evaluation_notes": "Electrical Schematic AEG-DWG-E02 documents power distribution (Q1 480V, T1 480:120V, 24VDC power supply) but specifies no voltage sensor calibration interval. In addition, Appendix C (Sensor Calibration Record) explicitly notes: 'No calibration interval is specified for PS-04A on this form; recalibration frequency should be confirmed against the applicable maintenance schedule, which is not included in this binder.'"
      },
      {
        "id": 113,
        "question_id": 21,
        "question_text": "Who approved engineering bulletin ECN-1058?",
        "expected_answer": "Information not found / not specified on document ECN-1058.",
        "actual_answer": "INFORMATION NOT FOUND: The approving authority or signatory for engineering bulletin ECN-1058 is not specified on the document.",
        "evidence": [
          {
            "document": "ECN-1058.pdf",
            "page": 1,
            "section": "Header Metadata",
            "revision": "ECN-1058",
            "excerpt": "ECN Number: ECN-1058 | Title: Alarm A17 Threshold Reference Correction | Effective: Immediately upon publication | References: ECN-1042 | Status: Released"
          }
        ],
        "is_correct": true,
        "citation_valid": true,
        "is_abstention_case": true,
        "abstention_correct": true,
        "unsupported_claims_found": false,
        "confidence_score": 1.0,
        "evaluation_notes": "ECN-1058 contains metadata fields for ECN Number ('ECN-1058'), Title, Effective date ('Immediately upon publication'), References ('ECN-1042'), and Status ('Released'), but omits any approval block, author name, or engineer signature."
      },
      {
        "id": 114,
        "question_id": 22,
        "question_text": "What is the mean time between failures for the isolation valve IV-21?",
        "expected_answer": "Information not found / MTBF is not documented in the package.",
        "actual_answer": "INFORMATION NOT FOUND: The mean time between failures (MTBF) for Isolation Valve IV-21 is not specified anywhere in the provided documentation.",
        "evidence": [],
        "is_correct": true,
        "citation_valid": true,
        "is_abstention_case": true,
        "abstention_correct": true,
        "unsupported_claims_found": false,
        "confidence_score": 1.0,
        "evaluation_notes": "The Component Register (AEG-CR-700), Maintenance Manual (AEG-MM-700), and schematics list IV-21's operational requirements, location (Hydraulic Module), and shutdown role, but do not provide statistical reliability or MTBF figures."
      },
      {
        "id": 115,
        "question_id": 23,
        "question_text": "Is the Aegis Series-7 HCS compatible with a 3-phase 400V supply?",
        "expected_answer": "Not documented / unsupported (specifies 480V supply for Main Disconnect Q1 and Transformer T1).",
        "actual_answer": "INFORMATION NOT SPECIFIED / NOT DOCUMENTED: The Aegis Series-7 HCS documentation specifies a 480V incoming supply (Main Disconnect Q1 and Control Transformer T1) and does not document or specify compatibility with a 3-phase 400V supply.",
        "evidence": [
          {
            "document": "system_diagram_electrical.png",
            "page": 1,
            "section": "Power Distribution",
            "revision": "AEG-DWG-E02",
            "excerpt": "MAIN DISCONNECT Q1: 480V | CONTROL XFMR T1: 480:120V | PLC-03 24VDC POWER SUPPLY"
          },
          {
            "document": "component_register.xlsx",
            "page": 1,
            "section": "Components Sheet",
            "revision": "AEG-CR-700",
            "excerpt": "('Q1', 'Main Disconnect', '\u2014', 'Control Cabinet 1', 'Active', '480V incoming disconnect.')"
          }
        ],
        "is_correct": true,
        "citation_valid": true,
        "is_abstention_case": true,
        "abstention_correct": true,
        "unsupported_claims_found": false,
        "confidence_score": 1.0,
        "evaluation_notes": "Electrical schematic AEG-DWG-E02 and the Component Register specify that Main Disconnect Q1 is a '480V incoming disconnect' and Control Transformer T1 is rated for '480:120V control power'. Direct connection to a 400V 3-phase supply without an auxiliary step-up transformer or multi-tap primary is unsupported by the provided documentation."
      }
    ]
  }
};
