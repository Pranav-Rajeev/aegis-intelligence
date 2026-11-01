from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, Text, DateTime
from backend.database import Base

class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String(255), nullable=False)
    file_path = Column(String(512), nullable=False)
    file_type = Column(String(32), nullable=False)
    file_size = Column(Integer, default=0)
    file_hash = Column(String(64), index=True)
    category = Column(String(64), default="general")
    trust_level = Column(String(32), default="MEDIUM")  # HIGH, MEDIUM, LOW, UNTRUSTED
    trust_score = Column(Float, default=0.7)
    status = Column(String(32), default="UPLOADED")     # UPLOADED, PROCESSING, PROCESSED, FAILED, NEEDS_REVIEW
    page_count = Column(Integer, default=1)
    chunk_count = Column(Integer, default=0)
    error_message = Column(Text, nullable=True)
    metadata_json = Column(Text, default="{}")
    extracted_text = Column(Text, default="")
    tables_json = Column(Text, default="[]")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
