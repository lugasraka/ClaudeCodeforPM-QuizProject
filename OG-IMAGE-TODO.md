# Open Graph Image - TODO

To complete the social sharing setup, you need to add an Open Graph image.

## Option 1: Create a custom OG image (Recommended)
1. Create an image that is **1200x630 pixels** (Facebook/LinkedIn recommended size)
2. Include:
   - App title: "Coffee Personality Quiz"
   - Tagline: "Find Your Perfect Brew"
   - Coffee imagery or emoji
   - Your branding/colors (#d4a574, #c49566)
3. Save as `public/og-image.jpg`

## Option 2: Use an existing image (Quick fix)
Copy one of your existing images and rename it:
```bash
cp public/q7-morning.jpg public/og-image.jpg
```

## Option 3: Use Next.js dynamic OG image generation
Create `app/opengraph-image.tsx` with dynamic image generation.

## Tools to create OG images:
- Canva (easiest): https://www.canva.com/
- Figma: https://www.figma.com/
- OG Image Playground: https://og-playground.vercel.app/

## Current setup:
The metadata in `app/layout.tsx` already references `/og-image.jpg`, so once you add that file, social sharing will work perfectly!

## Test your OG tags:
- Facebook: https://developers.facebook.com/tools/debug/
- Twitter: https://cards-dev.twitter.com/validator
- LinkedIn: https://www.linkedin.com/post-inspector/
