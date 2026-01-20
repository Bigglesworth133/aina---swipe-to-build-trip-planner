import { VideoCard, ItineraryItem, TimeSlot } from '../types';

export const generateItinerary = (videos: VideoCard[]): ItineraryItem[] => {
  const slots: TimeSlot[] = ['Morning', 'Afternoon', 'Evening'];

  // Sort by city first, then distribute into days
  const cities = Array.from(new Set(videos.map(v => v.city)));
  const itinerary: ItineraryItem[] = [];

  let currentDay = 1;
  let currentSlotIdx = 0;

  // Simple distribution: 3 items per day
  videos.forEach((video, index) => {
    itinerary.push({
      ...video,
      day: currentDay,
      timeSlot: slots[currentSlotIdx],
      locked: false
    });

    currentSlotIdx++;
    if (currentSlotIdx > 2) {
      currentSlotIdx = 0;
      currentDay++;
    }
  });

  return itinerary;
};
