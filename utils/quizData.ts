type Personality = "Cozy Classic" | "Sweet Enthusiast" | "Health Nut" | "Indulgent Treat";

interface Answer {
  text: string;
  icon: string;
  personality: Personality;
}

interface Question {
  question: string;
  image: string;
  answers: Answer[];
  theme: 'cozy' | 'energetic' | 'calm' | 'luxurious';
}

export const questions: Question[] = [
  {
    question: "What's your ideal weekend activity?",
    image: "/q1-weekend.jpg",
    answers: [
      { text: "Relaxing at home with a cozy book", icon: "🏡", personality: "Cozy Classic" },
      { text: "Brunch with bottomless mimosas", icon: "🍰", personality: "Sweet Enthusiast" },
      { text: "Morning run followed by a smoothie bowl", icon: "🏃", personality: "Health Nut" },
      { text: "Fancy dinner and dessert bar", icon: "🎉", personality: "Indulgent Treat" },
    ],
    theme: 'cozy',
  },
  {
    question: "Pick a Hogwarts house:",
    image: "/q2-hogwarts.jpg",
    answers: [
      { text: "Hufflepuff - loyal and dependable", icon: "🦡", personality: "Cozy Classic" },
      { text: "Gryffindor - bold and fun-loving", icon: "🦁", personality: "Sweet Enthusiast" },
      { text: "Ravenclaw - thoughtful and intentional", icon: "🦅", personality: "Health Nut" },
      { text: "Slytherin - ambitious and unapologetic", icon: "🐍", personality: "Indulgent Treat" },
    ],
    theme: 'luxurious',
  },
  {
    question: "What's your go-to comfort activity?",
    image: "/q3-comfort.jpg",
    answers: [
      { text: "Rewatching your favorite show", icon: "📺", personality: "Cozy Classic" },
      { text: "Baking something sweet", icon: "🎨", personality: "Sweet Enthusiast" },
      { text: "Yoga or meditation", icon: "🧘", personality: "Health Nut" },
      { text: "Luxury bath with candles and wine", icon: "🛁", personality: "Indulgent Treat" },
    ],
    theme: 'calm',
  },
  {
    question: "If you were a color, you'd be:",
    image: "/q4-colors.jpg",
    answers: [
      { text: "Warm beige - reliable and comforting", icon: "🤎", personality: "Cozy Classic" },
      { text: "Soft pink - sweet and cheerful", icon: "💖", personality: "Sweet Enthusiast" },
      { text: "Fresh green - natural and balanced", icon: "💚", personality: "Health Nut" },
      { text: "Rich purple - luxurious and bold", icon: "💜", personality: "Indulgent Treat" },
    ],
    theme: 'calm',
  },
  {
    question: "Your ideal vacation is:",
    image: "/q5-vacation.jpg",
    answers: [
      { text: "Cozy cabin in the woods", icon: "🏡", personality: "Cozy Classic" },
      { text: "Theme park adventure", icon: "🎡", personality: "Sweet Enthusiast" },
      { text: "Wellness retreat with hiking", icon: "⛰️", personality: "Health Nut" },
      { text: "All-inclusive resort with spa", icon: "🏖️", personality: "Indulgent Treat" },
    ],
    theme: 'energetic',
  },
  {
    question: "Pick your Netflix vibe:",
    image: "/q6-netflix.jpg",
    answers: [
      { text: "Wholesome drama (Ted Lasso, The Crown)", icon: "📖", personality: "Cozy Classic" },
      { text: "Rom-com marathon (Emily in Paris, Love Actually)", icon: "💕", personality: "Sweet Enthusiast" },
      { text: "Nature documentaries (Planet Earth)", icon: "🌍", personality: "Health Nut" },
      { text: "Lavish period dramas (Bridgerton, The Gilded Age)", icon: "👑", personality: "Indulgent Treat" },
    ],
    theme: 'cozy',
  },
  {
    question: "What's your morning energy?",
    image: "/q7-morning.jpg",
    answers: [
      { text: "Slow and steady - ease into the day", icon: "☕", personality: "Cozy Classic" },
      { text: "Happy and optimistic right away", icon: "🌈", personality: "Sweet Enthusiast" },
      { text: "Up early, productive immediately", icon: "🌅", personality: "Health Nut" },
      { text: "Hit snooze, maximize sleep", icon: "😴", personality: "Indulgent Treat" },
    ],
    theme: 'energetic',
  },
];

export const personalityData = {
  "Cozy Classic": {
    name: "Cozy Classic",
    coffee: "Medium Roast Drip",
    tagline: "Comfort in every cup",
    description: "You appreciate the simple pleasures in life. Your coffee choice reflects your love for warmth, reliability, and timeless comfort.",
    image: "/cozy-classic.jpg",
  },
  "Sweet Enthusiast": {
    name: "Sweet Enthusiast",
    coffee: "Caramel Latte",
    tagline: "Life's too short for bitter",
    description: "You bring joy wherever you go! Your sweet tooth matches your optimistic outlook on life - why choose bitter when you can have bliss?",
    image: "/sweet-enthusiast.jpg",
  },
  "Health Nut": {
    name: "Health Nut",
    coffee: "Oat Milk Americano",
    tagline: "Wellness in every sip",
    description: "Mindful and intentional, you make choices that fuel your body and mind. Your coffee reflects your commitment to balanced living.",
    image: "/health-nut.jpg",
  },
  "Indulgent Treat": {
    name: "Indulgent Treat",
    coffee: "Mocha with Whip",
    tagline: "Coffee is dessert",
    description: "You believe life is meant to be savored. Why settle for ordinary when you can have extraordinary? Your coffee choices are pure luxury.",
    image: "/indulgent-treat.jpg",
  },
};

export type { Personality, Answer, Question };
