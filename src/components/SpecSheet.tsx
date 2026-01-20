
import React from 'react';

const SpecSheet: React.FC = () => {
  return (
    <div className="h-full w-full bg-white text-black p-10 overflow-y-auto hide-scrollbar pb-32">
      <h1 className="text-4xl font-black tracking-tighter mb-8 uppercase">AINA Spec Sheet</h1>
      
      <section className="mb-10">
        <h2 className="text-xs font-black uppercase tracking-[0.2em] mb-4 text-gray-400">01 / Navigation Map</h2>
        <ul className="space-y-2 text-sm font-semibold border-l-2 border-black pl-4">
          <li>Onboarding (Preferences)</li>
          <li>Video Feed (Discovery)</li>
          <li>Library (Grouping)</li>
          <li>Itinerary Builder (Automation)</li>
          <li>Spec View (Current)</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xs font-black uppercase tracking-[0.2em] mb-4 text-gray-400">02 / Interaction Model</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-gray-100 pb-2">
            <span className="text-xs font-bold">Swipe Right</span>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded font-black uppercase italic">Like</span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-100 pb-2">
            <span className="text-xs font-bold">Swipe Left</span>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded font-black uppercase italic">Save</span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-100 pb-2">
            <span className="text-xs font-bold">Swipe Up</span>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded font-black uppercase italic">Add to Trip</span>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xs font-black uppercase tracking-[0.2em] mb-4 text-gray-400">03 / Data Structure</h2>
        <pre className="bg-gray-100 p-4 rounded-xl text-[10px] font-mono leading-relaxed">
{`VideoCard {
  id: string;
  city: string;
  category: "food" | "activity";
  zone: string; // Used for clustering
}

ItineraryItem extends VideoCard {
  day: number;
  timeSlot: "Morning" | "Afternoon";
}`}
        </pre>
      </section>

      <section className="mb-10">
        <h2 className="text-xs font-black uppercase tracking-[0.2em] mb-4 text-gray-400">04 / Logic</h2>
        <p className="text-xs font-medium leading-relaxed text-gray-600 uppercase tracking-wide">
          Deterministic Engine:
          1. Filter items by Trip status.
          2. Group by City.
          3. Sort by Zone adjacency.
          4. Categorize (Activity -> Food -> Nightlife).
          5. Map to Time Slots across available days (max 3/day).
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xs font-black uppercase tracking-[0.2em] mb-4 text-gray-400">05 / Test Script</h2>
        <ol className="list-decimal list-inside space-y-3 text-xs font-bold uppercase leading-relaxed">
          <li>Select 'Food' + 'Standard' in Onboarding.</li>
          <li>Swipe LEFT on 3 Lisbon videos in Feed.</li>
          <li>Click 'Add to Trip' on 2 of them.</li>
          <li>Navigate to 'Trip' to see auto-generated D1 plan.</li>
          <li>Remove 1 item to see itinerary re-balance.</li>
        </ol>
      </section>

      <div className="pt-8 border-t border-gray-200 opacity-20 text-[10px] font-black italic uppercase">
        Built by AINA Prototyping Engine v1.0
      </div>
    </div>
  );
};

export default SpecSheet;
