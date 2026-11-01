from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime
from backend.database import Base

class Bookmark(Base):
    __tablename__ = "bookmarks"

    id = Column(Integer, primary_key=True, index=True)
    item_type = Column(String(32), nullable=False) # "answer", "component", "claim"
    item_id = Column(String(64), nullable=False)
    title = Column(String(255), nullable=False)
    snippet = Column(Text, default="")
    source = Column(String(255), default="")
    tags = Column(String(255), default="")
    created_at = Column(DateTime, default=datetime.utcnow)
