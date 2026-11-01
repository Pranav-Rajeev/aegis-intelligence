import React, { useState, useEffect } from 'react';
import {
  GitCompare,
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText,
  ShieldCheck,
  Check,
  UserCheck,
  HelpCircle,
  RefreshCw
} from 'lucide-react';
import { api } from '../services/api';
import { ConflictItem } from '../types';

export const ConflictsPage: React.FC = () => {
  const [conflicts, setConflicts] = useState<ConflictItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewingId, setReviewingId] = useState<number | null>(null);
  const [reviewerName, setReviewerName] = useState('Lead AI Engineer');
  const [reviewSuccess, setReviewSuccess] = useState<string | null>(null);

  const fetchConflicts = async () => {
    try {
      setLoading(true);
      const data = await api.getConflicts();
      setConflicts(data);
    } catch (err) {
      console.error('Error fetching conflicts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConflicts();
  }, []);

  const handleReviewSubmit = async (conflictId: number) => {
    try {
      await api.reviewConflict(conflictId, reviewerName);
      setReviewSuccess(`Conflict #${conflictId} verified and recorded.`);
      setReviewingId(null);
      fetchConflicts();
      setTimeout(() => setReviewSuccess(null), 3000);
    } catch (err) {
      console.error('Error submitting review:', err);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Page Title */}
      <div>
        <h1 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
          <GitCompare className="w-5 h-5 text-amber-400" />
          <span>Revision &amp; Technical Conflict Center</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1 font-mono">
          Detects contradictory specifications across revisions, field notes, and ECNs. Preserves version-scoped truth rather than blindly taking latest date.
        </p>
      </div>

      {reviewSuccess && (
        <div className="p-3 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
          {reviewSuccess}
        </div>
      )}

      {/* Conflicts Cards List */}
      <div className="space-y-6">
        {conflicts.map((c) => (
          <div
            key={c.id}
            className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 transition-colors shadow-xl space-y-4 font-mono text-xs"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center space-x-2.5">
                  <span className="text-sm font-bold text-amber-400">{c.entity_name}</span>
                  <span className="text-slate-500">|</span>
                  <span className="text-xs text-slate-200 font-semibold">{c.attribute}</span>
                </div>
                <p className="text-[11px] text-slate-400 font-sans mt-0.5">{c.description}</p>
              </div>

              <div className="flex items-center space-x-2">
                <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                  c.resolution_status === 'RESOLVED_BY_REVISION'
                    ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30'
                    : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                }`}>
                  {c.resolution_status}
                </span>

                {c.is_reviewed ? (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center space-x-1">
                    <Check className="w-3 h-3" />
                    <span>Reviewed by {c.reviewed_by || 'Engineer'}</span>
                  </span>
                ) : (
                  <button
                    onClick={() => setReviewingId(c.id)}
                    className="text-[10px] px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  >
                    Mark Reviewed
                  </button>
                )}
              </div>
            </div>

            {/* Conflicting Source Claims Grid */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase text-slate-400 font-bold block">
                Discrepancy Sources ({c.conflicting_claims.length}):
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {c.conflicting_claims.map((claim, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-[11px]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-[10px]">Source {idx + 1}:</span>
                      <span className={`text-[9px] px-1.5 py-0.2 rounded font-semibold ${
                        claim.trust_level === 'HIGH' ? 'badge-green' : claim.trust_level === 'MEDIUM' ? 'badge-amber' : 'badge-red'
                      }`}>
                        {claim.trust_level} TRUST
                      </span>
                    </div>

                    <div className="p-2 rounded bg-slate-900 border border-slate-800/80">
                      <span className="text-slate-500 text-[9px] block">Reported Value:</span>
                      <span className="text-sm font-bold text-slate-100">{claim.value}</span>
                    </div>

                    <div className="space-y-1 text-slate-300">
                      <p><span className="text-slate-500">Document:</span> {claim.source_document}</p>
                      <p><span className="text-slate-500">Revision:</span> {claim.revision}</p>
                      <p><span className="text-slate-500">Applicable:</span> <span className="text-sky-300">{claim.applicable_software_rev}</span></p>
                      <p><span className="text-slate-500">Notes:</span> <span className="text-slate-400 font-sans italic">{claim.notes}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resolution Rule & Scoping */}
            <div className="p-3.5 rounded-xl bg-sky-950/30 border border-sky-500/30 space-y-1.5">
              <span className="text-[10px] uppercase text-sky-400 font-bold flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>VERSION-SCOPED TECHNICAL RESOLUTION RULE:</span>
              </span>
              <p className="text-xs text-slate-200 font-sans leading-relaxed">
                {c.resolution_rule}
              </p>
              <div className="pt-1 text-[11px] text-sky-300">
                <span className="text-slate-400">Current Standard: </span>
                <span className="font-bold">{c.active_resolution}</span>
              </div>
            </div>

            {/* Review Input Box */}
            {reviewingId === c.id && (
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-700 flex items-center space-x-3">
                <input
                  type="text"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder="Reviewer Name / Title..."
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 font-mono"
                />
                <button
                  onClick={() => handleReviewSubmit(c.id)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono"
                >
                  Confirm Review
                </button>
                <button
                  onClick={() => setReviewingId(null)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-400 text-xs font-mono"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
