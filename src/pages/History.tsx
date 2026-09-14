import React, { useState } from 'react';
import { 
  History as HistoryIcon, 
  CheckCircle2, 
  XCircle, 
  Filter, 
  Search, 
  Trash2, 
  Clock
} from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import type { HistoryCategory, HistoryStatus } from '../types';

export const HistoryPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | HistoryCategory>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | HistoryStatus>('all');

  const historyList = useLiveQuery(
    () => db.history.orderBy('timestamp').reverse().toArray(),
    []
  ) || [];

  const totalEvents = historyList.length;
  const successCount = historyList.filter(h => h.status === 'success').length;
  const failCount = historyList.filter(h => h.status === 'fail').length;

  const filteredHistory = historyList.filter(item => {
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.action.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const handleClearHistory = async () => {
    if (confirm('Are you sure you want to clear all event history logs? This action cannot be undone.')) {
      await db.history.clear();
    }
  };

  const getCategoryBadge = (category: HistoryCategory) => {
    switch (category) {
      case 'auth':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-300">Auth</span>;
      case 'memory':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300">Memory</span>;
      case 'system':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-300">System</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-rose-100 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300">
            <HistoryIcon className="w-3.5 h-3.5" />
            <span>Real-time Audit Logs</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif-title text-slate-900 dark:text-white">
            Activity & Event History
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Track all successful actions and failed attempts across authentication, dreams, and memories.
          </p>
        </div>

        {historyList.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="px-4 py-2.5 rounded-2xl bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 text-rose-600 dark:text-rose-300 text-xs font-bold transition-all flex items-center gap-1.5 border border-rose-200 dark:border-rose-800 shrink-0"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear History
          </button>
        )}
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs text-center space-y-1">
          <Clock className="w-5 h-5 text-slate-400 mx-auto" />
          <p className="text-xl sm:text-2xl font-bold font-heading text-slate-900 dark:text-white">{totalEvents}</p>
          <p className="text-[11px] text-slate-400">Total Logged</p>
        </div>

        <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-950/50 shadow-xs text-center space-y-1">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto animate-pulse" />
          <p className="text-xl sm:text-2xl font-bold font-heading text-emerald-600 dark:text-emerald-400">{successCount}</p>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">Passed (Success)</p>
        </div>

        <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-rose-100 dark:border-rose-950/50 shadow-xs text-center space-y-1">
          <XCircle className="w-5 h-5 text-rose-500 mx-auto" />
          <p className="text-xl sm:text-2xl font-bold font-heading text-rose-600 dark:text-rose-400">{failCount}</p>
          <p className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold">Failed (Errors)</p>
        </div>
      </div>

      {/* Filter Controls & Search */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs space-y-4">
        
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          
          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search history..."
              className="w-full pl-9 pr-4 py-2 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
          </div>

          {/* Status Filter Toggle Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl w-full sm:w-auto">
            <button
              onClick={() => setStatusFilter('all')}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                statusFilter === 'all'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              All Statuses
            </button>
            <button
              onClick={() => setStatusFilter('success')}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                statusFilter === 'success'
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-800'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Success</span>
            </button>
            <button
              onClick={() => setStatusFilter('fail')}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                statusFilter === 'fail'
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-slate-800'
              }`}
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Fail</span>
            </button>
          </div>

        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs text-slate-400 font-medium flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5" /> Category:
          </span>
          {(['all', 'auth', 'memory', 'system'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded-full text-xs font-bold capitalize transition-all shrink-0 ${
                categoryFilter === cat
                  ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? 'All Categories' : cat}
            </button>
          ))}
        </div>

      </div>

      {/* History Items Timeline List */}
      {filteredHistory.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-100 dark:border-slate-800 space-y-3">
          <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center text-2xl">
            🔍
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 font-serif-title">
            No history logs found
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {historyList.length === 0 
              ? "Your activity history is completely empty. Actions like signing in, creating dreams, and adding memories will be logged here in real-time."
              : "No history items match your selected filters."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              className={`p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs ${
                item.status === 'fail' 
                  ? 'border-rose-200 dark:border-rose-950/60 bg-rose-50/20 dark:bg-rose-950/10' 
                  : 'border-slate-100 dark:border-slate-800/80 hover:border-rose-200'
              }`}
            >
              <div className="flex items-start gap-3.5">
                
                {/* Status Indicator Icon */}
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-lg shrink-0 mt-0.5 ${
                  item.status === 'success' 
                    ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' 
                    : 'bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 border border-rose-200 dark:border-rose-800 animate-pulse'
                }`}>
                  {item.icon || (item.status === 'success' ? '✅' : '❌')}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </h3>

                    {/* Status Badge */}
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                      item.status === 'success'
                        ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                        : 'bg-rose-50 dark:bg-rose-950/80 text-rose-600 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                    }`}>
                      {item.status === 'success' ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Passed
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3 text-rose-500" /> Failed
                        </>
                      )}
                    </span>

                    {getCategoryBadge(item.category)}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 font-sans">
                    {item.details}
                  </p>
                </div>

              </div>

              <div className="text-[11px] text-slate-400 font-medium shrink-0 self-end sm:self-center bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-100 dark:border-slate-700">
                {new Date(item.timestamp).toLocaleString()}
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
