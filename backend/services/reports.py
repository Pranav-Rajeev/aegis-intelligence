import os
from datetime import datetime
from typing import Dict, Any, List
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from backend.config import settings

def generate_markdown_report(report_data: Dict[str, Any]) -> str:
    title = report_data.get("title", "Aegis Series-7 Technical System Report")
    system = report_data.get("system", "Aegis Series-7 Hydraulic Control System")
    timestamp = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC")
    
    md = f"""# {title}
**System:** {system}  
**Generated:** {timestamp}  
**Classification:** Controlled Engineering Assessment

---

## 1. Executive Summary
{report_data.get('executive_summary') or 'This technical intelligence report compiles validated evidence regarding the Aegis Series-7 Hydraulic Control System (HCS). It documents operating parameters, sensor supersession per ECN-1042, alarm management procedures, and identifies safety-critical interlocks.'}

---

## 2. Technical Findings
{report_data.get('technical_findings') or '1. Operating pressure setpoint is revised to 200 bar for units running software revision 3.2+ with sensor PS-04A.\n2. Legacy units (< 3.2) operate at 180 bar using sensor PS-04.\n3. Alarm A17 indicates low pressure (< 150 bar) and requires Shutdown Procedure 4.7 if persistent beyond 10 seconds.\n4. Resetting controller PLC-03 is strictly prohibited when system pressure exceeds 50 bar.'}

---

## 3. Relevant Components
| Component ID | Common Name | Status | Location | Notes |
|---|---|---|---|---|
| HPU | Hydraulic Power Unit | Active | Skid A, Bay 2 | Primary pressure generator |
| PS-04A | Pressure Sensor 04A | Active | HPU discharge line | Replaced PS-04 per ECN-1042 (>= 3.2) |
| PS-04 | Pressure Sensor 04 | Superseded | HPU discharge line | Legacy sensor (< 3.2), 180 bar |
| IV-21 | Isolation Valve 21 | Active | Hydraulic Module | Must be OPEN prior to startup |
| PLC-03 | HCS Controller | Active | Control Cabinet 1 | Supervises sequencing & alarms |
| PS-40 | Pressure Sensor 40 | Active | Coolant Loop, Skid B | NOT related to HPU discharge circuit |

---

## 4. Supporting Evidence & Citations
- **ECN-1042.pdf (p. 1):** Sets 200 bar operating setpoint and introduces PS-04A.
- **Operator Manual AEG-OM-700 Rev 4 (p. 1, 2):** Startup interlocks and 50 bar controller reset threshold.
- **Maintenance Manual AEG-MM-700 Rev 3 (p. 1):** Alarm A17 10-second persistence rule and Shutdown Procedure 4.7.
- **Alarm Reference AEG-AL-700 Rev 5 (p. 1):** 150 bar trip threshold and multi-sensor reference per ECN-1058.
- **Component Register AEG-CR-700 (p. 1):** Component specifications and alias mappings.

---

## 5. Revision Information
- **Software Revision 3.0 (2023-06-02):** Initial Series-7 release (180 bar setpoint, PS-04).
- **Software Revision 3.1 (2024-02-14):** Diagnostics screen updates.
- **Software Revision 3.2 (2025-09-30):** Sensor replacement (PS-04 -> PS-04A), setpoint change to 200 bar.
- **Software Revision 3.2.1 (2025-11-18):** Alarm A17 condition text correction per ECN-1058.

---

## 6. Safety Considerations
> [!WARNING]
> - **DO NOT START** the HPU with the maintenance access panel removed.
> - **DO NOT RESET** PLC-03 while system pressure is above 50 bar to avoid uncommanded actuation of IV-21.
> - **SHUTDOWN MANDATORY** if Alarm A17 persists for more than 10 seconds. Follow Procedure 4.7 immediately.

---

## 7. Knowledge Gaps & Unverified Metrics
1. **PS-04A Maximum Continuous Operating Temperature:** Not specified in the documentation package.
2. **Voltage Sensor Calibration Interval:** Not specified (recalibration schedule absent from binder).
3. **ECN-1058 Approval Signatory:** Not present on document.
4. **IV-21 MTBF:** Reliability and mean-time-between-failure metrics not provided.
5. **3-Phase 400V Supply Compatibility:** Only 480V incoming supply is specified.

---

## 8. References & Document Provenance
1. Document AEG-OM-700 Rev 4 (Operator Manual)
2. Document AEG-MM-700 Rev 3 (Maintenance Manual)
3. Document AEG-AL-700 Rev 5 (Alarm Reference)
4. Document ECN-1042 (Engineering Change Notice)
5. Document ECN-1058 (Engineering Change Notice)
6. Drawing AEG-DWG-H01 (Hydraulic Schematic)
7. Drawing AEG-DWG-E02 (Electrical Schematic)
8. Document AEG-CR-700 (Component Register)
"""
    return md

