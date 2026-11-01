import React, { useState, useEffect } from 'react';
import {
  Wrench,
  Search,
  AlertTriangle,
  ShieldAlert,
  CheckCircle2,
  Clock,
  FileText,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { api } from '../services/api';
import { TroubleshootingProcedure } from '../types';

export const TroubleshootingPage: React.FC = () => {
  const [query, setQuery] = useState('A17');
  const [procedure, setProcedure] = useState<TroubleshootingProcedure | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchProcedure = async (issueQuery: string) => {
    try {
      setLoading(true);
      const data = await api.getTroubleshooting(issueQuery);
      setProcedure(data);
    } catch (err) {
      console.error('Error fetching troubleshooting procedure:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProcedure('A17');
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      fetchProcedure(query.trim());
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
          <Wrench className="w-5 h-5 text-sky-400" />
          <span>Technical Troubleshooting &amp; Alarm Response Assistant</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1 font-mono">
          Strictly evidence-backed procedural steps derived from Maintenance Manual AEG-MM-700 &amp; Alarm Reference AEG-AL-700. Zero fabricated safety steps.
        </p>
      </div>

      {/* Query Search Bar & Preset Alarm Buttons */}
      <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
        <form onSubmit={handleSearch} className="flex items-center space-x-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter alarm tag or symptom (e.g. 'A17', 'A18', 'controller reset', 'low pressure')..."
              className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500 font-mono"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="px-5 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 disabled:opacity-40 text-slate-950 font-bold text-xs font-mono transition-all shadow-md shadow-sky-500/20"
          >
            {loading ? 'Retrieving Procedure...' : 'Retrieve Procedure'}
          </button>
        </form>

        <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
          <span className="text-[10px] text-slate-500 uppercase">Quick Diagnostic Presets:</span>
          {['A17 (Low Pressure)', 'A18 (High Pressure)', 'PLC-03 Controller Reset'].map((preset) => (
            <button
              key={preset}
              onClick={() => {
                const code = preset.split(' ')[0];
                setQuery(code);
                fetchProcedure(code);
              }}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-sky-300 text-[11px] border border-slate-700 transition-colors"
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      {/* Procedure Display Panel */}
      {procedure && (
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-2xl font-mono text-xs animate-in fade-in duration-150">
          {/* Header & Official Citation */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center space-x-3">
                <span className="text-lg font-bold text-slate-100">{procedure.title}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                  procedure.severity.includes('CRITICAL') || procedure.severity.includes('RED')
                    ? 'badge-red'
                    : 'badge-amber'
                }`}>
                  {procedure.severity}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans mt-1">
                Official Procedure: <span className="text-sky-400 font-mono">{procedure.official_procedure_reference}</span>
              </p>
            </div>
            <div className="text-[10px] text-slate-500 text-right">
              <span>Provenance: {procedure.source_citation}</span>
            </div>
          </div>

          {/* Mandatory Immediate Rule / Persistence Condition */}
          <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/40 text-red-200 space-y-1.5">
            <span className="text-[11px] uppercase font-bold text-red-400 flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4" />
              <span>MANDATORY ACTION TRIGGER: {procedure.immediate_mandatory_action.rule}</span>
            </span>
            <p className="text-xs font-sans leading-relaxed text-red-100">
              {procedure.immediate_mandatory_action.instruction}
            </p>
          </div>

          {/* Controller Reset Safety Warning if applicable */}
          {procedure.controller_reset_warning && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-200 space-y-1">
              <span className="text-[11px] uppercase font-bold text-amber-400 flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4" />
                <span>SAFETY INTERLOCK REQUIREMENT:</span>
              </span>
              <p className="text-xs font-sans leading-relaxed text-amber-100">
                {procedure.controller_reset_warning}
              </p>
            </div>
          )}

          {/* Documented Causes */}
          {procedure.documented_possible_causes.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] uppercase text-slate-400 font-bold block">
                Documented Possible Causes (Alarm Reference):
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                {procedure.documented_possible_causes.map((cause, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 font-sans text-xs">
                    {cause}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step-by-Step Procedure Checklist */}
          {procedure.shutdown_procedure_4_7_steps.length > 0 && (
            <div className="space-y-3 p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs font-bold text-slate-200 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Shutdown Procedure 4.7 Step-by-Step Protocol:</span>
              </span>
              <div className="space-y-2">
                {procedure.shutdown_procedure_4_7_steps.map((step, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 flex items-center space-x-3 text-slate-200">
                    <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 font-bold flex items-center justify-center text-[10px] shrink-0">
                      {idx + 1}
                    </span>
                    <span className="font-sans text-xs">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
