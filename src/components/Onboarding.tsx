import React, { useState } from 'react';
import { UserPreferences } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Plane, Zap, Target } from 'lucide-react';

interface OnboardingProps {
  onComplete: (prefs: UserPreferences) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Welcome to AINA",
      subtitle: "Your AI sidekick for hyper-local travel experiences.",
      icon: Plane,
      visual: "https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Swipe to Build",
      subtitle: "Swipe up to explore, right to like, left to save. We handle the rest.",
      icon: Zap,
      visual: "https://images.unsplash.com/photo-1512428559083-a40ce10b885a?q=80&w=800&auto=format&fit=crop"
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete({
        budgetRange: 'Standard',
        interests: ['culture', 'food'],
        travelStyle: ['relaxed']
      });
    }
  };

  const current = steps[step];
  const Icon = current.icon;

  return (
    <div className="h-full w-full bg-black relative flex flex-col">
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={step}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            src={current.visual}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black" />
      </div>

      <div className="relative flex-1 flex flex-col justify-end p-8 pb-16 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <div className="w-16 h-16 bg-primary rounded-[2rem] flex items-center justify-center shadow-[0_0_30px_rgba(255,56,92,0.6)]">
            <Icon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-black uppercase tracking-tighter leading-none">
            {current.title}
          </h1>
          <p className="text-xl text-white/60 font-medium leading-tight max-w-[80%]">
            {current.subtitle}
          </p>
        </motion.div>

        <div className="flex items-center justify-between pt-8">
          <div className="flex gap-2">
            {steps.map((_, i) => (
              <div key={i} className={cn("h-1 rounded-full transition-all duration-500", i === step ? "w-8 bg-primary" : "w-2 bg-white/20")} />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="bg-white text-black p-6 rounded-full shadow-2xl active:scale-90 transition-transform flex items-center justify-center group"
          >
            <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
          </button>
        </div>
      </div>

      <div className="absolute top-12 left-8">
        <span className="text-2xl font-black italic tracking-tighter text-white">AINA</span>
      </div>
    </div>
  );
};

// Helper for Tailwind
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

export default Onboarding;
