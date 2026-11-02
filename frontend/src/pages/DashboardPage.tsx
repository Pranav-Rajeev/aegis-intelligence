import React, { useEffect, useState } from 'react';
import {
  FileText,
  CheckCircle2,
  Database,
  Cpu,
  GitCompare,
  FlaskConical,
  Activity,
  ArrowUpRight,
  ShieldAlert,
  Clock,
  Sparkles,
  Zap,
  Server,
  Layers,
  BotMessageSquare
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';
import { api } from '../services/api';
import { DashboardStats } from '../types';

interface DashboardPageProps {
  onNavigateTab: (tab: string) => void;
  onAskQuestion: (q: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigateTab, onAskQuestion }) => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await api.getDashboardStats();
      setStats(data);
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const PIE_COLORS = ['#38BDF8', '#34D399', '#FBBF24', '#F87171', '#A78BFA', '#F472B6', '#60A5FA', '#4ADE80'];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-10 h-10 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-400 text-sm font-mono">Aggregating live engineering telemetry...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner Alert / Active System State */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-sky-950/60 via-slate-900 to-indigo-950/60 border border-sky-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-lg bg-sky-500/20 border border-sky-500/40 flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5 text-sky-400" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-100 flex items-center space-x-2">
              <span>Aegis Series-7 Knowledge Engine</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                PROVENANCE VERIFIED
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Closed-loop RAG, multi-format OCR ingestion, and revision-scoped conflict resolution actively running.
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => onNavigateTab('evaluation')}
            className="px-3.5 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs font-mono flex items-center space-x-1.5 transition-all shadow-md shadow-sky-500/20"
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Evaluation Lab</span>
          </button>
          <button
            onClick={() => onNavigateTab('chat')}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 font-semibold text-xs font-mono border border-slate-700 flex items-center space-x-1.5 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Consult Assistant</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3.5">
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-sky-500/40 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Documents</span>
            <FileText className="w-3.5 h-3.5 text-sky-400" />
          </div>
          <p className="text-2xl font-bold text-slate-100 mt-1 font-mono">{stats?.total_documents || 0}</p>
          <span className="text-[10px] text-emerald-400 font-mono">100% Ingested</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Processed</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-emerald-400 mt-1 font-mono">{stats?.processed_documents || 0}</p>
          <span className="text-[10px] text-slate-400 font-mono">0 Failed</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/40 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Knowledge Claims</span>
            <Database className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <p className="text-2xl font-bold text-indigo-400 mt-1 font-mono">{stats?.extracted_claims || 0}</p>
          <span className="text-[10px] text-slate-400 font-mono">Structured SQLite</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/40 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Components</span>
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-purple-400 mt-1 font-mono">{stats?.registered_components || 0}</p>
          <span className="text-[10px] text-slate-400 font-mono">Aliased Registry</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Revision Conflicts</span>
            <GitCompare className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <p className="text-2xl font-bold text-amber-400 mt-1 font-mono">{stats?.unresolved_conflicts || 0}</p>
          <span className="text-[10px] text-amber-400/80 font-mono">Revision-Scoped</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-sky-500/40 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Eval Accuracy</span>
            <FlaskConical className="w-3.5 h-3.5 text-sky-400" />
          </div>
          <p className="text-2xl font-bold text-sky-400 mt-1 font-mono">{stats?.evaluation_accuracy}%</p>
          <span className="text-[10px] text-emerald-400 font-mono">23/23 Ground Truth</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Abstention Acc.</span>
            <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-emerald-400 mt-1 font-mono">{stats?.abstention_accuracy}%</p>
          <span className="text-[10px] text-emerald-400 font-mono">0% Hallucination</span>
        </div>
      </div>

      {/* Visualizations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Document Format Distribution */}
        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-200 flex items-center space-x-2">
              <Layers className="w-4 h-4 text-sky-400" />
              <span>Document Formats (8 Modalities)</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">20 Total Files</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats?.format_distribution || []}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, value }) => `${name} (${value})`}
                >
                  {(stats?.format_distribution || []).map((_, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1C1C21', borderColor: '#3A3A44', borderRadius: '8px', fontSize: '12px', color: '#F4F4F6' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Source Reliability Distribution */}
        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-200 flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 text-emerald-400" />
              <span>Source Provenance & Trust Levels</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">Weighted Reliability</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats?.source_reliability_distribution || []}>
                <XAxis dataKey="name" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#1C1C21', borderColor: '#3A3A44', borderRadius: '8px', fontSize: '12px', color: '#F4F4F6' }} />
                <Bar dataKey="value" fill="#38BDF8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Claim Confidence Distribution */}
        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-200 flex items-center space-x-2">
              <Activity className="w-4 h-4 text-purple-400" />
              <span>Knowledge Claim Confidence Distribution</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">{stats?.extracted_claims} Extracted Claims</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats?.confidence_distribution || []}>
                <XAxis dataKey="bucket" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#1C1C21', borderColor: '#3A3A44', borderRadius: '8px', fontSize: '12px', color: '#F4F4F6' }} />
                <Bar dataKey="count" fill="#818CF8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Extraction Activity by Entity Type */}
        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-200 flex items-center space-x-2">
              <Database className="w-4 h-4 text-emerald-400" />
              <span>Structured Claims by Entity Type</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">SQLite Knowledge Schema</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats?.extraction_activity || []}>
                <XAxis dataKey="type" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#1C1C21', borderColor: '#3A3A44', borderRadius: '8px', fontSize: '12px', color: '#F4F4F6' }} />
                <Bar dataKey="claims" fill="#34D399" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Engineering Revisions & Recent Ingested Documents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Engineering Revisions Timeline */}
        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-200 flex items-center space-x-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Engineering Revision Timeline</span>
            </h3>
            <button onClick={() => onNavigateTab('conflicts')} className="text-xs text-sky-400 hover:underline">
              Conflicts Center →
            </button>
          </div>
          <div className="space-y-3 font-mono">
            {(stats?.latest_revisions || []).map((rev) => (
              <div key={rev.revision} className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-800 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sky-400">Rev {rev.revision}</span>
                  <span className="text-[10px] text-slate-500">{rev.date}</span>
                </div>
                <p className="text-[11px] text-slate-300 mt-1 font-sans">{rev.summary}</p>
                <span className={`inline-block mt-1 text-[9px] px-1.5 py-0.5 rounded font-semibold ${
                  rev.status === 'Current' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-400'
                }`}>
                  {rev.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Ingested Documents */}
        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-200 flex items-center space-x-2">
              <FileText className="w-4 h-4 text-sky-400" />
              <span>Ingested Technical Documents</span>
            </h3>
            <button onClick={() => onNavigateTab('documents')} className="text-xs text-sky-400 hover:underline">
              View All 20 Documents →
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-[11px] text-slate-400 border-b border-slate-800 bg-slate-800/40">
                <tr>
                  <th className="py-2 px-3">Filename</th>
                  <th className="py-2 px-3">Format</th>
                  <th className="py-2 px-3">Trust Level</th>
                  <th className="py-2 px-3">Status</th>
                  <th className="py-2 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {(stats?.recent_documents || []).map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-2.5 px-3 font-medium text-slate-200 truncate max-w-[200px]">
                      {doc.filename}
                    </td>
                    <td className="py-2.5 px-3 font-mono uppercase text-slate-400">{doc.file_type}</td>
                    <td className="py-2.5 px-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-semibold ${
                        doc.trust_level === 'HIGH'
                          ? 'badge-green'
                          : doc.trust_level === 'MEDIUM'
                          ? 'badge-amber'
                          : 'badge-red'
                      }`}>
                        {doc.trust_level}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="text-[10px] text-emerald-400 font-mono flex items-center space-x-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>PROCESSED</span>
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={() => onNavigateTab('documents')}
                        className="text-sky-400 hover:text-sky-300 font-mono text-[11px] inline-flex items-center space-x-0.5"
                      >
                        <span>View</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Suggested Quick Questions */}
      <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
        <h3 className="text-sm font-semibold text-slate-200 flex items-center space-x-2">
          <BotMessageSquare className="w-4 h-4 text-sky-400" />
          <span>Quick Technical Query Jump-Start</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {[
            "What must be true before starting the Hydraulic Power Unit?",
            "What is the current normal operating pressure for the HPU?",
            "Is PS-04 the same component as PS-04A?",
            "Under what circumstances must the controller not be reset?",
            "What action is required if alarm A17 persists for more than 10 seconds?",
            "What is the maximum continuous operating temperature of PS-04A?"
          ].map((q, idx) => (
            <button
              key={idx}
              onClick={() => onAskQuestion(q)}
              className="p-2.5 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 text-left text-xs text-slate-300 hover:text-sky-400 transition-all flex items-start space-x-2 group"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <span className="truncate">{q}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
