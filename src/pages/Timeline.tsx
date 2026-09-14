import React, { useState } from 'react';
import { MapPin, Camera } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db } from '../db';
import { useLiveQuery } from 'dexie-react-hooks';
import type { MemoryItem } from '../types';

interface TimelineProps {
  onSelectMemory: (memory: MemoryItem) => void;
}

export const Timeline: React.FC<TimelineProps> = ({ onSelectMemory }) => {
  const { user } = useAuth();
  const [selectedYear, setSelectedYear] = useState<string>('all');

  const memories = useLiveQuery(
    () => (user ? db.memories.where('userId').equals(user.id).toArray() : []),
    [user?.id]
  ) || [];

  const years = Array.from(
    new Set(memories.map(m => new Date(m.date).getFullYear().toString()))
  ).sort((a, b) => parseInt(b) - parseInt(a));

  const sortedMemories = [...memories]
    .filter(m => selectedYear === 'all' || new Date(m.date).getFullYear().toString() === selectedYear)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const groupedMemories: Record<string, MemoryItem[]> = {};
  sortedMemories.forEach(mem => {
    const d = new Date(mem.date);
    const monthYear = d.toLocaleString('default', { month: 'long', year: 'numeric' });
    if (!groupedMemories[monthYear]) {
      groupedMemories[monthYear] = [];
    }
    groupedMemories[monthYear].push(mem);
  });

  return (
    <div className="space-y-6 pb-12">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-rose-100 dark:border-slate-800 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 mb-1">
            <span>✨ Life Chronology</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif-title text-slate-900 dark:text-white">
            Life Story Timeline
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            A continuous chronological journey of your dreams and memorable moments.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold">Filter Year:</span>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-3 py-2 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-none"
          >
            <option value="all">All Years</option>
            {years.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      {Object.keys(groupedMemories).length === 0 ? (
        <div className="p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-center space-y-3">
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No Memories in Timeline</h3>
          <p className="text-xs text-slate-400">Record moments to see your life story line up here!</p>
        </div>
      ) : (
        <div className="space-y-10 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 sm:before:-ml-px before:w-0.5 before:bg-rose-200 dark:before:bg-slate-800">
          
          {Object.entries(groupedMemories).map(([monthYear, mems]) => (
            <div key={monthYear} className="space-y-6 relative">
              
              <div className="sticky top-20 z-20 flex items-center justify-start sm:justify-center">
                <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-rose-500 to-purple-600 text-white text-xs font-bold shadow-md">
                  {monthYear}
                </span>
              </div>

              <div className="space-y-6">
                {mems.map((mem, idx) => {
                  const isEven = idx % 2 === 0;
                  const coverPhoto = mem.photos[0] || '';

                  return (
                    <div
                      key={mem.id}
                      onClick={() => onSelectMemory(mem)}
                      className={`relative flex items-center flex-col sm:flex-row group cursor-pointer ${
                        isEven ? 'sm:flex-row-reverse' : ''
                      }`}
                    >
                      <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white dark:bg-slate-900 border-4 border-rose-500 flex items-center justify-center text-xs shadow-md z-10 group-hover:scale-125 transition-transform">
                        {mem.type === 'dream_completed' ? '🌟' : '📸'}
                      </div>

                      <div className="w-full sm:w-1/2 pl-12 sm:pl-0 sm:px-8">
                        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 shadow-xs hover:shadow-lg transition-all space-y-3">
                          <div className="h-40 rounded-2xl overflow-hidden shadow-inner relative bg-gradient-to-tr from-rose-100 to-purple-100 dark:from-slate-800 dark:to-slate-900 flex flex-col items-center justify-center">
                            {coverPhoto ? (
                              <img
                                src={coverPhoto}
                                alt={mem.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="text-center text-slate-400 p-3">
                                <Camera className="w-8 h-8 text-rose-400 mx-auto mb-1 opacity-70" />
                                <span className="text-xs font-semibold">No Photo</span>
                              </div>
                            )}
                            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold bg-black/60 backdrop-blur-xs text-white">
                              {mem.type === 'dream_completed' ? '🌟 Dream Completed' : '📸 Beautiful Moment'}
                            </span>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                              <span>📅 {mem.date}</span>
                              <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px]">
                                {mem.category}
                              </span>
                            </div>

                            <h3 className="text-base font-bold font-serif-title text-slate-900 dark:text-white group-hover:text-rose-600 transition-colors">
                              {mem.title}
                            </h3>

                            <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                              {mem.description}
                            </p>

                            {mem.location && (
                              <p className="text-[11px] text-slate-400 flex items-center gap-1 pt-1">
                                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                                <span>{mem.location}</span>
                              </p>
                            )}
                          </div>

                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};
