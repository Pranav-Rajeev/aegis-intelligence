import React, { useState, useEffect } from 'react';
import {
  Network,
  Database,
  GitCompare,
  Search,
  Filter,
  ShieldCheck,
  FileText,
  ChevronRight,
  Info,
  CheckCircle2,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Node,
  Edge
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { api } from '../services/api';
import { KnowledgeClaim, DocumentItem } from '../types';

export const KnowledgeExplorerPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'graph' | 'claims' | 'compare'>('graph');
  const [claims, setClaims] = useState<KnowledgeClaim[]>([]);
  const [graphData, setGraphData] = useState<{ nodes: Node[]; edges: Edge[] }>({ nodes: [], edges: [] });
  const [selectedNode, setSelectedNode] = useState<any | null>(null);
  const [search, setSearch] = useState('');
  const [entityTypeFilter, setEntityTypeFilter] = useState('');
  const [loading, setLoading] = useState(true);

  // Comparison State
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [doc1Id, setDoc1Id] = useState<number | ''>('');
  const [doc2Id, setDoc2Id] = useState<number | ''>('');
  const [comparisonResult, setComparisonResult] = useState<any | null>(null);
  const [comparing, setComparing] = useState(false);

  const fetchExplorerData = async () => {
    try {
      setLoading(true);
      const [claimsRes, graphRes, docsRes] = await Promise.all([
        api.getClaims({
          search: search || undefined,
          entity_type: entityTypeFilter || undefined
        }),
        api.getGraphVisualization(),
        api.getDocuments()
      ]);

      setClaims(claimsRes);
      setGraphData({
        nodes: graphRes.nodes.map((n: any) => ({
          ...n,
          style: {
            background: '#182235',
            color: '#F1F5F9',
            border: '1px solid #38BDF8',
            borderRadius: '8px',
            padding: '10px',
            fontSize: '11px',
            fontFamily: 'monospace'
          }
        })),
        edges: graphRes.edges.map((e: any) => ({
          ...e,
          style: { stroke: '#38BDF8', strokeWidth: 1.5 }
        }))
      });
      setDocuments(docsRes);

      if (docsRes.length >= 2) {
        // Default compare legacy manual vs operator manual
        const legacy = docsRes.find(d => d.filename.includes('legacy'));
        const current = docsRes.find(d => d.filename.includes('operator'));
        if (legacy && current) {
          setDoc1Id(legacy.id);
          setDoc2Id(current.id);
        } else {
          setDoc1Id(docsRes[0].id);
          setDoc2Id(docsRes[1].id);
        }
      }
    } catch (err) {
      console.error('Error fetching knowledge explorer data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExplorerData();
  }, [search, entityTypeFilter]);

  const handleNodeClick = (_: any, node: Node) => {
    setSelectedNode(node);
  };

  const handleRunComparison = async () => {
    if (!doc1Id || !doc2Id) return;
    try {
      setComparing(true);
      const res = await api.compareDocuments(Number(doc1Id), Number(doc2Id));
      setComparisonResult(res);
    } catch (err) {
      console.error('Error running document comparison:', err);
    } finally {
      setComparing(false);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header and Mode Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
            <Network className="w-5 h-5 text-sky-400" />
            <span>Technical Knowledge Explorer</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Explore topological relationships, structured SQLite knowledge claims, and document revisions.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs font-mono">
          <button
            onClick={() => setActiveTab('graph')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center space-x-1.5 ${
              activeTab === 'graph' ? 'bg-sky-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>Interactive Graph</span>
          </button>
          <button
            onClick={() => setActiveTab('claims')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center space-x-1.5 ${
              activeTab === 'claims' ? 'bg-sky-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Structured Claims ({claims.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('compare')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center space-x-1.5 ${
              activeTab === 'compare' ? 'bg-sky-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <GitCompare className="w-3.5 h-3.5" />
            <span>Document Comparison</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Interactive Knowledge Graph */}
      {activeTab === 'graph' && (
        <div className="relative rounded-2xl bg-slate-900/90 border border-slate-800 h-[650px] overflow-hidden shadow-2xl">
          <ReactFlow
            nodes={graphData.nodes}
            edges={graphData.edges}
            onNodeClick={handleNodeClick}
            fitView
          >
            <Background color="#1E293B" gap={16} />
            <Controls className="!bg-slate-900 !border-slate-800 text-slate-200" />
            <MiniMap
              nodeColor={() => '#38BDF8'}
              className="!bg-slate-950 !border-slate-800 !rounded-lg"
            />
          </ReactFlow>

          {/* Node Inspector Drawer */}
          {selectedNode && (
            <div className="absolute top-4 right-4 w-80 bg-slate-950/95 border border-sky-500/40 rounded-xl p-4 shadow-2xl z-20 font-mono text-xs space-y-3 animate-in fade-in slide-in-from-right-4 duration-150">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold text-sky-400 flex items-center space-x-1.5">
                  <Info className="w-3.5 h-3.5" />
                  <span>Node Inspector</span>
                </span>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="text-slate-500 hover:text-slate-200 text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              <div>
                <p className="text-sm font-bold text-slate-100">{selectedNode.data.label}</p>
                <span className="text-[10px] text-sky-300 bg-sky-500/10 px-1.5 py-0.5 rounded border border-sky-500/30 inline-block mt-1">
                  Type: {selectedNode.data.type}
                </span>
              </div>

              <div className="space-y-1 text-slate-300">
                <p><span className="text-slate-500">Node ID:</span> {selectedNode.id}</p>
                <p><span className="text-slate-500">Status:</span> {selectedNode.data.status || 'Active'}</p>
                <p><span className="text-slate-500">Location:</span> {selectedNode.data.location || 'N/A'}</p>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <span className="text-[10px] text-slate-400 block mb-1">Topological Edges:</span>
                <div className="space-y-1">
                  {graphData.edges
                    .filter((e) => e.source === selectedNode.id || e.target === selectedNode.id)
                    .map((e) => (
                      <div key={e.id} className="p-1.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-300">
                        {e.source} → {e.target} ({e.label || 'connected'})
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Structured Claims Explorer */}
      {activeTab === 'claims' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex-1 relative w-full sm:w-auto">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search claims by entity, attribute, or value..."
                className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 font-mono"
              />
            </div>
            <select
              value={entityTypeFilter}
              onChange={(e) => setEntityTypeFilter(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-sky-500 font-mono"
            >
              <option value="">All Entity Types</option>
              <option value="Component">Component</option>
              <option value="Parameter">Parameter</option>
              <option value="Alarm">Alarm</option>
              <option value="Procedure">Procedure</option>
              <option value="ChangeNotice">ChangeNotice</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {claims.map((c) => (
              <div
                key={c.id}
                className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2.5 font-mono text-xs hover:border-sky-500/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sky-400">{c.entity_name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                    {c.entity_type}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px] block">Attribute:</span>
                  <p className="text-slate-200 font-semibold">{c.attribute}</p>
                </div>
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 text-[10px] block">Value:</span>
                  <p className="text-slate-100 font-bold">{c.value} {c.unit}</p>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/80">
                  <span className="text-sky-300">📄 {c.source_document} (p. {c.page_number})</span>
                  <span className="text-emerald-400 font-semibold">Confidence: {Math.round(c.confidence_score * 100)}%</span>
                </div>
                <div className="text-[10px] text-slate-500">
                  <span>Scope: {c.applicable_software_rev}</span> | <span>Method: {c.extraction_method}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Smart Document Comparison Tool (Section 13.C) */}
      {activeTab === 'compare' && (
        <div className="space-y-6">
          <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-slate-100 font-mono flex items-center space-x-2">
              <GitCompare className="w-4 h-4 text-sky-400" />
              <span>Smart Document Comparison Engine</span>
            </h3>
            <p className="text-xs text-slate-400">
              Select two documents from the library to compare changed values, added procedures, and revision differences.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Base Document (Doc A)</label>
                <select
                  value={doc1Id}
                  onChange={(e) => setDoc1Id(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-200 font-mono"
                >
                  <option value="">Select Document A</option>
                  {documents.map((d) => (
                    <option key={d.id} value={d.id}>{d.filename} ({d.file_type.toUpperCase()})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Target Document (Doc B)</label>
                <select
                  value={doc2Id}
                  onChange={(e) => setDoc2Id(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-200 font-mono"
                >
                  <option value="">Select Document B</option>
                  {documents.map((d) => (
                    <option key={d.id} value={d.id}>{d.filename} ({d.file_type.toUpperCase()})</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleRunComparison}
              disabled={!doc1Id || !doc2Id || comparing}
              className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-40 text-slate-950 font-bold text-xs font-mono flex items-center space-x-2 transition-all shadow-md shadow-sky-500/20"
            >
              <GitCompare className="w-4 h-4" />
              <span>{comparing ? 'Analyzing Differences...' : 'Run Comparative Analysis'}</span>
            </button>
          </div>

          {comparisonResult && (
            <div className="space-y-4 animate-in fade-in duration-150 font-mono text-xs">
              {/* Conflicting / Changed Values */}
              {comparisonResult.conflicting_values && comparisonResult.conflicting_values.length > 0 && (
                <div className="p-5 rounded-xl bg-slate-900 border border-amber-500/40 space-y-3">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Changed / Conflicting Parameters</span>
                  </h4>
                  <div className="space-y-2">
                    {comparisonResult.conflicting_values.map((cv: any, idx: number) => (
                      <div key={idx} className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
                        <span className="font-bold text-slate-100">{cv.parameter}</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                          <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300">
                            <span className="text-slate-500 block">Doc A Value:</span>
                            <span className="text-amber-400 font-bold">{cv.doc1_value}</span>
                          </div>
                          <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300">
                            <span className="text-slate-500 block">Doc B Value:</span>
                            <span className="text-sky-400 font-bold">{cv.doc2_value}</span>
                          </div>
                        </div>
                        <p className="text-[10px] text-slate-400 italic">Scope: {cv.revision_scope}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Added Information */}
              {comparisonResult.added_in_doc2 && comparisonResult.added_in_doc2.length > 0 && (
                <div className="p-5 rounded-xl bg-slate-900 border border-emerald-500/40 space-y-2">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Information Added in Target Document</span>
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-slate-300">
                    {comparisonResult.added_in_doc2.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
