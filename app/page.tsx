"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import IntroScreen from "../components/IntroScreen";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import { questions } from "../utils/quizData";
import { shuffleArray, calculateResults, personalityData } from "../utils/helpers";
import { playSound, setSoundEnabled, isSoundEnabled } from "../utils/sounds";
import { IMAGE_PLACEHOLDER, TRANSITION_DURATION, COPIED_FEEDBACK_DURATION, APP_URL } from "../utils/constants";
import type { Personality, Question } from "../utils/quizData";

const Results = dynamic(() => import("../components/Results"), {
  loading: () => <div className="min-h-screen flex items-center justify-center text-white p-4">Loading your results...</div>,
});

export default function Home() {
  const [started, setStarted] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selections, setSelections] = useState<Personality[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [imageError, setImageError] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabledState] = useState(true);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("quiz-dark-mode");
      if (savedTheme) {
        setIsDark(savedTheme === "true");
      }
      
      const savedSound = localStorage.getItem("quiz-sound-enabled");
      if (savedSound !== null) {
        const enabled = savedSound === "true";
        setSoundEnabledState(enabled);
        setSoundEnabled(enabled);
      }
    } catch (e) {
      console.error("Failed to load preferences from localStorage:", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("quiz-dark-mode", String(isDark));
      if (isDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } catch (e) {
      console.error("Failed to save theme to localStorage:", e);
    }
  }, [isDark]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const result = params.get("result");
    if (result) {
      try {
        const decoded = JSON.parse(atob(result));
        setSelections(decoded.selections || []);
        setShowResults(true);
        setStarted(true);
      } catch (e) {
        console.error("Failed to parse result from URL");
      }
    }
  }, []);

  const handleStart = () => {
    const shuffled = shuffleArray(questions.map(q => ({
      ...q,
      answers: shuffleArray(q.answers)
    })));
    setShuffledQuestions(shuffled);
    setShowIntro(true);
  };

  const handleIntroComplete = () => {
    setShowIntro(false);
    setStarted(true);
  };

  const handleAnswer = useCallback((personality: Personality, answerIndex?: number) => {
    playSound("select");
    setSelectedAnswer(answerIndex ?? null);
    setIsTransitioning(true);

    setTimeout(() => {
      const newSelections = [...selections, personality];
      setSelections(newSelections);

      if (currentQuestion < shuffledQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        playSound("complete");
        setShowResults(true);
      }
      setIsTransitioning(false);
      setSelectedAnswer(null);
    }, TRANSITION_DURATION);
  }, [currentQuestion, selections, shuffledQuestions.length]);

  const handleBack = () => {
    if (currentQuestion > 0) {
      const newSelections = [...selections];
      newSelections.pop();
      setSelections(newSelections);
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    const shuffled = shuffleArray(questions.map(q => ({
      ...q,
      answers: shuffleArray(q.answers)
    })));
    setShuffledQuestions(shuffled);
    setStarted(false);
    setCurrentQuestion(0);
    setSelections([]);
    setShowResults(false);
  };

  const getTopResultName = () => {
    const results = calculateResults(selections);
    const topResult = results[0];
    return personalityData[topResult.personality].name;
  };

  const getTopResultTagline = () => {
    const results = calculateResults(selections);
    const topResult = results[0];
    return personalityData[topResult.personality].tagline;
  };

  const getTopResultCoffee = () => {
    const results = calculateResults(selections);
    const topResult = results[0];
    return personalityData[topResult.personality].coffee;
  };

  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabledState(newState);
    setSoundEnabled(newState);
    try {
      localStorage.setItem("quiz-sound-enabled", String(newState));
    } catch (e) {
      console.error("Failed to save sound preference:", e);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showResults || !started || isTransitioning || showIntro) return;

      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        const question = shuffledQuestions[currentQuestion];
        const answers = question.answers;
        const currentIdx = selectedAnswer ?? -1;
        const nextIdx = currentIdx < answers.length - 1 ? currentIdx + 1 : 0;
        setSelectedAnswer(nextIdx);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        const question = shuffledQuestions[currentQuestion];
        const answers = question.answers;
        const currentIdx = selectedAnswer ?? answers.length;
        const prevIdx = currentIdx > 0 ? currentIdx - 1 : answers.length - 1;
        setSelectedAnswer(prevIdx);
      } else if (e.key === "Enter" && selectedAnswer !== null) {
        e.preventDefault();
        const question = shuffledQuestions[currentQuestion];
        handleAnswer(question.answers[selectedAnswer].personality, selectedAnswer);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentQuestion, selectedAnswer, showResults, started, isTransitioning, handleAnswer, showIntro, shuffledQuestions]);

  if (showIntro) {
    return <IntroScreen onComplete={handleIntroComplete} />;
  }

  if (!started) {
    return (
      <div className={`min-h-screen ${isDark ? "bg-gradient-to-br from-gray-900 to-gray-800" : "bg-gradient-to-br from-[#d4a574] to-[#a67c52]"} flex items-center justify-center p-4`}>
        <div className={`${isDark ? "bg-gray-800" : "bg-gradient-to-b from-[#fdf6ec] to-[#f9ede0]"} rounded-3xl p-12 max-w-lg text-center shadow-2xl relative`}>
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={toggleSound}
              className={`p-2 rounded-full ${isDark ? "bg-gray-700 text-yellow-400" : "bg-white text-gray-600"}`}
              title={soundEnabled ? "Mute sounds" : "Enable sounds"}
            >
              {soundEnabled ? "🔊" : "🔇"}
            </button>
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-full ${isDark ? "bg-gray-700 text-yellow-400" : "bg-white text-gray-600"}`}
              title={isDark ? "Light mode" : "Dark mode"}
            >
              {isDark ? "☀️" : "🌙"}
            </button>
          </div>
          <h1 className={`text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-[#6b4423]"}`}>
            Coffee Personality Quiz
          </h1>
          <p className={`text-lg mb-8 ${isDark ? "text-gray-300" : "text-[#8b6239]"}`}>
            Discover your coffee soulmate! Answer 7 fun questions and find out which brew matches your personality.
          </p>
          <Button onClick={handleStart} variant="primary">
            Start Quiz ☕
          </Button>
        </div>
      </div>
    );
  }

  if (showResults) {
    const results = calculateResults(selections);
    return (
      <Results
        results={results}
        isDark={isDark}
        onRestart={handleRestart}
        onShare={undefined}
        onCopyLink={copyShareableLink}
        isCapturing={false}
        copied={copied}
      />
    );
  }

  const question = shuffledQuestions[currentQuestion];

  return (
    <div className={`min-h-screen ${isDark ? "bg-gradient-to-br from-gray-900 to-gray-800" : "bg-gradient-to-br from-[#d4a574] to-[#a67c52]"} flex items-center justify-center p-4`}>
      <div className="fixed top-4 right-4 flex gap-2 z-50">
        <button
          onClick={toggleSound}
          className={`p-2 rounded-full ${isDark ? "bg-gray-700 text-yellow-400" : "bg-white text-gray-600"}`}
          title={soundEnabled ? "Mute sounds" : "Enable sounds"}
        >
          {soundEnabled ? "🔊" : "🔇"}
        </button>
        <button
          onClick={() => setIsDark(!isDark)}
          className={`p-2 rounded-full ${isDark ? "bg-gray-700 text-yellow-400" : "bg-white text-gray-600"}`}
          title={isDark ? "Light mode" : "Dark mode"}
        >
          {isDark ? "☀️" : "🌙"}
        </button>
      </div>
      <div className={`${isDark ? "bg-gray-800" : "bg-gradient-to-b from-[#fdf6ec] to-[#f9ede0]"} rounded-3xl p-8 max-w-xl w-full shadow-2xl`}>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className={`font-medium ${isDark ? "text-gray-300" : "text-[#8b6239]"}`}>
              Q{currentQuestion + 1} of {shuffledQuestions.length}
            </span>
            <span className={`font-medium ${isDark ? "text-gray-300" : "text-[#8b6239]"}`}>
              {Math.round(((currentQuestion + 1) / shuffledQuestions.length) * 100)}%
            </span>
          </div>
          <div className={`w-full rounded-full h-3 ${isDark ? "bg-gray-700" : "bg-[#d4a574]/30"}`}>
            <div
              className="bg-gradient-to-r from-[#d4a574] to-[#c49566] h-3 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / shuffledQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {currentQuestion > 0 && (
          <button
            onClick={handleBack}
            className={`mb-4 font-medium flex items-center gap-1 transition-colors ${isDark ? "text-gray-400 hover:text-white" : "text-[#8b6239] hover:text-[#6b4423]"}`}
          >
            ← Back
          </button>
        )}

        <div className={`transition-opacity duration-300 ${isTransitioning ? "opacity-50" : "opacity-100"}`}>
          <div className="w-full h-40 rounded-xl overflow-hidden mb-4 relative bg-gradient-to-br from-[#d4a574] to-[#c49566]">
            <Image
              src={question.image}
              alt={question.question}
              fill
              className="object-cover"
              placeholder="blur"
              blurDataURL={IMAGE_PLACEHOLDER}
              priority={currentQuestion === 0}
              onError={() => setImageError(true)}
            />
            {imageError && (
              <div className="absolute inset-0 flex items-center justify-center text-white text-4xl">
                ☕
              </div>
            )}
          </div>

          <h2 className={`text-2xl font-bold mb-6 ${isDark ? "text-white" : "text-[#6b4423]"}`}>
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.answers.map((answer, idx) => (
              <Button
                key={idx}
                onClick={() => handleAnswer(answer.personality, idx)}
                variant="answer"
                fullWidth
              >
                <span className="mr-3 text-xl">{answer.icon}</span>
                {answer.text}
              </Button>
            ))}
          </div>

          <p className={`text-center text-xs mt-4 ${isDark ? "text-gray-400" : "text-[#8b6239]"}`}>
            Use arrow keys to navigate, Enter to select
          </p>
        </div>
      </div>
    </div>
  );
}
