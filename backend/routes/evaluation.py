import json
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models.evaluation import EvaluationRun, EvaluationResult
from backend.services.evaluation import run_evaluation_suite, export_evaluation_csv

router = APIRouter(prefix="/evaluation", tags=["evaluation"])

@router.post("/run")
def trigger_evaluation(db: Session = Depends(get_db)):
    """
    Executes the comprehensive evaluation against all 23 evaluation questions.
    """
    results = run_evaluation_suite(db)
    return results

@router.get("/runs")
def list_evaluation_runs(db: Session = Depends(get_db)):
    runs = db.query(EvaluationRun).order_by(EvaluationRun.run_timestamp.desc()).all()
    return [
        {
            "id": r.id,
            "run_timestamp": r.run_timestamp.isoformat(),
            "total_questions": r.total_questions,
            "completed_questions": r.completed_questions,
            "precision_at_k": r.precision_at_k,
            "recall_at_k": r.recall_at_k,
            "answer_correctness": r.answer_correctness,
            "citation_correctness": r.citation_correctness,
            "unsupported_claim_rate": r.unsupported_claim_rate,
            "abstention_accuracy": r.abstention_accuracy,
            "processing_success_rate": r.processing_success_rate,
            "overall_score": r.overall_score,
            "status": r.status
        }
        for r in runs
    ]

@router.get("/runs/{run_id}")
def get_evaluation_run_details(run_id: int, db: Session = Depends(get_db)):
    run = db.query(EvaluationRun).filter(EvaluationRun.id == run_id).first()
    if not run:
        raise HTTPException(status_code=404, detail="Evaluation run not found")

    results = db.query(EvaluationResult).filter(EvaluationResult.run_id == run_id).order_by(EvaluationResult.question_id.asc()).all()

    return {
        "run": {
            "id": run.id,
            "run_timestamp": run.run_timestamp.isoformat(),
            "total_questions": run.total_questions,
            "completed_questions": run.completed_questions,
            "precision_at_k": run.precision_at_k,
            "recall_at_k": run.recall_at_k,
            "answer_correctness": run.answer_correctness,
            "citation_correctness": run.citation_correctness,
            "unsupported_claim_rate": run.unsupported_claim_rate,
            "abstention_accuracy": run.abstention_accuracy,
            "processing_success_rate": run.processing_success_rate,
            "overall_score": run.overall_score,
            "status": run.status
        },
        "results": [
            {
                "id": res.id,
                "question_id": res.question_id,
                "question_text": res.question_text,
                "expected_answer": res.expected_answer,
                "actual_answer": res.actual_answer,
                "evidence": json.loads(res.evidence_retrieved or "[]"),
                "is_correct": res.is_correct,
                "citation_valid": res.citation_valid,
                "is_abstention_case": res.is_abstention_case,
                "abstention_correct": res.abstention_correct,
                "unsupported_claims_found": res.unsupported_claims_found,
                "confidence_score": res.confidence_score,
                "evaluation_notes": res.evaluation_notes
            }
            for res in results
        ]
    }

@router.get("/export/csv")
def export_csv(run_id: Optional[int] = None, db: Session = Depends(get_db)):
    query = db.query(EvaluationRun)
    if run_id:
        run = query.filter(EvaluationRun.id == run_id).first()
    else:
        run = query.order_by(EvaluationRun.run_timestamp.desc()).first()

    if not run:
        raise HTTPException(status_code=404, detail="No evaluation runs found")

    results = db.query(EvaluationResult).filter(EvaluationResult.run_id == run.id).all()
    results_list = [
        {
            "question_id": r.question_id,
            "question": r.question_text,
            "expected": r.expected_answer,
            "actual": r.actual_answer,
            "is_correct": r.is_correct,
            "citation_valid": r.citation_valid,
            "is_abstention": r.is_abstention_case,
            "evidence": json.loads(r.evidence_retrieved or "[]")
        }
        for r in results
    ]

    csv_data = export_evaluation_csv(results_list)
    return Response(
        content=csv_data,
        media_type="text/csv",
        headers={"Content-Disposition": f"attachment; filename=aegis_evaluation_run_{run.id}.csv"}
    )

@router.get("/export/json")
def export_json(run_id: Optional[int] = None, db: Session = Depends(get_db)):
    query = db.query(EvaluationRun)
    if run_id:
        run = query.filter(EvaluationRun.id == run_id).first()
    else:
        run = query.order_by(EvaluationRun.run_timestamp.desc()).first()

    if not run:
        raise HTTPException(status_code=404, detail="No evaluation runs found")

    results = db.query(EvaluationResult).filter(EvaluationResult.run_id == run.id).all()
    data = {
        "run_id": run.id,
        "run_timestamp": run.run_timestamp.isoformat(),
        "metrics": {
            "precision_at_k": run.precision_at_k,
            "recall_at_k": run.recall_at_k,
            "answer_correctness": run.answer_correctness,
            "citation_correctness": run.citation_correctness,
            "unsupported_claim_rate": run.unsupported_claim_rate,
            "abstention_accuracy": run.abstention_accuracy,
            "processing_success_rate": run.processing_success_rate,
            "overall_score": run.overall_score
        },
        "results": [
            {
                "question_id": r.question_id,
                "question": r.question_text,
                "expected": r.expected_answer,
                "actual": r.actual_answer,
                "is_correct": r.is_correct,
                "citation_valid": r.citation_valid,
                "is_abstention": r.is_abstention_case,
                "confidence_score": r.confidence_score,
                "evidence": json.loads(r.evidence_retrieved or "[]")
            }
            for r in results
        ]
    }
    return Response(
        content=json.dumps(data, indent=2),
        media_type="application/json",
        headers={"Content-Disposition": f"attachment; filename=aegis_evaluation_run_{run.id}.json"}
    )
