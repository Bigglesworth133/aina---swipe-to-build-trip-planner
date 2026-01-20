import React from 'react';
import { ItineraryItem } from '../types';
import { motion } from 'framer-motion';
import { Clock, MapPin, CheckCircle2, Navigation2, Sun, Sunset, Moon } from 'lucide-react';
import { cn } from '../services/utils';

interface TripModeProps {
    itinerary: ItineraryItem[];
}

const TripMode: React.FC<TripModeProps> = ({ itinerary }) => {
    // Current day (mocked as day 1)
    const todayItems = itinerary.filter(item => item.day === 1);

    return (
        <div className="h-full w-full bg-black overflow-y-auto pb-40 pt-20 px-6 no-scrollbar">
            <div className="mb-10 flex justify-between items-end">
                <div>
                    <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em]">Live Trip Mode</span>
                    <h1 className="text-4xl font-black uppercase tracking-tighter">Your Today</h1>
                </div>
                <div className="text-right">
                    <span className="text-xl font-black italic">Day 01</span>
                </div>
            </div>

            {todayItems.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-center opacity-40">
                    <Navigation2 className="w-12 h-12 mb-4 animate-bounce" />
                    <p className="font-bold uppercase tracking-widest text-sm">Start your journey by adding<br />items to your itinerary</p>
                </div>
            ) : (
                <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-white/10 to-transparent" />

                    <div className="space-y-12">
                        {todayItems.map((item, idx) => {
                            const Icon = item.timeSlot === 'Morning' ? Sun : (item.timeSlot === 'Afternoon' ? Sunset : Moon);

                            return (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.2 }}
                                    className="relative pl-16"
                                >
                                    {/* Timeline Node */}
                                    <div className="absolute left-[20px] top-0 w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_15px_rgba(255,56,92,1)]" />

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <Icon className="w-4 h-4 text-white/40" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{item.timeSlot}</span>
                                        </div>

                                        <div className="group relative rounded-[2rem] overflow-hidden glass border border-white/10 p-5 space-y-4">
                                            <div className="flex gap-4">
                                                <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0">
                                                    <img src={item.mediaPlaceholder} className="w-full h-full object-cover" alt="" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-black uppercase tracking-tight leading-tight">{item.title}</h3>
                                                    <div className="flex items-center gap-1 opacity-60 mt-1">
                                                        <MapPin className="w-3 h-3" />
                                                        <span className="text-[10px] font-bold uppercase">{item.zone}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between pt-2 border-t border-white/5">
                                                <button className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-primary">
                                                    <Navigation2 className="w-3 h-3 fill-primary" /> Get Directions
                                                </button>
                                                <button className="w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-green-500/20 hover:text-green-500 transition-all">
                                                    <CheckCircle2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        {idx < todayItems.length - 1 && (
                                            <div className="pl-4 py-2 border-l border-dashed border-white/10 ml-[23px]">
                                                <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest flex items-center gap-2">
                                                    <Clock className="w-3 h-3" /> 15 min walk
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Reminder Card */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 glass p-6 rounded-[2.5rem] border border-primary/20 bg-primary/5"
            >
                <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
                        <Sun className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h4 className="text-sm font-black uppercase tracking-widest">Hydration Reminder</h4>
                        <p className="text-xs text-white/40 font-medium mt-1">It's 28°C in {todayItems[0]?.city || 'the city'}. Don't forget to drink water!</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default TripMode;
