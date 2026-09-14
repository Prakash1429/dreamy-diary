import React, { useState, useEffect } from 'react';
import { X, Camera, MapPin, Quote, Trash2, Compass } from 'lucide-react';
import type { MemoryItem, CategoryType, MemoryType } from '../types';
import { db, logHistory } from '../db';
import { useAuth } from '../context/AuthContext';
import { checkAndUnlockAchievements } from '../utils/achievementChecker';
import { LocationPickerModal } from './LocationPickerModal';

interface MemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  memoryToEdit?: MemoryItem | null;
  onSaved?: () => void;
}

const CATEGORIES: CategoryType[] = [
  'Travel', 'Food', 'Adventure', 'Temples', 'Museums',
  'Personal Goals', 'Experiences', 'Entertainment', 'Events', 'Other'
];

const EMOTION_CHIPS = [
  '✨ Peaceful', '🌟 Joyful', '💖 Loved', '🙏 Grateful', 
  '⚡ Excited', '🌙 Nostalgic', '🎨 Creative', '🌊 Serene', 
  '🔥 Inspired', '🔮 Magical'
];

const WEATHER_CHIPS = [
  '☀️ Sunny', '🌅 Sunset', '🌧️ Rainy', '🍃 Breezy', 
  '☁️ Cloudy', '🌌 Starry Night', '⚡ Thunderstorm', '❄️ Chilly'
];

