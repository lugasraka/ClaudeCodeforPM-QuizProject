"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import IntroScreen from "../components/IntroScreen";
import PersonalityPreview from "../components/PersonalityPreview";
import Results from "../components/Results";
import { questions } from "../utils/quizData";
import { shuffleArray, calculateResults, personalityData } from "../utils/helpers";
import { playSound } from "../utils/sounds";
import type { Personality, Question } from "../utils/quizData";

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
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("quiz-dark-mode");
    if (savedTheme) {
      setIsDark(savedTheme === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("quiz-dark-mode", String(isDark));
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
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
    }, 400);
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

  const shareResults = async () => {
    if (!resultsRef.current) {
      fallbackShare();
      return;
    }

    setIsCapturing(true);

    try {
      const html2canvasModule = await import("html2canvas");

      const canvas = await html2canvasModule.default(resultsRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      } as any);

      const dataUrl = canvas.toDataURL("image/png");

      const response = await fetch(dataUrl);
      const blob = await response.blob();

      if (!blob) {
        setIsCapturing(false);
        fallbackShare();
        return;
      }

      const file = new File([blob], "my-coffee-personality.png", { type: "image/png" });

      const shareText = `☕ I took the Coffee Personality Quiz and got "${getTopResultName()}" - ${getTopResultTagline()}\n\n${getTopResultCoffee()}\n\nTake the quiz: https://quiz-project-jade.vercel.app`;

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            title: "My Coffee Personality",
            text: shareText,
            files: [file],
          });
        } catch (shareError) {
          await navigator.share({
            title: "My Coffee Personality",
            text: shareText,
            url: "https://quiz-project-jade.vercel.app",
          });
        }
      } else if (navigator.share) {
        try {
          await navigator.share({
            title: "My Coffee Personality",
            text: shareText,
            url: "https://quiz-project-jade.vercel.app",
          });
        } catch (shareError) {
          console.log("Share failed:", shareError);
        }
      }

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "my-coffee-personality.png";
      link.click();

      setIsCapturing(false);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (error) {
      console.error("Error capturing screenshot:", error);
      setIsCapturing(false);
      fallbackShare();
    }
  };

  const fallbackShare = () => {
    const shareText = `☕ I took the Coffee Personality Quiz and got "${getTopResultName()}" - ${getTopResultTagline()}\n\n${getTopResultCoffee()}\n\nTake the quiz: https://quiz-project-jade.vercel.app`;

    if (navigator.share) {
      navigator.share({
        title: "My Coffee Personality",
        text: shareText,
        url: "https://quiz-project-jade.vercel.app",
      });
    } else {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const copyShareableLink = () => {
    const encoded = btoa(JSON.stringify({ selections }));
    const url = `https://quiz-project-jade.vercel.app?result=${encoded}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
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
        <div className={`${isDark ? "bg-gray-800" : "bg-gradient-to-b from-[#fdf6ec] to-[#f9ede0]"} rounded-3xl p-12 max-w-lg text-center shadow-2xl`}>
          <button
            onClick={() => setIsDark(!isDark)}
            className={`absolute top-4 right-4 p-2 rounded-full ${isDark ? "bg-gray-700 text-yellow-400" : "bg-white text-gray-600"}`}
          >
            {isDark ? "☀️" : "🌙"}
          </button>
          <h1 className={`text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-[#6b4423]"}`}>
            Coffee Personality Quiz
          </h1>
          <p className={`text-lg mb-8 ${isDark ? "text-gray-300" : "text-[#8b6239]"}`}>
            Discover your coffee soulmate! Answer 7 fun questions and find out which brew matches your personality.
          </p>
          <button
            onClick={handleStart}
            className="bg-gradient-to-r from-[#d4a574] to-[#c49566] text-white px-8 py-4 rounded-xl text-lg font-semibold hover:scale-105 transition-transform shadow-lg"
          >
            Start Quiz ☕
          </button>
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
        onShare={shareResults}
        onCopyLink={copyShareableLink}
        isCapturing={isCapturing}
        copied={copied}
      />
    );
  }

  const question = shuffledQuestions[currentQuestion];

  return (
    <div className={`min-h-screen ${isDark ? "bg-gradient-to-br from-gray-900 to-gray-800" : "bg-gradient-to-br from-[#d4a574] to-[#a67c52]"} flex items-center justify-center p-4`}>
      <button
        onClick={() => setIsDark(!isDark)}
        className={`fixed top-4 right-4 p-2 rounded-full z-50 ${isDark ? "bg-gray-700 text-yellow-400" : "bg-white text-gray-600"}`}
      >
        {isDark ? "☀️" : "🌙"}
      </button>
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

        <PersonalityPreview selections={selections} isDark={isDark} />

        {currentQuestion > 0 && (
          <button
            onClick={handleBack}
            className={`mb-4 font-medium flex items-center gap-1 transition-colors ${isDark ? "text-gray-400 hover:text-white" : "text-[#8b6239] hover:text-[#6b4423]"}`}
          >
            ← Back
          </button>
        )}

        <div className={`transition-opacity duration-300 ${isTransitioning ? "opacity-50" : "opacity-100"}`}>
          <div className="w-full h-40 rounded-xl overflow-hidden mb-4 relative">
            <Image
              src={question.image}
              alt={question.question}
              fill
              className="object-cover"
            />
          </div>

          <h2 className={`text-2xl font-bold mb-6 ${isDark ? "text-white" : "text-[#6b4423]"}`}>
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.answers.map((answer, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(answer.personality, idx)}
                className={`w-full bg-gradient-to-r from-[#f4e4d4] to-[#ead5c3] text-[#5a3d2b] p-4 rounded-xl text-left hover:from-[#d4a574] hover:to-[#c49566] hover:text-white transition-all hover:scale-[1.02] border-2 border-[#d4a574] font-medium ${
                  selectedAnswer === idx ? "ring-4 ring-[#d4a574]/50 scale-[1.02]" : ""
                }`}
              >
                <span className="mr-3 text-xl">{answer.icon}</span>
                {answer.text}
              </button>
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
