import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, MapPin, Plus, Sparkles, ChevronRight, Check } from 'lucide-react';
import { VideoCard } from '../types';

interface InstagramImportProps {
    onAddAll: (items: VideoCard[]) => void;
}

const IG_PARIS_MOCK: VideoCard[] = [
    {
        id: 'ig1',
        city: 'Paris',
        country: 'France',
        title: 'Café de Flore',
        shortDesc: 'The quintessential Parisian café experience.',
        priceRange: '€€€',
        tags: ['Historic', 'Coffee'],
        creatorHandle: '@paris_explorer',
        mediaPlaceholder: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=400',
        category: 'food',
        zone: 'Saint-Germain'
    },
    {
        id: 'ig2',
        city: 'Paris',
        country: 'France',
        title: 'Jardin du Luxembourg',
        shortDesc: 'Perfect for a morning stroll or a picnic.',
        priceRange: 'Free',
        tags: ['Nature', 'Park'],
        creatorHandle: '@paris_explorer',
        mediaPlaceholder: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=400',
        category: 'activity',
        zone: '6th Arr.'
    },
    {
        id: 'ig3',
        city: 'Paris',
        country: 'France',
        title: 'Shakespeare and Company',
        shortDesc: 'The most famous independent bookstore.',
        priceRange: '€',
        tags: ['Books', 'History'],
        creatorHandle: '@paris_explorer',
        mediaPlaceholder: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=400',
        category: 'activity',
        zone: 'Latin Quarter'
    }
];

const InstagramImport: React.FC<InstagramImportProps> = ({ onAddAll }) => {
    const [importing, setImporting] = useState(false);
    const [imported, setImported] = useState(false);

    const handleImport = () => {
        setImporting(true);
        setTimeout(() => {
            setImporting(false);
            setImported(true);
        }, 2000);
    };

    return (
        <div className="h-full w-full bg-black flex flex-col pt-20 px-6 overflow-y-auto pb-32">
            <div className="space-y-2 mb-8">
                <div className="flex items-center gap-2">
                    <Instagram className="w-5 h-5 text-pink-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Magic Import</span>
                </div>
                <h1 className="text-4xl font-black uppercase tracking-tighter">Saved from Instagram</h1>
                <p className="text-white/60 text-sm">Paste a reel link to extract hidden gems.</p>
            </div>

            {!imported ? (
                <div className="space-y-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Paste Instagram Reel Link..."
                            className="w-full bg-white/10 border border-white/20 p-5 rounded-3xl text-sm font-bold focus:outline-none focus:border-primary transition-all"
                        />
                        <button
                            onClick={handleImport}
                            disabled={importing}
                            className="absolute right-2 top-2 bottom-2 bg-primary px-6 rounded-2xl flex items-center justify-center active:scale-95 transition-all disabled:opacity-50"
                        >
                            {importing ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <Sparkles className="w-5 h-5" />
                            )}
                        </button>
                    </div>

                    <div className="glass p-6 rounded-3xl space-y-4">
                        <div className="flex gap-4 items-center">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center shrink-0">
                                <Instagram className="text-white w-6 h-6" />
                            </div>
                            <div>
                                <p className="font-bold text-sm italic">7 Spots in Paris you can't miss!</p>
                                <p className="text-[10px] text-white/40 uppercase font-black">@travel_guide • 2.4M Views</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <span className="text-xs font-bold uppercase tracking-widest text-green-500">3 Locations Extracted</span>
                        </div>
                        <button
                            onClick={() => onAddAll(IG_PARIS_MOCK)}
                            className="text-[10px] font-black uppercase tracking-widest bg-white text-black px-4 py-2 rounded-full"
                        >
                            Add All to Trip
                        </button>
                    </div>

                    <div className="space-y-4">
                        {IG_PARIS_MOCK.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="glass p-4 rounded-3xl flex gap-4 items-center"
                            >
                                <img src={item.mediaPlaceholder} className="w-16 h-16 rounded-xl object-cover" alt="" />
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-black uppercase tracking-tight text-sm truncate">{item.title}</h3>
                                    <div className="flex items-center gap-1.5 opacity-60">
                                        <MapPin className="w-3 h-3" />
                                        <span className="text-[10px] font-bold uppercase">{item.zone}, {item.city}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => onAddAll([item])}
                                    className="w-10 h-10 glass rounded-full flex items-center justify-center shrink-0 active:scale-90 transition-transform"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default InstagramImport;
