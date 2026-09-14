import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Search, 
  CheckCircle2, 
  Heart, 
  MapPin, 
  Clock, 
  Calendar, 
  X, 
  Plus, 
  Sparkles, 
  Check,
  Map,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CHENNAI_PLACES, type ChennaiPlace } from '../data/chennaiPlaces';
import { logHistory } from '../db';

interface RecommendProps {
  onOpenAddMemoryWithPlace?: (place: ChennaiPlace) => void;
}

export const RecommendPage: React.FC<RecommendProps> = ({ onOpenAddMemoryWithPlace }) => {
  const [visitedIds, setVisitedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('chennai_completed_places');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('chennai_favorite_places');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeTab, setActiveTab] = useState<'all' | 'free' | 'paid' | 'completed' | 'favorites'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlace, setSelectedPlace] = useState<ChennaiPlace | null>(null);

  // Persist visited places
  useEffect(() => {
    localStorage.setItem('chennai_completed_places', JSON.stringify(visitedIds));
  }, [visitedIds]);

  // Persist favorite places
  useEffect(() => {
    localStorage.setItem('chennai_favorite_places', JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  // Toggle visited / completed status
  const toggleVisited = (place: ChennaiPlace, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    const isVisited = visitedIds.includes(place.id);
    let newVisited: string[];

    if (isVisited) {
      newVisited = visitedIds.filter(id => id !== place.id);
    } else {
      newVisited = [...visitedIds, place.id];
      // Trigger celebratory confetti when completing a place!
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
      logHistory({
        category: 'memory',
        action: 'completed_chennai_place',
        status: 'success',
        title: `Completed ${place.name}! ✨`,
        details: `Marked "${place.name}" (${place.area}) as visited!`,
        icon: '✅'
      });
    }

    setVisitedIds(newVisited);
  };

  // Toggle favorite status
  const toggleFavorite = (placeId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (favoriteIds.includes(placeId)) {
      setFavoriteIds(favoriteIds.filter(id => id !== placeId));
    } else {
      setFavoriteIds([...favoriteIds, placeId]);
    }
  };

  // Generate Google Maps URL for tracking location
  const getGoogleMapsUrl = (place: ChennaiPlace) => {
    const query = `${place.name}, ${place.locationAddress || place.area}, Chennai`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  };

  // Filter places based on tab, category, and search query
  const filteredPlaces = CHENNAI_PLACES.filter(place => {
    // Tab Filter
    if (activeTab === 'free' && place.entryType !== 'free') return false;
    if (activeTab === 'paid' && place.entryType !== 'paid') return false;
    if (activeTab === 'completed' && !visitedIds.includes(place.id)) return false;
    if (activeTab === 'favorites' && !favoriteIds.includes(place.id)) return false;

    // Category Filter
    if (selectedCategory !== 'All' && place.category !== selectedCategory) return false;

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesName = place.name.toLowerCase().includes(q);
      const matchesArea = place.area.toLowerCase().includes(q);
      const matchesDesc = place.description.toLowerCase().includes(q);
      const matchesFamous = place.famousFor.some(f => f.toLowerCase().includes(q));
      if (!matchesName && !matchesArea && !matchesDesc && !matchesFamous) return false;
    }

    return true;
  });

  const freeCount = CHENNAI_PLACES.filter(p => p.entryType === 'free').length;
  const paidCount = CHENNAI_PLACES.filter(p => p.entryType === 'paid').length;
  const visitedCount = visitedIds.length;
  const totalCount = CHENNAI_PLACES.length;
  const completionPercentage = Math.round((visitedCount / totalCount) * 100);

  const categories = [
    'All',
    'Heritage & Historical',
    'Beaches & Coastal',
    'Hindu Temples',
    'Churches',
    'Mosques',
    'Museums & Art',
    'Parks & Nature',
    'Wildlife & Animals',
    'Science & Educational',
    'Arts & Culture',
    'Shopping & Exploration'
  ];

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto select-none">
      
      {/* Top Banner & Exploration Progress */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-white">
              <Compass className="w-3.5 h-3.5" />
              <span>Master Chennai Travel Guide 📍</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold font-serif-title tracking-tight">
              Namma Chennai Visiting Places
            </h1>
            <p className="text-xs sm:text-sm text-amber-100 leading-relaxed">
              Explore all {totalCount} iconic attractions across 11 categories in Chennai! Separate Free & Paid sections with completion badges and 1-click memory logs.
            </p>
          </div>

          {/* Progress Card */}
          <div className="bg-white/15 backdrop-blur-md border border-white/25 p-4 sm:p-5 rounded-2xl shrink-0 space-y-2 min-w-[240px]">
            <div className="flex items-center justify-between text-xs font-bold">
              <span>Chennai Exploration</span>
              <span>{visitedCount} / {totalCount} Visited</span>
            </div>
            <div className="w-full h-3 rounded-full bg-black/20 overflow-hidden p-0.5">
              <div
                style={{ width: `${completionPercentage}%` }}
                className="h-full rounded-full bg-gradient-to-r from-emerald-300 to-amber-300 transition-all duration-500 shadow-md"
              ></div>
            </div>
            <p className="text-[11px] text-amber-100 font-semibold text-right">
              {completionPercentage}% Completed ✨
            </p>
          </div>
        </div>

        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 -mb-16 w-64 h-64 bg-purple-400/30 rounded-full blur-3xl"></div>
      </div>

      {/* Main Filter Section */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-3xl border border-rose-100 dark:border-slate-800 shadow-xs space-y-4">
        
        {/* Search & Main Section Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search places by name, area (Mylapore, ECR, Egmore...), or highlights..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl text-xs font-bold">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeTab === 'all' ? 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-300 shadow-xs' : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              All ({totalCount})
            </button>

            <button
              onClick={() => setActiveTab('free')}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 ${
                activeTab === 'free' ? 'bg-emerald-500 text-white shadow-xs' : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              <span>🆓 Free ({freeCount})</span>
            </button>

            <button
              onClick={() => setActiveTab('paid')}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 ${
                activeTab === 'paid' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              <span>🎟️ Paid ({paidCount})</span>
            </button>

            <button
              onClick={() => setActiveTab('completed')}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 ${
                activeTab === 'completed' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              <span>✅ Visited ({visitedCount})</span>
            </button>

            <button
              onClick={() => setActiveTab('favorites')}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 ${
                activeTab === 'favorites' ? 'bg-rose-500 text-white shadow-xs' : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              <span>❤️ Saved ({favoriteIds.length})</span>
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Places Cards Grid */}
      {filteredPlaces.length === 0 ? (
        <div className="p-12 sm:p-16 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-center space-y-3 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-500 mx-auto flex items-center justify-center text-2xl font-bold">
            📍
          </div>
          <h3 className="text-xl font-bold font-serif-title text-slate-900 dark:text-white">
            No places found
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search query or selecting a different category tab filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPlaces.map((place) => {
            const isVisited = visitedIds.includes(place.id);
            const isFav = favoriteIds.includes(place.id);

            return (
              <div
                key={place.id}
                onClick={() => setSelectedPlace(place)}
                className={`relative rounded-3xl bg-white dark:bg-slate-900 p-5 border transition-all duration-300 cursor-pointer flex flex-col justify-between group ${
                  isVisited
                    ? 'border-emerald-400 dark:border-emerald-500/80 shadow-lg shadow-emerald-500/10 ring-2 ring-emerald-400/20 bg-gradient-to-b from-emerald-50/30 via-white to-white dark:from-emerald-950/20 dark:via-slate-900 dark:to-slate-900'
                    : 'border-slate-100 dark:border-slate-800 shadow-xs hover:shadow-xl hover:border-rose-200'
                }`}
              >
                {/* Completed / Visited Highlight Badge */}
                {isVisited && (
                  <div className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-[10px] font-bold shadow-md flex items-center gap-1 z-10">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>VISITED ✨</span>
                  </div>
                )}

                <div className="space-y-3">
                  {/* Top Category & Entry Type Badges */}
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {place.category}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        place.entryType === 'free'
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                          : 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                      }`}>
                        {place.entryType === 'free' ? '🆓 Free' : '🎟️ Paid'}
                      </span>

                      <button
                        onClick={(e) => toggleFavorite(place.id, e)}
                        className={`p-1.5 rounded-full transition-transform active:scale-90 ${
                          isFav ? 'text-rose-500' : 'text-slate-300 hover:text-rose-400'
                        }`}
                        title="Favorite Place"
                      >
                        <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Place Name & Location */}
                  <div>
                    <h3 className="text-lg font-bold font-serif-title text-slate-900 dark:text-white group-hover:text-rose-600 transition-colors line-clamp-1">
                      {place.name}
                    </h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 font-semibold mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span className="truncate">{place.area}, Chennai</span>
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {place.description}
                  </p>

                  {/* Famous For Preview */}
                  <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-[11px] text-slate-600 dark:text-slate-300 space-y-1">
                    <span className="font-bold text-rose-600 dark:text-rose-400 text-[10px] uppercase tracking-wider block">
                      ✨ Famous For:
                    </span>
                    <p className="line-clamp-1 font-medium italic">
                      • {place.famousFor[0]}
                    </p>
                  </div>
                </div>

                {/* Bottom Actions Bar */}
                <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <span className="text-[10px] text-slate-400 font-semibold truncate max-w-[90px]">
                    {place.priceInfo}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <a
                      href={getGoogleMapsUrl(place)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-2.5 py-1.5 rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-950/60 dark:text-sky-300 hover:bg-sky-500 hover:text-white transition-all flex items-center gap-1 text-xs font-bold shadow-xs group"
                      title="Track Location on Google Maps"
                    >
                      <Map className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                      <span>Map 📍</span>
                    </a>

                    <button
                      onClick={(e) => toggleVisited(place, e)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs ${
                        isVisited
                          ? 'bg-emerald-500 text-white shadow-emerald-500/20 hover:bg-emerald-600'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-slate-700'
                      }`}
                      title={isVisited ? 'Marked as Visited' : 'Click to Mark as Visited'}
                    >
                      {isVisited ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 fill-current text-white" />
                          <span>Visited ✅</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-500" />
                          <span>Mark Visited</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* PLACE DETAIL MODAL */}
      {selectedPlace && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in overflow-y-auto select-none">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-100 dark:border-slate-800 relative my-8 max-h-[90vh] overflow-y-auto space-y-6">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedPlace(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="space-y-2 pr-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300">
                  {selectedPlace.category}
                </span>

                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  selectedPlace.entryType === 'free' 
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300' 
                    : 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                }`}>
                  {selectedPlace.entryType === 'free' ? '🆓 Free Entry' : '🎟️ Paid Ticket'}
                </span>

                {visitedIds.includes(selectedPlace.id) && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Visited & Completed</span>
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold font-serif-title text-slate-900 dark:text-white pt-1">
                {selectedPlace.name}
              </h2>

              <a
                href={getGoogleMapsUrl(selectedPlace)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1 font-semibold w-fit group"
                title="Click to track location on Google Maps"
              >
                <MapPin className="w-4 h-4 text-rose-500 group-hover:scale-110 transition-transform" />
                <span>{selectedPlace.area}, Chennai</span>
                <ExternalLink className="w-3 h-3 opacity-60 ml-0.5" />
              </a>
            </div>

            {/* Price & Timing Details Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  🎟️ Entry Ticket Fee
                </span>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {selectedPlace.priceInfo}
                </p>
              </div>

              {selectedPlace.timings && (
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-500" />
                    <span>Timings</span>
                  </span>
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {selectedPlace.timings}
                  </p>
                </div>
              )}
            </div>

            {/* About the Place */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                About the Place
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                {selectedPlace.description}
              </p>
            </div>

            {/* Famous For / Key Highlights Bullet Points */}
            <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/50 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>What it’s Famous For & Key Highlights</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-800 dark:text-slate-200">
                {selectedPlace.famousFor.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span className="leading-snug">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Best Time & Address */}
            {(selectedPlace.bestTimeToVisit || selectedPlace.locationAddress) && (
              <div className="text-xs text-slate-500 space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                {selectedPlace.bestTimeToVisit && (
                  <p className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-rose-500" />
                    <span><strong>Best Time to Visit:</strong> {selectedPlace.bestTimeToVisit}</span>
                  </p>
                )}
                {selectedPlace.locationAddress && (
                  <p className="flex items-start gap-1.5 pt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <span>
                      <strong>Address:</strong> {selectedPlace.locationAddress}{' '}
                      <a
                        href={getGoogleMapsUrl(selectedPlace)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-600 dark:text-sky-400 underline font-semibold hover:text-sky-700 ml-1 inline-flex items-center gap-0.5"
                      >
                        (Open Map 📍)
                      </a>
                    </span>
                  </p>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                <button
                  onClick={(e) => toggleVisited(selectedPlace, e)}
                  className={`flex-1 sm:flex-none px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md ${
                    visitedIds.includes(selectedPlace.id)
                      ? 'bg-emerald-500 text-white shadow-emerald-500/30 hover:bg-emerald-600'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-emerald-50 hover:text-emerald-600'
                  }`}
                >
                  {visitedIds.includes(selectedPlace.id) ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 fill-current text-white" />
                      <span>Visited & Completed ✨</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Mark as Visited</span>
                    </>
                  )}
                </button>

                <a
                  href={getGoogleMapsUrl(selectedPlace)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold shadow-md hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group"
                  title="Track location on Google Maps"
                >
                  <Map className="w-4 h-4" />
                  <span>Track Location 📍</span>
                  <ExternalLink className="w-3 h-3 opacity-75 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>

              {onOpenAddMemoryWithPlace && (
                <button
                  onClick={() => {
                    const place = selectedPlace;
                    setSelectedPlace(null);
                    onOpenAddMemoryWithPlace(place);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white text-xs font-bold shadow-md hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add to My Scrapbook</span>
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
