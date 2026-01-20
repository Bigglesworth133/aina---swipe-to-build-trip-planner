import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { AppScreen, VideoCard, UserPreferences, ItineraryItem, SwipeEvent } from './types';
import { MOCK_VIDEOS } from './constants';
import { generateItinerary } from './services/itineraryEngine';
import Navigation from './components/Navigation';
import Onboarding from './components/Onboarding';
import VideoFeed from './components/VideoFeed';
import Library from './components/Library';
import ItineraryBuilder from './components/ItineraryBuilder';
import TripMode from './components/TripMode';
import Booking from './components/Booking';
import { AnimatePresence, motion } from 'framer-motion';

const STORAGE_KEY = 'aina_saved_state';

const App: React.FC = () => {
  const [screen, setScreen] = useState<AppScreen>('onboarding');
  const [userPrefs, setUserPrefs] = useState<UserPreferences | null>(null);
  const [savedItems, setSavedItems] = useState<VideoCard[]>([]);
  const [tripItems, setTripItems] = useState<VideoCard[]>([]);
  const [swipeHistory, setSwipeHistory] = useState<SwipeEvent[]>([]);

  // Load state from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setSavedItems(data.savedItems || []);
        setTripItems(data.tripItems || []);
        if (data.userPrefs) {
          setUserPrefs(data.userPrefs);
          setScreen('feed');
        }
      } catch (e) {
        console.error("Failed to load state", e);
      }
    }
  }, []);

  // Save state whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      savedItems,
      tripItems,
      userPrefs
    }));
  }, [savedItems, tripItems, userPrefs]);

  const handleOnboardingComplete = (prefs: UserPreferences) => {
    setUserPrefs(prefs);
    setScreen('feed');
  };

  const handleSwipe = useCallback((videoId: string, action: 'like' | 'save' | 'add_to_trip' | 'skip') => {
    const video = MOCK_VIDEOS.find(v => v.id === videoId);
    if (!video) return;

    setSwipeHistory(prev => [...prev, { videoId, action, timestamp: Date.now() }]);

    if (action === 'save') {
      if (!savedItems.some(item => item.id === videoId)) {
        setSavedItems(prev => [...prev, video]);
      }
    } else if (action === 'add_to_trip') {
      if (!tripItems.some(item => item.id === videoId)) {
        setTripItems(prev => [...prev, video]);
      }
    } else if (action === 'like') {
      // Just track it for now
    }
  }, [savedItems, tripItems]);

  const itinerary = useMemo(() => generateItinerary(tripItems), [tripItems]);

  const removeFromTrip = (id: string) => {
    setTripItems(prev => prev.filter(item => item.id !== id));
  };

  const addToTripFromSaved = (video: VideoCard) => {
    if (!tripItems.some(item => item.id === video.id)) {
      setTripItems(prev => [...prev, video]);
    }
  };

  const renderScreen = () => {
    switch (screen) {
      case 'onboarding':
        return <Onboarding onComplete={handleOnboardingComplete} />;
      case 'feed':
        return <VideoFeed videos={MOCK_VIDEOS} onSwipe={handleSwipe} tripCount={tripItems.length} />;
      case 'library':
        return <Library saved={savedItems} tripItems={tripItems} onAddToTrip={addToTripFromSaved} onNavigateToTrip={() => setScreen('itinerary')} />;
      case 'itinerary':
        return <ItineraryBuilder itinerary={itinerary} onRemove={removeFromTrip} onBook={() => setScreen('booking')} />;

      case 'trip-mode':
        return <TripMode itinerary={itinerary} />;
      case 'booking':
        return <Booking onBack={() => setScreen('feed')} />;
      default:
        return <VideoFeed videos={MOCK_VIDEOS} onSwipe={handleSwipe} tripCount={tripItems.length} />;
    }
  };

  return (
    <div className="relative h-screen w-full max-w-[500px] mx-auto bg-black text-white overflow-hidden shadow-2xl flex flex-col font-sans selection:bg-primary/30">
      <main className="flex-1 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute inset-0"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Navigation
        activeScreen={screen}
        onNavigate={setScreen}
        tripCount={tripItems.length}
      />

      {/* Mobile Top Notch/Status Bar Fill */}
      <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-black/50 to-transparent pointer-events-none z-[60]" />
    </div>
  );
};

export default App;
