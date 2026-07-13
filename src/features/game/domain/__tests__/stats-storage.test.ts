import { describe, expect, it } from 'vitest';
import type { GameState } from '../entities/game';
import { applyGameResult, createInitialStats } from '../services/statsStorage';

const createFinishedGame = (status: 'won' | 'lost'): GameState => ({
  id: `game-${status}`,
  status,
  category: { id: 'test', name: 'Test', description: 'Test category' },
  level: { id: 'easy', name: 'Easy', pairCount: 2, timeLimitSeconds: 30, scoreMultiplier: 1 },
  cards: [],
  selectedCardIds: [],
  startedAt: 0,
  elapsedSeconds: 12,
  remainingSeconds: 18,
  moves: 4,
  mistakes: 1,
  score: status === 'won' ? 1200 : 0,
});

describe('stats storage rules', () => {
  it('records wins and best marks', () => {
    const stats = applyGameResult(createInitialStats(), createFinishedGame('won'));

    expect(stats.gamesPlayed).toBe(1);
    expect(stats.gamesWon).toBe(1);
    expect(stats.currentStreak).toBe(1);
    expect(stats.bestByLevel.easy.bestTimeSeconds).toBe(12);
    expect(stats.bestByLevel.easy.bestScore).toBe(1200);
  });

  it('records losses and resets current streak', () => {
    const afterWin = applyGameResult(createInitialStats(), createFinishedGame('won'));
    const afterLoss = applyGameResult(afterWin, createFinishedGame('lost'));

    expect(afterLoss.gamesPlayed).toBe(2);
    expect(afterLoss.gamesLost).toBe(1);
    expect(afterLoss.currentStreak).toBe(0);
    expect(afterLoss.bestStreak).toBe(1);
  });
});
