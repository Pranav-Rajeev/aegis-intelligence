import React, { useState, useEffect } from 'react';
import {
  Cpu,
  Search,
  Filter,
  Plus,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Clock,
  Layers,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RefreshCw
} from 'lucide-react';
import { api } from '../services/api';
import { ComponentItem } from '../types';

export const ComponentsPage: React.FC = () => {
  const [components, setComponents] = useState<ComponentItem[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedComp, setSelectedComp] = useState<ComponentItem | null>(null);
  const [loading, setLoading] = useState(true);

  // Alias testing state
  const [testQuery, setTestQuery] = useState('');
  const [targetMergeComp, setTargetMergeComp] = useState('');
  const [testResult, setTestResult] = useState<any | null>(null);
  const [testing, setTesting] = useState(false);

  // Add Alias form
  const [newAlias, setNewAlias] = useState('');
  const [aliasSubmitting, setAliasSubmitting] = useState(false);
  const [aliasSuccess, setAliasSuccess] = useState<string | null>(null);

  const fetchComponents = async () => {
    try {
      setLoading(true);
      const data = await api.getComponents({
        search: search || undefined,
        status: statusFilter || undefined
      });
      setComponents(data);
      if (data.length > 0 && !selectedComp) {
        setSelectedComp(data[0]);
      }
    } catch (err) {
      console.error('Error fetching components:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComponents();
  }, [search, statusFilter]);

  const handleTestResolution = async () => {
    if (!testQuery.trim()) return;
    try {
      setTesting(true);
      const res = await api.resolveAlias(testQuery, targetMergeComp || undefined);
      setTestResult(res);
    } catch (err) {
      console.error('Error resolving alias:', err);
    } finally {
      setTesting(false);
    }
  };

  const handleAddAlias = async () => {
    if (!selectedComp || !newAlias.trim()) return;
    try {
      setAliasSubmitting(true);
      await api.addAlias(selectedComp.component_id, newAlias.trim());
      setAliasSuccess(`Alias '${newAlias}' added to ${selectedComp.component_id}`);
      setNewAlias('');
      fetchComponents();
      // refresh selected component
      const updated = await api.getComponentDetail(selectedComp.component_id);
      setSelectedComp(updated);
      setTimeout(() => setAliasSuccess(null), 3000);
    } catch (err) {
      console.error('Error adding alias:', err);
    } finally {
      setAliasSubmitting(false);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
          <Cpu className="w-5 h-5 text-sky-400" />
          <span>Component Registry &amp; Alias Resolution Engine</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1 font-mono">
          Strict identifier disambiguation: enforces component boundaries (e.g. PS-04A and PS-40 remain strictly isolated).
        </p>
      </div>

      {/* Interactive Alias Disambiguation & Merge Safety Tester */}
      <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-200 font-mono flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Interactive Entity Disambiguation &amp; Merge Safety Tester</span>
          </h2>
          <span className="text-[10px] text-sky-400 font-mono">Context-Aware Matcher</span>
        </div>
        <p className="text-xs text-slate-400">
          Test how incoming queries or identifier variants (e.g. "P.S.04-A", "HP unit", "IV21", "PS-40") are resolved to canonical entities, and verify merge safety rules.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono">
          <div className="md:col-span-1">
            <label className="text-[10px] text-slate-400 uppercase block mb-1">Query or Variant String</label>
            <input
              type="text"
              value={testQuery}
              onChange={(e) => setTestQuery(e.target.value)}
              placeholder="e.g. 'P.S.04-A' or 'PS-40' or 'HP unit'"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="md:col-span-1">
            <label className="text-[10px] text-slate-400 uppercase block mb-1">Check Merge With (Optional)</label>
            <select
              value={targetMergeComp}
              onChange={(e) => setTargetMergeComp(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
            >
              <option value="">None (Resolve Only)</option>
              {components.map((c) => (
                <option key={c.id} value={c.component_id}>{c.component_id} ({c.common_name})</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-1 flex items-end">
            <button
              onClick={handleTestResolution}
              disabled={!testQuery.trim() || testing}
              className="w-full px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 disabled:opacity-40 text-slate-950 font-bold text-xs font-mono transition-all shadow-md shadow-sky-500/20"
            >
              {testing ? 'Evaluating...' : 'Test Resolution & Safety'}
            </button>
          </div>
        </div>

        {/* Test Result Display */}
        {testResult && (
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-2 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Canonical Resolved Entity:</span>
              <span className="font-bold text-sky-400 text-sm">
                {testResult.resolution ? testResult.resolution.canonical_id : 'NO CANONICAL MATCH'}
              </span>
            </div>
            {testResult.resolution && (
              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span>Resolution Strategy: <span className="text-slate-200">{testResult.resolution.resolution_type}</span></span>
                <span>Confidence: <span className="text-emerald-400 font-bold">{Math.round(testResult.resolution.confidence * 100)}%</span></span>
              </div>
            )}
            {testResult.safety_check && (
              <div className={`p-2.5 rounded-lg border text-[11px] flex items-start space-x-2 mt-2 ${
                testResult.safety_check.can_merge
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : 'bg-red-500/15 border-red-500/40 text-red-300'
              }`}>
                {testResult.safety_check.can_merge ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                ) : (
                  <XCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                )}
                <div>
                  <span className="font-bold block">
                    {testResult.safety_check.can_merge ? 'MERGE PERMITTED' : 'MERGE FORBIDDEN (BOUNDARY VIOLATION)'}
                  </span>
                  <p className="text-[10px] mt-0.5 opacity-90">{testResult.safety_check.rationale}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Catalog & Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Component Catalog List */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 lg:col-span-1">
          <div className="space-y-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search components or aliases..."
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 font-mono"
            />
            <div className="flex items-center space-x-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800/80">
              <button
                onClick={() => setStatusFilter('')}
                className={`flex-1 py-1 text-[11px] rounded font-mono font-semibold transition-all duration-200 ${
                  statusFilter === ''
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-[0_0_8px_rgba(56,189,248,0.2)]'
                    : 'text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter('Active')}
                className={`flex-1 py-1 text-[11px] rounded font-mono font-semibold transition-all duration-200 ${
                  statusFilter === 'Active'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_8px_rgba(52,211,153,0.2)]'
                    : 'text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setStatusFilter('Superseded')}
                className={`flex-1 py-1 text-[11px] rounded font-mono font-semibold transition-all duration-200 ${
                  statusFilter === 'Superseded'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-[0_0_8px_rgba(251,191,36,0.2)]'
                    : 'text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
              >
                Superseded
              </button>
            </div>
          </div>

          <div className="space-y-1.5 max-h-[550px] overflow-y-auto">
            {components.map((c) => (
              <div
                key={c.id}
                onClick={() => setSelectedComp(c)}
                className={`p-3 rounded-xl border text-xs font-mono cursor-pointer transition-all duration-200 relative overflow-hidden ${
                  selectedComp?.id === c.id
                    ? 'bg-sky-500/15 border-sky-500/50 text-slate-100 shadow-[0_0_16px_rgba(56,189,248,0.18)] pl-3.5 translate-x-1'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-800/80 hover:text-slate-200 hover:translate-x-0.5'
                }`}
              >
                {selectedComp?.id === c.id && (
                  <div className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-sky-400 rounded-r shadow-[0_0_8px_#38BDF8]" />
                )}
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sky-400 text-sm">{c.component_id}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-semibold ${
                    c.status === 'Active' ? 'badge-green' : 'badge-amber'
                  }`}>
                    {c.status}
                  </span>
                </div>
                <p className="text-[11px] text-slate-200 font-sans mt-1">{c.common_name}</p>
                <span className="text-[10px] text-slate-500 block mt-1">{c.location || 'Location unassigned'}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Component Detail Panel */}
        <div className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-5 lg:col-span-2">
          {selectedComp ? (
            <div className="space-y-5 font-mono text-xs">
              {/* Header */}
              <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center space-x-3">
                    <span className="text-xl font-bold text-sky-400">{selectedComp.component_id}</span>
                    <span className={`text-xs px-2 py-0.5 rounded font-semibold ${
                      selectedComp.status === 'Active' ? 'badge-green' : 'badge-amber'
                    }`}>
                      {selectedComp.status}
                    </span>
                  </div>
                  <h2 className="text-sm font-semibold text-slate-200 font-sans mt-1">{selectedComp.common_name}</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Location: <span className="text-slate-200">{selectedComp.location}</span></p>
                </div>
              </div>

              {/* Engineering Notes */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase text-slate-500 font-bold block">Engineering Description &amp; Notes:</span>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">{selectedComp.notes || 'No description provided.'}</p>
              </div>

              {/* Aliases List & Add Alias */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-slate-200 flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-sky-400" />
                  <span>Known Aliases &amp; Formatting Variants ({selectedComp.aliases.length})</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedComp.aliases.map((alias, aIdx) => (
                    <span key={aIdx} className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-sky-300 text-[11px]">
                      {alias}
                    </span>
                  ))}
                </div>

                {/* Add Alias inline form */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center space-x-2">
                  <input
                    type="text"
                    value={newAlias}
                    onChange={(e) => setNewAlias(e.target.value)}
                    placeholder="Register new alias (e.g. 'Unit-4 HPU')..."
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500"
                  />
                  <button
                    onClick={handleAddAlias}
                    disabled={!newAlias.trim() || aliasSubmitting}
                    className="px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 disabled:opacity-40 text-slate-950 font-bold text-xs"
                  >
                    Add Alias
                  </button>
                </div>
                {aliasSuccess && <p className="text-[10px] text-emerald-400">{aliasSuccess}</p>}
              </div>

              {/* Document References */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-200 flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-sky-400" />
                  <span>Referenced Technical Documents ({selectedComp.document_references.length})</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedComp.document_references.map((doc, dIdx) => (
                    <div key={dIdx} className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-[11px] truncate">
                      📄 {doc}
                    </div>
                  ))}
                </div>
              </div>

              {/* Revision History */}
              {selectedComp.revision_history.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-200 flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>Component Revision History</span>
                  </span>
                  <div className="space-y-1.5">
                    {selectedComp.revision_history.map((rh, rIdx) => (
                      <div key={rIdx} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px]">
                        <span className="text-amber-400 font-bold mr-2">Rev {rh.revision}:</span>
                        <span className="text-slate-300 font-sans">{rh.change}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-24 text-slate-500 font-mono">
              Select a component to inspect details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
