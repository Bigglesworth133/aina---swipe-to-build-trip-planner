import React, { useMemo } from 'react';
import { VideoCard } from '../types';
import { motion } from 'framer-motion';
import { MapPin, ChevronRight, Plus, Navigation } from 'lucide-react';
import { cn } from '../services/utils';

interface LibraryProps {
  saved: VideoCard[];
  tripItems: VideoCard[];
  onAddToTrip: (video: VideoCard) => void;
  onNavigateToTrip: () => void;
}

const Library: React.FC<LibraryProps> = ({ saved, tripItems, onAddToTrip, onNavigateToTrip }) => {
  const groupedByCity = useMemo(() => {
    const groups: Record<string, VideoCard[]> = {};
    saved.forEach(item => {
      if (!groups[item.city]) groups[item.city] = [];
      groups[item.city].push(item);
    });
    return groups;
  }, [saved]);

  const cities = Object.keys(groupedByCity);

  return (
    <div className="h-full w-full bg-black overflow-y-auto pb-32 pt-20 px-6 scroll-smooth">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter">Your Library</h1>
          <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-1">
            {saved.length} {saved.length === 1 ? 'Recommendation' : 'Recommendations'}
          </p>
        </div>
      </div>

      {cities.length === 0 ? (
        <div className="h-64 flex flex-col items-center justify-center text-center opacity-40">
          <MapPin className="w-12 h-12 mb-4" />
          <p className="font-bold uppercase tracking-widest text-sm">Save places from your feed<br />to see them here</p>
        </div>
      ) : (
        <div className="space-y-12">
          {cities.map((city, idx) => (
            <motion.div
              key={city}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 glass rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-black uppercase tracking-tight">{city}</h2>
                </div>
                <button
                  onClick={() => {
                    groupedByCity[city].forEach(item => onAddToTrip(item));
                  }}
                  className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-white transition-colors flex items-center gap-1 bg-primary/10 px-3 py-1.5 rounded-full"
                >
                  Add all to trip <Plus className="w-3 h-3" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {groupedByCity[city].map((item) => {
                  const isInTrip = tripItems.some(t => t.id === item.id);
                  return (
                    <div key={item.id} className="group relative aspect-[3/4] rounded-2xl overflow-hidden glass border border-white/5">
                      <img src={item.mediaPlaceholder} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                      <div className="absolute inset-x-0 bottom-0 p-3 space-y-1">
                        <div className="flex items-center gap-1">
                          <span className="text-[8px] bg-white text-black px-1.5 py-0.5 rounded-sm font-black uppercase">{item.category}</span>
                        </div>
                        <h3 className="text-xs font-black uppercase tracking-tight line-clamp-2">{item.title}</h3>
                      </div>

                      <button
                        onClick={() => onAddToTrip(item)}
                        className={cn(
                          "absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all",
                          isInTrip ? "bg-green-500 text-white" : "glass text-white active:scale-90"
                        )}
                      >
                        {isInTrip ? <ChevronRight className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </button>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {tripItems.length > 0 && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={onNavigateToTrip}
          className="mt-12 w-full glass-dark border border-primary/30 p-6 rounded-3xl flex items-center justify-between group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(255,56,92,0.4)]">
              <Navigation className="w-6 h-6 text-white fill-white" />
            </div>
            <div className="text-left">
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Ready to Build</span>
              <h3 className="text-xl font-black uppercase tracking-tight">{tripItems.length} Places Selected</h3>
            </div>
          </div>
          <ChevronRight className="w-6 h-6 text-primary group-hover:translate-x-1 transition-transform" />
        </motion.button>
      )}
    </div>
  );
};

export default Library;
