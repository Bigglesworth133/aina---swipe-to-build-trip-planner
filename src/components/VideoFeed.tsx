import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { VideoCard } from '../types';
import { Heart, Bookmark, Plus, Share2, MapPin, Navigation as NavIcon } from 'lucide-react';
import { cn } from '../services/utils';

interface VideoFeedProps {
  videos: VideoCard[];
  onSwipe: (videoId: string, action: 'like' | 'save' | 'add_to_trip' | 'skip') => void;
  tripCount: number;
}

const VideoItem: React.FC<{
  video: VideoCard;
  onAction: (action: 'like' | 'save' | 'add_to_trip') => void;
  isActive: boolean;
}> = ({ video, onAction, isActive }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  const likeOpacity = useTransform(x, [-150, -50], [1, 0]);
  const tripOpacity = useTransform(x, [50, 150], [0, 1]);

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x > 100) {
      onAction('add_to_trip');
    } else if (info.offset.x < -100) {
      onAction('like');
    }
  };

  return (
    <div className="snap-item relative overflow-hidden bg-black">
      <motion.div
        style={{ x, rotate, opacity }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        className="h-full w-full relative touch-pan-y"
      >
        {/* Background Media - Image or Video */}
        <div className="absolute inset-0">
          {video.type === 'image' ? (
            <img
              src={video.mediaPlaceholder}
              className="h-full w-full object-cover transition-transform duration-700 scale-105"
              alt={video.title}
            />
          ) : (
            <video
              src={video.mediaPlaceholder}
              autoPlay
              loop
              muted
              playsInline
              controls
              className="h-full w-full object-cover transition-transform duration-700 scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90" />
        </div>

        {/* Swipe Overlays */}
        <motion.div style={{ opacity: tripOpacity }} className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
          <div className="bg-primary/80 backdrop-blur-xl p-8 rounded-full border-4 border-white/40">
            <Plus className="w-24 h-24 text-white" />
          </div>
        </motion.div>
        <motion.div style={{ opacity: likeOpacity }} className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
          <div className="bg-white/20 backdrop-blur-xl p-8 rounded-full border-4 border-white/40">
            <Heart className="w-24 h-24 text-white fill-white" />
          </div>
        </motion.div>

        {/* Content Overlay - Shifted Upwards */}
        <div className="absolute inset-x-0 bottom-0 p-6 pb-40 space-y-4">
          <div className="flex items-center gap-2">
            <div className="glass px-3 py-1 rounded-full flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-wider">{video.city}</span>
            </div>
            <div className="bg-white text-black px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
              {video.priceRange}
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter leading-none mb-2 drop-shadow-2xl text-white">
              {video.title}
            </h2>
            <p className="text-white/80 text-sm font-medium leading-relaxed max-w-[85%] drop-shadow-md">
              {video.shortDesc}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-white/20 p-0.5 overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${video.creatorHandle}`} alt="avatar" className="w-full h-full object-cover bg-white/10" />
              </div>
              <span className="text-xs font-bold text-white/60 uppercase tracking-widest">{video.creatorHandle}</span>
            </div>

          </div>
        </div>

        {/* Sidebar Actions - Aligned Vertical Stack */}
        <div className="absolute right-4 bottom-32 flex flex-col gap-4 items-center z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAction('save');
            }}
            className="flex flex-col items-center gap-1 active:scale-90 transition-transform"
          >
            <div className="w-12 h-12 glass rounded-full flex items-center justify-center">
              <Bookmark className="w-6 h-6 text-white" />
            </div>
            <span className="text-[10px] font-bold drop-shadow-md">Save</span>
          </button>

          <button className="flex flex-col items-center gap-1 opacity-90 active:scale-90 transition-transform">
            <div className="w-12 h-12 glass rounded-full flex items-center justify-center">
              <Share2 className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold drop-shadow-md">Share</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const VideoFeed: React.FC<VideoFeedProps> = ({ videos, onSwipe, tripCount }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleAction = (videoId: string, action: 'like' | 'save' | 'add_to_trip') => {
    onSwipe(videoId, action);
    setFeedback(action.toUpperCase().split('_').join(' '));
    setTimeout(() => setFeedback(null), 1000);

    // Auto scroll to next if it was 'add_to_trip' ? Or maybe not.
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const index = Math.round(containerRef.current.scrollTop / window.innerHeight);
      if (index !== activeIndex) {
        setActiveIndex(index);
      }
    }
  };

  return (
    <div className="relative h-full w-full bg-black">
      {/* Header */}
      <div className="absolute top-0 inset-x-0 p-8 flex justify-between items-start z-40 pointer-events-none">
        <div className="flex flex-col">
          <span className="text-3xl font-black italic tracking-tighter text-white drop-shadow-xl">AINA</span>
          <div className="flex items-center gap-1.5 opacity-60">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em]">Live Explorer</span>
          </div>
        </div>
        <div className="glass-dark px-4 py-2 rounded-2xl flex flex-col items-end border border-white/5">
          <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em] mb-0.5">Found</span>
          <div className="flex items-center gap-1.5">
            <span className="text-xl font-black text-primary">{tripCount}</span>
            <NavIcon className="w-3 h-3 text-primary fill-primary" />
          </div>
        </div>
      </div>

      {/* Snap Container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="snap-y-container no-scrollbar"
      >
        {videos.map((video, idx) => (
          <VideoItem
            key={video.id}
            video={video}
            isActive={idx === activeIndex}
            onAction={(action) => handleAction(video.id, action)}
          />
        ))}
      </div>

      {/* Feedback Toast */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
          >
            <div className="bg-primary text-white px-8 py-4 rounded-3xl font-black text-2xl uppercase italic tracking-tighter shadow-[0_0_40px_rgba(255,56,92,0.6)] border-2 border-white/20">
              {feedback}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-24 right-6 pointer-events-none opacity-40">
        <div className="flex flex-col items-center gap-2">
          <div className="w-0.5 h-12 bg-gradient-to-t from-white to-transparent rounded-full animate-bounce" />
          <span className="text-[10px] font-black uppercase tracking-widest [writing-mode:vertical-lr]">Swipe Up</span>
        </div>
      </div>
    </div>
  );
};

export default VideoFeed;
