import React, { useState, useEffect } from 'react';
import { X, Search, MapPin, Check, Loader2, Navigation } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

interface LocationPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialLocationName?: string;
  initialLat?: number;
  initialLng?: number;
  onConfirm: (locationData: { locationName: string; lat: number; lng: number }) => void;
}

const markerIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Helper component to center map dynamically when position changes
const ChangeMapView: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 13);
    map.invalidateSize();
  }, [center, map]);
  return null;
};

// Helper component to invalidate size when modal opens so map is never cut off
const MapResizeHandler: React.FC = () => {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 150);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
};

// Helper component to capture map clicks
const MapClickHandler: React.FC<{ onMapClick: (lat: number, lng: number) => void }> = ({ onMapClick }) => {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

export const LocationPickerModal: React.FC<LocationPickerModalProps> = ({
  isOpen,
  onClose,
  initialLocationName = '',
  initialLat = 13.0827,
  initialLng = 80.2707,
  onConfirm,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isLocatingUser, setIsLocatingUser] = useState(false);
  const [searchResults, setSearchResults] = useState<Array<{ display_name: string; lat: string; lon: string }>>([]);

  const [selectedPos, setSelectedPos] = useState<[number, number]>([initialLat, initialLng]);
  const [selectedName, setSelectedName] = useState(initialLocationName);
  const [isGeocoding, setIsGeocoding] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSelectedPos([initialLat || 13.0827, initialLng || 80.2707]);
      setSelectedName(initialLocationName);
      setSearchQuery('');
      setSearchResults([]);
    }
  }, [isOpen, initialLat, initialLng, initialLocationName]);

  // Live Auto-search while typing (350ms debounce)
  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery.trim())}`, {
          headers: { 'Accept-Language': 'en' }
        });
        const data = await res.json();
        if (data && Array.isArray(data)) {
          setSearchResults(data.slice(0, 6));
        }
      } catch (err) {
        console.error('Live search error:', err);
      } finally {
        setIsSearching(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  if (!isOpen) return null;

  const reverseGeocode = async (lat: number, lng: number) => {
    setIsGeocoding(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`, {
        headers: { 'Accept-Language': 'en' }
      });
      const data = await res.json();
      if (data && data.display_name) {
        const address = data.address || {};
        const shortName = address.city || address.town || address.village || address.suburb || address.county || data.display_name.split(',')[0];
        const country = address.country ? `, ${address.country}` : '';
        setSelectedName(`${shortName}${country}`);
      }
    } catch (err) {
      console.error('Reverse geocode error:', err);
    } finally {
      setIsGeocoding(false);
    }
  };

  const handleMapClick = (lat: number, lng: number) => {
    setSelectedPos([lat, lng]);
    reverseGeocode(lat, lng);
  };

  const handleSelectSearchResult = (result: { display_name: string; lat: string; lon: string }) => {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);
    setSelectedPos([lat, lng]);
    setSelectedName(result.display_name.split(',').slice(0, 2).join(','));
    setSearchQuery('');
    setSearchResults([]);
  };

  // Get User's Live Geolocation
  const handleUseLiveLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setIsLocatingUser(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setSelectedPos([lat, lng]);
        reverseGeocode(lat, lng);
        setIsLocatingUser(false);
      },
      (error) => {
        console.error('Live location error:', error);
        alert('Could not retrieve your live location. Please check browser location permissions.');
        setIsLocatingUser(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleConfirm = () => {
    if (!selectedName) {
      alert('Please select a location on the map or search.');
      return;
    }
    onConfirm({
      locationName: selectedName,
      lat: selectedPos[0],
      lng: selectedPos[1],
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl p-5 sm:p-6 shadow-2xl border border-rose-100 dark:border-slate-800 relative space-y-4 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-500 flex items-center justify-center text-xl">
              📍
            </div>
            <div>
              <h2 className="text-lg font-bold font-serif-title text-slate-900 dark:text-white">
                Pick Location on Map
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Type to search places live, use your current location, or click the map.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Real-time Typing Search Bar & Live Location Action */}
        <div className="relative z-20 space-y-2">
          <div className="flex items-center gap-2">
            
            {/* Real-time Typing Input Field (No Search Button needed) */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type city or place (e.g. Paris, Taj Mahal, Tokyo)..."
                className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
              
              {isSearching ? (
                <Loader2 className="w-4 h-4 text-rose-500 animate-spin absolute right-3 top-1/2 -translate-y-1/2" />
              ) : searchQuery ? (
                <button
                  type="button"
                  onClick={() => { setSearchQuery(''); setSearchResults([]); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : null}
            </div>

            {/* Live Location Button */}
            <button
              type="button"
              onClick={handleUseLiveLocation}
              disabled={isLocatingUser}
              className="px-3.5 py-2.5 rounded-2xl bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 text-rose-600 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
              title="Use my current GPS location"
            >
              {isLocatingUser ? (
                <Loader2 className="w-4 h-4 animate-spin text-rose-500" />
              ) : (
                <Navigation className="w-3.5 h-3.5 text-rose-500" />
              )}
              <span className="hidden sm:inline">My Live Location</span>
            </button>

          </div>

          {/* Live Auto-Suggestions Dropdown List while Typing */}
          {searchResults.length > 0 && (
            <div className="absolute left-0 right-0 top-11 bg-white dark:bg-slate-800 rounded-2xl p-2 shadow-2xl border border-slate-200 dark:border-slate-700 max-h-56 overflow-y-auto space-y-1 z-30 animate-in fade-in">
              <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Matching Places ({searchResults.length})
              </div>
              {searchResults.map((res, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSelectSearchResult(res)}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-rose-50 dark:hover:bg-slate-700 text-xs text-slate-800 dark:text-slate-200 transition-colors flex items-center gap-2"
                >
                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span className="truncate">{res.display_name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Mini-Map Display */}
        <div className="flex-1 min-h-[320px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 relative z-10">
          <MapContainer
            center={selectedPos}
            zoom={12}
            scrollWheelZoom={true}
            style={{ width: '100%', height: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapResizeHandler />
            <ChangeMapView center={selectedPos} />
            <MapClickHandler onMapClick={handleMapClick} />
            <Marker position={selectedPos} icon={markerIcon} />
          </MapContainer>
        </div>

        {/* Selected Location Info & Confirm Action */}
        <div className="bg-slate-50 dark:bg-slate-800/80 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs truncate max-w-full">
            <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
            <div className="truncate">
              <p className="font-bold text-slate-800 dark:text-slate-100 truncate">
                {isGeocoding ? 'Locating address...' : (selectedName || 'Selected Pin Location')}
              </p>
              <p className="text-[10px] text-slate-400">
                Coordinates: {selectedPos[0].toFixed(4)}, {selectedPos[1].toFixed(4)}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleConfirm}
            className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white text-xs font-bold shadow-md hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-1.5 shrink-0"
          >
            <Check className="w-4 h-4" />
            <span>Use This Location ✨</span>
          </button>
        </div>

      </div>
    </div>
  );
};
