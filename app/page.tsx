"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// Confetti component
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
    image: "/cozy-classic.jpg",
  },
  sweetEnthusiast: {
    name: "Sweet Enthusiast",
    coffee: "Caramel Latte",
    tagline: "Life's too short for bitter",
    image: "/sweet-enthusiast.jpg",
  },
  healthNut: {
    name: "Health Nut",
    coffee: "Oat Milk Americano",
    tagline: "Wellness in every sip",
    image: "/health-nut.jpg",
  },
  indulgentTreat: {
    name: "Indulgent Treat",
    coffee: "Mocha with Whip",
    tagline: "Coffee is dessert",
    image: "/indulgent-treat.jpg",
  },
};

export default function Home() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selections, setSelections] = useState<Personality[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleStart = () => {
    setStarted(true);
  };

  const handleAnswer = (personality: Personality) => {
    const newSelections = [...selections, personality];
    setSelections(newSelections);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
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

  const restartQuiz = () => {
    setStarted(false);
    setCurrentQuestion(0);
    setSelections([]);
    setShowResults(false);
  };

  // Landing Page
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

  // Results Page
  if (showResults) {
    const results = calculateResults();
    const topResult = results[0];

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#d4a574] to-[#a67c52] p-4 py-8">
        <Confetti />
        <div className="bg-gradient-to-b from-[#fdf6ec] to-[#f9ede0] rounded-3xl p-8 max-w-2xl mx-auto shadow-2xl">
          <h1 className="text-3xl font-bold text-[#6b4423] mb-2 text-center">
            Your Coffee Personality
          </h1>
          <p className="text-[#8b6239] text-center mb-6">
            Here&apos;s your complete breakdown!
          </p>

          {/* Top Result Highlight */}
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
          </div>

          {/* All Results with Percentages */}
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
                    {/* Progress Bar */}
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
            onClick={restartQuiz}
            className="w-full mt-6 bg-gradient-to-r from-[#d4a574] to-[#c49566] text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition-transform"
          >
            Take Quiz Again
          </button>

          {/* Creator Credit */}
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
          </p>
        </div>
      </div>
    );
  }

  // Quiz Questions
  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#d4a574] to-[#a67c52] flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-[#fdf6ec] to-[#f9ede0] rounded-3xl p-8 max-w-xl w-full shadow-2xl">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[#8b6239] font-medium">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-[#8b6239] font-medium">
              {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
            </span>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-[#d4a574]/30 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-[#d4a574] to-[#c49566] h-3 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Image */}
        <div className="w-full h-40 rounded-xl overflow-hidden mb-4 relative">
          <Image
            src={question.image}
            alt={question.question}
            fill
            className="object-cover"
          />
        </div>

        {/* Question */}
        <h2 className="text-2xl font-bold text-[#6b4423] mb-6">
          {question.question}
        </h2>

        {/* Answers */}
        <div className="space-y-3">
          {question.answers.map((answer, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(answer.personality)}
              className="w-full bg-gradient-to-r from-[#f4e4d4] to-[#ead5c3] text-[#5a3d2b] p-4 rounded-xl text-left hover:from-[#d4a574] hover:to-[#c49566] hover:text-white transition-all hover:scale-[1.02] border-2 border-[#d4a574] font-medium"
            >
              <span className="mr-3 text-xl">{answer.icon}</span>
              {answer.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
