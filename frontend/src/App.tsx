import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardPage } from './pages/DashboardPage';
import { ChatPage } from './pages/ChatPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { KnowledgeExplorerPage } from './pages/KnowledgeExplorerPage';
import { ComponentsPage } from './pages/ComponentsPage';
import { ConflictsPage } from './pages/ConflictsPage';
import { EvaluationLabPage } from './pages/EvaluationLabPage';
import { TroubleshootingPage } from './pages/TroubleshootingPage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';
import { api } from './services/api';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [initialQuestion, setInitialQuestion] = useState<string | undefined>(undefined);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  };

  const handleAskQuestionFromDashboard = (question: string) => {
    setInitialQuestion(question);
    setCurrentTab('chat');
  };

  const handleSyncDataset = async () => {
    try {
      setSyncMessage('Ingesting official Aegis dataset...');
      const res = await api.seedDataset();
      setSyncMessage(res.message);
      setTimeout(() => setSyncMessage(null), 4000);
    } catch (err: any) {
      setSyncMessage(err?.response?.data?.detail || 'Error syncing dataset.');
      setTimeout(() => setSyncMessage(null), 4000);
    }
  };

  return (
    <div className={`flex h-screen w-screen overflow-hidden ${theme === 'light' ? 'light' : ''}`} style={{ backgroundColor: 'var(--bg-main)' }}>
      {/* Left Collapsible Navigation Sidebar */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      {/* Main View Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <Header
          theme={theme}
          toggleTheme={toggleTheme}
          onSeed={handleSyncDataset}
          onSearch={(q) => {
            if (q.trim()) {
              handleAskQuestionFromDashboard(q.trim());
            }
          }}
        />

        {syncMessage && (
          <div className="bg-sky-500/20 border-b border-sky-500/40 text-sky-300 px-6 py-2 text-xs font-mono flex items-center justify-between">
            <span>{syncMessage}</span>
            <button onClick={() => setSyncMessage(null)} className="text-slate-400 hover:text-slate-100">✕</button>
          </div>
        )}

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto">
          {currentTab === 'dashboard' && (
            <DashboardPage
              onNavigateTab={(tab) => setCurrentTab(tab)}
              onAskQuestion={handleAskQuestionFromDashboard}
            />
          )}

          {currentTab === 'chat' && (
            <ChatPage
              initialQuestion={initialQuestion}
              onClearInitialQuestion={() => setInitialQuestion(undefined)}
            />
          )}

          {currentTab === 'documents' && <DocumentsPage />}

          {currentTab === 'knowledge' && <KnowledgeExplorerPage />}

          {currentTab === 'components' && <ComponentsPage />}

          {currentTab === 'conflicts' && <ConflictsPage />}

          {currentTab === 'evaluation' && <EvaluationLabPage />}

          {currentTab === 'troubleshooting' && <TroubleshootingPage />}

          {currentTab === 'reports' && <ReportsPage />}

          {currentTab === 'settings' && <SettingsPage />}
        </main>
      </div>
    </div>
  );
};

export default App;
