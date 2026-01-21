# Coffee Personality Quiz - Requirements

## Overview
A fun, interactive quiz that matches users with a coffee personality and recommendation based on their answers.

## Personality → Coffee Pairings

1. **Cozy Classic** → Medium Roast Drip
   - Tagline: "Comfort in every cup"
   - Image: `public/cozy-classic.jpg`

2. **Sweet Enthusiast** → Caramel Latte
   - Tagline: "Life's too short for bitter"
   - Image: `public/sweet-enthusiast.jpg`

3. **Health Nut** → Oat Milk Americano
   - Tagline: "Wellness in every sip"
   - Image: `public/health-nut.jpg`

4. **Indulgent Treat** → Mocha with Whip
   - Tagline: "Coffee is dessert"
   - Image: `public/indulgent-treat.jpg`

## Result Display
**Show all percentages** - Display breakdown of all personality matches with percentages (e.g., "You're 50% Cozy Classic, 30% Sweet Enthusiast, 20% Health Nut, 0% Indulgent Treat") along with all corresponding coffee recommendations.

## Visual Style
**Style 4: Warm & Cozy**
- Earth tones and warm colors (browns, beiges, soft gradients)
- Soft, inviting feel with rounded corners
- Gradient backgrounds (#d4a574 to #a67c52)
- Clean, readable typography
- Button hover effects with gentle animations

## Visual Elements
- **Images:** Yes - each result has a coffee image
- **Icons:** Yes - each answer option has an icon

## Quiz Questions

### Question 1: What's your ideal weekend activity?
- 🏡 Relaxing at home with a cozy book → **Cozy Classic**
- 🍰 Brunch with bottomless mimosas → **Sweet Enthusiast**
- 🏃 Morning run followed by a smoothie bowl → **Health Nut**
- 🎉 Fancy dinner and dessert bar → **Indulgent Treat**

### Question 2: Pick a Hogwarts house:
- 🦡 Hufflepuff - loyal and dependable → **Cozy Classic**
- 🦁 Gryffindor - bold and fun-loving → **Sweet Enthusiast**
- 🦅 Ravenclaw - thoughtful and intentional → **Health Nut**
- 🐍 Slytherin - ambitious and unapologetic → **Indulgent Treat**

### Question 3: What's your go-to comfort activity?
- 📺 Rewatching your favorite show → **Cozy Classic**
- 🎨 Baking something sweet → **Sweet Enthusiast**
- 🧘 Yoga or meditation → **Health Nut**
- 🛁 Luxury bath with candles and wine → **Indulgent Treat**

### Question 4: If you were a color, you'd be:
- 🤎 Warm beige - reliable and comforting → **Cozy Classic**
- 💖 Soft pink - sweet and cheerful → **Sweet Enthusiast**
- 💚 Fresh green - natural and balanced → **Health Nut**
- 💜 Rich purple - luxurious and bold → **Indulgent Treat**

### Question 5: Your ideal vacation is:
- 🏡 Cozy cabin in the woods → **Cozy Classic**
- 🎡 Theme park adventure → **Sweet Enthusiast**
- ⛰️ Wellness retreat with hiking → **Health Nut**
- 🏖️ All-inclusive resort with spa → **Indulgent Treat**

### Question 6: Pick your Netflix vibe:
- 📖 Wholesome drama (Ted Lasso, The Crown) → **Cozy Classic**
- 💕 Rom-com marathon (Emily in Paris, Love Actually) → **Sweet Enthusiast**
- 🌍 Nature documentaries (Planet Earth) → **Health Nut**
- 👑 Lavish period dramas (Bridgerton, The Gilded Age) → **Indulgent Treat**

### Question 7: What's your morning energy?
- ☕ Slow and steady - ease into the day → **Cozy Classic**
- 🌈 Happy and optimistic right away → **Sweet Enthusiast**
- 🌅 Up early, productive immediately → **Health Nut**
- 😴 Hit snooze, maximize sleep → **Indulgent Treat**

## Technical Notes
- Built with Next.js and JavaScript
- Question vibe: Mix of everything (pop culture, lifestyle, abstract)
- Logic: Tally personality selections across all questions, display results with percentages
