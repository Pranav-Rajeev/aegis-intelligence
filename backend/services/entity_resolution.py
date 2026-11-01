import re
from typing import Dict, Any, List, Optional, Tuple

# Official alias dictionary for Aegis Series-7 HCS
KNOWN_ALIASES = {
    "HPU": [
        "hpu",
        "hydraulic power unit",
        "hydraulic unit",
        "hp unit",
        "hydraulic power pack",
        "hydraulic pack",
        "the unit",
        "power pack"
    ],
    "IV-21": [
        "iv-21",
        "iv21",
        "isolation valve 21",
        "isolation valve",
        "valve (iv-21)",
        "iv-21 solenoid"
    ],
    "PS-04": [
        "ps-04",
        "ps04",
        "p04",
        "pressure sensor 04",
        "pressure sensor 4"
    ],
    "PS-04A": [
        "ps-04a",
        "ps04a",
        "p04a",
        "p.s.04-a",
        "pressure sensor 04a",
        "sensor_ps04a_threshold_bar",
        "sensor_ps04a_alarm_low_bar",
        "pressure xdcr",
        "pressure transducer loop"
    ],
    "PS-40": [
        "ps-40",
        "ps40",
        "p40",
        "pressure sensor 40",
        "sensor_ps40_zone"
    ],
    "PLC-03": [
        "plc-03",
        "plc03",
        "hcs controller",
        "aegis controller",
        "controller"
    ],
    "A17": [
        "a17",
        "alarm a17",
        "hydraulic pressure low",
        "hydraulic_pressure_low"
    ],
    "A18": [
        "a18",
        "alarm a18",
        "hydraulic pressure high",
        "hydraulic_pressure_high"
    ],
    "A19": [
        "a19",
        "alarm a19",
        "pressure sensor signal invalid",
        "sensor signal invalid"
    ],
    "TB-7": [
        "tb-7",
        "tb7",
        "terminal block 7"
    ],
    "Q1": [
        "q1",
        "main disconnect",
        "480v disconnect"
    ],
    "T1": [
        "t1",
        "control transformer",
        "control xfmr"
    ],
    "KA1": [
        "ka1",
        "e-stop safety relay",
        "safety relay"
    ],
    "Auxiliary Reservoir": [
        "auxiliary reservoir",
        "aux reservoir"
    ]
}

# Strict distinct entity boundaries - NEVER MERGE THESE
FORBIDDEN_MERGES = [
    ("PS-04", "PS-40"),
    ("PS-04A", "PS-40"),
    ("PS-04", "PS-04A"), # Successor, not same component
    ("A17", "A18"),
    ("A17", "A19"),
    ("Q1", "T1")
]

def resolve_entity(query_text: str) -> Optional[Dict[str, Any]]:
    """
    Resolves an input entity string to a canonical Component ID and metadata.
    Enforces distinct boundary rules:
    - PS-04A and PS-40 are strictly kept separate.
    - PS-04 and PS-04A are recognized as distinct revision-separated parts.
    """
    normalized = query_text.strip().lower()

    # 1. Exact canonical check
    for canonical, aliases in KNOWN_ALIASES.items():
        if normalized == canonical.lower():
            return {
                "canonical_id": canonical,
                "confidence": 1.0,
                "resolution_type": "exact_match",
                "matched_alias": canonical
            }

    # 2. Strict pattern matching for distinct sensor numbers
    # Ensure PS-40 or PS40 doesn't match PS-04
    if re.search(r"\b(ps[-_ ]?40|p40)\b", normalized):
        return {
            "canonical_id": "PS-40",
            "confidence": 1.0,
            "resolution_type": "exact_pattern",
            "matched_alias": "PS-40"
        }
    if re.search(r"\b(ps[-_ ]?04[-_ ]?a|p04a|p\.s\.04-a)\b", normalized):
        return {
            "canonical_id": "PS-04A",
            "confidence": 1.0,
            "resolution_type": "exact_pattern",
            "matched_alias": "PS-04A"
        }
    if re.search(r"\b(ps[-_ ]?04|p04)\b", normalized) and "04a" not in normalized and "04-a" not in normalized:
        return {
            "canonical_id": "PS-04",
            "confidence": 1.0,
            "resolution_type": "exact_pattern",
            "matched_alias": "PS-04"
        }

    # 3. Known aliases dictionary
    for canonical, aliases in KNOWN_ALIASES.items():
        for alias in aliases:
            if alias in normalized or normalized in alias:
                return {
                    "canonical_id": canonical,
                    "confidence": 0.95,
                    "resolution_type": "dictionary_alias",
                    "matched_alias": alias
                }

    return None

def verify_entity_merge_safety(entity_a: str, entity_b: str) -> Tuple[bool, str]:
    """
    Verifies if two entities can be safely merged.
    Returns (can_merge, rationale).
    """
    ea = entity_a.upper()
    eb = entity_b.upper()

    for disallowed_1, disallowed_2 in FORBIDDEN_MERGES:
        if (ea == disallowed_1 and eb == disallowed_2) or (ea == disallowed_2 and eb == disallowed_1):
            if "PS-40" in [ea, eb]:
                return False, f"PS-40 is located in Coolant Loop Skid B, entirely unrelated to HPU discharge sensor {entity_a if eb == 'PS-40' else entity_b}."
            if ("PS-04" in [ea, eb]) and ("PS-04A" in [ea, eb]):
                return False, "PS-04 and PS-04A are separate physical parts with distinct electrical conditioning and setpoints (ECN-1042). PS-04A is the successor, not an alias."
            return False, f"Rule prevents merging distinct components {entity_a} and {entity_b}."

    return True, "Safe to merge if alias match confirmed."
