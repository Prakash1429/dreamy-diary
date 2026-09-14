import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface PhotoLightboxProps {
  isOpen: boolean;
  photos: string[];
  initialIndex?: number;
  onClose: () => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  isOpen,
  photos,
  initialIndex = 0,
  onClose
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  if (!isOpen || photos.length === 0) return null;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Image Counter */}
      <div className="absolute top-5 left-6 text-white/80 text-xs font-semibold tracking-wider">
        {currentIndex + 1} / {photos.length}
      </div>

      {/* Previous Button */}
      {photos.length > 1 && (
        <button
          onClick={handlePrev}
          className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Current Photo */}
      <div className="max-w-4xl max-h-[85vh] p-2 flex items-center justify-center">
        <img
          src={photos[currentIndex]}
          alt={`Full view ${currentIndex + 1}`}
          className="max-w-full max-h-[82vh] object-contain rounded-2xl shadow-2xl"
        />
      </div>

      {/* Next Button */}
      {photos.length > 1 && (
        <button
          onClick={handleNext}
          className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};
