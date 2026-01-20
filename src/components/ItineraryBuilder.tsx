import React from 'react';
import { ItineraryItem, TimeSlot } from '../types';
import { motion, Reorder } from 'framer-motion';
import { Lock, Unlock, GripVertical, Trash2, MapPin, Clock, ChevronRight } from 'lucide-react';
import { cn } from '../services/utils';

interface ItineraryBuilderProps {
  itinerary: ItineraryItem[];
  onRemove: (id: string) => void;
  onUpdateItinerary?: (newItinerary: ItineraryItem[]) => void;
  onBook?: () => void;
}

const slotColors: Record<TimeSlot, string> = {
  'Morning': 'from-blue-500/20 to-transparent',
  'Afternoon': 'from-orange-500/20 to-transparent',
  'Evening': 'from-purple-500/20 to-transparent'
};

const ItineraryBuilder: React.FC<ItineraryBuilderProps> = ({ itinerary, onRemove, onUpdateItinerary, onBook }) => {
  const days = Array.from(new Set(itinerary.map(item => item.day))).sort();

  return (
    <div className="h-full w-full bg-black overflow-y-auto pb-40 pt-20 px-6 no-scrollbar">
      <div className="mb-8">
        <h1 className="text-4xl font-black uppercase tracking-tighter">Your Trip</h1>
        <p className="text-primary text-[10px] font-black uppercase tracking-widest mt-1 italic">
          Optimized for walking & transit
        </p>
      </div>

      {itinerary.length === 0 ? (
        <div className="h-64 flex flex-col items-center justify-center text-center opacity-40">
          <Clock className="w-12 h-12 mb-4" />
          <p className="font-bold uppercase tracking-widest text-sm">Add some places from the feed<br />to start your itinerary</p>
        </div>
      ) : (
        <div className="space-y-12">
          {days.map(day => (
            <div key={day} className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-white text-black w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl italic">
                  D{day}
                </div>
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tight">Day {day}</h2>
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-none">Exploring the city vibe</span>
                </div>
              </div>

              <div className="space-y-4">
                {itinerary
                  .filter(item => item.day === day)
                  .sort((a, b) => {
                    const slots: TimeSlot[] = ['Morning', 'Afternoon', 'Evening'];
                    return slots.indexOf(a.timeSlot) - slots.indexOf(b.timeSlot);
                  })
                  .map((item, idx) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className={cn(
                        "relative flex gap-4 p-4 rounded-3xl glass-dark border-l-4 overflow-hidden group",
                        item.timeSlot === 'Morning' ? "border-l-blue-500" :
                          item.timeSlot === 'Afternoon' ? "border-l-orange-500" : "border-l-purple-500"
                      )}
                    >
                      <div className={cn("absolute inset-0 bg-gradient-to-r opacity-30 pointer-events-none", slotColors[item.timeSlot])} />

                      <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 z-10 border border-white/10">
                        <img src={item.mediaPlaceholder} className="w-full h-full object-cover" alt={item.title} />
                      </div>

                      <div className="flex-1 min-w-0 z-10 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-black uppercase tracking-widest text-white/40">{item.timeSlot}</span>
                          <div className="flex items-center gap-2">
                            <button className="text-white/20 hover:text-white transition-colors">
                              {item.locked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>
                        <h3 className="text-sm font-black uppercase leading-tight truncate">{item.title}</h3>

                        <div className="flex items-center gap-1 opacity-60">
                          <MapPin className="w-3 h-3 text-primary" />
                          <span className="text-[9px] font-bold uppercase tracking-wider truncate">{item.zone}</span>
                        </div>

                        <div className="pt-2">
                          <span className="bg-primary/10 text-primary text-[8px] font-black px-2 py-0.5 rounded-full uppercase italic border border-primary/20">
                            {idx % 2 === 0 ? "Perfect Morning Coffee" : "Crowd Favorite"}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => onRemove(item.id)}
                        className="absolute -right-12 group-hover:right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))
                }
              </div>
            </div>
          ))}
        </div>
      )}

      {itinerary.length > 0 && (
        <div className="mt-12 space-y-4">
          <button
            onClick={onBook}
            className="w-full bg-white text-black py-5 rounded-3xl font-black uppercase tracking-[0.3em] text-sm flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(255,255,255,0.1)] active:scale-95 transition-all"
          >
            Book Everything <ChevronRight className="w-5 h-5" />
          </button>
          <p className="text-center text-[9px] font-bold text-white/20 uppercase tracking-[0.2em]">Estimated Trip Cost: €1,240</p>
        </div>
      )}
    </div>
  );
};

export default ItineraryBuilder;
