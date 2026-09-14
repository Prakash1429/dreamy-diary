import React, { useState } from 'react';
import { 
  Search, 
  Heart, 
  Calendar, 
  MapPin, 
  Camera 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db } from '../db';
import { useLiveQuery } from 'dexie-react-hooks';
import type { MemoryItem, CategoryType } from '../types';

interface JourneyProps {
  onOpenAddMemory: () => void;
  onSelectMemory: (memory: MemoryItem) => void;
  onToggleFavorite: (memoryId: string, currentFav: boolean) => void;
}

const CATEGORIES: (CategoryType | 'All')[] = [
  'All', 'Travel', 'Food', 'Adventure', 'Temples', 'Museums',
  'Personal Goals', 'Experiences', 'Entertainment', 'Events', 'Other'
];

export const Journey: React.FC<JourneyProps> = ({
  onOpenAddMemory,
  onSelectMemory,
  onToggleFavorite
}) => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  const activeUserId = user?.id || localStorage.getItem('dreamy_active_user_id') || 'user_default';

  const memories = useLiveQuery(
    () => db.memories.where('userId').equals(activeUserId).toArray(),
    [activeUserId]
  ) || [];

  const filteredMemories = memories.filter((mem) => {
    const matchesSearch = mem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          mem.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (mem.location && mem.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (mem.quote && mem.quote.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = selectedType === 'all' || mem.type === selectedType;
    const matchesCategory = selectedCategory === 'All' || mem.category === selectedCategory;
    const matchesFav = !onlyFavorites || mem.isFavorite;

    return matchesSearch && matchesType && matchesCategory && matchesFav;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-6 pb-12">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-rose-100 dark:border-slate-800 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 mb-1">
            <span>✨ Life Story & Scrapbook</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif-title text-slate-900 dark:text-white">
            My Journey & Memories
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Every dream lived and beautiful moment preserved in your digital scrapbook.
          </p>
        </div>

        <button
          onClick={onOpenAddMemory}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white text-xs font-bold shadow-md shadow-rose-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 self-start sm:self-auto"
        >
          <Camera className="w-4 h-4 text-white" />
          <span>+ Add Your First Memory</span>
        </button>
      </div>

      <div className="space-y-3 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs">
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search memories by title, quote, story, or place..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
          </div>

          <button
            onClick={() => setOnlyFavorites(!onlyFavorites)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold border transition-colors flex items-center gap-1.5 ${
              onlyFavorites
                ? 'bg-rose-500 text-white border-rose-500'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-current' : ''}`} />
            <span>Only Favorites ❤️</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
          {[
            { id: 'all', label: 'All Memories' },
            { id: 'dream_completed', label: '🌟 Dream Completed' },
            { id: 'beautiful_moment', label: '📸 Beautiful Moment' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedType(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedType === tab.id
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5 pt-1 overflow-x-auto pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {filteredMemories.length === 0 ? (
        <div className="p-12 sm:p-16 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-3xl bg-rose-50 dark:bg-rose-950/60 text-rose-500 mx-auto flex items-center justify-center text-3xl shadow-xs">
            📸
          </div>
          <h3 className="text-2xl font-bold font-serif-title text-slate-900 dark:text-white">
            Your story starts here ✨
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
            No memories recorded yet. Capture your beautiful moments directly or write about dreams you have lived!
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenAddMemory}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white text-xs font-bold shadow-md shadow-rose-500/30 hover:scale-[1.02] active:scale-95 transition-all inline-flex items-center gap-2"
            >
              <Camera className="w-4 h-4" />
              <span>+ Add Your First Memory</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMemories.map((mem) => {
            const coverPhoto = mem.photos[0] || '';

            return (
              <div
                key={mem.id}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-xs hover:shadow-lg transition-all overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  <div 
                    onClick={() => onSelectMemory(mem)}
                    className="p-3 bg-stone-50 dark:bg-slate-800/60 cursor-pointer relative"
                  >
                    <div className="h-52 w-full rounded-2xl overflow-hidden shadow-inner relative bg-gradient-to-tr from-rose-100 via-pink-50 to-purple-100 dark:from-slate-800 dark:to-slate-900 flex flex-col items-center justify-center">
                      {coverPhoto ? (
                        <img
                          src={coverPhoto}
                          alt={mem.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="text-center text-slate-400 p-4">
                          <Camera className="w-10 h-10 text-rose-400 mx-auto mb-1 opacity-70" />
                          <span className="text-xs font-semibold">No Photo Uploaded</span>
                        </div>
                      )}

                      <span className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-xs ${
                        mem.type === 'dream_completed'
                          ? 'bg-amber-500 text-white'
                          : 'bg-rose-500 text-white'
                      }`}>
                        {mem.type === 'dream_completed' ? '🌟 Dream Completed' : '📸 Beautiful Moment'}
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(mem.id, mem.isFavorite);
                        }}
                        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-xs transition-transform active:scale-90 ${
                          mem.isFavorite ? 'bg-rose-500 text-white shadow-xs' : 'bg-black/40 text-white hover:bg-black/60'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${mem.isFavorite ? 'fill-current' : ''}`} />
                      </button>

                      {mem.photos.length > 1 && (
                        <span className="absolute bottom-2 right-2 px-2.5 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-white text-[10px] font-bold flex items-center gap-1.5 border border-white/20 shadow-lg group-hover:scale-105 transition-transform">
                          <span>🂡</span>
                          <span>{mem.photos.length} Card Deck</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-5 space-y-2 cursor-pointer" onClick={() => onSelectMemory(mem)}>
                    <div className="flex items-center justify-between gap-2 text-xs font-medium text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-rose-500" />
                        {mem.date}
                      </span>
                      {mem.weather && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200/50 dark:border-amber-800/50">
                          {mem.weather}
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold">
                        {mem.category}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold font-serif-title text-slate-900 dark:text-white group-hover:text-rose-600 transition-colors line-clamp-1">
                      {mem.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {mem.description}
                    </p>

                    {mem.quote && (
                      <p className="text-xs font-handwriting text-rose-600 dark:text-rose-300 italic line-clamp-1 pt-1">
                        "{mem.quote}"
                      </p>
                    )}

                    {mem.location && (
                      <p className="text-[11px] text-slate-400 flex items-center gap-1 pt-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-500" />
                        <span className="truncate">{mem.location}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-slate-50/70 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => onSelectMemory(mem)}
                    className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline"
                  >
                    Open Scrapbook ✨
                  </button>

                  <span className="text-[10px] text-slate-400 font-semibold">
                    {mem.feelings && mem.feelings.length > 0 ? `✨ ${mem.feelings[0]}` : ''}
                  </span>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
