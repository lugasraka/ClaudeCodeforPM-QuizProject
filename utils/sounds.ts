export function playSound(type: "select" | "success" | "complete") {
  if (typeof window === "undefined") return;

  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

  if (type === "select") {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.type = "sine";
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  } else if (type === "success") {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.1);
    oscillator.type = "sine";
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  } else if (type === "complete") {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, i) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.frequency.setValueAtTime(freq, audioContext.currentTime + i * 0.15);
      osc.type = "sine";
      gain.gain.setValueAtTime(0.1, audioContext.currentTime + i * 0.15);
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.15 + 0.3);
      osc.start(audioContext.currentTime + i * 0.15);
      osc.stop(audioContext.currentTime + i * 0.15 + 0.3);
    });
  }
}
