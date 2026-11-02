import React from 'react';
import {
  LayoutDashboard,
  BotMessageSquare,
  Files,
  Network,
  Cpu,
  GitCompare,
  FlaskConical,
  Wrench,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  Activity,
  CheckCircle2,
  Database
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setCurrentTab,
  collapsed,
  setCollapsed
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'chat', label: 'AI Knowledge Assistant', icon: BotMessageSquare, badge: 'Live RAG' },
    { id: 'documents', label: 'Document Library', icon: Files, badge: '20 Docs' },
    { id: 'knowledge', label: 'Knowledge Explorer', icon: Network },
    { id: 'components', label: 'Component Registry', icon: Cpu },
    { id: 'conflicts', label: 'Revision & Conflicts', icon: GitCompare, badge: '3 Key' },
    { id: 'evaluation', label: 'Evaluation Lab', icon: FlaskConical, badge: '100%' },
    { id: 'troubleshooting', label: 'Troubleshooting', icon: Wrench },
    { id: 'reports', label: 'Gaps & Reports', icon: FileText },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ];

  return (
    <aside
      className={`relative flex flex-col border-r transition-all duration-300 z-30 select-none ${
        collapsed ? 'w-20' : 'w-72'
      }`}
      style={{
        backgroundColor: 'var(--bg-slate)',
        borderColor: 'var(--border-subtle)'
      }}
    >
      {/* Top Header Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="flex items-center space-x-3 overflow-hidden">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 shadow-lg bg-gradient-to-br from-sky-400 to-blue-600">
            <ShieldAlert className="w-6 h-6 text-slate-950 font-bold" />
          </div>
          {!collapsed && (
            <div className="flex flex-col truncate">
              <span className="font-extrabold tracking-wider text-sm text-sky-400 font-mono">
                AEGIS INTELLIGENCE
              </span>
              <span className="text-xs text-slate-400 truncate">
                Series-7 Hydraulic Control
              </span>
            </div>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-sky-400 hover:bg-slate-800 transition-colors"
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative overflow-hidden ${
                isActive
                  ? 'nav-active-pill font-semibold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
              }`}
            >
              {isActive && <div className="nav-active-indicator" />}
              <Icon
                className={`w-5 h-5 shrink-0 transition-all duration-200 ${
                  isActive ? 'text-sky-400 scale-105' : 'text-slate-400 group-hover:text-slate-200'
                } ${!collapsed ? 'mr-3' : 'mx-auto'}`}
              />
              {!collapsed && (
                <span className="flex-1 text-left truncate">{item.label}</span>
              )}
              {!collapsed && item.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-semibold ${
                    item.badge === '100%'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                  }`}
                >
                  {item.badge}
                </span>
              )}
              {collapsed && (
                <div className="absolute left-full ml-3 px-2.5 py-1 bg-slate-900 text-slate-200 text-xs rounded-md shadow-xl border border-slate-700 whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
                  {item.label}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Status Panel */}
      <div className="p-3 border-t space-y-2" style={{ borderColor: 'var(--border-subtle)' }}>
        {!collapsed ? (
          <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs space-y-1.5 font-mono">
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center space-x-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>System Health</span>
              </span>
              <span className="text-emerald-400 font-semibold">ONLINE</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center space-x-1.5">
                <Database className="w-3.5 h-3.5 text-sky-400" />
                <span>Vector DB</span>
              </span>
              <span className="text-slate-300">ChromaDB</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Firmware Standard</span>
              <span className="text-sky-400 font-bold">Rev 3.2.1</span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center py-2" title="System Online (Rev 3.2.1)">
            <span className="w-3 h-3 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50 animate-pulse" />
          </div>
        )}

        {/* User profile / session */}
        <div className="flex items-center px-2 py-1.5 rounded-lg bg-slate-800/40 text-xs text-slate-400">
          <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 font-bold text-[10px] shrink-0">
            PR
          </div>
          {!collapsed && (
            <div className="ml-2.5 truncate">
              <p className="font-medium text-slate-300 leading-tight">Lead AI Engineer</p>
              <p className="text-[10px] text-slate-500">Debyez Evaluation</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
