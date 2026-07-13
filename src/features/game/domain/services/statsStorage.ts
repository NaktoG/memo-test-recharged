import type { GameState } from '../entities/game';
import type { GameStats, LeaderboardEntry, LevelBestStats } from '../entities/stats';
import type { LevelId } from '../entities/level';

const STORAGE_KEY = 'memo-test.stats.v1';
const LEADERBOARD_LIMIT = 10;

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
  leaderboard: [],
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
    const parsed = JSON.parse(raw) as Partial<GameStats>;
    return { ...createInitialStats(), ...parsed, leaderboard: parsed.leaderboard ?? [] } as GameStats;
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

const sortLeaderboard = (entries: readonly LeaderboardEntry[]): LeaderboardEntry[] =>
  [...entries]
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      if (left.elapsedSeconds !== right.elapsedSeconds) {
        return left.elapsedSeconds - right.elapsedSeconds;
      }

      return left.moves - right.moves;
    })
    .slice(0, LEADERBOARD_LIMIT);

const createLeaderboardEntry = (game: GameState, playerName: string): LeaderboardEntry => ({
  id: `${game.id}-${game.score}-${game.elapsedSeconds}`,
  playerName: playerName.trim() || 'Player',
  score: game.score,
  elapsedSeconds: game.elapsedSeconds,
  moves: game.moves,
  mistakes: game.mistakes,
  levelId: game.level.id,
  categoryName: game.category.name,
  completedAt: new Date().toISOString(),
});

export const applyGameResult = (stats: GameStats, game: GameState, playerName = 'Player'): GameStats => {
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
  const leaderboard = won ? sortLeaderboard([...stats.leaderboard, createLeaderboardEntry(game, playerName)]) : stats.leaderboard;

  return {
    ...stats,
    gamesPlayed: stats.gamesPlayed + 1,
    gamesWon: stats.gamesWon + (won ? 1 : 0),
    gamesLost: stats.gamesLost + (won ? 0 : 1),
    currentStreak,
    bestStreak: Math.max(stats.bestStreak, currentStreak),
    lastResult: result,
    leaderboard,
    bestByLevel: {
      ...stats.bestByLevel,
      [levelId]: bestForLevel,
    },
  };
};
