import React, { useState, useRef } from 'react';
import { X, Download, Share2, Sparkles } from 'lucide-react';
import { toPng } from 'html-to-image';
import type { MemoryItem } from '../types';

interface CardGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  memory: MemoryItem | null;
}

type TemplateStyle = 'polaroid' | 'scrapbook' | 'minimal' | 'vintage' | 'postcard' | 'journal' | 'story';
type AspectRatio = '1:1' | '9:16' | '16:9' | '3:4';

export const CardGeneratorModal: React.FC<CardGeneratorModalProps> = ({
  isOpen,
  onClose,
  memory
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateStyle>('polaroid');
  const [selectedRatio, setSelectedRatio] = useState<AspectRatio>('1:1');
  const [customQuote, setCustomQuote] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !memory) return null;

  const currentPhoto = memory.photos[0] || '';
  const displayQuote = customQuote || memory.quote || memory.thoughts || memory.description;

  const getDimensionClasses = () => {
    switch (selectedRatio) {
      case '9:16':
        return 'w-[360px] h-[640px]';
      case '16:9':
        return 'w-[640px] h-[360px]';
      case '3:4':
        return 'w-[450px] h-[600px]';
      case '1:1':
      default:
        return 'w-[500px] h-[500px]';
    }
  };

  const handleDownloadPNG = async () => {
    if (!cardRef.current) return;
    setIsGenerating(true);
    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `dreamy-memory-${memory.title.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error exporting image card:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Memory: ${memory.title}`,
          text: `"${displayQuote}" - Captured in Dreamy Diary ✨`,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Share error:', err);
      }
    } else {
      alert('Native sharing is not supported on this browser. Use Download PNG to share as image card!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-100 dark:border-slate-800 relative my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-6 h-6 text-rose-500" />
          <h2 className="text-xl font-bold font-serif-title text-slate-800 dark:text-slate-100">
            Downloadable Memory Card Studio ✨
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-7 flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-950 p-6 rounded-3xl overflow-auto min-h-[480px]">
            <div
              ref={cardRef}
              className={`${getDimensionClasses()} relative overflow-hidden transition-all shadow-2xl flex flex-col justify-between`}
            >
              {selectedTemplate === 'polaroid' && (
                <div className="w-full h-full bg-stone-50 p-5 flex flex-col justify-between text-stone-800 font-sans border-8 border-white shadow-xl relative">
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-28 h-6 bg-amber-100/70 border-x-2 border-dashed border-amber-300 transform -rotate-1 z-10"></div>
                  
                  <div className="w-full h-[65%] rounded-lg overflow-hidden shadow-inner border border-stone-200 mt-3 relative">
                    <img src={currentPhoto} alt={memory.title} className="w-full h-full object-cover" />
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/60 text-white rounded text-[10px] font-bold">
                      {memory.type === 'dream_completed' ? '🌟 Dream Completed' : '📸 Beautiful Moment'}
                    </div>
                  </div>

                  <div className="h-[30%] flex flex-col justify-center text-center space-y-1">
                    <h3 className="text-xl font-bold font-serif text-slate-900 line-clamp-1">{memory.title}</h3>
                    <p className="text-base font-handwriting text-rose-700 line-clamp-2 italic px-2">
                      "{displayQuote}"
                    </p>
                    <div className="flex items-center justify-center gap-3 text-[11px] text-stone-500 font-medium">
                      <span>📅 {memory.date}</span>
                      {memory.location && <span>📍 {memory.location}</span>}
                    </div>
                  </div>

                  <div className="absolute bottom-1 right-3 text-[9px] text-stone-400 font-serif italic">
                    Dreamy Diary ✨
                  </div>
                </div>
              )}

              {selectedTemplate === 'scrapbook' && (
                <div className="w-full h-full bg-[#f6f0e6] p-6 flex flex-col justify-between text-amber-950 font-serif border-4 border-amber-200 shadow-xl relative">
                  <div className="flex items-center justify-between border-b border-amber-300/60 pb-2">
                    <span className="text-xs tracking-widest uppercase font-bold text-amber-800">MY LIFE JOURNEY</span>
                    <span className="text-xs font-handwriting text-amber-700 text-lg">✨ {memory.date}</span>
                  </div>

                  <div className="my-auto space-y-3">
                    <div className="w-full h-52 rounded-xl overflow-hidden shadow-md transform rotate-1 border-4 border-white">
                      <img src={currentPhoto} alt={memory.title} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-2xl font-bold text-center text-amber-900">{memory.title}</h3>
                    <p className="text-lg font-handwriting text-amber-900 text-center italic leading-tight">
                      "{displayQuote}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-amber-300/60 text-xs">
                    <span>📍 {memory.location || 'Special Memory'}</span>
                    <span className="font-handwriting text-base font-bold">Dreamy Diary</span>
                  </div>
                </div>
              )}

              {selectedTemplate === 'minimal' && (
                <div className="w-full h-full bg-slate-950 p-7 flex flex-col justify-between text-slate-100 font-sans shadow-2xl relative border border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] tracking-widest uppercase text-amber-400 font-bold">DREAMY DIARY COLLECTION</span>
                    <span className="text-xs text-slate-400">{memory.date}</span>
                  </div>

                  <div className="w-full h-56 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl my-auto">
                    <img src={currentPhoto} alt={memory.title} className="w-full h-full object-cover" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold tracking-tight text-white">{memory.title}</h3>
                    <p className="text-xs text-slate-300 italic line-clamp-2">
                      "{displayQuote}"
                    </p>
                    <div className="text-[11px] text-amber-400/90 font-medium">
                      📍 {memory.location || 'Memorable Destination'}
                    </div>
                  </div>
                </div>
              )}

              {selectedTemplate === 'vintage' && (
                <div className="w-full h-full bg-[#f4ebe1] p-6 flex flex-col justify-between text-stone-900 font-serif border-8 border-stone-300 shadow-xl relative">
                  <div className="text-center border-b-2 border-stone-400/50 pb-2">
                    <h4 className="text-xs tracking-widest uppercase font-bold text-stone-700">MEMORIES OF A LIFETIME</h4>
                  </div>
                  <div className="w-full h-52 rounded overflow-hidden shadow-md my-auto filter sepia-[0.3]">
                    <img src={currentPhoto} alt={memory.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-center space-y-1">
                    <h3 className="text-xl font-bold">{memory.title}</h3>
                    <p className="text-base font-handwriting text-stone-800 italic">"{displayQuote}"</p>
                    <p className="text-xs text-stone-500 font-sans">📅 {memory.date} • 📍 {memory.location || 'Everlasting Memory'}</p>
                  </div>
                </div>
              )}

              {selectedTemplate === 'postcard' && (
                <div className="w-full h-full bg-white p-5 flex flex-col justify-between text-slate-800 border-4 border-rose-200 shadow-xl relative">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold tracking-widest text-rose-500 uppercase">AIR MAIL POSTCARD</span>
                      <h3 className="text-lg font-bold font-serif">{memory.title}</h3>
                    </div>
                    <div className="w-12 h-14 border-2 border-dashed border-rose-400 bg-rose-50 flex flex-col items-center justify-center text-[9px] font-bold text-rose-600">
                      <span>POSTAGE</span>
                      <span>✨</span>
                    </div>
                  </div>
                  <div className="w-full h-52 rounded-xl overflow-hidden border border-slate-200 shadow-md">
                    <img src={currentPhoto} alt={memory.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-1 text-center">
                    <p className="text-sm font-handwriting text-slate-700 italic">"{displayQuote}"</p>
                    <p className="text-[11px] text-slate-500 font-semibold">📍 {memory.location || 'Worldwide'} • {memory.date}</p>
                  </div>
                </div>
              )}

              {selectedTemplate === 'journal' && (
                <div className="w-full h-full bg-[#fdfbf7] p-6 flex flex-col justify-between text-slate-800 font-sans shadow-xl border-l-8 border-rose-400 relative">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                    <h3 className="text-lg font-bold font-serif text-slate-900">{memory.title}</h3>
                    <span className="text-xs font-semibold text-rose-600">{memory.date}</span>
                  </div>
                  <div className="w-full h-52 rounded-2xl overflow-hidden my-auto shadow-md">
                    <img src={currentPhoto} alt={memory.title} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-base font-handwriting text-slate-700 italic leading-relaxed">
                    "{displayQuote}"
                  </p>
                  <div className="text-[11px] text-slate-400 font-semibold text-right">
                    Dreamy Diary Entry ✨
                  </div>
                </div>
              )}

              {selectedTemplate === 'story' && (
                <div className="w-full h-full bg-gradient-to-b from-slate-900 via-rose-950 to-slate-950 p-6 flex flex-col justify-between text-white font-sans shadow-2xl relative">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-rose-500 flex items-center justify-center text-xs">✨</div>
                      <span className="text-xs font-bold">Dreamy Diary</span>
                    </div>
                    <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-md">{memory.date}</span>
                  </div>
                  <div className="w-full h-64 rounded-3xl overflow-hidden shadow-2xl border border-white/20 my-auto">
                    <img src={currentPhoto} alt={memory.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-2 text-center">
                    <h3 className="text-2xl font-bold font-serif tracking-tight">{memory.title}</h3>
                    <p className="text-sm font-handwriting text-rose-200 italic">"{displayQuote}"</p>
                    <p className="text-[11px] text-white/70 font-semibold">📍 {memory.location || 'Special Life Moment'}</p>
                  </div>
                </div>
              )}

            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                1. Select Card Style
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'polaroid', name: 'Polaroid' },
                  { id: 'scrapbook', name: 'Scrapbook' },
                  { id: 'minimal', name: 'Minimal' },
                  { id: 'vintage', name: 'Vintage' },
                  { id: 'postcard', name: 'Postcard' },
                  { id: 'journal', name: 'Journal' },
                  { id: 'story', name: 'IG Story' },
                ].map((tmpl) => (
                  <button
                    key={tmpl.id}
                    onClick={() => setSelectedTemplate(tmpl.id as TemplateStyle)}
                    className={`py-2 px-3 rounded-2xl text-xs font-semibold border transition-all ${
                      selectedTemplate === tmpl.id
                        ? 'bg-rose-500 text-white border-rose-500 shadow-md scale-[1.02]'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {tmpl.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                2. Select Export Aspect Ratio
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: '1:1', label: '1:1 Square (Post)' },
                  { id: '9:16', label: '9:16 Story' },
                  { id: '16:9', label: '16:9 Landscape' },
                  { id: '3:4', label: '3:4 Portrait' },
                ].map((ratio) => (
                  <button
                    key={ratio.id}
                    onClick={() => setSelectedRatio(ratio.id as AspectRatio)}
                    className={`py-2 px-3 rounded-2xl text-xs font-semibold border transition-all ${
                      selectedRatio === ratio.id
                        ? 'bg-purple-600 text-white border-purple-600 shadow-md'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {ratio.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                3. Customize Quote Text (Optional)
              </label>
              <textarea
                value={customQuote}
                onChange={(e) => setCustomQuote(e.target.value)}
                placeholder="Override quote text on the card..."
                rows={2}
                className="w-full px-3 py-2 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-400 resize-none"
              />
            </div>

            <div className="space-y-2.5 pt-2">
              <button
                onClick={handleDownloadPNG}
                disabled={isGenerating}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white text-sm font-bold shadow-lg shadow-rose-500/30 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>{isGenerating ? 'Generating HD Card...' : 'Download HD PNG Card'}</span>
              </button>

              <button
                onClick={handleNativeShare}
                className="w-full py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700"
              >
                <Share2 className="w-4 h-4 text-rose-500" />
                <span>Share via App / Social Media</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
