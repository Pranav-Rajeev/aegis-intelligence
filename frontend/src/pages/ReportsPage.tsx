import React, { useState, useEffect } from 'react';
import {
  FileText,
  AlertTriangle,
  Bookmark as BookmarkIcon,
  Download,
  CheckCircle2,
  Sparkles,
  Printer,
  ShieldAlert,
  Trash2,
  ExternalLink
} from 'lucide-react';
import { api } from '../services/api';
import { KnowledgeGap } from '../types';

export const ReportsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'generator' | 'gaps' | 'bookmarks'>('generator');
  const [gaps, setGaps] = useState<KnowledgeGap[]>([]);
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [reportTitle, setReportTitle] = useState('Aegis Series-7 Technical System Audit');
  const [reportPreview, setReportPreview] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [gapsData, bookmarksData] = await Promise.all([
        api.getKnowledgeGaps(),
        api.getBookmarks()
      ]);
      setGaps(gapsData);
      setBookmarks(bookmarksData);
    } catch (err) {
      console.error('Error fetching reports data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleGenerateReport = async () => {
    try {
      setGenerating(true);
      const res = await api.generateReport({ title: reportTitle });
      setReportPreview(res.markdown);
    } catch (err) {
      console.error('Error generating report:', err);
    } finally {
      setGenerating(false);
    }
  };

  const handleDeleteBookmark = async (id: number) => {
    try {
      await api.deleteBookmark(id);
      fetchData();
    } catch (err) {
      console.error('Error deleting bookmark:', err);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
            <FileText className="w-5 h-5 text-sky-400" />
            <span>Technical Report Generator &amp; Knowledge Gaps</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Synthesize formal compliance documentation, export PDF reports, and detect unverified engineering parameters.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs font-mono">
          <button
            onClick={() => setActiveTab('generator')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center space-x-1.5 ${
              activeTab === 'generator' ? 'bg-sky-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Report Generator</span>
          </button>
          <button
            onClick={() => setActiveTab('gaps')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center space-x-1.5 ${
              activeTab === 'gaps' ? 'bg-sky-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Knowledge Gaps ({gaps.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center space-x-1.5 ${
              activeTab === 'bookmarks' ? 'bg-sky-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookmarkIcon className="w-3.5 h-3.5" />
            <span>Saved Knowledge ({bookmarks.length})</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Technical Report Generator (Section 13.A) */}
      {activeTab === 'generator' && (
        <div className="space-y-6">
          <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
            <h2 className="text-sm font-bold text-slate-200 font-mono">Configure Report Generation</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <div className="md:col-span-2">
                <label className="text-[10px] text-slate-400 uppercase block mb-1">Report Title</label>
                <input
                  type="text"
                  value={reportTitle}
                  onChange={(e) => setReportTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 font-mono focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleGenerateReport}
                  disabled={generating}
                  className="w-full px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 disabled:opacity-40 text-slate-950 font-bold text-xs font-mono transition-all shadow-md shadow-sky-500/20 flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{generating ? 'Compiling Report...' : 'Generate Technical Report'}</span>
                </button>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3 font-mono text-xs">
              <span className="text-[10px] text-slate-500 uppercase">Export Options:</span>
              <a
                href="/api/reports/download-pdf"
                download="aegis_technical_report.pdf"
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 border border-slate-700 flex items-center space-x-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download ReportLab PDF</span>
              </a>
              <a
                href="/api/reports/download-md"
                download="aegis_technical_report.md"
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center space-x-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Markdown (.md)</span>
              </a>
            </div>
          </div>

          {/* Report Preview */}
          {reportPreview && (
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-2xl font-mono text-xs animate-in fade-in duration-150">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="font-bold text-sky-400 text-sm">Compiled Report Preview</span>
                <span className="text-[10px] text-slate-400">8 Sections Formatted</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 whitespace-pre-wrap leading-relaxed text-slate-300 max-h-[600px] overflow-y-auto">
                {reportPreview}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Knowledge Gap Detector (Section 13.B) */}
      {activeTab === 'gaps' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <h2 className="text-sm font-bold text-slate-200 font-mono flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Identified Technical Knowledge Gaps &amp; Missing Specifications</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              The platform automatically surfaces missing parameters and unverified specifications rather than hallucinating answers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {gaps.map((g) => (
              <div
                key={g.id}
                className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/30 space-y-3 hover:border-amber-500/60 transition-colors shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">{g.id}: {g.category}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                    {g.status}
                  </span>
                </div>

                <div>
                  <span className="text-slate-500 text-[10px] block">Entity &amp; Missing Parameter:</span>
                  <p className="text-slate-100 font-bold text-sm font-sans">{g.entity} → {g.parameter}</p>
                </div>

                <p className="text-[11px] text-slate-300 font-sans leading-relaxed bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  {g.description}
                </p>

                <div className="pt-1 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                  <span className="text-slate-400">Impact: <span className="text-slate-200 font-bold">{g.impact}</span></span>
                  <span className="text-sky-400">Rec: {g.recommendation}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Saved Knowledge Bookmarks (Section 13.F) */}
      {activeTab === 'bookmarks' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <h2 className="text-sm font-bold text-slate-200 font-mono flex items-center space-x-2">
              <BookmarkIcon className="w-4 h-4 text-sky-400" />
              <span>Saved Technical Knowledge &amp; Bookmarks</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Persisted technical claims, component records, and assistant answers for quick reference.
            </p>
          </div>

          {bookmarks.length === 0 ? (
            <div className="p-12 text-center text-slate-500 font-mono text-xs">
              No saved knowledge bookmarks yet. Bookmark answers or claims to save them here.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 font-mono text-xs">
              {bookmarks.map((b) => (
                <div key={b.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sky-400 font-bold">{b.title}</span>
                    <button
                      onClick={() => handleDeleteBookmark(b.id)}
                      className="p-1 text-slate-500 hover:text-red-400 transition-colors"
                      title="Remove bookmark"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-slate-300 font-sans text-[11px] bg-slate-950 p-2 rounded border border-slate-800">
                    "{b.snippet}"
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span>Source: {b.source || 'Knowledge Assistant'}</span>
                    <span>{new Date(b.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
