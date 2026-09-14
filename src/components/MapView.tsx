import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { MemoryItem } from '../types';
import { MapPin, Route, Calendar, Sparkles, Maximize2 } from 'lucide-react';

interface MapViewProps {
  memories: MemoryItem[];
  onSelectMemory: (memory: MemoryItem) => void;
}

const customIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Helper component to dynamically adjust map view bounds so 100% of all pins fit on screen without cut-off
const AutoFitBounds: React.FC<{ coordinates: [number, number][]; triggerKey: number }> = ({ coordinates, triggerKey }) => {
  const map = useMap();

  useEffect(() => {
    // Invalidate map container size first to handle tab transitions or container resizes
    map.invalidateSize();

    if (!coordinates || coordinates.length === 0) return;

    if (coordinates.length === 1) {
      map.setView(coordinates[0], 12);
    } else {
      const bounds = L.latLngBounds(coordinates);
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 14 });
    }
  }, [coordinates, triggerKey, map]);

  return null;
};

// Fallback coordinate map for location names entered without coordinates
const CITY_COORDINATES: Record<string, [number, number]> = {
  chennai: [13.0827, 80.2707],
  paris: [48.8566, 2.3522],
  tokyo: [35.6762, 139.6503],
  london: [51.5074, -0.1278],
  'new york': [40.7128, -74.0060],
  cappadocia: [38.6431, 34.8289],
  turkey: [38.9637, 35.2433],
  kyoto: [35.0116, 135.7681],
  bali: [-8.4095, 115.1889],
  rome: [41.9028, 12.4964],
  dubai: [25.2048, 55.2708],
  sydney: [-33.8688, 151.2093],
  goa: [15.2993, 74.1240],
  mumbai: [19.0760, 72.8777],
  singapore: [1.3521, 103.8198],
};

export const MapView: React.FC<MapViewProps> = ({ memories, onSelectMemory }) => {
  const [showTrail, setShowTrail] = useState(true);
  const [fitKey, setFitKey] = useState(0);

  // Map memories to coordinates (using lat/lng or fallback city matching)
  const geotaggedMemories = memories.map(m => {
    if (m.lat !== undefined && m.lng !== undefined) {
      return m;
    }
    if (m.location) {
      const locLower = m.location.toLowerCase();
      for (const [city, coords] of Object.entries(CITY_COORDINATES)) {
        if (locLower.includes(city)) {
          return { ...m, lat: coords[0], lng: coords[1] };
        }
      }
    }
    return m;
  }).filter(m => m.lat !== undefined && m.lng !== undefined);

  // Sort memories chronologically by date to form connected journey trail
  const sortedMemories = [...geotaggedMemories].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const journeyCoordinates: [number, number][] = sortedMemories.map(m => [m.lat!, m.lng!]);

  const defaultCenter: [number, number] = geotaggedMemories.length > 0 && geotaggedMemories[0].lat && geotaggedMemories[0].lng
    ? [geotaggedMemories[0].lat, geotaggedMemories[0].lng]
    : [13.0827, 80.2707];

  return (
    <div className="space-y-4">
      
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-rose-100 dark:border-slate-800 shadow-sm">
        <div className="space-y-1">
          <h2 className="text-xl font-bold font-serif-title text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-amber-500" />
            <span>Interactive Memory & Journey Map 🌍</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            View all your pinned life experiences connected on a journey path across the world.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Fit All Places Button */}
          {geotaggedMemories.length > 0 && (
            <button
              onClick={() => setFitKey(prev => prev + 1)}
              className="px-3 py-1.5 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 transition-all flex items-center gap-1.5"
              title="Show all places on screen"
            >
              <Maximize2 className="w-3.5 h-3.5 text-rose-500" />
              <span>Show All Places</span>
            </button>
          )}

          {/* Journey Trail Toggle Button */}
          {journeyCoordinates.length > 1 && (
            <button
              onClick={() => setShowTrail(!showTrail)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 border ${
                showTrail 
                  ? 'bg-rose-500 text-white border-rose-500 shadow-xs' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              <Route className="w-3.5 h-3.5" />
              <span>{showTrail ? 'Journey Trail On' : 'Show Trail'}</span>
            </button>
          )}

          <div className="text-xs font-semibold px-3 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
            {geotaggedMemories.length} Pin Location{geotaggedMemories.length === 1 ? '' : 's'}
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="w-full h-[540px] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl relative z-10">
        <MapContainer
          center={defaultCenter}
          zoom={11}
          scrollWheelZoom={true}
          style={{ width: '100%', height: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Auto-fit map bounds so all places are fully visible */}
          <AutoFitBounds coordinates={journeyCoordinates} triggerKey={fitKey} />

          {/* Connected Polyline Journey Trail Line */}
          {showTrail && journeyCoordinates.length > 1 && (
            <Polyline
              positions={journeyCoordinates}
              pathOptions={{
                color: '#f43f5e',
                weight: 4,
                opacity: 0.85,
                dashArray: '8, 10'
              }}
            />
          )}

          {/* Pinned Memory Markers */}
          {geotaggedMemories.map((mem, idx) => (
            <Marker
              key={mem.id}
              position={[mem.lat!, mem.lng!]}
              icon={customIcon}
            >
              <Popup className="memory-map-popup">
                <div className="w-56 space-y-2 p-1 font-sans">
                  
                  {/* Photo Thumbnail */}
                  {mem.photos && mem.photos.length > 0 ? (
                    <div className="relative h-28 rounded-xl overflow-hidden shadow-xs">
                      <img
                        src={mem.photos[0]}
                        alt={mem.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold bg-black/60 backdrop-blur-xs text-white">
                        Stop #{idx + 1}
                      </span>
                    </div>
                  ) : (
                    <div className="h-16 rounded-xl bg-gradient-to-tr from-rose-400 to-amber-300 flex items-center justify-center text-white text-2xl shadow-xs">
                      ✨
                    </div>
                  )}

                  {/* Title & Metadata */}
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 line-clamp-1 flex items-center gap-1">
                      <span>{mem.title}</span>
                    </h4>
                    <p className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                      <span className="truncate">{mem.location || 'Location'}</span>
                    </p>
                    <p className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                      <span>{new Date(mem.date).toLocaleDateString()}</span>
                    </p>
                  </div>

                  {/* Feelings / Emotion Chips */}
                  {mem.feelings && mem.feelings.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {mem.feelings.slice(0, 2).map((feel, i) => (
                        <span key={i} className="px-1.5 py-0.5 rounded-md text-[9px] font-semibold bg-rose-50 text-rose-600 border border-rose-100">
                          {feel}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Open Memory Button */}
                  <button
                    onClick={() => onSelectMemory(mem)}
                    className="w-full py-2 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white text-[11px] font-bold shadow-xs hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>View Full Memory ✨</span>
                  </button>

                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};
