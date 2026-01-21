"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import html2canvas from "html2canvas";

function Confetti() {
  const [pieces, setPieces] = useState<Array<{ id: number; left: number; delay: number; duration: number; color: string }>>([]);

  useEffect(() => {
    const colors = ["#d4a574", "#c49566", "#8b6239", "#6b4423", "#f4e4d4", "#FFD700", "#FF6B6B", "#4ECDC4"];
    const newPieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setPieces(newPieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-3 h-3 animate-confetti"
          style={{
            left: `${piece.left}%`,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            borderRadius: Math.random() > 0.5 ? "50%" : "0",
          }}
        />
      ))}
      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti linear forwards;
        }
      `}</style>
    </div>
  );
}

type Personality = "cozyClassic" | "sweetEnthusiast" | "healthNut" | "indulgentTreat";

interface Answer {
  text: string;
  icon: string;
  personality: Personality;
}

interface Question {
  question: string;
  image: string;
  answers: Answer[];
}

const questions: Question[] = [
  {
    question: "What's your ideal weekend activity?",
    image: "/q1-weekend.jpg",
    answers: [
      { text: "Relaxing at home with a cozy book", icon: "🏡", personality: "cozyClassic" },
      { text: "Brunch with bottomless mimosas", icon: "🍰", personality: "sweetEnthusiast" },
      { text: "Morning run followed by a smoothie bowl", icon: "🏃", personality: "healthNut" },
      { text: "Fancy dinner and dessert bar", icon: "🎉", personality: "indulgentTreat" },
    ],
  },
  {
    question: "Pick a Hogwarts house:",
    image: "/q2-hogwarts.jpg",
    answers: [
      { text: "Hufflepuff - loyal and dependable", icon: "🦡", personality: "cozyClassic" },
      { text: "Gryffindor - bold and fun-loving", icon: "🦁", personality: "sweetEnthusiast" },
      { text: "Ravenclaw - thoughtful and intentional", icon: "🦅", personality: "healthNut" },
      { text: "Slytherin - ambitious and unapologetic", icon: "🐍", personality: "indulgentTreat" },
    ],
  },
  {
    question: "What's your go-to comfort activity?",
    image: "/q3-comfort.jpg",
    answers: [
      { text: "Rewatching your favorite show", icon: "📺", personality: "cozyClassic" },
      { text: "Baking something sweet", icon: "🎨", personality: "sweetEnthusiast" },
      { text: "Yoga or meditation", icon: "🧘", personality: "healthNut" },
      { text: "Luxury bath with candles and wine", icon: "🛁", personality: "indulgentTreat" },
    ],
  },
  {
    question: "If you were a color, you'd be:",
    image: "/q4-colors.jpg",
    answers: [
      { text: "Warm beige - reliable and comforting", icon: "🤎", personality: "cozyClassic" },
      { text: "Soft pink - sweet and cheerful", icon: "💖", personality: "sweetEnthusiast" },
      { text: "Fresh green - natural and balanced", icon: "💚", personality: "healthNut" },
      { text: "Rich purple - luxurious and bold", icon: "💜", personality: "indulgentTreat" },
    ],
  },
  {
    question: "Your ideal vacation is:",
    image: "/q5-vacation.jpg",
    answers: [
      { text: "Cozy cabin in the woods", icon: "🏡", personality: "cozyClassic" },
      { text: "Theme park adventure", icon: "🎡", personality: "sweetEnthusiast" },
      { text: "Wellness retreat with hiking", icon: "⛰️", personality: "healthNut" },
      { text: "All-inclusive resort with spa", icon: "🏖️", personality: "indulgentTreat" },
    ],
  },
  {
    question: "Pick your Netflix vibe:",
    image: "/q6-netflix.jpg",
    answers: [
      { text: "Wholesome drama (Ted Lasso, The Crown)", icon: "📖", personality: "cozyClassic" },
      { text: "Rom-com marathon (Emily in Paris, Love Actually)", icon: "💕", personality: "sweetEnthusiast" },
      { text: "Nature documentaries (Planet Earth)", icon: "🌍", personality: "healthNut" },
      { text: "Lavish period dramas (Bridgerton, The Gilded Age)", icon: "👑", personality: "indulgentTreat" },
    ],
  },
  {
    question: "What's your morning energy?",
    image: "/q7-morning.jpg",
    answers: [
      { text: "Slow and steady - ease into the day", icon: "☕", personality: "cozyClassic" },
      { text: "Happy and optimistic right away", icon: "🌈", personality: "sweetEnthusiast" },
      { text: "Up early, productive immediately", icon: "🌅", personality: "healthNut" },
      { text: "Hit snooze, maximize sleep", icon: "😴", personality: "indulgentTreat" },
    ],
  },
];

const personalityData = {
  cozyClassic: {
    name: "Cozy Classic",
    coffee: "Medium Roast Drip",
    tagline: "Comfort in every cup",
    description: "You appreciate the simple pleasures in life. Your coffee choice reflects your love for warmth, reliability, and timeless comfort.",
    image: "/cozy-classic.jpg",
  },
  sweetEnthusiast: {
    name: "Sweet Enthusiast",
    coffee: "Caramel Latte",
    tagline: "Life's too short for bitter",
    description: "You bring joy wherever you go! Your sweet tooth matches your optimistic outlook on life - why choose bitter when you can have bliss?",
    image: "/sweet-enthusiast.jpg",
  },
  healthNut: {
    name: "Health Nut",
    coffee: "Oat Milk Americano",
    tagline: "Wellness in every sip",
    description: "Mindful and intentional, you make choices that fuel your body and mind. Your coffee reflects your commitment to balanced living.",
    image: "/health-nut.jpg",
  },
  indulgentTreat: {
    name: "Indulgent Treat",
    coffee: "Mocha with Whip",
    tagline: "Coffee is dessert",
    description: "You believe life is meant to be savored. Why settle for ordinary when you can have extraordinary? Your coffee choices are pure luxury.",
    image: "/indulgent-treat.jpg",
  },
};

function PersonalityPreview({ selections }: { selections: Personality[] }) {
  const counts: Record<Personality, number> = {
    cozyClassic: 0,
    sweetEnthusiast: 0,
    healthNut: 0,
    indulgentTreat: 0,
  };

  selections.forEach((p) => {
    counts[p]++;
  });

  const total = selections.length || 1;

  const personalityOrder: Personality[] = ["cozyClassic", "sweetEnthusiast", "healthNut", "indulgentTreat"];

  return (
    <div className="mb-6 p-4 bg-[#fdf6ec] rounded-xl border border-[#d4a574]/30">
      <p className="text-sm text-[#8b6239] font-medium mb-3">Your personality preview</p>
      <div className="grid grid-cols-2 gap-2">
        {personalityOrder.map((personality) => {
          const percentage = Math.round((counts[personality] / total) * 100);
          return (
            <div key={personality} className="flex items-center gap-2">
              <div className="flex-grow bg-[#d4a574]/20 rounded-full h-2">
                <div
                  className="bg-[#d4a574] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-xs text-[#8b6239] w-8 text-right">{percentage}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Home() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selections, setSelections] = useState<Personality[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleStart = () => {
    setStarted(true);
  };

  const handleAnswer = useCallback((personality: Personality, answerIndex?: number) => {
    setSelectedAnswer(answerIndex ?? null);
    setIsTransitioning(true);

    setTimeout(() => {
      const newSelections = [...selections, personality];
      setSelections(newSelections);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResults(true);
      }
      setIsTransitioning(false);
      setSelectedAnswer(null);
    }, 400);
  }, [currentQuestion, selections]);

  const handleBack = () => {
    if (currentQuestion > 0) {
      const newSelections = [...selections];
      newSelections.pop();
      setSelections(newSelections);
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setStarted(false);
    setCurrentQuestion(0);
    setSelections([]);
    setShowResults(false);
  };

  const calculateResults = () => {
    const counts: Record<Personality, number> = {
      cozyClassic: 0,
      sweetEnthusiast: 0,
      healthNut: 0,
      indulgentTreat: 0,
    };

    selections.forEach((p) => {
      counts[p]++;
    });

    const total = selections.length;
    const percentages = Object.entries(counts)
      .map(([personality, count]) => ({
        personality: personality as Personality,
        percentage: Math.round((count / total) * 100),
        count,
      }))
      .sort((a, b) => b.percentage - a.percentage);

    return percentages;
  };

  const shareResults = async () => {
    const results = calculateResults();
    const topResult = results[0];
    const data = personalityData[topResult.personality];
    
    const shareText = `☕ I took the Coffee Personality Quiz and got "${data.name}" - ${data.tagline}\n\n${data.coffee}\n\nTake the quiz: https://quiz-project-jade.vercel.app`;
    
    if (!resultsRef.current) {
      fallbackShare();
      return;
    }

    setIsCapturing(true);

    try {
      const canvas = await html2canvas(resultsRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const dataUrl = canvas.toDataURL("image/png");
      
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      
      if (!blob) {
        setIsCapturing(false);
        fallbackShare();
        return;
      }

      const file = new File([blob], "my-coffee-personality.png", { type: "image/png" });

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            title: "My Coffee Personality",
            text: shareText,
            files: [file],
          });
        } catch (shareError) {
          console.log("Share with image failed, trying without image:", shareError);
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
    const results = calculateResults();
    const topResult = results[0];
    const data = personalityData[topResult.personality];
    
    const shareText = `☕ I took the Coffee Personality Quiz and got "${data.name}" - ${data.tagline}\n\n${data.coffee}\n\nTake the quiz: https://quiz-project-jade.vercel.app`;
    
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showResults || !started || isTransitioning) return;

      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        const question = questions[currentQuestion];
        const answers = question.answers;
        const currentIdx = selectedAnswer ?? -1;
        const nextIdx = currentIdx < answers.length - 1 ? currentIdx + 1 : 0;
        setSelectedAnswer(nextIdx);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        const question = questions[currentQuestion];
        const answers = question.answers;
        const currentIdx = selectedAnswer ?? answers.length;
        const prevIdx = currentIdx > 0 ? currentIdx - 1 : answers.length - 1;
        setSelectedAnswer(prevIdx);
      } else if (e.key === "Enter" && selectedAnswer !== null) {
        e.preventDefault();
        const question = questions[currentQuestion];
        handleAnswer(question.answers[selectedAnswer].personality, selectedAnswer);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentQuestion, selectedAnswer, showResults, started, isTransitioning, handleAnswer]);

  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#d4a574] to-[#a67c52] flex items-center justify-center p-4">
        <div className="bg-gradient-to-b from-[#fdf6ec] to-[#f9ede0] rounded-3xl p-12 max-w-lg text-center shadow-2xl">
          <h1 className="text-4xl font-bold text-[#6b4423] mb-4">
            Coffee Personality Quiz
          </h1>
          <p className="text-[#8b6239] text-lg mb-8">
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
    const results = calculateResults();
    const topResult = results[0];

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#d4a574] to-[#a67c52] p-4 py-8">
        <Confetti />
        <div ref={resultsRef} className="bg-gradient-to-b from-[#fdf6ec] to-[#f9ede0] rounded-3xl p-8 max-w-2xl mx-auto shadow-2xl">
          <h1 className="text-3xl font-bold text-[#6b4423] mb-2 text-center">
            Your Coffee Personality
          </h1>
          <p className="text-[#8b6239] text-center mb-6">
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
                  className="bg-gradient-to-r from-[#f4e4d4] to-[#ead5c3] rounded-xl p-4 flex items-center gap-4 border-2 border-[#d4a574]"
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
                      <h3 className="font-semibold text-[#5a3d2b]">{data.name}</h3>
                      <span className="text-[#6b4423] font-bold">{result.percentage}%</span>
                    </div>
                    <p className="text-sm text-[#8b6239]">{data.coffee}</p>
                    <div className="w-full bg-[#d4a574]/30 rounded-full h-2 mt-2">
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
            onClick={shareResults}
            disabled={isCapturing}
            className="w-full mt-6 bg-[#6b4423] text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCapturing ? "⏳ Capturing..." : copied ? "✓ Screenshot Saved!" : "📤 Share Your Results"}
          </button>

          <button
            onClick={handleRestart}
            className="w-full mt-4 bg-gradient-to-r from-[#d4a574] to-[#c49566] text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition-transform"
          >
            Take Quiz Again
          </button>

          <p className="text-center text-[#8b6239] text-sm mt-6">
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

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#d4a574] to-[#a67c52] flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-[#fdf6ec] to-[#f9ede0] rounded-3xl p-8 max-w-xl w-full shadow-2xl">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[#8b6239] font-medium">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-[#8b6239] font-medium">
              {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-[#d4a574]/30 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-[#d4a574] to-[#c49566] h-3 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <PersonalityPreview selections={selections} />

        {currentQuestion > 0 && (
          <button
            onClick={handleBack}
            className="mb-4 text-[#8b6239] hover:text-[#6b4423] font-medium flex items-center gap-1 transition-colors"
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

          <h2 className="text-2xl font-bold text-[#6b4423] mb-6">
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

          <p className="text-center text-[#8b6239] text-xs mt-4">
            Use arrow keys to navigate, Enter to select
          </p>
        </div>
      </div>
    </div>
  );
}
