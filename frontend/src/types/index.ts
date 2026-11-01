export interface DocumentItem {
  id: number;
  filename: string;
  file_type: string;
  file_size: number;
  category: string;
  trust_level: 'HIGH' | 'MEDIUM' | 'LOW' | 'UNTRUSTED';
  trust_score: number;
  status: 'UPLOADED' | 'PROCESSING' | 'PROCESSED' | 'FAILED' | 'NEEDS_REVIEW';
  page_count: number;
  chunk_count: number;
  error_message?: string;
  created_at: string;
}

export interface DocumentDetail extends DocumentItem {
  metadata: Record<string, any>;
  tables: Array<{
    sheet_name?: string;
    table_index?: number;
    rows: string[][];
  }>;
  extracted_text_preview: string;
}

export interface KnowledgeClaim {
  id: number;
  claim_id: string;
  entity_name: string;
  entity_type: string;
  attribute: string;
  value: string;
  unit: string;
  source_document: string;
  page_number: number;
  source_section: string;
  document_revision: string;
  applicable_software_rev: string;
  extraction_method: string;
  confidence_score: number;
  original_text: string;
  created_at: string;
}

export interface ConflictingClaim {
  value: string;
  source_document: string;
  revision: string;
  applicable_software_rev: string;
  component: string;
  trust_level: string;
  notes: string;
}

export interface ConflictItem {
  id: number;
  conflict_key: string;
  entity_name: string;
  attribute: string;
  description: string;
  conflicting_claims: ConflictingClaim[];
  resolution_status: string;
  resolution_rule: string;
  active_resolution: string;
  is_reviewed: boolean;
  reviewed_by?: string;
  created_at: string;
  updated_at: string;
}

export interface ComponentItem {
  id: number;
  component_id: string;
  common_name: string;
  aliases: string[];
  location: string;
  status: string;
  notes: string;
  document_references: string[];
  revision_history: Array<{ revision: string; change: string }>;
  related_components: string[];
  created_at: string;
}

export interface EvidenceCard {
  document: string;
  page: number;
  section: string;
  revision: string;
  excerpt: string;
}

export interface ChatMessage {
  id?: number;
  role: 'user' | 'assistant';
  content: string;
  direct_answer?: string;
  explanation?: string;
  supporting_evidence?: EvidenceCard[];
  source_documents?: string[];
  applicable_revision?: string;
  confidence_score?: number;
  missing_information?: string | null;
  user_feedback?: string | null;
  created_at?: string;
}

export interface ConversationItem {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface EvaluationResultItem {
  id: number;
  question_id: number;
  question_text: string;
  expected_answer: string;
  actual_answer: string;
  evidence: EvidenceCard[];
  is_correct: boolean;
  citation_valid: boolean;
  is_abstention_case: boolean;
  abstention_correct: boolean;
  unsupported_claims_found: boolean;
  confidence_score: number;
  evaluation_notes: string;
}

export interface EvaluationRunItem {
  id: number;
  run_timestamp: string;
  total_questions: number;
  completed_questions: number;
  precision_at_k: number;
  recall_at_k: number;
  answer_correctness: number;
  citation_correctness: number;
  unsupported_claim_rate: number;
  abstention_accuracy: number;
  processing_success_rate: number;
  overall_score: number;
  status: string;
}

export interface DashboardStats {
  total_documents: number;
  processed_documents: number;
  extracted_claims: number;
  registered_components: number;
  unresolved_conflicts: number;
  evaluation_accuracy: number;
  abstention_accuracy: number;
  format_distribution: Array<{ name: string; value: number }>;
  source_reliability_distribution: Array<{ name: string; value: number }>;
  confidence_distribution: Array<{ bucket: string; count: number }>;
  extraction_activity: Array<{ type: string; claims: number }>;
  recent_documents: DocumentItem[];
  recent_questions: Array<{ id: number; content: string; created_at: string }>;
  latest_revisions: Array<{ revision: string; date: string; summary: string; status: string }>;
  system_health: {
    database: string;
    chromadb: string;
    ocr_engine: string;
    vector_embeddings: string;
    active_workspace: string;
  };
}

export interface KnowledgeGap {
  id: string;
  category: string;
  entity: string;
  parameter: string;
  status: string;
  impact: string;
  description: string;
  recommendation: string;
}

export interface TroubleshootingProcedure {
  alarm_code: string;
  title: string;
  official_procedure_reference: string;
  severity: string;
  documented_possible_causes: string[];
  immediate_mandatory_action: {
    rule: string;
    instruction: string;
  };
  shutdown_procedure_4_7_steps: string[];
  controller_reset_warning?: string;
  source_citation: string;
}
