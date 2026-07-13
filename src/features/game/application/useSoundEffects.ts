import { useCallback, useRef } from 'react';

type SoundName = 'flip' | 'match' | 'win' | 'lose';

const frequencies: Record<SoundName, readonly number[]> = {
  flip: [520],
  match: [660, 880],
  win: [523, 659, 784, 1046],
  lose: [220, 180],
};

export const useSoundEffects = (enabled: boolean) => {
  const contextRef = useRef<AudioContext | null>(null);

  return useCallback(
    (sound: SoundName) => {
      if (!enabled || !globalThis.AudioContext) {
        return;
      }

      const context = contextRef.current ?? new AudioContext();
      contextRef.current = context;
      const now = context.currentTime;

      frequencies[sound].forEach((frequency, index) => {
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        const start = now + index * 0.09;
        const duration = sound === 'win' ? 0.14 : 0.09;

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, start);
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.exponentialRampToValueAtTime(0.055, start + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
        oscillator.connect(gain);
        gain.connect(context.destination);
        oscillator.start(start);
        oscillator.stop(start + duration + 0.02);
      });
    },
    [enabled],
  );
};
