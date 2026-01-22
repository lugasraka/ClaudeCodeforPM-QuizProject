"use client";

import { useState, useEffect } from "react";

export default function IntroScreen({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 1500);
    const timer2 = setTimeout(() => setStep(2), 3000);
    const timer3 = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    }, 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#d4a574] to-[#a67c52]">
      <div className="text-center">
        {step >= 0 && (
          <div className={`transition-all duration-500 ${step >= 1 ? "opacity-0 scale-50" : "opacity-100 scale-100"}`}>
            <div className="text-6xl mb-4 animate-bounce">☕</div>
            <h1 className="text-4xl font-bold text-white mb-2">Coffee Quiz</h1>
          </div>
        )}
        {step >= 1 && (
          <div className={`transition-all duration-500 absolute left-1/2 transform -translate-x-1/2 ${step >= 2 ? "opacity-0 scale-50" : "opacity-100 scale-100"}`}>
            <div className="text-6xl mb-4">🎯</div>
            <p className="text-xl text-white">Discover your perfect brew</p>
          </div>
        )}
        {step >= 2 && (
          <div className={`transition-all duration-500 absolute left-1/2 transform -translate-x-1/2 ${step >= 3 ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}>
            <div className="text-6xl mb-4">✨</div>
            <p className="text-xl text-white">7 questions await...</p>
          </div>
        )}
      </div>
    </div>
  );
}
