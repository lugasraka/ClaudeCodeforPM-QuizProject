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

export const questions: Question[] = [
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

export const personalityData = {
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

export type { Personality, Answer, Question };
