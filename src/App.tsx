import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { AppScreen, VideoCard, UserPreferences, ItineraryItem, SwipeEvent, Trip } from './types';
import { MOCK_VIDEOS } from './constants';
import { generateItinerary } from './services/itineraryEngine';
import Navigation from './components/Navigation';
import Onboarding from './components/Onboarding';
import VideoFeed from './components/VideoFeed';
import Library from './components/Library';
import ItineraryBuilder from './components/ItineraryBuilder';
import InstagramImport from './components/InstagramImport';
import TripMode from './components/TripMode';
import Booking from './components/Booking';
import { AnimatePresence, motion } from 'framer-motion';

const STORAGE_KEY = 'aina_saved_state';

const App: React.FC = () => {
  const [screen, setScreen] = useState<AppScreen>('onboarding');
  const [userPrefs, setUserPrefs] = useState<UserPreferences | null>(null);
  const [savedItems, setSavedItems] = useState<VideoCard[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [swipeHistory, setSwipeHistory] = useState<SwipeEvent[]>([]);

  // Load state from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setSavedItems(data.savedItems || []);
        setTrips(data.trips || []);
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
      trips,
      userPrefs
    }));
  }, [savedItems, trips, userPrefs]);

  const handleOnboardingComplete = (prefs: UserPreferences) => {
    setUserPrefs(prefs);
    setScreen('feed');
  };

  const addToTripLogic = useCallback((video: VideoCard) => {
    setTrips(prev => {
      const existingTripIdx = prev.findIndex(t => t.country === video.country);
      if (existingTripIdx > -1) {
        const newTrips = [...prev];
        if (!newTrips[existingTripIdx].items.some(item => item.id === video.id)) {
          newTrips[existingTripIdx].items = [...newTrips[existingTripIdx].items, video];
        }
        return newTrips;
      } else {
        const newTrip: Trip = {
          id: Math.random().toString(36).substr(2, 9),
          name: `${video.country} Adventure`,
          city: video.city,
          country: video.country,
          items: [video],
          createdAt: Date.now()
        };
        return [...prev, newTrip];
      }
    });
  }, []);

  const handleSwipe = useCallback((videoId: string, action: 'like' | 'save' | 'add_to_trip' | 'skip') => {
    const video = MOCK_VIDEOS.find(v => v.id === videoId);
    if (!video) return;

    setSwipeHistory(prev => [...prev, { videoId, action, timestamp: Date.now() }]);

    if (action === 'save') {
      if (!savedItems.some(item => item.id === videoId)) {
        setSavedItems(prev => [...prev, video]);
      }
    } else if (action === 'add_to_trip') {
      addToTripLogic(video);
    } else if (action === 'like') {
      // Like logic (vocal or visual feedback already handled in VideoFeed)
    }
  }, [savedItems, addToTripLogic]);

  const handleAddAllFromSocial = (items: VideoCard[]) => {
    items.forEach(item => addToTripLogic(item));
    setScreen('itinerary');
  };

  const renderScreen = () => {
    switch (screen) {
      case 'onboarding':
        return <Onboarding onComplete={handleOnboardingComplete} />;
      case 'feed':
        return <VideoFeed videos={MOCK_VIDEOS} onSwipe={handleSwipe} tripCount={trips.reduce((sum, t) => sum + t.items.length, 0)} />;
      case 'library':
        return <Library saved={savedItems} trips={trips} onAddToTrip={addToTripLogic} onNavigateToTrip={() => setScreen('itinerary')} />;
      case 'itinerary':
        return <ItineraryBuilder trips={trips} onRemoveTrip={(id) => setTrips(prev => prev.filter(t => t.id !== id))} />;
      case 'instagram':
        return <InstagramImport onAddAll={handleAddAllFromSocial} />;
      case 'booking':
        return <Booking onBack={() => setScreen('feed')} />;
      default:
        return <VideoFeed videos={MOCK_VIDEOS} onSwipe={handleSwipe} tripCount={trips.reduce((sum, t) => sum + t.items.length, 0)} />;
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
        tripCount={trips.reduce((sum, t) => sum + t.items.length, 0)}
      />

      {/* Mobile Top Notch/Status Bar Fill */}
      <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-black/50 to-transparent pointer-events-none z-[60]" />
    </div>
  );
};

export default App;
