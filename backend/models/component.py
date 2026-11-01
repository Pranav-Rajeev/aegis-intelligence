from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime
from backend.database import Base

class Component(Base):
    __tablename__ = "components"

    id = Column(Integer, primary_key=True, index=True)
    component_id = Column(String(64), unique=True, index=True, nullable=False)
    common_name = Column(String(255), nullable=False)
    aliases = Column(Text, default="[]")  # JSON list of aliases
    location = Column(String(255), default="")
    status = Column(String(64), default="Active")  # Active, Superseded, Deprecated
    notes = Column(Text, default="")
    document_references = Column(Text, default="[]")  # JSON list of documents referencing this
    revision_history = Column(Text, default="[]")     # JSON history of revisions/changes
    related_components = Column(Text, default="[]")   # JSON list of related component IDs
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
