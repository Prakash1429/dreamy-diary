import React from 'react';
import { Heart, Camera } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db } from '../db';
import { useLiveQuery } from 'dexie-react-hooks';
import type { MemoryItem } from '../types';

interface FavoritesProps {
  onSelectMemory: (memory: MemoryItem) => void;
  onToggleFavorite: (memoryId: string, currentFav: boolean) => void;
}

export const Favorites: React.FC<FavoritesProps> = ({ onSelectMemory, onToggleFavorite }) => {
  const { user } = useAuth();

  const favorites = useLiveQuery(
    () => (user ? db.memories.where('userId').equals(user.id).filter(m => m.isFavorite).toArray() : []),
    [user?.id]
  ) || [];

  return (
    <div className="space-y-6 pb-12">
      
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-rose-100 dark:border-slate-800 shadow-xs space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300">
          <Heart className="w-3.5 h-3.5 fill-current" />
          <span>Most Special Collection</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-serif-title text-slate-900 dark:text-white">
          My Most Special Memories ❤️
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          A dedicated sanctuary for the moments that touch your soul deepest.
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-center space-y-3">
          <Heart className="w-10 h-10 text-rose-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No Favorite Memories Yet</h3>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Click the heart ❤️ icon on any memory in your Journey to save it to your special collection!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((mem) => {
            const coverPhoto = mem.photos[0] || '';

            return (
              <div
                key={mem.id}
                onClick={() => onSelectMemory(mem)}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-rose-100 dark:border-slate-800 shadow-xs hover:shadow-lg transition-all overflow-hidden cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="h-52 w-full relative overflow-hidden bg-gradient-to-tr from-rose-100 to-purple-100 dark:from-slate-800 dark:to-slate-900 flex flex-col items-center justify-center">
                    {coverPhoto ? (
                      <img
                        src={coverPhoto}
                        alt={mem.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="text-center text-slate-400 p-4">
                        <Camera className="w-10 h-10 text-rose-400 mx-auto mb-1 opacity-70" />
                        <span className="text-xs font-semibold">No Photo</span>
                      </div>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(mem.id, true);
                      }}
                      className="absolute top-3 right-3 p-2 rounded-full bg-rose-500 text-white shadow-md hover:scale-110 transition-transform"
                      title="Remove from favorites"
                    >
                      <Heart className="w-3.5 h-3.5 fill-current" />
                    </button>
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-black/60 backdrop-blur-xs text-white">
                      {mem.type === 'dream_completed' ? '🌟 Dream Completed' : '📸 Beautiful Moment'}
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>📅 {mem.date}</span>
                      <span className="px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-300 font-semibold text-[10px]">
                        {mem.category}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold font-serif-title text-slate-900 dark:text-white group-hover:text-rose-600 transition-colors">
                      {mem.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                      {mem.description}
                    </p>

                    {mem.quote && (
                      <p className="text-xs font-handwriting text-rose-600 dark:text-rose-300 italic pt-1">
                        "{mem.quote}"
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-rose-50/40 dark:bg-slate-800/40 border-t border-rose-100/60 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-rose-600 dark:text-rose-400">
                  <span>View Scrapbook ✨</span>
                  {mem.location && <span className="text-[10px] text-slate-400 font-normal">📍 {mem.location}</span>}
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
