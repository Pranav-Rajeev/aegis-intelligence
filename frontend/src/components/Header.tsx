import React, { useState } from 'react';
import {
  Search,
  Bell,
  Sun,
  Moon,
  ShieldCheck,
  RefreshCw,
  HardDriveDownload,
  AlertTriangle,
  Info
} from 'lucide-react';

interface HeaderProps {
  onSearch?: (query: string) => void;
  onRefresh?: () => void;
  onSeed?: () => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSearch,
  onRefresh,
  onSeed,
  theme,
  toggleTheme
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notifications = [
    { id: 1, title: 'Evaluation Benchmark Passed', desc: '100% answer correctness across all 23 questions.', type: 'success', time: 'Just now' },
    { id: 2, title: 'ECN-1042 Setpoint Revision Active', desc: 'Normal operating pressure updated from 180 to 200 bar for rev 3.2+.', type: 'info', time: '5m ago' },
    { id: 3, title: 'Sensor Discrepancy Protected', desc: 'PS-40 (Coolant Loop) isolated from PS-04A discharge lines.', type: 'warning', time: '12m ago' }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(searchQuery);
  };

  return (
    <header
      className="h-16 border-b flex items-center justify-between px-6 select-none sticky top-0 z-20 backdrop-blur-md"
      style={{
        backgroundColor: 'rgba(17, 24, 39, 0.85)',
        borderColor: 'var(--border-subtle)'
      }}
    >
      {/* Workspace Breadcrumbs & Active Status */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="text-slate-400">Workspace /</span>
          <span className="text-sky-400 font-semibold px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/20">
            Aegis Series-7 Hydraulic Control System
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Active Firmware: v3.2.1</span>
        </div>
      </div>

      {/* Global Search & Actions */}
      <div className="flex items-center space-x-4">
        <form onSubmit={handleSearchSubmit} className="relative hidden sm:block w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search components, ECNs, alarms..."
            className="w-full bg-slate-900/90 border border-slate-700/70 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all font-mono"
          />
        </form>

        {/* Re-seed Dataset Button */}
        {onSeed && (
          <button
            onClick={onSeed}
            className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-sky-400 hover:bg-slate-700/80 border border-slate-700 text-xs font-mono transition-colors"
            title="Reload official 20 documents from package"
          >
            <HardDriveDownload className="w-3.5 h-3.5 text-sky-400" />
            <span>Sync Dataset</span>
          </button>
        )}

        {/* Global Refresh Button */}
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="p-2 rounded-lg text-slate-400 hover:text-sky-400 hover:bg-slate-800 transition-colors"
            title="Refresh live telemetry"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        )}

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg text-slate-400 hover:text-sky-400 hover:bg-slate-800 transition-colors relative"
            title="System Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-sky-400 absolute top-1.5 right-1.5" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                <span className="text-xs font-bold text-slate-200 font-mono">System Notifications</span>
                <span className="text-[10px] text-sky-400">3 unread</span>
              </div>
              <div className="space-y-2">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2 rounded-lg bg-slate-800/60 border border-slate-800 text-xs hover:border-slate-700 transition-colors">
                    <div className="flex items-center space-x-1.5 font-semibold text-slate-200">
                      {n.type === 'success' && <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />}
                      {n.type === 'warning' && <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />}
                      {n.type === 'info' && <Info className="w-3.5 h-3.5 text-sky-400" />}
                      <span>{n.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-normal">{n.desc}</p>
                    <span className="text-[9px] text-slate-500 font-mono mt-1 block">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
