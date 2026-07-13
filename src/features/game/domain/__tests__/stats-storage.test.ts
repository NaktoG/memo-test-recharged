import { describe, expect, it } from 'vitest';
import type { GameState } from '../entities/game';
import { applyGameResult, createInitialStats } from '../services/statsStorage';

const createFinishedGame = (status: 'won' | 'lost', overrides: Partial<GameState> = {}): GameState => ({
  id: `game-${status}-${overrides.score ?? 'base'}`,
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
  ...overrides,
});

describe('stats storage rules', () => {
  it('records wins and best marks', () => {
    const stats = applyGameResult(createInitialStats(), createFinishedGame('won'), 'Ada');

    expect(stats.gamesPlayed).toBe(1);
    expect(stats.gamesWon).toBe(1);
    expect(stats.currentStreak).toBe(1);
    expect(stats.bestByLevel.easy.bestTimeSeconds).toBe(12);
    expect(stats.bestByLevel.easy.bestScore).toBe(1200);
    expect(stats.leaderboard[0]?.playerName).toBe('Ada');
  });

  it('records losses and resets current streak', () => {
    const afterWin = applyGameResult(createInitialStats(), createFinishedGame('won'));
    const afterLoss = applyGameResult(afterWin, createFinishedGame('lost'));

    expect(afterLoss.gamesPlayed).toBe(2);
    expect(afterLoss.gamesLost).toBe(1);
    expect(afterLoss.currentStreak).toBe(0);
    expect(afterLoss.bestStreak).toBe(1);
    expect(afterLoss.leaderboard).toHaveLength(1);
  });

  it('sorts leaderboard by score descending and time ascending', () => {
    const initial = createInitialStats();
    const first = applyGameResult(initial, createFinishedGame('won', { score: 900, elapsedSeconds: 10 }), 'Slow');
    const second = applyGameResult(first, createFinishedGame('won', { score: 1400, elapsedSeconds: 20 }), 'Top Score');
    const third = applyGameResult(second, createFinishedGame('won', { score: 1400, elapsedSeconds: 9 }), 'Fast Top');

    expect(third.leaderboard.map((entry) => entry.playerName)).toEqual(['Fast Top', 'Top Score', 'Slow']);
  });
});
