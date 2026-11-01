import json
from typing import Optional, List
from pydantic import BaseModel
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models.conversation import Conversation, Message
from backend.services.answer_generation import generate_evidence_based_answer

router = APIRouter(prefix="/chat", tags=["chat"])

class ChatRequest(BaseModel):
    message: str
    conversation_id: Optional[int] = None
    revision_filter: Optional[str] = None

class FeedbackRequest(BaseModel):
    feedback: str # "positive" or "negative"

@router.post("")
def chat_endpoint(req: ChatRequest, db: Session = Depends(get_db)):
    if not req.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    # 1. Manage Conversation
    conv = None
    if req.conversation_id:
        conv = db.query(Conversation).filter(Conversation.id == req.conversation_id).first()
    
    if not conv:
        snippet = req.message[:45] + ("..." if len(req.message) > 45 else "")
        conv = Conversation(title=snippet)
        db.add(conv)
        db.commit()
        db.refresh(conv)

    # 2. Record User Message
    user_msg = Message(
        conversation_id=conv.id,
        role="user",
        content=req.message
    )
    db.add(user_msg)
    db.commit()

    # 3. Generate Answer
    ans = generate_evidence_based_answer(req.message, db, revision_filter=req.revision_filter)

    # 4. Save Assistant Message
    assistant_msg = Message(
        conversation_id=conv.id,
        role="assistant",
        content=ans["direct_answer"],
        direct_answer=ans["direct_answer"],
        explanation=ans["explanation"],
        supporting_evidence=json.dumps(ans["supporting_evidence"]),
        source_documents=json.dumps(ans["source_documents"]),
        applicable_revision=ans["applicable_revision"],
        confidence_score=ans["confidence_score"],
        missing_information=ans["missing_information"]
    )
    db.add(assistant_msg)
    db.commit()
    db.refresh(assistant_msg)

    return {
        "conversation_id": conv.id,
        "message_id": assistant_msg.id,
        "direct_answer": assistant_msg.direct_answer,
        "explanation": assistant_msg.explanation,
        "supporting_evidence": json.loads(assistant_msg.supporting_evidence or "[]"),
        "source_documents": json.loads(assistant_msg.source_documents or "[]"),
        "applicable_revision": assistant_msg.applicable_revision,
        "confidence_score": assistant_msg.confidence_score,
        "missing_information": assistant_msg.missing_information,
        "created_at": assistant_msg.created_at.isoformat()
    }

@router.get("/conversations")
def list_conversations(db: Session = Depends(get_db)):
    convs = db.query(Conversation).order_by(Conversation.updated_at.desc()).all()
    return [
        {
            "id": c.id,
            "title": c.title,
            "created_at": c.created_at.isoformat(),
            "updated_at": c.updated_at.isoformat()
        }
        for c in convs
    ]

@router.get("/conversations/{conv_id}")
def get_conversation_history(conv_id: int, db: Session = Depends(get_db)):
    conv = db.query(Conversation).filter(Conversation.id == conv_id).first()
    if not conv:
        raise HTTPException(status_code=404, detail="Conversation not found")

    messages = db.query(Message).filter(Message.conversation_id == conv_id).order_by(Message.created_at.asc()).all()
    return {
        "id": conv.id,
        "title": conv.title,
        "created_at": conv.created_at.isoformat(),
        "messages": [
            {
                "id": m.id,
                "role": m.role,
                "content": m.content,
                "direct_answer": m.direct_answer,
                "explanation": m.explanation,
                "supporting_evidence": json.loads(m.supporting_evidence or "[]") if m.supporting_evidence else [],
                "source_documents": json.loads(m.source_documents or "[]") if m.source_documents else [],
                "applicable_revision": m.applicable_revision,
                "confidence_score": m.confidence_score,
                "missing_information": m.missing_information,
                "user_feedback": m.user_feedback,
                "created_at": m.created_at.isoformat()
            }
            for m in messages
        ]
    }

@router.delete("/conversations/{conv_id}")
def delete_conversation(conv_id: int, db: Session = Depends(get_db)):
    conv = db.query(Conversation).filter(Conversation.id == conv_id).first()
    if not conv:
        raise HTTPException(status_code=404, detail="Conversation not found")

    db.query(Message).filter(Message.conversation_id == conv_id).delete()
    db.delete(conv)
    db.commit()
    return {"message": "Conversation deleted"}

@router.post("/messages/{msg_id}/feedback")
def set_message_feedback(msg_id: int, req: FeedbackRequest, db: Session = Depends(get_db)):
    msg = db.query(Message).filter(Message.id == msg_id).first()
    if not msg:
        raise HTTPException(status_code=404, detail="Message not found")

    msg.user_feedback = req.feedback
    db.commit()
    return {"message": "Feedback recorded", "feedback": req.feedback}
