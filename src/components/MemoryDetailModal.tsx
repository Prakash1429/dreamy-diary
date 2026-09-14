import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  MapPin, 
  Heart, 
  Download, 
  Share2, 
  Edit3, 
  Trash2, 
  Quote, 
  Tag, 
  Camera 
} from 'lucide-react';
import type { MemoryItem } from '../types';
import { db } from '../db';
import { PhotoLightbox } from './PhotoLightbox';
import { CardGeneratorModal } from './CardGeneratorModal';
import { FannedPhotoDeck } from './FannedPhotoDeck';

interface MemoryDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  memory: MemoryItem | null;
  onEdit: (memory: MemoryItem) => void;
  onDeleted: () => void;
  onToggleFavorite: (memoryId: string, currentFav: boolean) => void;
}

export const MemoryDetailModal: React.FC<MemoryDetailModalProps> = ({
  isOpen,
  onClose,
  memory,
  onEdit,
  onDeleted,
  onToggleFavorite
}) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showCardGenerator, setShowCardGenerator] = useState(false);
  const [viewMode, setViewMode] = useState<'deck' | 'grid'>('deck');

  if (!isOpen || !memory) return null;

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this memory from your diary?')) {
      await db.memories.delete(memory.id);
      onDeleted();
      onClose();
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: memory.title,
          text: `"${memory.quote || memory.description}" - Dreamy Diary ✨`,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Share failed', err);
      }
    } else {
      alert(`Shared "${memory.title}" link copied!`);
    }
  };

  const primaryPhoto = memory.photos[0] || '';

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in overflow-y-auto">
        <div className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-100 dark:border-slate-800 relative my-8 max-h-[92vh] overflow-y-auto">
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
              memory.type === 'dream_completed'
                ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                : 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
            }`}>
              {memory.type === 'dream_completed' ? '🌟 Dream Completed' : '📸 Beautiful Moment'}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleFavorite(memory.id, memory.isFavorite)}
                className={`p-2 rounded-xl border transition-colors ${
                  memory.isFavorite
                    ? 'bg-rose-500 text-white border-rose-500 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
                title="Favorite"
              >
                <Heart className={`w-4 h-4 ${memory.isFavorite ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={() => setShowCardGenerator(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 border border-purple-200 dark:border-purple-800 hover:bg-purple-100 text-xs font-semibold transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Card Studio</span>
              </button>

              <button
                onClick={handleShare}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 text-xs font-semibold transition-colors"
                title="Share"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => { onClose(); onEdit(memory); }}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors"
                title="Edit"
              >
                <Edit3 className="w-4 h-4" />
              </button>

              <button
                onClick={handleDelete}
                className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 transition-colors"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-2 mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold font-serif-title text-slate-900 dark:text-white leading-tight">
              {memory.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-rose-500" />
                {memory.date}
              </span>

              {memory.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  {memory.location}
                </span>
              )}

              {memory.weather && (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-bold border border-amber-200 dark:border-amber-800">
                  {memory.weather}
                </span>
              )}

              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold">
                {memory.category}
              </span>
            </div>
          </div>

          {/* Photo Gallery Display - Shows All Uploaded Photos when opened */}
          <div className="mb-8 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-rose-500" />
                <span>Memory Photo Album ({memory.photos.length} Photo{memory.photos.length === 1 ? '' : 's'})</span>
              </h3>
              
              {memory.photos.length > 1 && (
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-[11px] font-bold">
                  <button
                    onClick={() => setViewMode('deck')}
                    className={`px-2.5 py-1 rounded-lg transition-all ${
                      viewMode === 'deck' 
                        ? 'bg-rose-500 text-white shadow-xs' 
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                    }`}
                  >
                    🂡 Card Deck
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-2.5 py-1 rounded-lg transition-all ${
                      viewMode === 'grid' 
                        ? 'bg-rose-500 text-white shadow-xs' 
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                    }`}
                  >
                    🖼️ Grid
                  </button>
                </div>
              )}
            </div>

            {memory.photos.length > 1 && viewMode === 'deck' ? (
              <FannedPhotoDeck
                photos={memory.photos}
                title={memory.title}
                onPhotoClick={(idx) => setLightboxIndex(idx)}
              />
            ) : memory.photos.length === 1 ? (
              <div 
                onClick={() => setLightboxIndex(0)}
                className="polaroid-card rounded-2xl cursor-pointer scrapbook-tape max-w-lg mx-auto transform -rotate-1 hover:rotate-0 transition-transform"
              >
                <div className="w-full h-72 sm:h-80 rounded-xl overflow-hidden shadow-inner">
                  <img src={primaryPhoto} alt={memory.title} className="w-full h-full object-cover" />
                </div>
                <div className="mt-3 text-center">
                  <p className="font-handwriting text-2xl text-rose-700 dark:text-rose-300">
                    {memory.title}
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {memory.photos.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setLightboxIndex(idx)}
                    className="polaroid-card rounded-2xl cursor-pointer transform hover:-translate-y-1 hover:rotate-1 transition-all shadow-md group p-2 pb-5 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700"
                  >
                    <div className="w-full aspect-square rounded-xl overflow-hidden shadow-inner relative">
                      <img 
                        src={img} 
                        alt={`${memory.title} photo ${idx + 1}`} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold bg-black/60 backdrop-blur-xs text-white">
                        Photo {idx + 1} of {memory.photos.length}
                      </span>
                    </div>
                    <div className="mt-2 text-center">
                      <p className="font-handwriting text-base text-rose-700 dark:text-rose-300 truncate">
                        {memory.title} #{idx + 1}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {memory.quote && (
            <div className="mb-6 p-5 rounded-2xl bg-gradient-to-r from-rose-50/80 via-pink-50/50 to-amber-50/80 dark:from-slate-800/80 dark:to-slate-800/50 border border-rose-100 dark:border-slate-700/60 relative">
              <Quote className="w-8 h-8 text-rose-300 dark:text-rose-800 absolute top-3 left-3 -z-0 opacity-50" />
              <p className="font-serif italic text-base sm:text-lg text-slate-800 dark:text-slate-100 relative z-10 text-center">
                "{memory.quote}"
              </p>
            </div>
          )}

          <div className="space-y-4 mb-6 text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
                The Story
              </h4>
              <p className="whitespace-pre-line">{memory.description}</p>
            </div>

            {memory.thoughts && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-500 dark:text-rose-400 mb-1">
                  Personal Thoughts & Feelings
                </h4>
                <p className="font-handwriting text-xl text-slate-800 dark:text-slate-200 leading-normal">
                  {memory.thoughts}
                </p>
              </div>
            )}
          </div>

          {memory.feelings && memory.feelings.length > 0 && (
            <div className="mb-6 space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Emotions Felt
              </h4>
              <div className="flex flex-wrap gap-2">
                {memory.feelings.map((f, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
                  >
                    ✨ {f}
                  </span>
                ))}
              </div>
            </div>
          )}

          {memory.tags && memory.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 items-center text-xs text-slate-400 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Tag className="w-3.5 h-3.5 text-slate-400" />
              {memory.tags.map((t, idx) => (
                <span key={idx} className="text-slate-500 dark:text-slate-400">
                  #{t}
                </span>
              ))}
            </div>
          )}

        </div>
      </div>

      {lightboxIndex !== null && (
        <PhotoLightbox
          isOpen={lightboxIndex !== null}
          photos={memory.photos}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}

      {showCardGenerator && (
        <CardGeneratorModal
          isOpen={showCardGenerator}
          onClose={() => setShowCardGenerator(false)}
          memory={memory}
        />
      )}
    </>
  );
};
