"use client";

import type { Personality } from "../utils/quizData";

export default function PersonalityPreview({ selections, isDark }: { selections: Personality[], isDark: boolean }) {
  const counts: Record<Personality, number> = {
    "Cozy Classic": 0,
    "Sweet Enthusiast": 0,
    "Health Nut": 0,
    "Indulgent Treat": 0,
  };

  selections.forEach((p) => {
    counts[p]++;
  });

  const total = selections.length || 1;

  const personalityOrder: Personality[] = ["Cozy Classic", "Sweet Enthusiast", "Health Nut", "Indulgent Treat"];

  return (
    <div className={`mb-6 p-4 rounded-xl border ${isDark ? "bg-gray-800 border-gray-700" : "bg-[#fdf6ec] border-[#d4a574]/30"}`}>
      <p className={`text-sm font-medium mb-3 ${isDark ? "text-gray-300" : "text-[#8b6239]"}`}>Your personality preview</p>
      <div className="grid grid-cols-2 gap-2">
        {personalityOrder.map((personality) => {
          const percentage = Math.round((counts[personality] / total) * 100);
          return (
            <div key={personality} className="flex items-center gap-2">
              <div className={`flex-grow rounded-full h-2 ${isDark ? "bg-gray-600" : "bg-[#d4a574]/40"}`}>
                <div
                  className="bg-[#d4a574] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className={`text-xs w-8 text-right ${isDark ? "text-gray-400" : "text-[#8b6239]"}`}>{percentage}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
