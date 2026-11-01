from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, Text, DateTime
from backend.database import Base

class KnowledgeClaim(Base):
    __tablename__ = "knowledge_claims"

    id = Column(Integer, primary_key=True, index=True)
    claim_id = Column(String(64), unique=True, index=True)
    entity_name = Column(String(128), index=True, nullable=False)
    entity_type = Column(String(64), default="Component") # Component, Parameter, Alarm, Procedure, ChangeNotice, Interlock
    attribute = Column(String(128), nullable=False)
    value = Column(Text, nullable=False)
    unit = Column(String(32), default="")
    source_document = Column(String(255), nullable=False)
    page_number = Column(Integer, default=1)
    source_section = Column(String(255), default="")
    document_revision = Column(String(64), default="")
    applicable_software_rev = Column(String(64), default="all")
    extraction_method = Column(String(64), default="rule_based") # rule_based, table_parser, ocr, regex, llm
    confidence_score = Column(Float, default=1.0)
    original_text = Column(Text, default="")
    created_at = Column(DateTime, default=datetime.utcnow)
