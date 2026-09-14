import React, { useState, useEffect } from 'react';
import { Shuffle, Sparkles, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db } from '../db';
import type { MemoryItem } from '../types';

interface RandomMemoryProps {
  onSelectMemory: (memory: MemoryItem) => void;
}

export const RandomMemory: React.FC<RandomMemoryProps> = ({ onSelectMemory }) => {
  const { user } = useAuth();
  const [memories, setMemories] = useState<MemoryItem[]>([]);
  const [currentMemory, setCurrentMemory] = useState<MemoryItem | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    if (!user) return;
    const loadMemories = async () => {
      const items = await db.memories.where('userId').equals(user.id).toArray();
      setMemories(items);
      if (items.length > 0) {
        const randomItem = items[Math.floor(Math.random() * items.length)];
        setCurrentMemory(randomItem);
      }
    };
    loadMemories();
  }, [user]);

  const handleSpin = () => {
    if (memories.length === 0) return;
    setIsSpinning(true);
    setTimeout(() => {
      const nextItem = memories[Math.floor(Math.random() * memories.length)];
      setCurrentMemory(nextItem);
      setIsSpinning(false);
    }, 400);
  };

  const today = new Date();
  const currentMonthDay = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const onThisDayMemories = memories.filter(m => m.date.endsWith(currentMonthDay));

  return (
    <div className="space-y-8 pb-12">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-rose-100 dark:border-slate-800 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Memory Roulette & Throwbacks</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif-title text-slate-900 dark:text-white">
            A Moment to Remember ✨
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Pause, take a breath, and relive a surprise memory from your life journey.
          </p>
        </div>

        <button
          onClick={handleSpin}
          disabled={isSpinning || memories.length === 0}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white text-xs font-bold shadow-md shadow-purple-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 self-start sm:self-auto disabled:opacity-50"
        >
          <Shuffle className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
          <span>Surprise Me Again 🎲</span>
        </button>
      </div>

      {currentMemory ? (
        <div className={`transition-all duration-300 ${isSpinning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          <div 
            onClick={() => onSelectMemory(currentMemory)}
            className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-800 shadow-lg cursor-pointer group space-y-6 max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300">
                {currentMemory.type === 'dream_completed' ? '🌟 Dream Completed Memory' : '📸 Beautiful Moment'}
              </span>
              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-rose-500" />
                {currentMemory.date}
              </span>
            </div>

            <div className="polaroid-card rounded-2xl scrapbook-tape">
              <div className="h-72 sm:h-96 rounded-xl overflow-hidden shadow-inner bg-gradient-to-tr from-rose-100 to-purple-100 dark:from-slate-800 dark:to-slate-900 flex flex-col items-center justify-center">
                {currentMemory.photos[0] ? (
                  <img
                    src={currentMemory.photos[0]}
                    alt={currentMemory.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="text-center text-slate-400 p-6">
                    <Sparkles className="w-12 h-12 text-rose-400 mx-auto mb-2 opacity-70" />
                    <span className="text-sm font-semibold">Special Memory</span>
                  </div>
                )}
              </div>
              <div className="mt-3 text-center space-y-1">
                <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  {currentMemory.title}
                </h2>
                {currentMemory.location && (
                  <p className="text-xs text-slate-500 flex items-center justify-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    <span>{currentMemory.location}</span>
                  </p>
                )}
              </div>
            </div>

            {currentMemory.quote && (
              <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-slate-800/50 text-center">
                <p className="font-handwriting text-2xl text-rose-700 dark:text-rose-300 italic">
                  "{currentMemory.quote}"
                </p>
              </div>
            )}

            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed text-center italic">
              "{currentMemory.description}"
            </p>

            <div className="pt-2 text-center">
              <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 dark:text-rose-400 group-hover:underline">
                Open Full Memory Scrapbook <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 text-center">
          <p className="text-sm text-slate-400">No memories available yet for roulette.</p>
        </div>
      )}

      <div className="space-y-4 pt-4 border-t border-rose-100/60 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-amber-500" />
          <h2 className="text-xl font-bold font-serif-title text-slate-800 dark:text-slate-100">
            On This Day Throwback 📅
          </h2>
        </div>

        {onThisDayMemories.length === 0 ? (
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-xs text-slate-500 text-center">
            No past memories recorded on today's calendar date ({today.toLocaleDateString('default', { month: 'short', day: 'numeric' })}) yet. Check back on anniversaries!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {onThisDayMemories.map((mem) => (
              <div
                key={mem.id}
                onClick={() => onSelectMemory(mem)}
                className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-all cursor-pointer flex gap-4"
              >
                <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                  <img src={mem.photos[0]} alt={mem.title} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-1 my-auto">
                  <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">
                    ON THIS DAY ({mem.date})
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">{mem.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{mem.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