export const MemoryModal: React.FC<MemoryModalProps> = ({
  isOpen,
  onClose,
  memoryToEdit,
  onSaved
}) => {
  const { user } = useAuth();
  const [memoryType, setMemoryType] = useState<MemoryType>('beautiful_moment');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState<CategoryType>('Travel');
  const [photos, setPhotos] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [thoughts, setThoughts] = useState('');
  const [feelings, setFeelings] = useState<string[]>([]);
  const [weather, setWeather] = useState<string>('☀️ Sunny');
  const [quote, setQuote] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [notes, setNotes] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [lat, setLat] = useState<number | undefined>(undefined);
  const [lng, setLng] = useState<number | undefined>(undefined);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  useEffect(() => {
    if (memoryToEdit) {
      setMemoryType(memoryToEdit.type);
      setTitle(memoryToEdit.title);
      setDate(memoryToEdit.date);
      setLocation(memoryToEdit.location || '');
      setLat(memoryToEdit.lat);
      setLng(memoryToEdit.lng);
      setCategory(memoryToEdit.category);
      setPhotos(memoryToEdit.photos || []);
      setDescription(memoryToEdit.description);
      setThoughts(memoryToEdit.thoughts || '');
      setFeelings(memoryToEdit.feelings || []);
      setWeather(memoryToEdit.weather || '☀️ Sunny');
      setQuote(memoryToEdit.quote || '');
      setTagsInput(memoryToEdit.tags ? memoryToEdit.tags.join(', ') : '');
      setNotes(memoryToEdit.notes || '');
      setIsFavorite(memoryToEdit.isFavorite || false);
    } else {
      setMemoryType('beautiful_moment');
      setTitle('');
      setDate(new Date().toISOString().split('T')[0]);
      setLocation('');
      setLat(undefined);
      setLng(undefined);
      setCategory('Travel');
      setPhotos([]);
      setDescription('');
      setThoughts('');
      setFeelings(['Joyful', 'Grateful']);
      setWeather('☀️ Sunny');
      setQuote('');
      setTagsInput('');
      setNotes('');
      setIsFavorite(false);
    }
  }, [memoryToEdit, isOpen]);

  const handleConfirmLocation = (loc: { locationName: string; lat: number; lng: number }) => {
    setLocation(loc.locationName);
    setLat(loc.lat);
    setLng(loc.lng);
  };

  if (!isOpen) return null;

  const handleMultiplePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const filePromises = files.map(file => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) resolve(reader.result as string);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(filePromises).then(newPhotoUrls => {
      setPhotos(prev => [...prev, ...newPhotoUrls]);
    });
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const makeCoverPhoto = (index: number) => {
    if (index === 0) return;
    setPhotos(prev => {
      const copy = [...prev];
      const selected = copy.splice(index, 1)[0];
      return [selected, ...copy];
    });
  };

  const toggleFeeling = (emotion: string) => {
    const cleanEmotion = emotion.replace(/^[^\w]+/, '').trim();
    if (feelings.includes(cleanEmotion)) {
      setFeelings(prev => prev.filter(f => f !== cleanEmotion));
    } else {
      setFeelings(prev => [...prev, cleanEmotion]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const finalTitle = title.trim() || (category ? `Memory of ${category}` : 'My Beautiful Memory');
    const activeUserId = user?.id || localStorage.getItem('dreamy_active_user_id') || 'user_default';

    const tags = tagsInput
      .split(',')
      .map(t => t.trim().replace(/^#/, ''))
      .filter(t => t.length > 0);

    const isEditingMode = Boolean(memoryToEdit && memoryToEdit.id && memoryToEdit.id.trim() !== '');
    const memId = isEditingMode 
      ? memoryToEdit!.id 
      : 'mem_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);

    const newMemory: MemoryItem = {
      id: memId,
      userId: activeUserId,
      type: memoryType,
      title: finalTitle,
      date,
      location: location.trim() || undefined,
      category,
      photos,
      description: description.trim(),
      thoughts: thoughts.trim() || undefined,
      feelings,
      weather,
      quote: quote.trim() || undefined,
      tags,
      notes: notes.trim() || undefined,
      isFavorite,
      lat,
      lng,
      createdAt: (memoryToEdit && memoryToEdit.createdAt) ? memoryToEdit.createdAt : new Date().toISOString()
    };

    try {
      await db.memories.put(newMemory);

      // Close modal immediately for instant responsiveness
      if (onSaved) onSaved();
      onClose();

      // Background non-blocking tasks
      logHistory({
        userId: activeUserId,
        category: 'memory',
        action: isEditingMode ? 'update' : 'create',
        status: 'success',
        title: isEditingMode ? 'Updated Memory Scrapbook' : 'Added New Memory',
        details: `Captured memory "${newMemory.title}".`,
        icon: '📸'
      }).catch(() => {});

      checkAndUnlockAchievements(activeUserId).catch(() => {});
    } catch (err) {
      console.error('Error saving memory item:', err);
      if (onSaved) onSaved();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-100 dark:border-slate-800 relative max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-400 via-pink-400 to-amber-300 p-0.5 shadow-md">
            <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[14px] flex items-center justify-center text-2xl">
              {memoryType === 'dream_completed' ? '🌟' : '📸'}
            </div>
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 mb-0.5">
              {memoryType === 'dream_completed' ? '🌟 Dream Completed' : '📸 Beautiful Moment'}
            </div>
            <h2 className="text-xl font-bold font-serif-title text-slate-800 dark:text-slate-100">
              {memoryToEdit ? 'Edit Memory Scrapbook' : 'Preserve a Beautiful Memory ✨'}
            </h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {!memoryToEdit && (
            <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl">
              <button
                type="button"
                onClick={() => setMemoryType('beautiful_moment')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  memoryType === 'beautiful_moment'
                    ? 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-300 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <span>📸 Beautiful Moment</span>
              </button>
              <button
                type="button"
                onClick={() => setMemoryType('dream_completed')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  memoryType === 'dream_completed'
                    ? 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-300 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <span>🌟 Dream Completed</span>
              </button>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Memory Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Visited Marina Beach at Sunrise"
              className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Date *
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryType)}
                className="w-full px-3 py-2 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-400"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Favorite?
              </label>
              <button
                type="button"
                onClick={() => setIsFavorite(!isFavorite)}
                className={`w-full py-2 px-3 rounded-2xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  isFavorite
                    ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                <span>{isFavorite ? 'Saved Favorite ❤️' : 'Mark Favorite'}</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center justify-between">
              <span>Location (Optional)</span>
              {lat && lng && (
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  ✓ Coordinates set ({lat.toFixed(2)}, {lng.toFixed(2)})
                </span>
              )}
            </label>
            <div className="flex gap-2 items-center">
              <div className="relative flex-1">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Besant Nagar Beach, Chennai"
                  className="w-full pl-9 pr-4 py-2 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>
              <button
                type="button"
                onClick={() => setIsPickerOpen(true)}
                className="px-3.5 py-2 rounded-2xl bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 text-rose-600 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
              >
                <Compass className="w-3.5 h-3.5 text-rose-500" />
                <span>Pick on Map</span>
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-rose-500" />
                <span>Upload Memory Photos ({photos.length} Selected)</span>
              </label>
              <label className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold cursor-pointer transition-all shadow-xs hover:scale-[1.02] flex items-center gap-1">
                <span>+ Select Multiple Photos</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleMultiplePhotoUpload}
                  className="hidden"
                />
              </label>
            </div>

            {photos.length === 0 ? (
              <label className="p-8 rounded-2xl border-2 border-dashed border-rose-200 dark:border-slate-700 bg-rose-50/40 dark:bg-slate-800/40 text-center cursor-pointer flex flex-col items-center justify-center gap-2 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors">
                <Camera className="w-8 h-8 text-rose-400 animate-bounce-short" />
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Click here or press "+ Select Multiple Photos"
                </p>
                <p className="text-[10px] text-slate-400">
                  You can select multiple photos at once from your device.
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleMultiplePhotoUpload}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                {photos.map((img, idx) => (
                  <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden shadow-xs border border-slate-200 dark:border-slate-700">
                    <img src={img} alt={`Memory ${idx + 1}`} className="w-full h-full object-cover" />
                    
                    {/* Badge */}
                    <span className={`absolute top-1 left-1 px-1.5 py-0.5 rounded-md text-[9px] font-bold ${
                      idx === 0 ? 'bg-rose-500 text-white' : 'bg-black/60 text-white'
                    }`}>
                      {idx === 0 ? '★ Cover' : `#${idx + 1}`}
                    </span>

                    {/* Action Overlay */}
                    <div className="absolute inset-0 bg-slate-900/65 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                      {idx !== 0 && (
                        <button
                          type="button"
                          onClick={() => makeCoverPhoto(idx)}
                          className="px-2 py-1 rounded-lg bg-white/90 text-slate-900 text-[10px] font-bold hover:bg-white shadow-xs"
                          title="Set as Cover Photo"
                        >
                          Set Cover
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => removePhoto(idx)}
                        className="p-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-700 shadow-xs"
                        title="Delete photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Add More Photos Button in Grid */}
                <label className="aspect-square rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center text-slate-400 hover:text-rose-500 hover:border-rose-400 cursor-pointer transition-all bg-white dark:bg-slate-800">
                  <Camera className="w-5 h-5 mb-0.5" />
                  <span className="text-[10px] font-bold">+ Add More</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleMultiplePhotoUpload}
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Memory Story & Description *
            </label>
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What happened? Write down the story of this experience..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-400 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Personal Thoughts & Reflexions
            </label>
            <textarea
              value={thoughts}
              onChange={(e) => setThoughts(e.target.value)}
              placeholder="How did this experience impact you? What thoughts stayed in your mind?"
              rows={2}
              className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-400 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Feelings & Emotions
            </label>
            <div className="flex flex-wrap gap-1.5">
              {EMOTION_CHIPS.map((chip) => {
                const cleanName = chip.replace(/^[^\w]+/, '').trim();
                const isSelected = feelings.includes(cleanName);
                return (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => toggleFeeling(chip)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-rose-500 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {chip}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
              <span>Weather & Atmosphere Stamp 🌤️</span>
              {weather && (
                <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">
                  Selected: {weather}
                </span>
              )}
            </label>
            <div className="flex flex-wrap gap-1.5">
              {WEATHER_CHIPS.map((chip) => {
                const isSelected = weather === chip;
                return (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setWeather(chip)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-amber-500 text-white shadow-xs scale-[1.03]'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {chip}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
              <Quote className="w-3.5 h-3.5 text-rose-500" />
              <span>Special Quote / Saying</span>
            </label>
            <input
              type="text"
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              placeholder='e.g. "The ocean connects all things and whispers quiet truths."'
              className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs italic font-serif text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="Beach, Sunrise, MorningCalm, Chennai"
              className="w-full px-4 py-2 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white text-sm font-bold shadow-md shadow-rose-500/30 hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
            >
              Preserve Memory Forever ✨
            </button>
          </div>

        </form>
      </div>

      <LocationPickerModal
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        initialLocationName={location}
        initialLat={lat}
        initialLng={lng}
        onConfirm={handleConfirmLocation}
      />
    </div>
  );
};
