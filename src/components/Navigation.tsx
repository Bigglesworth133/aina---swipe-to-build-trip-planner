import React from 'react';
import { AppScreen } from '../types';
import { Compass, Bookmark, Map, Layout, Zap } from 'lucide-react';
import { cn } from '../services/utils';

interface NavigationProps {
  activeScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  tripCount: number;
}

const Navigation: React.FC<NavigationProps> = ({ activeScreen, onNavigate, tripCount }) => {
  const navItems = [
    { id: 'feed' as AppScreen, label: 'Explore', icon: Compass },
    { id: 'library' as AppScreen, label: 'Saved', icon: Bookmark },
    { id: 'itinerary' as AppScreen, label: 'Itinerary', icon: Layout },
    { id: 'trip-mode' as AppScreen, label: 'Today', icon: Zap },
  ];

  if (activeScreen === 'onboarding') return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-black/60 backdrop-blur-xl border-t border-white/10 flex items-center justify-around px-2 z-50 pb-safe">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeScreen === item.id;

        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={cn(
              "flex flex-col items-center gap-1.5 transition-all duration-300 relative px-4 py-2 rounded-2xl",
              isActive ? "text-primary" : "text-white/40 hover:text-white/60"
            )}
          >
            <div className="relative">
              <Icon className={cn("w-6 h-6", isActive && "fill-primary/20")} strokeWidth={isActive ? 2.5 : 2} />
              {item.id === 'itinerary' && tripCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-black animate-in fade-in zoom-in">
                  {tripCount}
                </span>
              )}
            </div>
            <span className={cn(
              "text-[10px] uppercase font-bold tracking-tighter",
              isActive ? "opacity-100" : "opacity-0"
            )}>
              {item.label}
            </span>

            {isActive && (
              <div className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_rgba(255,56,92,0.8)]" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Navigation;
