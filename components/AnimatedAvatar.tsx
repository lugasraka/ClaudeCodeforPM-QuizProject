"use client";

import React from 'react';
import type { Personality } from '../utils/quizData';

interface AnimatedAvatarProps {
  personality: Personality;
}

const AnimatedAvatar: React.FC<AnimatedAvatarProps> = ({ personality }) => {
  const animations: { [key in Personality]: React.ReactNode } = {
    "Cozy Classic": (
      <div className="relative w-full h-full bg-gray-200 rounded-lg overflow-hidden">
        <div className="absolute bottom-0 w-full h-3/4 bg-[#6b4f3a]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-1 h-4 bg-white opacity-80 animate-steam" style={{ animationDelay: '0s' }} />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-1 h-5 bg-white opacity-70 animate-steam" style={{ animationDelay: '0.5s', transform: 'translateX(5px)' }} />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-1 h-3 bg-white opacity-90 animate-steam" style={{ animationDelay: '1s', transform: 'translateX(-5px)' }} />
      </div>
    ),
    "Sweet Enthusiast": (
      <div className="relative w-full h-full bg-[#c49566] rounded-lg overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8">
          <div className="absolute w-full h-full rounded-full border-2 border-white/50 animate-swirl" style={{ animationDelay: '0s' }}/>
          <div className="absolute w-3/4 h-3/4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/50 animate-swirl-reverse" style={{ animationDelay: '0.2s' }}/>
        </div>
      </div>
    ),
    "Health Nut": (
        <div className="relative w-full h-full bg-gray-100 rounded-lg overflow-hidden">
            <div className="w-full h-full bg-[#ad8a68] animate-glow" />
      </div>
    ),
    "Indulgent Treat": (
      <div className="relative w-full h-full bg-[#5a3d2b] rounded-lg overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full animate-dollop"/>
      </div>
    ),
  };

  return (
    <div className="w-16 h-16 rounded-lg flex-shrink-0 relative">
        <style jsx>{`
            @keyframes steam {
                0% { transform: translateY(0) scale(1); opacity: 0; }
                20% { opacity: 0.8; }
                80% { transform: translateY(-20px) scale(1.5); opacity: 0.2; }
                100% { transform: translateY(-25px) scale(1.8); opacity: 0; }
            }
            .animate-steam {
                animation: steam 2s infinite ease-out;
            }

            @keyframes swirl {
                0% { transform: rotate(0deg) scale(0.8); }
                50% { transform: rotate(180deg) scale(1); }
                100% { transform: rotate(360deg) scale(0.8); }
            }
            .animate-swirl {
                animation: swirl 3s infinite linear;
            }
            .animate-swirl-reverse {
                animation: swirl 3s infinite linear reverse;
            }

            @keyframes glow {
                0%, 100% { box-shadow: 0 0 5px 2px rgba(255, 255, 255, 0.3); }
                50% { box-shadow: 0 0 15px 5px rgba(255, 255, 255, 0.6); }
            }
            .animate-glow {
                animation: glow 4s infinite ease-in-out;
            }

            @keyframes dollop {
                0% { transform: translateY(-20px) scale(0.5); opacity: 0; }
                40% { transform: translateY(0) scale(1); opacity: 1; }
                60% { transform: translateY(-2px) scale(0.95); }
                80%, 100% { transform: translateY(0) scale(1); opacity: 1; }
            }
            .animate-dollop {
                animation: dollop 2.5s infinite ease-out;
            }
        `}</style>
        {animations[personality] || <div>☕</div>}
    </div>
  );
};

export default AnimatedAvatar;
