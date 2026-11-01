from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Float
from backend.database import Base

class Conversation(Base):
    __tablename__ = "conversations"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), default="New Technical Consultation")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    conversation_id = Column(Integer, ForeignKey("conversations.id", ondelete="CASCADE"), index=True)
    role = Column(String(32), default="user") # "user" or "assistant"
    content = Column(Text, nullable=False)
    
    # Structured response fields for assistant messages:
    direct_answer = Column(Text, nullable=True)
    explanation = Column(Text, nullable=True)
    supporting_evidence = Column(Text, default="[]") # JSON list of evidence cards
    source_documents = Column(Text, default="[]")    # JSON list of referenced docs
    applicable_revision = Column(String(128), default="All Revisions")
    confidence_score = Column(Float, default=1.0)
    missing_information = Column(Text, nullable=True)
    user_feedback = Column(String(32), nullable=True) # "positive", "negative", None
    
    created_at = Column(DateTime, default=datetime.utcnow)
