import type { LevelId } from './level';

export interface LeaderboardEntry {
  readonly id: string;
  readonly playerName: string;
  readonly score: number;
  readonly elapsedSeconds: number;
  readonly moves: number;
  readonly mistakes: number;
  readonly levelId: LevelId;
  readonly categoryName: string;
  readonly completedAt: string;
}

export interface LevelBestStats {
  readonly bestTimeSeconds: number | null;
  readonly bestScore: number;
}

export interface GameStats {
  readonly gamesPlayed: number;
  readonly gamesWon: number;
  readonly gamesLost: number;
  readonly currentStreak: number;
  readonly bestStreak: number;
  readonly bestByLevel: Record<LevelId, LevelBestStats>;
  readonly leaderboard: readonly LeaderboardEntry[];
  readonly lastResult: 'won' | 'lost' | null;
}
