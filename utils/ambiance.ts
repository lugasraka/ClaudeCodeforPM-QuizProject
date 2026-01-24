// This file is a placeholder for managing themed background ambiance.
// Actual audio files are not included and should be placed in the /public/audio/ambiance directory.

type Theme = 'cozy' | 'energetic' | 'calm' | 'luxurious';

let currentAudio: HTMLAudioElement | null = null;
let soundEnabled = true;

const ambianceFiles: { [key in Theme]: string } = {
    cozy: '/audio/ambiance/cozy.mp3', // Placeholder path
    energetic: '/audio/ambiance/energetic.mp3', // Placeholder path
    calm: '/audio/ambiance/calm.mp3', // Placeholder path
    luxurious: '/audio/ambiance/luxurious.mp3', // Placeholder path
};

export const setAmbianceSoundEnabled = (enabled: boolean) => {
    soundEnabled = enabled;
    if (!enabled && currentAudio) {
        currentAudio.pause();
    }
};

export const playAmbiance = (theme: Theme) => {
    if (!soundEnabled) return;

    if (currentAudio && currentAudio.src.includes(ambianceFiles[theme])) {
        currentAudio.play();
        return;
    }

    if (currentAudio) {
        currentAudio.pause();
    }

    const audio = new Audio(ambianceFiles[theme]);
    audio.loop = true;
    audio.volume = 0.3;
    audio.play().catch(e => console.error("Failed to play ambiance sound:", e));
    currentAudio = audio;
};

export const stopAmbiance = () => {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }
};
