import os
import hashlib
import json
import re
from pathlib import Path
from typing import Dict, Any, List, Tuple
import pypdf
import docx
import openpyxl
import pptx
from bs4 import BeautifulSoup
from backend.services.ocr import ocr_image

def compute_file_hash(file_path: str) -> str:
    sha256 = hashlib.sha256()
    with open(file_path, "rb") as f:
        while chunk := f.read(8192):
            sha256.update(chunk)
    return sha256.hexdigest()

def assess_trust_and_category(file_path: str) -> Tuple[str, str, float]:
    """
    Evaluates provenance, file path, and revision status to assign:
    (category, trust_level, trust_score)
    """
    path_str = file_path.replace("\\", "/").lower()
    
    if "manuals" in path_str and "legacy" in path_str:
        return "manuals_legacy", "MEDIUM", 0.60
    elif "manuals" in path_str:
        return "manuals", "HIGH", 0.95
    elif "engineering_bulletins" in path_str or "ecn" in path_str:
        return "engineering_bulletins", "HIGH", 0.98
    elif "configuration" in path_str:
        return "configuration", "HIGH", 0.95
    elif "reference" in path_str:
        return "reference", "HIGH", 0.90
    elif "diagrams" in path_str:
        return "diagrams", "HIGH", 0.90
    elif "screenshots" in path_str:
        return "screenshots", "HIGH", 0.85
    elif "scans" in path_str:
        return "scans", "MEDIUM", 0.70
    elif "extra" in path_str or "training" in path_str:
        return "extra", "MEDIUM", 0.65
    elif "low_trust" in path_str or "site_survey" in path_str:
        return "low_trust", "LOW", 0.35
    elif "noise" in path_str or "safety_data_sheet" in path_str:
        return "noise", "LOW", 0.20
    else:
        return "general", "MEDIUM", 0.70

def extract_content(file_path: str, file_type: str) -> Dict[str, Any]:
    """
    Extracts text, metadata, and structured tables from any supported document format.
    Returns:
    {
        "text": str,
        "pages": List[Dict[str, Any]], # [{"page": 1, "text": "...", "tables": [...]}]
        "tables": List[Dict[str, Any]],
        "metadata": Dict[str, Any]
    }
    """
    ext = file_type.lower().replace(".", "")
    result = {
        "text": "",
        "pages": [],
        "tables": [],
        "metadata": {
            "file_size": os.path.getsize(file_path) if os.path.exists(file_path) else 0,
            "format": ext
        }
    }

    if ext == "pdf":
        _extract_pdf(file_path, result)
    elif ext in ["docx", "doc"]:
        _extract_docx(file_path, result)
    elif ext in ["xlsx", "xls"]:
        _extract_xlsx(file_path, result)
    elif ext == "csv":
        _extract_csv(file_path, result)
    elif ext in ["html", "htm"]:
        _extract_html(file_path, result)
    elif ext == "json":
        _extract_json(file_path, result)
    elif ext in ["pptx", "ppt"]:
        _extract_pptx(file_path, result)
    elif ext in ["png", "jpg", "jpeg", "bmp", "tiff"]:
        _extract_image(file_path, result)
    elif ext in ["txt", "log", "md"]:
        _extract_text(file_path, result)
    else:
        # Generic fallback
        _extract_text(file_path, result)

    return result

def _extract_pdf(file_path: str, result: Dict[str, Any]):
    try:
        reader = pypdf.PdfReader(file_path)
        all_text = []
        for i, page in enumerate(reader.pages):
            page_num = i + 1
            text = (page.extract_text() or "").strip()
            
            # If page text is empty (scanned PDF), attempt OCR on images
            if not text and len(page.images) > 0:
                img_data = page.images[0].data
                temp_img = file_path + f"_temp_p{page_num}.png"
                with open(temp_img, "wb") as f_img:
                    f_img.write(img_data)
                text = ocr_image(temp_img)
                if os.path.exists(temp_img):
                    try: os.remove(temp_img)
                    except: pass

            page_tables = []
            result["pages"].append({
                "page": page_num,
                "text": text,
                "tables": page_tables
            })
            if text:
                all_text.append(f"--- PAGE {page_num} ---\n{text}")
        
        result["text"] = "\n\n".join(all_text)
        result["metadata"]["page_count"] = len(reader.pages)
    except Exception as e:
        result["metadata"]["error"] = str(e)

def _extract_docx(file_path: str, result: Dict[str, Any]):
    try:
        doc = docx.Document(file_path)
        paragraphs = [p.text.strip() for p in doc.paragraphs if p.text.strip()]
        tables_data = []
        for t_idx, table in enumerate(doc.tables):
            rows_data = []
            for row in table.rows:
                rows_data.append([c.text.strip() for c in row.cells])
            tables_data.append({
                "table_index": t_idx + 1,
                "rows": rows_data
            })
            
        full_text = "\n\n".join(paragraphs)
        if tables_data:
            full_text += "\n\n=== TABLES ===\n"
            for t in tables_data:
                for r in t["rows"]:
                    full_text += " | ".join(r) + "\n"

        result["text"] = full_text
        result["pages"].append({"page": 1, "text": full_text, "tables": tables_data})
        result["tables"] = tables_data
        result["metadata"]["page_count"] = 1
    except Exception as e:
        result["metadata"]["error"] = str(e)

