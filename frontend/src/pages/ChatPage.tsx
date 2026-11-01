import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Bot,
  User,
  Plus,
  Trash2,
  Copy,
  Check,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  FileText,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Download,
  ShieldCheck,
  Filter
} from 'lucide-react';
import { api } from '../services/api';
import { ChatMessage, ConversationItem, EvidenceCard } from '../types';

interface ChatPageProps {
  initialQuestion?: string;
  onClearInitialQuestion?: () => void;
}

export const ChatPage: React.FC<ChatPageProps> = ({ initialQuestion, onClearInitialQuestion }) => {
  const [conversations, setConversations] = useState<ConversationItem[]>([]);
  const [activeConvId, setActiveConvId] = useState<number | undefined>(undefined);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [revisionFilter, setRevisionFilter] = useState<string>('All Revisions');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [expandedEvidence, setExpandedEvidence] = useState<Record<number, boolean>>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchConversations = async () => {
    try {
      const data = await api.getConversations();
      setConversations(data);
      if (data.length > 0 && !activeConvId) {
        setActiveConvId(data[0].id);
        loadConversation(data[0].id);
      }
    } catch (err) {
      console.error('Error fetching conversations:', err);
    }
  };

  const loadConversation = async (convId: number) => {
    try {
      setLoading(true);
      const data = await api.getConversationHistory(convId);
      setActiveConvId(data.id);
      setMessages(data.messages);
    } catch (err) {
      console.error('Error loading conversation history:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    if (initialQuestion) {
      setInputMessage(initialQuestion);
      handleSendMessage(initialQuestion);
      if (onClearInitialQuestion) onClearInitialQuestion();
    }
  }, [initialQuestion]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      role: 'user',
      content: text,
      created_at: new Date().toISOString()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setLoading(true);

    try {
      const filterParam = revisionFilter === 'All Revisions' ? undefined : revisionFilter;
      const res = await api.sendChatMessage(text, activeConvId, filterParam);
      
      setActiveConvId(res.conversation_id);
      
      const assistantMsg: ChatMessage = {
        id: res.message_id,
        role: 'assistant',
        content: res.direct_answer,
        direct_answer: res.direct_answer,
        explanation: res.explanation,
        supporting_evidence: res.supporting_evidence,
        source_documents: res.source_documents,
        applicable_revision: res.applicable_revision,
        confidence_score: res.confidence_score,
        missing_information: res.missing_information,
        created_at: res.created_at
      };

      setMessages((prev) => [...prev, assistantMsg]);
      fetchConversations();
    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleNewConversation = () => {
    setActiveConvId(undefined);
    setMessages([]);
  };

  const handleDeleteConversation = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await api.deleteConversation(id);
      if (activeConvId === id) {
        handleNewConversation();
      }
      fetchConversations();
    } catch (err) {
      console.error('Error deleting conversation:', err);
    }
  };

  const handleFeedback = async (msgId: number, feedback: 'positive' | 'negative') => {
    try {
      await api.setMessageFeedback(msgId, feedback);
      setMessages((prev) =>
        prev.map((m) => (m.id === msgId ? { ...m, user_feedback: feedback } : m))
      );
    } catch (err) {
      console.error('Error recording feedback:', err);
    }
  };

  const handleCopy = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleEvidence = (msgIndex: number) => {
    setExpandedEvidence((prev) => ({
      ...prev,
      [msgIndex]: !prev[msgIndex]
    }));
  };

  const exportConversationMarkdown = () => {
    let md = `# Aegis Technical Consultation Transcript\nDate: ${new Date().toISOString()}\n\n---\n\n`;
    messages.forEach((m, idx) => {
      if (m.role === 'user') {
        md += `### User Query (${idx + 1}):\n${m.content}\n\n`;
      } else {
        md += `### Technical Answer:\n**Direct Answer:** ${m.direct_answer}\n\n`;
        md += `**Explanation:** ${m.explanation}\n\n`;
        if (m.applicable_revision) md += `**Applicable Revision:** ${m.applicable_revision}\n\n`;
        if (m.missing_information) md += `**Missing Information:** ${m.missing_information}\n\n`;
        if (m.supporting_evidence && m.supporting_evidence.length > 0) {
          md += `**Evidence & Citations:**\n`;
          m.supporting_evidence.forEach((e) => {
            md += `- *${e.document}* (Page ${e.page}, ${e.section}): "${e.excerpt}"\n`;
          });
          md += '\n';
        }
      }
      md += '---\n\n';
    });

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aegis_consultation_${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const EXAMPLE_QUESTIONS = [
    "What must be true before starting the Hydraulic Power Unit?",
    "What is the current normal operating pressure for the HPU, and under what conditions does that apply?",
    "What does alarm A17 indicate, and what are its possible causes?",
    "Is PS-04 the same component as PS-04A?",
    "Which document introduced the change from PS-04 to PS-04A?",
    "Which components connect directly to the HCS controller, according to the hydraulic schematic?",
    "Under what circumstances must the controller not be reset?",
    "What was the operating pressure threshold before software revision 3.2?",
    "What is the maximum continuous operating temperature of PS-04A?",
    "Is the Aegis Series-7 HCS compatible with a 3-phase 400V supply?"
  ];

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* Left Sidebar: Conversations & Revisions */}
      <div className="w-80 border-r flex flex-col bg-slate-900/60" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--border-subtle)' }}>
          <button
            onClick={handleNewConversation}
            className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs font-mono transition-all shadow-md shadow-sky-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>New Consultation</span>
          </button>
        </div>

        {/* Revision Context Filter */}
        <div className="px-4 py-3 border-b bg-slate-950/40" style={{ borderColor: 'var(--border-subtle)' }}>
          <label className="text-[10px] font-mono font-semibold text-slate-400 block mb-1 flex items-center space-x-1">
            <Filter className="w-3 h-3 text-sky-400" />
            <span>TARGET FIRMWARE FILTER</span>
          </label>
          <select
            value={revisionFilter}
            onChange={(e) => setRevisionFilter(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500 font-mono"
          >
            <option value="All Revisions">All Revisions (Auto-Scope)</option>
            <option value="Software Revision >= 3.2">Software Revision &gt;= 3.2 (Current Standard)</option>
            <option value="Software Revision < 3.2">Software Revision &lt; 3.2 (Legacy)</option>
          </select>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
          <p className="text-[10px] font-mono text-slate-500 uppercase px-2 mb-1">Recent Sessions</p>
          {conversations.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500 font-mono">
              No previous consultations
            </div>
          ) : (
            conversations.map((c) => (
              <div
                key={c.id}
                onClick={() => loadConversation(c.id)}
                className={`p-2.5 rounded-lg text-xs font-medium cursor-pointer flex items-center justify-between group transition-colors ${
                  activeConvId === c.id
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                    : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                }`}
              >
                <div className="truncate mr-2">
                  <p className="truncate">{c.title}</p>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {new Date(c.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <button
                  onClick={(e) => handleDeleteConversation(c.id, e)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-red-400 rounded transition-opacity"
                  title="Delete chat"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Chat Thread Area */}
      <div className="flex-1 flex flex-col bg-slate-950/80">
        {/* Top Controls Bar */}
        <div className="px-6 py-2.5 border-b flex items-center justify-between text-xs text-slate-400 font-mono bg-slate-900/40" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300">Model: Deterministic & Semantic Technical Grounding Engine</span>
          </div>
          {messages.length > 0 && (
            <button
              onClick={exportConversationMarkdown}
              className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-slate-800 text-sky-400 hover:bg-slate-700 transition-colors"
              title="Download conversation transcript as Markdown"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Transcript</span>
            </button>
          )}
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.length === 0 ? (
            <div className="max-w-3xl mx-auto py-10 space-y-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center mx-auto shadow-xl shadow-sky-500/20">
                <Bot className="w-8 h-8 text-slate-950" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-slate-100">Aegis Series-7 AI Knowledge Assistant</h2>
                <p className="text-sm text-slate-400 max-w-lg mx-auto">
                  Ask technical questions regarding hydraulic schematics, operating pressure setpoints, ECNs, alarm procedures, and component specifications.
                </p>
              </div>

              {/* Quick Jump Buttons */}
              <div className="text-left space-y-3">
                <p className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
                  Suggested Evaluation Queries:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {EXAMPLE_QUESTIONS.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q)}
                      className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-sky-500/50 hover:bg-slate-800/80 text-left text-xs text-slate-300 transition-all flex items-start space-x-2.5 group"
                    >
                      <Sparkles className="w-4 h-4 text-sky-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <span>{q}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            messages.map((m, idx) => (
              <div
                key={idx}
                className={`max-w-4xl mx-auto flex space-x-3.5 ${
                  m.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {m.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-500/40 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-sky-400" />
                  </div>
                )}

                <div className={`space-y-3 max-w-3xl ${m.role === 'user' ? 'w-auto' : 'w-full'}`}>
                  {m.role === 'user' ? (
                    <div className="p-3.5 rounded-2xl bg-sky-600 text-slate-50 text-sm font-medium shadow-md">
                      {m.content}
                    </div>
                  ) : (
                    <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-5 space-y-4 shadow-xl">
                      {/* Direct Answer */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sky-400 flex items-center space-x-1.5">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>DIRECT TECHNICAL ANSWER</span>
                          </span>
                          {m.applicable_revision && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
                              {m.applicable_revision}
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-semibold text-slate-100 leading-relaxed">
                          {m.direct_answer || m.content}
                        </p>
                      </div>

                      {/* Technical Explanation */}
                      {m.explanation && (
                        <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-1">
                          <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold block">
                            TECHNICAL EXPLANATION &amp; ANALYSIS
                          </span>
                          <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                            {m.explanation}
                          </p>
                        </div>
                      )}

                      {/* Explicit Missing Information / Limitations Banner */}
                      {m.missing_information && (
                        <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start space-x-2.5">
                          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                          <div>
                            <span className="font-bold font-mono text-[11px] block">DOCUMENTED LIMITATION / UNKNOWN PARAMETER:</span>
                            <span className="text-[11px] text-amber-200/90">{m.missing_information}</span>
                          </div>
                        </div>
                      )}

                      {/* Supporting Evidence Accordion */}
                      {m.supporting_evidence && m.supporting_evidence.length > 0 && (
                        <div className="border-t border-slate-800/80 pt-3">
                          <button
                            onClick={() => toggleEvidence(idx)}
                            className="flex items-center justify-between w-full text-xs font-mono text-slate-400 hover:text-sky-400 transition-colors"
                          >
                            <span className="flex items-center space-x-1.5">
                              <FileText className="w-3.5 h-3.5 text-sky-400" />
                              <span>SUPPORTING EVIDENCE &amp; CITATIONS ({m.supporting_evidence.length})</span>
                            </span>
                            {expandedEvidence[idx] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>

                          {expandedEvidence[idx] && (
                            <div className="mt-3 space-y-2.5">
                              {m.supporting_evidence.map((ev, eIdx) => (
                                <div
                                  key={eIdx}
                                  className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs font-mono space-y-1.5"
                                >
                                  <div className="flex items-center justify-between text-slate-400 text-[11px]">
                                    <span className="text-sky-400 font-bold flex items-center space-x-1">
                                      <span>📄 {ev.document}</span>
                                      <span className="text-slate-500">| Page {ev.page}</span>
                                    </span>
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                                      {ev.section}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-slate-300 italic font-sans bg-slate-900/60 p-2 rounded border border-slate-800">
                                    "{ev.excerpt}"
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Message Footer: Actions & Confidence */}
                      <div className="flex items-center justify-between border-t border-slate-800/80 pt-3 text-xs text-slate-400 font-mono">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => handleCopy(m.direct_answer || m.content, idx)}
                            className="flex items-center space-x-1 hover:text-slate-200 transition-colors"
                            title="Copy answer"
                          >
                            {copiedId === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedId === idx ? 'Copied' : 'Copy'}</span>
                          </button>

                          {m.id && (
                            <div className="flex items-center space-x-1.5 pl-2 border-l border-slate-800">
                              <button
                                onClick={() => handleFeedback(m.id!, 'positive')}
                                className={`p-1 rounded hover:bg-slate-800 transition-colors ${
                                  m.user_feedback === 'positive' ? 'text-emerald-400' : 'text-slate-400'
                                }`}
                                title="Accurate"
                              >
                                <ThumbsUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleFeedback(m.id!, 'negative')}
                                className={`p-1 rounded hover:bg-slate-800 transition-colors ${
                                  m.user_feedback === 'negative' ? 'text-red-400' : 'text-slate-400'
                                }`}
                                title="Inaccurate"
                              >
                                <ThumbsDown className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center space-x-2">
                          <span>Confidence:</span>
                          <span className="text-emerald-400 font-bold">
                            {((m.confidence_score || 1.0) * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {m.role === 'user' && (
                  <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4 text-slate-300" />
                  </div>
                )}
              </div>
            ))
          )}

          {loading && (
            <div className="max-w-4xl mx-auto flex items-start space-x-3.5">
              <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-500/40 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-sky-400 animate-spin" />
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                <span>Retrieving evidence from ChromaDB vector store and SQLite structured claims...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Query Input Box */}
        <div className="p-4 border-t bg-slate-900/90" style={{ borderColor: 'var(--border-subtle)' }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="max-w-4xl mx-auto flex items-center space-x-3"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask any technical question (e.g. 'What is normal operating pressure for HPU?')..."
              className="flex-1 bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all font-mono"
            />
            <button
              type="submit"
              disabled={loading || !inputMessage.trim()}
              className="p-3 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-bold transition-all shadow-lg shadow-sky-500/20"
              title="Send technical inquiry"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
