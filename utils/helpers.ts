import { type Personality, type Question, personalityData } from "./quizData";

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function calculateResults(selections: Personality[]) {
  const counts: Record<Personality, number> = {
    "Cozy Classic": 0,
    "Sweet Enthusiast": 0,
    "Health Nut": 0,
    "Indulgent Treat": 0,
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
}

export { personalityData };