def _extract_xlsx(file_path: str, result: Dict[str, Any]):
    try:
        wb = openpyxl.load_workbook(file_path, data_only=True)
        text_parts = []
        tables_data = []
        for sheet_idx, sheet in enumerate(wb.sheetnames):
            ws = wb[sheet]
            sheet_rows = []
            for row in ws.iter_rows(values_only=True):
                if any(row):
                    str_row = [str(c).strip() if c is not None else "" for c in row]
                    sheet_rows.append(str_row)
            
            tables_data.append({
                "sheet_name": sheet,
                "rows": sheet_rows
            })
            
            sheet_text = f"=== SHEET: {sheet} ===\n"
            for r in sheet_rows:
                sheet_text += " | ".join(r) + "\n"
            text_parts.append(sheet_text)
            
            result["pages"].append({
                "page": sheet_idx + 1,
                "section": sheet,
                "text": sheet_text,
                "tables": [sheet_rows]
            })

        result["text"] = "\n\n".join(text_parts)
        result["tables"] = tables_data
        result["metadata"]["page_count"] = len(wb.sheetnames)
    except Exception as e:
        result["metadata"]["error"] = str(e)

def _extract_csv(file_path: str, result: Dict[str, Any]):
    try:
        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()
        result["text"] = content
        result["pages"].append({"page": 1, "text": content, "tables": []})
        result["metadata"]["page_count"] = 1
    except Exception as e:
        result["metadata"]["error"] = str(e)

def _extract_html(file_path: str, result: Dict[str, Any]):
    try:
        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
            soup = BeautifulSoup(f.read(), "html.parser")
        
        tables = []
        for t_idx, table in enumerate(soup.find_all("table")):
            t_rows = []
            for tr in table.find_all("tr"):
                t_rows.append([td.get_text().strip() for td in tr.find_all(["th", "td"])])
            tables.append({"table_index": t_idx + 1, "rows": t_rows})

        text = soup.get_text(separator="\n").strip()
        lines = [line.strip() for line in text.splitlines() if line.strip()]
        cleaned_text = "\n".join(lines)

        result["text"] = cleaned_text
        result["pages"].append({"page": 1, "text": cleaned_text, "tables": tables})
        result["tables"] = tables
        result["metadata"]["page_count"] = 1
    except Exception as e:
        result["metadata"]["error"] = str(e)

def _extract_json(file_path: str, result: Dict[str, Any]):
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        formatted_json = json.dumps(data, indent=2)
        result["text"] = formatted_json
        result["pages"].append({"page": 1, "text": formatted_json, "tables": []})
        result["metadata"]["json_keys"] = list(data.keys()) if isinstance(data, dict) else []
        result["metadata"]["page_count"] = 1
    except Exception as e:
        result["metadata"]["error"] = str(e)

def _extract_pptx(file_path: str, result: Dict[str, Any]):
    try:
        prs = pptx.Presentation(file_path)
        slides_text = []
        for i, slide in enumerate(prs.slides):
            slide_lines = [f"--- SLIDE {i+1} ---"]
            for shape in slide.shapes:
                if shape.has_text_frame:
                    for p in shape.text_frame.paragraphs:
                        if p.text.strip():
                            slide_lines.append(p.text.strip())
            s_text = "\n".join(slide_lines)
            slides_text.append(s_text)
            result["pages"].append({"page": i + 1, "text": s_text, "tables": []})

        result["text"] = "\n\n".join(slides_text)
        result["metadata"]["page_count"] = len(prs.slides)
    except Exception as e:
        result["metadata"]["error"] = str(e)

def _extract_image(file_path: str, result: Dict[str, Any]):
    try:
        ocr_text = ocr_image(file_path)
        result["text"] = ocr_text
        result["pages"].append({"page": 1, "text": ocr_text, "tables": []})
        result["metadata"]["page_count"] = 1
        result["metadata"]["ocr_extracted"] = True
    except Exception as e:
        result["metadata"]["error"] = str(e)

def _extract_text(file_path: str, result: Dict[str, Any]):
    try:
        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()
        result["text"] = content
        result["pages"].append({"page": 1, "text": content, "tables": []})
        result["metadata"]["page_count"] = 1
    except Exception as e:
        result["metadata"]["error"] = str(e)

def chunk_document_pages(pages: List[Dict[str, Any]], chunk_size: int = 400, overlap: int = 50) -> List[Dict[str, Any]]:
    """
    Creates chunks with accurate page number, section references, and token length approximations.
    """
    chunks = []
    chunk_idx = 0
    
    for page_item in pages:
        page_num = page_item.get("page", 1)
        section = page_item.get("section", f"Page {page_num}")
        text = page_item.get("text", "")
        
        words = text.split()
        if not words:
            continue
            
        if len(words) <= chunk_size:
            chunks.append({
                "chunk_index": chunk_idx,
                "page_number": page_num,
                "section": section,
                "content": text,
                "token_count": len(words)
            })
            chunk_idx += 1
        else:
            step = chunk_size - overlap
            for start in range(0, len(words), step):
                chunk_words = words[start:start + chunk_size]
                chunk_text = " ".join(chunk_words)
                chunks.append({
                    "chunk_index": chunk_idx,
                    "page_number": page_num,
                    "section": section,
                    "content": chunk_text,
                    "token_count": len(chunk_words)
                })
                chunk_idx += 1
                if start + chunk_size >= len(words):
                    break
                    
    return chunks
