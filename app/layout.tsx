import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import ErrorBoundary from "../components/ErrorBoundary";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Coffee Personality Quiz - Find Your Perfect Brew",
  description: "Discover your coffee soulmate! Take our fun personality quiz and find out which coffee matches your lifestyle. Answer 7 questions and get your personalized coffee recommendation.",
  keywords: ["coffee quiz", "personality quiz", "coffee personality", "fun quiz", "coffee lover", "coffee types"],
  authors: [{ name: "Raka Adrianto", url: "https://www.linkedin.com/in/lugasraka/" }],
  creator: "Raka Adrianto",
  
  // Open Graph (Facebook, LinkedIn)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://quiz-project-jade.vercel.app",
    title: "Coffee Personality Quiz - Find Your Perfect Brew",
    description: "Discover your coffee soulmate! Take our fun personality quiz and find out which coffee matches your lifestyle.",
    siteName: "Coffee Personality Quiz",
    images: [
      {
        url: "https://quiz-project-jade.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Coffee Personality Quiz - Find Your Perfect Brew",
      },
    ],
  },
  
  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "Coffee Personality Quiz - Find Your Perfect Brew",
    description: "Discover your coffee soulmate! Take our fun personality quiz and find out which coffee matches your lifestyle.",
    images: ["https://quiz-project-jade.vercel.app/og-image.jpg"],
    creator: "@lugasraka",
  },
  
  // Additional
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} font-sans antialiased`}>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
