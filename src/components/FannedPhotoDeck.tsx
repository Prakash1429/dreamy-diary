import React, { useState } from 'react';
import { Layers, Maximize2, Sparkles } from 'lucide-react';

interface FannedPhotoDeckProps {
  photos: string[];
  title?: string;
  onPhotoClick: (index: number) => void;
  compact?: boolean;
}

export const FannedPhotoDeck: React.FC<FannedPhotoDeckProps> = ({
  photos,
  title,
  onPhotoClick,
  compact = false,
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (!photos || photos.length === 0) {
    return null;
  }

  // Single photo view
  if (photos.length === 1) {
    return (
      <div className="w-full flex flex-col items-center">
        <div 
          onClick={() => onPhotoClick(0)}
          className="group relative cursor-pointer polaroid-card max-w-md w-full bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-3xl border-2 border-slate-200/80 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300 transform -rotate-1 hover:rotate-0 hover:-translate-y-1"
        >
          <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-inner">
            <img 
              src={photos[0]} 
              alt={title || 'Memory photo'} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg">
                <Maximize2 className="w-3.5 h-3.5" /> Open Lightbox
              </span>
            </div>
          </div>
          {title && (
            <div className="mt-3 text-center">
              <p className="font-handwriting text-2xl text-rose-700 dark:text-rose-300 truncate">
                {title}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Multiple photos: Fanned Playing Card Deck (Cascading like playing cards in hand)
  const suits = ['♠', '♥', '♦', '♣'];
  const suitColors = ['text-slate-900 dark:text-white', 'text-rose-600', 'text-rose-600', 'text-slate-900 dark:text-white'];
  
  const total = photos.length;
  // Calculate spread step based on number of photos
  const maxSpanAngle = Math.min(28, total * 7); // max 28deg total arc
  const angleStep = total > 1 ? maxSpanAngle / (total - 1) : 0;
  const xOffsetStep = compact ? 24 : 42; // horizontal offset spacing between cards

  return (
    <div className="w-full flex flex-col items-center py-4 select-none">
      
      {/* Top Deck Banner / Counter */}
      <div className="flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-bold shadow-xs">
        <Layers className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
        <span>Fanned Photo Card Deck • {total} Photos</span>
        <span className="text-[10px] opacity-75 font-normal ml-1">
          (Hover to fan out, click to view)
        </span>
      </div>

      {/* Fanned Card Stack Container */}
      <div 
        className={`relative flex items-center justify-center w-full ${
          compact ? 'h-60 max-w-sm' : 'h-80 sm:h-96 max-w-xl'
        } transition-all duration-300`}
      >
        {photos.map((photo, idx) => {
          // Calculate relative position from front-most card (last photo is top card)
          const offsetFromEnd = idx - (total - 1); // 0 for last card, -1 for second last, etc.
          
          // Base rotation: leftmost card rotated counter-clockwise (-18deg to -24deg), top card 0deg
          let rotation = offsetFromEnd * angleStep;
          
          // Horizontal translate offset to create cascading fan to the left
          let translateX = offsetFromEnd * xOffsetStep;
          
          // Vertical arc offset
          let translateY = Math.abs(offsetFromEnd) * 4;

          // Adjust transforms if hovering this card or stack
          const isThisHovered = hoveredIdx === idx;
          const isAnyHovered = hoveredIdx !== null;

          if (isThisHovered) {
            rotation = 0;
            translateY -= 20;
            translateX += (offsetFromEnd === 0 ? 10 : offsetFromEnd * 5);
          } else if (isAnyHovered) {
            // Extra fan out when hovering deck
            translateX = offsetFromEnd * (xOffsetStep + 12);
          }

          const suitIndex = idx % 4;
          const suitIcon = suits[suitIndex];
          const suitColor = suitColors[suitIndex];

          return (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={() => onPhotoClick(idx)}
              style={{
                transform: `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotation}deg) scale(${isThisHovered ? 1.08 : 1})`,
                zIndex: isThisHovered ? 50 : idx + 10,
              }}
              className={`absolute cursor-pointer transition-all duration-300 ease-out origin-bottom-center ${
                compact 
                  ? 'w-40 h-52 sm:w-44 sm:h-56 p-2 rounded-2xl' 
                  : 'w-52 h-72 sm:w-64 sm:h-84 p-3 rounded-3xl'
              } bg-white dark:bg-slate-900 border-2 sm:border-4 ${
                isThisHovered 
                  ? 'border-rose-400 dark:border-rose-500 shadow-2xl ring-4 ring-rose-400/20' 
                  : 'border-slate-200 dark:border-slate-700/80 shadow-xl'
              }`}
            >
              {/* Playing Card Top Corner Suite & Badge */}
              <div className="flex items-center justify-between px-1 mb-1.5 text-xs font-bold">
                <span className={`flex items-center gap-1 ${suitColor}`}>
                  <span className="text-sm leading-none">{suitIcon}</span>
                  <span className="text-[11px] font-mono tracking-tighter">#{idx + 1}</span>
                </span>
                <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                  {idx + 1}/{total}
                </span>
              </div>

              {/* Photo Container */}
              <div className="relative w-full h-[calc(100%-2.5rem)] rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-inner group">
                <img
                  src={photo}
                  alt={`${title || 'Memory photo'} ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Hover overlay indicator */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex flex-col items-center justify-center p-2 text-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-rose-500 text-white px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-md">
                    <Maximize2 className="w-3 h-3" /> View Photo
                  </span>
                </div>
              </div>

              {/* Playing Card Bottom Corner Suite (Inverted) */}
              <div className="flex items-center justify-between px-1 mt-1 text-xs font-bold transform rotate-180 opacity-60">
                <span className={`flex items-center gap-1 ${suitColor}`}>
                  <span className="text-sm leading-none">{suitIcon}</span>
                  <span className="text-[10px] font-mono">#{idx + 1}</span>
                </span>
              </div>

            </div>
          );
        })}
      </div>

      {/* Helper caption */}
      <div className="mt-2 text-center text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
        <Sparkles className="w-3 h-3 text-amber-500" />
        <span>Stacked playing card layout • Click any card to launch full screen viewer</span>
      </div>

    </div>
  );
};