def generate_pdf_report(report_data: Dict[str, Any], output_path: str) -> str:
    """
    Builds a PDF technical report using ReportLab.
    """
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        rightMargin=40,
        leftMargin=40,
        topMargin=40,
        bottomMargin=40
    )
    
    styles = getSampleStyleSheet()
    
    # Custom styles
    title_style = ParagraphStyle(
        'RepTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=colors.HexColor('#0B1220')
    )
    h2_style = ParagraphStyle(
        'RepH2',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=16,
        textColor=colors.HexColor('#182235'),
        spaceBefore=12,
        spaceAfter=6
    )
    body_style = ParagraphStyle(
        'RepBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor('#1E293B')
    )
    bullet_style = ParagraphStyle(
        'RepBullet',
        parent=body_style,
        leftIndent=12,
        spaceAfter=3
    )

    story = []
    
    # Title & Metadata
    title = report_data.get("title", "Aegis Series-7 Technical System Report")
    story.append(Paragraph(title, title_style))
    story.append(Spacer(1, 4))
    story.append(Paragraph(f"<b>System:</b> Aegis Series-7 Hydraulic Control System | <b>Generated:</b> {datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S UTC')}", body_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#38BDF8'), spaceBefore=8, spaceAfter=12))

    # 1. Executive Summary
    story.append(Paragraph("1. Executive Summary", h2_style))
    exec_summary = report_data.get('executive_summary') or 'This technical intelligence report compiles validated evidence regarding the Aegis Series-7 Hydraulic Control System (HCS). It documents operating parameters, sensor supersession per ECN-1042, alarm management procedures, and identifies safety-critical interlocks.'
    story.append(Paragraph(exec_summary, body_style))
    story.append(Spacer(1, 8))

    # 2. Technical Findings
    story.append(Paragraph("2. Technical Findings", h2_style))
    findings = [
        "Operating pressure setpoint is 200 bar on software revision 3.2+ equipped with sensor PS-04A.",
        "Legacy units running software revisions prior to 3.2 operate at 180 bar using sensor PS-04.",
        "Alarm A17 indicates hydraulic pressure low (<150 bar); if persistent >10s, execute Shutdown Procedure 4.7.",
        "Resetting controller PLC-03 is strictly prohibited when system pressure is above 50 bar."
    ]
    for f in findings:
        story.append(Paragraph(f"• {f}", bullet_style))
    story.append(Spacer(1, 8))

    # 3. Relevant Components Table
    story.append(Paragraph("3. Relevant Components", h2_style))
    table_data = [
        ["Component", "Name", "Status", "Location"],
        ["HPU", "Hydraulic Power Unit", "Active", "Skid A, Bay 2"],
        ["PS-04A", "Pressure Sensor 04A", "Active", "HPU discharge line"],
        ["PS-04", "Pressure Sensor 04", "Superseded", "HPU discharge line"],
        ["IV-21", "Isolation Valve 21", "Active", "Hydraulic Module"],
        ["PLC-03", "HCS Controller", "Active", "Control Cabinet 1"],
        ["PS-40", "Pressure Sensor 40", "Active", "Coolant Loop, Skid B"]
    ]
    t = Table(table_data, colWidths=[65, 160, 80, 160])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#182235')),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#CBD5E1')),
    ]))
    story.append(t)
    story.append(Spacer(1, 10))

    # 4. Safety Considerations
    story.append(Paragraph("4. Safety Considerations", h2_style))
    safety_points = [
        "DO NOT START HPU with maintenance access panel removed.",
        "DO NOT RESET PLC-03 while system pressure exceeds 50 bar (prevents uncommanded valve transition).",
        "EXECUTE SHUTDOWN PROCEDURE 4.7 immediately if Alarm A17 persists for more than 10 seconds."
    ]
    for s in safety_points:
        story.append(Paragraph(f"<b>WARNING:</b> {s}", bullet_style))
    story.append(Spacer(1, 8))

    # 5. Knowledge Gaps
    story.append(Paragraph("5. Knowledge Gaps & Unverified Metrics", h2_style))
    gaps = [
        "PS-04A Maximum Continuous Operating Temperature: Not specified in docs.",
        "Voltage Sensor Calibration Interval: Not documented in technical package.",
        "ECN-1058 Approval Signatory: Header omits approval signature.",
        "IV-21 MTBF: Reliability figures not provided.",
        "3-Phase 400V Supply: Only 480V supply is specified."
    ]
    for g in gaps:
        story.append(Paragraph(f"• [GAP] {g}", bullet_style))

    doc.build(story)
    return output_path
