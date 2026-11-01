import React, { useState, useEffect, useRef } from 'react';
import {
  Upload,
  Search,
  Filter,
  FileText,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Trash2,
  Eye,
  X,
  FileCode,
  Table as TableIcon,
  ShieldCheck,
  HardDrive,
  RefreshCw
} from 'lucide-react';
import { api } from '../services/api';
import { DocumentItem, DocumentDetail } from '../types';

export const DocumentsPage: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [fileTypeFilter, setFileTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<DocumentDetail | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [activeDetailTab, setActiveDetailTab] = useState<'text' | 'tables' | 'metadata'>('text');
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const data = await api.getDocuments({
        search: search || undefined,
        file_type: fileTypeFilter || undefined,
        status: statusFilter || undefined
      });
      setDocuments(data);
    } catch (err) {
      console.error('Error fetching documents:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [search, fileTypeFilter, statusFilter]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setUploadMessage(null);

    try {
      for (let i = 0; i < files.length; i++) {
        await api.uploadDocument(files[i]);
      }
      setUploadMessage(`Successfully uploaded ${files.length} document(s). Processing queued.`);
      fetchDocuments();
    } catch (err: any) {
      setUploadMessage(err?.response?.data?.detail || 'Error uploading file.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleOpenDetail = async (docId: number) => {
    try {
      const detail = await api.getDocumentDetail(docId);
      setSelectedDoc(detail);
      setDetailModalOpen(true);
    } catch (err) {
      console.error('Error opening document details:', err);
    }
  };

  const handleReprocess = async (docId: number) => {
    try {
      await api.reprocessDocument(docId);
      fetchDocuments();
      if (selectedDoc && selectedDoc.id === docId) {
        handleOpenDetail(docId);
      }
    } catch (err) {
      console.error('Error reprocessing document:', err);
    }
  };

  const handleDelete = async (docId: number) => {
    if (!confirm('Are you sure you want to delete this document and all its vector embeddings?')) return;
    try {
      await api.deleteDocument(docId);
      fetchDocuments();
      if (selectedDoc && selectedDoc.id === docId) {
        setDetailModalOpen(false);
      }
    } catch (err) {
      console.error('Error deleting document:', err);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Page Title & Drag-and-Drop Area */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
            <FileText className="w-5 h-5 text-sky-400" />
            <span>Document Library &amp; Modality Ingestion</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Supported formats: PDF, Scanned PDF, DOCX, XLSX, CSV, HTML, TXT, JSON, PPTX, PNG, JPG (Windows Media OCR integrated).
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            multiple
            className="hidden"
            accept=".pdf,.docx,.xlsx,.csv,.html,.txt,.json,.pptx,.png,.jpg,.jpeg"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs font-mono flex items-center space-x-2 transition-all shadow-lg shadow-sky-500/20 disabled:opacity-50"
          >
            <Upload className="w-4 h-4" />
            <span>{uploading ? 'Ingesting...' : 'Upload Document'}</span>
          </button>
        </div>
      </div>

      {uploadMessage && (
        <div className="p-3 rounded-lg bg-sky-500/15 border border-sky-500/30 text-sky-300 text-xs font-mono">
          {uploadMessage}
        </div>
      )}

      {/* Filters & Search Toolbar */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1 relative w-full md:w-auto">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documents by name..."
            className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 font-mono"
          />
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          <select
            value={fileTypeFilter}
            onChange={(e) => setFileTypeFilter(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-sky-500 font-mono"
          >
            <option value="">All Formats</option>
            <option value="pdf">PDF</option>
            <option value="docx">DOCX</option>
            <option value="xlsx">XLSX</option>
            <option value="html">HTML</option>
            <option value="pptx">PPTX</option>
            <option value="json">JSON</option>
            <option value="png">PNG (Images)</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-sky-500 font-mono"
          >
            <option value="">All Statuses</option>
            <option value="PROCESSED">Processed</option>
            <option value="PROCESSING">Processing</option>
            <option value="FAILED">Failed</option>
            <option value="NEEDS_REVIEW">Needs Review</option>
          </select>

          <button
            onClick={fetchDocuments}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Refresh documents list"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Documents Table */}
      <div className="rounded-xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="text-[11px] font-mono text-slate-400 bg-slate-800/60 border-b border-slate-800 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Document</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Format</th>
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4">Pages/Chunks</th>
                <th className="py-3 px-4">Trust Level</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-mono">
              {documents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500">
                    No documents matched your criteria
                  </td>
                </tr>
              ) : (
                documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-medium text-slate-200">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-sky-400 shrink-0" />
                        <span className="truncate max-w-[220px]" title={doc.filename}>{doc.filename}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-400 font-sans">{doc.category}</td>
                    <td className="py-3 px-4 uppercase text-slate-300 font-bold">{doc.file_type}</td>
                    <td className="py-3 px-4 text-slate-400">{formatFileSize(doc.file_size)}</td>
                    <td className="py-3 px-4 text-slate-300">
                      <span>{doc.page_count} pp</span>
                      <span className="text-slate-500 ml-1">({doc.chunk_count} chunks)</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                        doc.trust_level === 'HIGH'
                          ? 'badge-green'
                          : doc.trust_level === 'MEDIUM'
                          ? 'badge-amber'
                          : 'badge-red'
                      }`}>
                        {doc.trust_level} ({Math.round(doc.trust_score * 100)}%)
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-[10px] text-emerald-400 font-semibold flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{doc.status}</span>
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenDetail(doc.id)}
                        className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-sky-400 transition-colors"
                        title="Preview text & tables"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleReprocess(doc.id)}
                        className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-400 transition-colors"
                        title="Reprocess document"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(doc.id)}
                        className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-red-400 transition-colors"
                        title="Delete document"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Document Detail & Extracted Knowledge Modal */}
      {detailModalOpen && selectedDoc && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-sky-400" />
                <div>
                  <h3 className="text-sm font-bold text-slate-100 font-mono">{selectedDoc.filename}</h3>
                  <p className="text-[10px] text-slate-400 font-mono">
                    Format: {selectedDoc.file_type.toUpperCase()} | Size: {formatFileSize(selectedDoc.file_size)} | Trust: {selectedDoc.trust_level}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setDetailModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="px-4 border-b border-slate-800 flex space-x-4 text-xs font-mono">
              <button
                onClick={() => setActiveDetailTab('text')}
                className={`py-2.5 border-b-2 font-semibold transition-colors flex items-center space-x-1.5 ${
                  activeDetailTab === 'text'
                    ? 'border-sky-400 text-sky-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>Extracted Text</span>
              </button>
              <button
                onClick={() => setActiveDetailTab('tables')}
                className={`py-2.5 border-b-2 font-semibold transition-colors flex items-center space-x-1.5 ${
                  activeDetailTab === 'tables'
                    ? 'border-sky-400 text-sky-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span>Extracted Tables ({selectedDoc.tables.length})</span>
              </button>
              <button
                onClick={() => setActiveDetailTab('metadata')}
                className={`py-2.5 border-b-2 font-semibold transition-colors flex items-center space-x-1.5 ${
                  activeDetailTab === 'metadata'
                    ? 'border-sky-400 text-sky-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <HardDrive className="w-3.5 h-3.5" />
                <span>Metadata</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-4 font-mono text-xs text-slate-300">
              {activeDetailTab === 'text' && (
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 whitespace-pre-wrap leading-relaxed max-h-[50vh] overflow-y-auto">
                  {selectedDoc.extracted_text_preview || 'No text extracted.'}
                </div>
              )}

              {activeDetailTab === 'tables' && (
                <div className="space-y-4">
                  {selectedDoc.tables.length === 0 ? (
                    <div className="text-center py-8 text-slate-500">No tabular structures detected in this document.</div>
                  ) : (
                    selectedDoc.tables.map((table, tIdx) => (
                      <div key={tIdx} className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
                        <div className="bg-slate-800/80 px-3 py-2 text-[11px] font-bold text-sky-400">
                          {table.sheet_name ? `Sheet: ${table.sheet_name}` : `Table #${table.table_index || tIdx + 1}`}
                        </div>
                        <div className="overflow-x-auto p-2">
                          <table className="w-full text-[11px] text-left">
                            <tbody className="divide-y divide-slate-800">
                              {table.rows.map((row, rIdx) => (
                                <tr key={rIdx} className={rIdx === 0 ? 'font-bold bg-slate-900/60' : ''}>
                                  {row.map((cell, cIdx) => (
                                    <td key={cIdx} className="py-1.5 px-2.5 border-r border-slate-800/60 last:border-none">
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeDetailTab === 'metadata' && (
                <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-sky-300 overflow-x-auto text-[11px]">
                  {JSON.stringify(selectedDoc.metadata, null, 2)}
                </pre>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 flex justify-end space-x-3">
              <button
                onClick={() => setDetailModalOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
