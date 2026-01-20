import React, { useState } from 'react';
import { Trip, VideoCard } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, MapPin, Clock, ChevronRight, Trash2, ArrowLeft, Navigation as NavIcon, Droplets } from 'lucide-react';

interface ItineraryBuilderProps {
  trips: Trip[];
  onRemoveTrip: (id: string) => void;
}

const ItineraryBuilder: React.FC<ItineraryBuilderProps> = ({ trips, onRemoveTrip }) => {
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);

  const selectedTrip = trips.find(t => t.id === selectedTripId);

  if (selectedTrip) {
    return (
      <div className="h-full w-full bg-black flex flex-col pt-24 px-6 overflow-y-auto pb-32 no-scrollbar">
        <button
          onClick={() => setSelectedTripId(null)}
          className="flex items-center gap-2 text-white/40 mb-6 active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-widest">Back to Trips</span>
        </button>

        <div className="space-y-2 mb-8">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">{selectedTrip.country}</span>
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tighter">{selectedTrip.name}</h1>
        </div>

        {/* Hydration Reminder Card */}
        <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-3xl flex items-center gap-6 mb-8">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(59,130,246,0.4)]">
            <Droplets className="text-white w-6 h-6" />
          </div>
          <div>
            <p className="font-bold text-sm">Stay Hydrated!</p>
            <p className="text-xs text-blue-400">It's 28°C in {selectedTrip.city}. Drink water every 2 hours.</p>
          </div>
        </div>

        <div className="space-y-12">
          {[1, 2].map(day => (
            <div key={day} className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white">Day {day}</h2>
                <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Planned Route</span>
              </div>

              <div className="space-y-4 relative ml-4">
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/20 to-transparent -ml-4" />

                {selectedTrip.items.map((item, idx) => (
                  <React.Fragment key={item.id}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-3xl space-y-4"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Clock className="w-3 h-3 text-white/40" />
                            <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">{idx === 0 ? '09:30 AM' : '02:15 PM'}</span>
                          </div>
                          <h3 className="font-black uppercase tracking-tight text-white">{item.title}</h3>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                          <Lock className="w-3 h-3 text-white/40" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{item.zone}</span>
                        <button className="flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-widest">
                          Directions <NavIcon className="w-3 h-3" />
                        </button>
                      </div>
                    </motion.div>

                    {idx < selectedTrip.items.length - 1 && (
                      <div className="py-2 ml-4 flex items-center gap-3">
                        <div className="h-[1px] w-8 bg-white/10" />
                        <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">15 mins walking (1.2 km)</span>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-black flex flex-col pt-24 px-6 overflow-y-auto pb-32 no-scrollbar">
      <div className="space-y-2 mb-8">
        <h1 className="text-4xl font-black uppercase tracking-tighter">Your Adventures</h1>
        <p className="text-white/60 text-sm">Explore your curated trips across the globe.</p>
      </div>

      {trips.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-4 opacity-40">
          <MapPin className="w-12 h-12" />
          <p className="text-sm font-bold uppercase tracking-widest">No trips created yet.<br />Swipe right on spots to start!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {trips.map((trip) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setSelectedTripId(trip.id)}
              className="relative aspect-[4/3] rounded-[40px] overflow-hidden group active:scale-[0.98] transition-all"
            >
              <img
                src={trip.items[0]?.mediaPlaceholder ? trip.items[0].mediaPlaceholder.replace('.mp4', '.jpg') : `https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                alt={trip.name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />

              <div className="absolute top-6 left-6 flex items-center gap-2">
                <div className="bg-black/40 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white">{trip.country}</span>
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-1 text-white">{trip.name}</h3>
                <div className="flex items-center gap-4 text-white/60 text-[10px] font-black uppercase tracking-widest">
                  <span>{trip.items.length} spots</span>
                  <div className="w-1 h-1 rounded-full bg-white/20" />
                  <span>planned</span>
                </div>
              </div>

              <div className="absolute bottom-6 right-6">
                <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-2xl">
                  <ChevronRight className="w-6 h-6" />
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveTrip(trip.id);
                }}
                className="absolute top-6 right-6 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4 text-white/60" />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ItineraryBuilder;
