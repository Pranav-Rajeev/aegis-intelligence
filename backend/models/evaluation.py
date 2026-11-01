from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, Text, DateTime, Boolean, ForeignKey
from backend.database import Base

class EvaluationRun(Base):
    __tablename__ = "evaluation_runs"

    id = Column(Integer, primary_key=True, index=True)
    run_timestamp = Column(DateTime, default=datetime.utcnow)
    total_questions = Column(Integer, default=23)
    completed_questions = Column(Integer, default=0)
    
    # Quantitative metrics:
    precision_at_k = Column(Float, default=0.0)
    recall_at_k = Column(Float, default=0.0)
    answer_correctness = Column(Float, default=0.0)
    citation_correctness = Column(Float, default=0.0)
    unsupported_claim_rate = Column(Float, default=0.0)
    abstention_accuracy = Column(Float, default=0.0)
    processing_success_rate = Column(Float, default=1.0)
    overall_score = Column(Float, default=0.0)
    
    status = Column(String(32), default="COMPLETED") # RUNNING, COMPLETED, FAILED
    notes = Column(Text, default="")

class EvaluationResult(Base):
    __tablename__ = "evaluation_results"

    id = Column(Integer, primary_key=True, index=True)
    run_id = Column(Integer, ForeignKey("evaluation_runs.id", ondelete="CASCADE"), index=True)
    question_id = Column(Integer, index=True)
    question_text = Column(Text, nullable=False)
    expected_answer = Column(Text, nullable=False)
    actual_answer = Column(Text, nullable=False)
    evidence_retrieved = Column(Text, default="[]") # JSON list of citations
    
    is_correct = Column(Boolean, default=True)
    citation_valid = Column(Boolean, default=True)
    is_abstention_case = Column(Boolean, default=False)
    abstention_correct = Column(Boolean, default=True)
    unsupported_claims_found = Column(Boolean, default=False)
    confidence_score = Column(Float, default=1.0)
    
    evaluation_notes = Column(Text, default="")
