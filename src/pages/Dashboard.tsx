import React, { useState } from 'react';
import { 
  Sparkles, 
  Heart, 
  Compass, 
  Quote, 
  Shuffle, 
  ArrowRight, 
  Camera
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db } from '../db';
import { useLiveQuery } from 'dexie-react-hooks';
import type { MemoryItem } from '../types';
import { getRandomQuote } from '../utils/quotes';

interface DashboardProps {
  setActiveTab: (tab: string) => void;
  onOpenAddMemory: () => void;
  onSelectMemory: (memory: MemoryItem) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  setActiveTab,
  onOpenAddMemory,
  onSelectMemory
}) => {
  const { user } = useAuth();
  const [quote, setQuote] = useState(getRandomQuote());

  const activeUserId = user?.id || localStorage.getItem('dreamy_active_user_id') || 'user_default';

  const memories = useLiveQuery(
    () => db.memories.where('userId').equals(activeUserId).toArray(),
    [activeUserId]
  ) || [];

  const totalMemories = memories.length;
  const favoriteMemories = memories.filter(m => m.isFavorite);
  const featuredFavorite = favoriteMemories.length > 0 ? favoriteMemories[0] : memories[0];

  const recentMemories = [...memories].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 6);

  return (
    <div className="space-y-8 pb-12">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 p-6 sm:p-10 text-white shadow-xl shadow-rose-500/20">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white">
            <span>✨ Welcome to Dreamy Diary</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif-title tracking-tight">
            Hello, {user?.name || 'Dreamer'}! {user?.avatar || '✨'}
          </h1>
          <p className="text-sm sm:text-base text-rose-100 font-sans leading-relaxed">
            "{user?.bio || 'Collect Moments. Preserve Memories. Relive your Journey.'}"
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={onOpenAddMemory}
              className="px-5 py-2.5 rounded-2xl bg-white text-rose-600 text-xs font-bold shadow-md hover:bg-rose-50 active:scale-95 transition-all flex items-center gap-2"
            >
              <Camera className="w-4 h-4 text-rose-500" />
              <span>+ Add Memory</span>
            </button>
          </div>
        </div>

        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 -mb-16 w-64 h-64 bg-purple-400/30 rounded-full blur-3xl"></div>
      </div>

      {/* Motivational Quote Banner */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors">
        <div className="flex items-start gap-3">
          <Quote className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-serif italic text-base sm:text-lg text-slate-800 dark:text-slate-100">
              "{quote.quote}"
            </p>
            <p className="text-xs font-semibold text-rose-500 mt-1">— {quote.author}</p>
          </div>
        </div>
        <button
          onClick={() => setQuote(getRandomQuote())}
          className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors shrink-0 self-end sm:self-center"
          title="New Quote"
        >
          <Shuffle className="w-4 h-4" />
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs space-y-1 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Memories</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-500 flex items-center justify-center text-sm">📸</div>
          </div>
          <p className="text-3xl font-bold font-heading text-purple-600 dark:text-purple-400">{totalMemories}</p>
          <p className="text-[11px] text-purple-500 font-semibold">Moments Preserved</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs space-y-1 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Favorite Memories</span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-500 flex items-center justify-center text-sm">💖</div>
          </div>
          <p className="text-3xl font-bold font-heading text-rose-600 dark:text-rose-400">{favoriteMemories.length}</p>
          <p className="text-[11px] text-rose-500 font-semibold">Special Treasures</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs space-y-1 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Life Journey</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-500 flex items-center justify-center text-sm">🌟</div>
          </div>
          <p className="text-3xl font-bold font-heading text-emerald-600 dark:text-emerald-400">{totalMemories > 0 ? 'Active' : 'Beginning'}</p>
          <p className="text-[11px] text-emerald-500 font-semibold">Scrapbook Timeline ✨</p>
        </div>

      </div>

      {/* Main Dashboard Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-8 space-y-8">
          
          {featuredFavorite && (
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Heart className="w-4 h-4 fill-current" />
                  <span>Favorite Memory Highlight</span>
                </span>
                <button
                  onClick={() => setActiveTab('favorites')}
                  className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
                >
                  View All Favorites <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div 
                onClick={() => onSelectMemory(featuredFavorite)}
                className="grid grid-cols-1 sm:grid-cols-12 gap-4 cursor-pointer group p-2 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <div className="sm:col-span-5 h-44 rounded-2xl overflow-hidden shadow-xs relative bg-gradient-to-tr from-rose-100 to-amber-100 dark:from-slate-800 dark:to-slate-900 flex flex-col items-center justify-center">
                  {featuredFavorite.photos[0] ? (
                    <img
                      src={featuredFavorite.photos[0]}
                      alt={featuredFavorite.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="text-center p-3 text-slate-400">
                      <Camera className="w-8 h-8 text-rose-400 mx-auto mb-1 opacity-70" />
                      <span className="text-xs font-semibold">No Photo</span>
                    </div>
                  )}
                </div>
                <div className="sm:col-span-7 flex flex-col justify-between space-y-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300">
                        📸 Beautiful Moment
                      </span>
                      <span className="text-xs text-slate-400">{featuredFavorite.date}</span>
                    </div>
                    <h3 className="text-lg font-bold font-serif-title text-slate-900 dark:text-white group-hover:text-rose-600 transition-colors">
                      {featuredFavorite.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mt-1">
                      {featuredFavorite.description}
                    </p>
                  </div>
                  {featuredFavorite.quote && (
                    <p className="text-xs font-handwriting text-rose-600 dark:text-rose-300 italic">
                      "{featuredFavorite.quote}"
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold font-serif-title text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <Compass className="w-5 h-5 text-rose-500" />
                <span>Recent Life Journey Memories</span>
              </h2>
              <button
                onClick={() => setActiveTab('journey')}
                className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
              >
                See All <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {recentMemories.length === 0 ? (
              <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-center space-y-3 transition-colors">
                <p className="text-xs text-slate-400">No memories recorded yet.</p>
                <button
                  onClick={onOpenAddMemory}
                  className="px-4 py-2 rounded-2xl bg-rose-500 text-white text-xs font-bold shadow-md hover:bg-rose-600"
                >
                  + Add Your First Memory
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {recentMemories.map((mem) => (
                  <div
                    key={mem.id}
                    onClick={() => onSelectMemory(mem)}
                    className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-2 group"
                  >
                    <div className="h-32 rounded-xl overflow-hidden relative bg-gradient-to-tr from-rose-100 to-purple-100 dark:from-slate-800 dark:to-slate-900 flex flex-col items-center justify-center">
                      {mem.photos[0] ? (
                        <img
                          src={mem.photos[0]}
                          alt={mem.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="text-center text-slate-400">
                          <Camera className="w-6 h-6 text-rose-400 mx-auto opacity-70" />
                          <span className="text-[10px] font-semibold">No Photo</span>
                        </div>
                      )}
                      <span className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold bg-black/60 backdrop-blur-xs text-white">
                        {mem.weather || '📸'}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100 line-clamp-1 group-hover:text-rose-600">
                        {mem.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 flex items-center justify-between">
                        <span>{mem.date}</span>
                        <span>{mem.category}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-800 shadow-xs space-y-3 transition-colors">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Explore Random Memory</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Relive a surprise moment from your journey timeline.
            </p>
            <button
              onClick={() => setActiveTab('random')}
              className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 to-rose-500 text-white text-xs font-bold shadow-md hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Shuffle className="w-4 h-4" />
              <span>Surprise Memory Roulette ✨</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
