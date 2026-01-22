"use client";

import { useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import type { Personality } from "../utils/quizData";
import { personalityData } from "../utils/quizData";

const Confetti = dynamic(() => import("./Confetti"), { ssr: false });

interface ResultsProps {
  results: Array<{
    personality: Personality;
    percentage: number;
    count: number;
  }>;
  isDark: boolean;
  onRestart: () => void;
  onShare: () => Promise<void>;
  onCopyLink: () => void;
  isCapturing: boolean;
  copied: boolean;
}

export default function Results({ results, isDark, onRestart, onShare, onCopyLink, isCapturing, copied }: ResultsProps) {
  const resultsRef = useRef<HTMLDivElement>(null);
  const topResult = results[0];

  return (
    <div className={`min-h-screen ${isDark ? "bg-gradient-to-br from-gray-900 to-gray-800" : "bg-gradient-to-br from-[#d4a574] to-[#a67c52]"} p-4 py-8`}>
      <Confetti />
      <div ref={resultsRef} className={`${isDark ? "bg-gray-800" : "bg-gradient-to-b from-[#fdf6ec] to-[#f9ede0]"} rounded-3xl p-8 max-w-2xl mx-auto shadow-2xl`}>
        <h1 className={`text-3xl font-bold mb-2 text-center ${isDark ? "text-white" : "text-[#6b4423]"}`}>
          Your Coffee Personality
        </h1>
        <p className={`text-center mb-6 ${isDark ? "text-gray-400" : "text-[#8b6239]"}`}>
          Here&apos;s your complete breakdown!
        </p>

        <div className="bg-gradient-to-r from-[#d4a574] to-[#c49566] rounded-2xl p-6 mb-6 text-white text-center">
          <p className="text-sm uppercase tracking-wide mb-1">You&apos;re mostly a...</p>
          <h2 className="text-2xl font-bold mb-1">
            {personalityData[topResult.personality].name}
          </h2>
          <p className="text-lg opacity-90">
            &quot;{personalityData[topResult.personality].tagline}&quot;
          </p>
          <p className="mt-3 text-xl font-semibold">
            ☕ {personalityData[topResult.personality].coffee}
          </p>
          <p className="mt-3 text-sm opacity-90">
            {personalityData[topResult.personality].description}
          </p>
        </div>

        <div className="space-y-4">
          {results.map((result) => {
            const data = personalityData[result.personality];
            return (
              <div
                key={result.personality}
                className={`rounded-xl p-4 flex items-center gap-4 border-2 ${isDark ? "bg-gray-700 border-gray-600" : "bg-gradient-to-r from-[#f4e4d4] to-[#ead5c3] border-[#d4a574]"}`}
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 relative">
                  <Image
                    src={data.image}
                    alt={data.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className={`font-semibold ${isDark ? "text-white" : "text-[#5a3d2b]"}`}>{data.name}</h3>
                    <span className={`font-bold ${isDark ? "text-gray-300" : "text-[#6b4423]"}`}>{result.percentage}%</span>
                  </div>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-[#8b6239]"}`}>{data.coffee}</p>
                  <div className={`w-full rounded-full h-2 mt-2 ${isDark ? "bg-gray-600" : "bg-[#d4a574]/30"}`}>
                    <div
                      className="bg-[#d4a574] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${result.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={onShare}
          disabled={isCapturing}
          className="w-full mt-6 bg-[#6b4423] text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isCapturing ? "⏳ Capturing..." : copied ? "✓ Screenshot Saved!" : "📤 Share Your Results"}
        </button>

        <button
          onClick={onCopyLink}
          className="w-full mt-4 bg-transparent border-2 border-[#d4a574] text-[#6b4423] py-3 rounded-xl font-semibold hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
        >
          🔗 Copy Shareable Link
        </button>

        <button
          onClick={onRestart}
          className="w-full mt-4 bg-gradient-to-r from-[#d4a574] to-[#c49566] text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition-transform"
        >
          Take Quiz Again
        </button>

        <p className={`text-center text-sm mt-6 ${isDark ? "text-gray-400" : "text-[#8b6239]"}`}>
          Created by Raka Adrianto. Have feedback, questions, or want to say hi?{" "}
          <a
            href="https://www.linkedin.com/in/lugasraka/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6b4423] underline hover:text-[#5a3d2b]"
          >
            LinkedIn
          </a>
          {" | "}
          <a
            href="https://github.com/lugasraka/ClaudeCodeforPM-QuizProject"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6b4423] underline hover:text-[#5a3d2b]"
          >
            View Source on GitHub
          </a>
        </p>
      </div>
    </div>
  );
}
