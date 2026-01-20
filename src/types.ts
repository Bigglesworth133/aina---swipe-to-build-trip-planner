
export type TravelCategory = 'stay' | 'food' | 'activity' | 'transport' | 'nightlife';
export type TimeSlot = 'Morning' | 'Afternoon' | 'Evening';

export interface UserPreferences {
  budgetRange: 'Economy' | 'Standard' | 'Luxury';
  interests: string[];
  travelStyle: string[];
}

export interface VideoCard {
  id: string;
  city: string;
  country: string;
  title: string;
  shortDesc: string;
  priceRange: string;
  tags: string[];
  creatorHandle: string;
  mediaPlaceholder: string;
  category: TravelCategory;
  zone: string;
}

export interface SwipeEvent {
  videoId: string;
  action: 'like' | 'save' | 'add_to_trip' | 'skip';
  timestamp: number;
}

export interface ItineraryItem extends VideoCard {
  timeSlot: TimeSlot;
  day: number;
  locked: boolean;
}

export interface Trip {
  id: string;
  name: string;
  city: string;
  country: string;
  items: VideoCard[];
  createdAt: number;
}

export type AppScreen = 'onboarding' | 'feed' | 'library' | 'itinerary' | 'trip-mode' | 'spec' | 'booking' | 'instagram';

