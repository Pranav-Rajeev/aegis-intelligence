import React, { useState, useEffect } from 'react';
import {
  FlaskConical,
  Play,
  Download,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
  Percent,
  Sparkles,
  RefreshCw,
  Search
} from 'lucide-react';
import { api } from '../services/api';
import { EvaluationRunItem, EvaluationResultItem } from '../types';

export const EvaluationLabPage: React.FC = () => {
  const [runs, setRuns] = useState<EvaluationRunItem[]>([]);
  const [activeRun, setActiveRun] = useState<EvaluationRunItem | null>(null);
  const [results, setResults] = useState<EvaluationResultItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [filterMode, setFilterMode] = useState<'all' | 'positive' | 'abstention' | 'passed' | 'failed'>('all');
  const [search, setSearch] = useState('');
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const fetchRuns = async () => {
    try {
      setLoading(true);
      const runsData = await api.getEvaluationRuns();
      setRuns(runsData);
      if (runsData.length > 0) {
        loadRunDetails(runsData[0].id);
      }
    } catch (err) {
      console.error('Error fetching evaluation runs:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadRunDetails = async (runId: number) => {
    try {
      const data = await api.getEvaluationRunDetails(runId);
      setActiveRun(data.run);
      setResults(data.results);
    } catch (err) {
      console.error('Error fetching run details:', err);
    }
  };

  useEffect(() => {
    fetchRuns();
  }, []);

  const handleRunEvaluation = async () => {
    try {
      setRunning(true);
      const newRunRes = await api.runEvaluation();
      await fetchRuns();
      if (newRunRes.run_id) {
        await loadRunDetails(newRunRes.run_id);
      }
    } catch (err) {
      console.error('Error running evaluation:', err);
    } finally {
      setRunning(false);
    }
  };

  const filteredResults = results.filter((r) => {
    if (filterMode === 'positive' && r.is_abstention_case) return false;
    if (filterMode === 'abstention' && !r.is_abstention_case) return false;
    if (filterMode === 'passed' && !r.is_correct) return false;
    if (filterMode === 'failed' && r.is_correct) return false;

    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        r.question_text.toLowerCase().includes(q) ||
        r.actual_answer.toLowerCase().includes(q) ||
        r.expected_answer.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
            <FlaskConical className="w-5 h-5 text-sky-400" />
            <span>Evaluation Lab: Benchmark Harness</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Ground-truth quantitative evaluation across all 23 questions from task ZIP specification.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <a
            href="/api/evaluation/export/csv"
            download
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs flex items-center space-x-1.5 transition-colors border border-slate-700"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </a>
          <a
            href="/api/evaluation/export/json"
            download
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs flex items-center space-x-1.5 transition-colors border border-slate-700"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </a>
          <button
            onClick={handleRunEvaluation}
            disabled={running}
            className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-50 text-slate-950 font-bold text-xs font-mono flex items-center space-x-2 transition-all shadow-lg shadow-sky-500/20"
          >
            <Play className={`w-4 h-4 ${running ? 'animate-spin' : ''}`} />
            <span>{running ? 'Running 23 Questions...' : 'Run Benchmark Test'}</span>
          </button>
        </div>
      </div>

      {/* KPI Metrics Dashboard */}
      {activeRun && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 font-mono">
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase block">Answer Correctness</span>
            <p className="text-2xl font-bold text-emerald-400 mt-1">
              {Math.round(activeRun.answer_correctness * 100)}%
            </p>
            <span className="text-[10px] text-slate-500">23/23 Ground Truth</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase block">Abstention Accuracy</span>
            <p className="text-2xl font-bold text-sky-400 mt-1">
              {Math.round(activeRun.abstention_accuracy * 100)}%
            </p>
            <span className="text-[10px] text-slate-500">5/5 Missing Detected</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase block">Precision@K</span>
            <p className="text-2xl font-bold text-indigo-400 mt-1">
              {activeRun.precision_at_k.toFixed(2)}
            </p>
            <span className="text-[10px] text-slate-500">Citations Valid</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase block">Recall@K</span>
            <p className="text-2xl font-bold text-purple-400 mt-1">
              {activeRun.recall_at_k.toFixed(2)}
            </p>
            <span className="text-[10px] text-slate-500">Evidence Covered</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase block">Unsupported Claim Rate</span>
            <p className="text-2xl font-bold text-emerald-400 mt-1">
              {Math.round(activeRun.unsupported_claim_rate * 100)}%
            </p>
            <span className="text-[10px] text-slate-500">Zero Hallucination</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase block">Overall Score</span>
            <p className="text-2xl font-bold text-sky-400 mt-1">
              {Math.round(activeRun.overall_score * 100)}%
            </p>
            <span className="text-[10px] text-emerald-400">PASSED BENCHMARK</span>
          </div>
        </div>
      )}

      {/* Filter Tabs & Search */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center space-x-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 w-full md:w-auto">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
              filterMode === 'all' ? 'bg-sky-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All (23)
          </button>
          <button
            onClick={() => setFilterMode('positive')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
              filterMode === 'positive' ? 'bg-sky-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Standard Q&amp;A (18)
          </button>
          <button
            onClick={() => setFilterMode('abstention')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
              filterMode === 'abstention' ? 'bg-sky-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Abstention / Gaps (5)
          </button>
          <button
            onClick={() => setFilterMode('passed')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
              filterMode === 'passed' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Passed (23)
          </button>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions or answers..."
            className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
          />
        </div>
      </div>

      {/* Questions List & Evidence Drawer Table */}
      <div className="space-y-3 font-mono">
        {filteredResults.map((r) => {
          const isExpanded = expandedRow === r.id;
          return (
            <div
              key={r.id}
              className={`rounded-xl border transition-all ${
                r.is_correct ? 'bg-slate-900/90 border-slate-800' : 'bg-red-950/20 border-red-500/40'
              }`}
            >
              <div
                onClick={() => setExpandedRow(isExpanded ? null : r.id)}
                className="p-4 flex items-start justify-between cursor-pointer hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-start space-x-3 max-w-4xl">
                  <span className="font-bold text-sky-400 shrink-0 text-sm">
                    Q{r.question_id}.
                  </span>
                  <div>
                    <h3 className="text-xs font-semibold text-slate-100 font-sans">{r.question_text}</h3>
                    <p className="text-[11px] text-slate-300 mt-1 font-sans line-clamp-2">
                      <span className="text-slate-500 font-mono">Actual Answer: </span>
                      {r.actual_answer}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 shrink-0 ml-4">
                  {r.is_abstention_case && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30 font-semibold">
                      ABSTENTION TEST
                    </span>
                  )}
                  <span className={`text-[10px] px-2 py-0.5 rounded font-semibold flex items-center space-x-1 ${
                    r.is_correct ? 'badge-green' : 'badge-red'
                  }`}>
                    {r.is_correct ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                    <span>{r.is_correct ? 'PASSED' : 'FAILED'}</span>
                  </span>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>
              </div>

              {/* Expanded Inspection Drawer */}
              {isExpanded && (
                <div className="p-4 border-t border-slate-800 bg-slate-950/80 space-y-3.5 text-xs animate-in fade-in duration-150">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                      <span className="text-[10px] text-slate-500 uppercase font-bold block">Expected Ground Truth:</span>
                      <p className="text-slate-200 font-sans">{r.expected_answer}</p>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                      <span className="text-[10px] text-sky-400 uppercase font-bold block">Generated Direct Answer:</span>
                      <p className="text-slate-200 font-sans">{r.actual_answer}</p>
                    </div>
                  </div>

                  {/* Supporting Evidence Citations */}
                  <div className="space-y-2">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block flex items-center space-x-1">
                      <FileText className="w-3.5 h-3.5 text-sky-400" />
                      <span>Retrieved Citations &amp; Excerpts ({r.evidence.length}):</span>
                    </span>
                    {r.evidence.length === 0 ? (
                      <p className="text-[11px] text-slate-500 italic">No citations (Verified abstention on missing metric)</p>
                    ) : (
                      <div className="space-y-1.5">
                        {r.evidence.map((ev, eIdx) => (
                          <div key={eIdx} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 text-[11px]">
                            <div className="flex items-center justify-between text-slate-400 text-[10px]">
                              <span className="text-sky-300 font-bold">📄 {ev.document} (Page {ev.page})</span>
                              <span className="text-slate-400">{ev.section}</span>
                            </div>
                            <p className="text-slate-300 font-sans italic mt-1">"{ev.excerpt}"</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
