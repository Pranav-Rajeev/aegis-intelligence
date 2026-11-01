import axios from 'axios';
import {
  DashboardStats,
  DocumentItem,
  DocumentDetail,
  KnowledgeClaim,
  ConflictItem,
  ComponentItem,
  ChatMessage,
  ConversationItem,
  EvaluationRunItem,
  EvaluationResultItem,
  KnowledgeGap,
  TroubleshootingProcedure
} from '../types';

const API_BASE = '/api';

export const api = {
  // Dashboard
  getDashboardStats: async (): Promise<DashboardStats> => {
    const res = await axios.get(`${API_BASE}/dashboard/stats`);
    return res.data;
  },

  // Documents
  getDocuments: async (params?: { file_type?: string; status?: string; search?: string }): Promise<DocumentItem[]> => {
    const res = await axios.get(`${API_BASE}/documents`, { params });
    return res.data;
  },
  getDocumentDetail: async (id: number): Promise<DocumentDetail> => {
    const res = await axios.get(`${API_BASE}/documents/${id}`);
    return res.data;
  },
  uploadDocument: async (file: File): Promise<any> => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await axios.post(`${API_BASE}/documents/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  },
  reprocessDocument: async (id: number): Promise<any> => {
    const res = await axios.post(`${API_BASE}/documents/${id}/reprocess`);
    return res.data;
  },
  deleteDocument: async (id: number): Promise<any> => {
    const res = await axios.delete(`${API_BASE}/documents/${id}`);
    return res.data;
  },
  seedDataset: async (): Promise<any> => {
    const res = await axios.post(`${API_BASE}/documents/seed-dataset`);
    return res.data;
  },

  // Chat / Assistant
  sendChatMessage: async (message: string, conversationId?: number, revisionFilter?: string): Promise<any> => {
    const res = await axios.post(`${API_BASE}/chat`, {
      message,
      conversation_id: conversationId,
      revision_filter: revisionFilter
    });
    return res.data;
  },
  getConversations: async (): Promise<ConversationItem[]> => {
    const res = await axios.get(`${API_BASE}/chat/conversations`);
    return res.data;
  },
  getConversationHistory: async (id: number): Promise<{ id: number; title: string; messages: ChatMessage[] }> => {
    const res = await axios.get(`${API_BASE}/chat/conversations/${id}`);
    return res.data;
  },
  deleteConversation: async (id: number): Promise<any> => {
    const res = await axios.delete(`${API_BASE}/chat/conversations/${id}`);
    return res.data;
  },
  setMessageFeedback: async (messageId: number, feedback: 'positive' | 'negative'): Promise<any> => {
    const res = await axios.post(`${API_BASE}/chat/messages/${messageId}/feedback`, { feedback });
    return res.data;
  },

  // Components
  getComponents: async (params?: { search?: string; status?: string }): Promise<ComponentItem[]> => {
    const res = await axios.get(`${API_BASE}/components`, { params });
    return res.data;
  },
  getComponentDetail: async (id: string): Promise<ComponentItem> => {
    const res = await axios.get(`${API_BASE}/components/${id}`);
    return res.data;
  },
  resolveAlias: async (query: string, targetComponent?: string): Promise<any> => {
    const res = await axios.post(`${API_BASE}/components/resolve-alias`, { query, target_component: targetComponent });
    return res.data;
  },
  addAlias: async (compId: string, alias: string): Promise<any> => {
    const res = await axios.post(`${API_BASE}/components/${compId}/add-alias`, { alias });
    return res.data;
  },
  getGraphVisualization: async (): Promise<{ nodes: any[]; edges: any[] }> => {
    const res = await axios.get(`${API_BASE}/components/graph/visualization`);
    return res.data;
  },

  // Knowledge Claims & Conflicts
  getClaims: async (params?: { entity_name?: string; entity_type?: string; revision?: string; search?: string }): Promise<KnowledgeClaim[]> => {
    const res = await axios.get(`${API_BASE}/knowledge/claims`, { params });
    return res.data;
  },
  getConflicts: async (): Promise<ConflictItem[]> => {
    const res = await axios.get(`${API_BASE}/knowledge/conflicts`);
    return res.data;
  },
  reviewConflict: async (id: number, reviewedBy: string, activeResolution?: string): Promise<any> => {
    const res = await axios.post(`${API_BASE}/knowledge/conflicts/${id}/review`, {
      is_reviewed: true,
      reviewed_by: reviewedBy,
      active_resolution: activeResolution
    });
    return res.data;
  },
  getKnowledgeGaps: async (): Promise<KnowledgeGap[]> => {
    const res = await axios.get(`${API_BASE}/knowledge/gaps`);
    return res.data;
  },
  compareDocuments: async (docId1: number, docId2: number): Promise<any> => {
    const res = await axios.post(`${API_BASE}/knowledge/compare`, { doc_id_1: docId1, doc_id_2: docId2 });
    return res.data;
  },
  getTroubleshooting: async (issue: string): Promise<TroubleshootingProcedure> => {
    const res = await axios.get(`${API_BASE}/knowledge/troubleshoot`, { params: { issue } });
    return res.data;
  },
  getBookmarks: async (): Promise<any[]> => {
    const res = await axios.get(`${API_BASE}/knowledge/bookmarks`);
    return res.data;
  },
  createBookmark: async (bookmark: { item_type: string; item_id: string; title: string; snippet: string; source?: string; tags?: string }): Promise<any> => {
    const res = await axios.post(`${API_BASE}/knowledge/bookmarks`, bookmark);
    return res.data;
  },
  deleteBookmark: async (id: number): Promise<any> => {
    const res = await axios.delete(`${API_BASE}/knowledge/bookmarks/${id}`);
    return res.data;
  },

  // Evaluation Lab
  runEvaluation: async (): Promise<any> => {
    const res = await axios.post(`${API_BASE}/evaluation/run`);
    return res.data;
  },
  getEvaluationRuns: async (): Promise<EvaluationRunItem[]> => {
    const res = await axios.get(`${API_BASE}/evaluation/runs`);
    return res.data;
  },
  getEvaluationRunDetails: async (runId: number): Promise<{ run: EvaluationRunItem; results: EvaluationResultItem[] }> => {
    const res = await axios.get(`${API_BASE}/evaluation/runs/${runId}`);
    return res.data;
  },

  // Reports
  generateReport: async (params?: { title?: string; executive_summary?: string; technical_findings?: string }): Promise<any> => {
    const res = await axios.post(`${API_BASE}/reports/generate`, params || {});
    return res.data;
  }
};
