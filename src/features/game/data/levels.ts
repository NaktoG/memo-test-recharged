import type { Level } from '../domain/entities/level';

export const levels: readonly Level[] = [
  {
    id: 'easy',
    name: 'Easy',
    pairCount: 4,
    timeLimitSeconds: 45,
    scoreMultiplier: 1,
  },
  {
    id: 'medium',
    name: 'Medium',
    pairCount: 6,
    timeLimitSeconds: 60,
    scoreMultiplier: 1.4,
  },
  {
    id: 'hard',
    name: 'Hard',
    pairCount: 8,
    timeLimitSeconds: 75,
    scoreMultiplier: 1.8,
  },
  {
    id: 'expert',
    name: 'Expert',
    pairCount: 12,
    timeLimitSeconds: 100,
    scoreMultiplier: 2.4,
  },
] as const;
