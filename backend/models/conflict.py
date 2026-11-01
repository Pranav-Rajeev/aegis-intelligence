from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean
from backend.database import Base

class Conflict(Base):
    __tablename__ = "conflicts"

    id = Column(Integer, primary_key=True, index=True)
    conflict_key = Column(String(128), unique=True, index=True) # e.g. "HPU:normal_operating_pressure"
    entity_name = Column(String(128), index=True)
    attribute = Column(String(128))
    description = Column(Text, default="")
    conflicting_claims = Column(Text, default="[]") # JSON list of claims involved
    resolution_status = Column(String(32), default="RESOLVED_BY_REVISION") # RESOLVED_BY_REVISION, UNRESOLVED, MANUAL_OVERRIDE
    resolution_rule = Column(Text, default="") # e.g. "Scoped by Software Revision: < 3.2 is 180 bar, >= 3.2 is 200 bar"
    active_resolution = Column(Text, default="")
    is_reviewed = Column(Boolean, default=False)
    reviewed_by = Column(String(128), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
