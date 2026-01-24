"use client";

import React from 'react';
import type { Personality } from '../utils/quizData';
import { personalityData } from '../utils/quizData';

interface ResultCoffeeCupProps {
    results: Array<{
        personality: Personality;
        percentage: number;
    }>;
}

const personalityColors: { [key in Personality]: string } = {
    "Cozy Classic": "#6b4f3a",
    "Sweet Enthusiast": "#c49566",
    "Health Nut": "#ad8a68",
    "Indulgent Treat": "#5a3d2b",
};


const ResultCoffeeCup: React.FC<ResultCoffeeCupProps> = ({ results }) => {
    const sortedResults = [...results].sort((a, b) => a.percentage - b.percentage);
    let accumulatedPercentage = 0;

    return (
        <div className="relative w-48 h-64 mx-auto">
            {/* Cup Shape */}
            <div className="absolute bottom-0 left-0 w-full h-full" style={{ clipPath: 'polygon(10% 0, 90% 0, 100% 100%, 0 100%)' }}>
                <div className="relative w-full h-full bg-gray-200 rounded-b-3xl">
                    {/* Coffee Layers */}
                    {sortedResults.map((result) => {
                        const bottom = accumulatedPercentage;
                        accumulatedPercentage += result.percentage;
                        return (
                            <div
                                key={result.personality}
                                className="absolute bottom-0 w-full transition-all duration-1000"
                                style={{
                                    height: `${result.percentage}%`,
                                    backgroundColor: personalityColors[result.personality],
                                    bottom: `${bottom}%`,
                                    clipPath: 'polygon(10% 0, 90% 0, 100% 100%, 0 100%)'
                                }}
                            />
                        );
                    })}
                </div>
            </div>
             {/* Cup Handle */}
            <div className="absolute top-1/4 -right-8 w-12 h-20 border-8 border-gray-200 rounded-full" />
        </div>
    );
};

export default ResultCoffeeCup;
