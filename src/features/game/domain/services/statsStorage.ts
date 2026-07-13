import type { GameState } from '../entities/game';
import type { GameStats, LevelBestStats } from '../entities/stats';
import type { LevelId } from '../entities/level';

const STORAGE_KEY = 'memo-test.stats.v1';

const emptyBestStats: LevelBestStats = {
  bestTimeSeconds: null,
  bestScore: 0,
};

export const createInitialStats = (): GameStats => ({
  gamesPlayed: 0,
  gamesWon: 0,
  gamesLost: 0,
  currentStreak: 0,
  bestStreak: 0,
  lastResult: null,
  bestByLevel: {
    easy: emptyBestStats,
    medium: emptyBestStats,
    hard: emptyBestStats,
    expert: emptyBestStats,
  },
});

export const readStats = (storage: Storage | undefined = globalThis.localStorage): GameStats => {
  if (!storage) {
    return createInitialStats();
  }

  const raw = storage.getItem(STORAGE_KEY);

  if (!raw) {
    return createInitialStats();
  }

  try {
    return { ...createInitialStats(), ...JSON.parse(raw) } as GameStats;
  } catch {
    return createInitialStats();
  }
};

export const writeStats = (stats: GameStats, storage: Storage | undefined = globalThis.localStorage): void => {
  storage?.setItem(STORAGE_KEY, JSON.stringify(stats));
};

export const clearStats = (storage: Storage | undefined = globalThis.localStorage): GameStats => {
  storage?.removeItem(STORAGE_KEY);
  return createInitialStats();
};

export const applyGameResult = (stats: GameStats, game: GameState): GameStats => {
  if (game.status !== 'won' && game.status !== 'lost') {
    return stats;
  }

  const result = game.status;
  const levelId: LevelId = game.level.id;
  const previousBest = stats.bestByLevel[levelId];
  const won = result === 'won';
  const currentStreak = won ? stats.currentStreak + 1 : 0;
  const bestForLevel: LevelBestStats = won
    ? {
        bestTimeSeconds:
          previousBest.bestTimeSeconds === null
            ? game.elapsedSeconds
            : Math.min(previousBest.bestTimeSeconds, game.elapsedSeconds),
        bestScore: Math.max(previousBest.bestScore, game.score),
      }
    : previousBest;

  return {
    ...stats,
    gamesPlayed: stats.gamesPlayed + 1,
    gamesWon: stats.gamesWon + (won ? 1 : 0),
    gamesLost: stats.gamesLost + (won ? 0 : 1),
    currentStreak,
    bestStreak: Math.max(stats.bestStreak, currentStreak),
    lastResult: result,
    bestByLevel: {
      ...stats.bestByLevel,
      [levelId]: bestForLevel,
    },
  };
};
