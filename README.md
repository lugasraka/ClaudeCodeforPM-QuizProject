# Coffee Personality Quiz

A fun personality quiz that matches you with your perfect coffee based on your lifestyle and preferences. Answer 7 questions and discover which brew suits your personality. Originally built as part of the Vibe Coding course by Carl Vellotti [Claude Code for Product Managers](https://ccforpms.com/).

**Live Demo:** [quiz-project-jade.vercel.app](https://quiz-project-jade.vercel.app)

![alt text](public/AnimationCoffee.gif)

## Features

### Core Features
- 7 personality-based questions with custom images
- **Randomized question order** for replayability
- 4 coffee personality types: Cozy Classic, Sweet Enthusiast, Health Nut, Indulgent Treat
- Percentage breakdown of all personality matches
- Detailed descriptions for each personality type
- Confetti celebration on results
- Mobile-responsive design

### User Experience
- Animated intro screen with smooth transitions
- Progress tracking with visual progress bar
- Question counter (Q1 of 7, etc.)
- Back button to revisit and change answers
- Smooth transitions between questions
- **Image placeholders** for better perceived loading performance

### Accessibility & Usability
- Keyboard navigation (arrow keys + Enter)
- Dark mode toggle with persistence
- **Sound toggle** - mute/unmute sound effects
- Screen reader friendly
- Error boundaries for graceful error handling

### Engagement Features
- Sound effects for selections and completion (with toggle control)
- Share results with screenshot capture
- Shareable URL links that preserve quiz results
- Social links to GitHub and LinkedIn
- **Rich social media preview** with Open Graph and Twitter Card meta tags

### Technical
- Built with Next.js 16 and TypeScript
- **Reusable component architecture** with Button component
- **Optimized bundle size** with code splitting and dynamic imports
- **Memory-optimized audio context** (no memory leaks)
- Error boundaries and comprehensive error handling
- Component-based architecture for better maintainability
- Server-side rendering with client-side interactivity
- Responsive design with Tailwind CSS
- Optimized for production with Vercel deployment

## Tech Stack

- Next.js 16
- TypeScript
- Tailwind CSS
- html2canvas for screenshot capture
- Vercel deployment

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it locally.

## Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run analyze` - Analyze bundle size (opens browser with interactive charts)

### Bundle Size Analysis

To analyze your bundle size and identify optimization opportunities:

```bash
npm run analyze
```

This will generate an interactive visualization showing:
- Size of each bundle (client and server)
- Which packages are taking up space
- Opportunities for code splitting

The analyzer opens automatically in your browser after the build completes.

## Environment Variables

Copy `.env.example` to `.env.local` and customize:

```bash
NEXT_PUBLIC_APP_URL=your-deployment-url
```

## Personality Types

| Personality | Coffee Match | Tagline |
|-------------|--------------|---------|
| Cozy Classic | Medium Roast Drip | Comfort in every cup |
| Sweet Enthusiast | Caramel Latte | Life's too short for bitter |
| Health Nut | Oat Milk Americano | Wellness in every sip |
| Indulgent Treat | Mocha with Whip | Coffee is dessert |

## Author

Created by **Raka Adrianto**
[LinkedIn](https://www.linkedin.com/in/lugasraka/)
[GitHub](https://github.com/lugasraka/ClaudeCodeforPM-QuizProject)
