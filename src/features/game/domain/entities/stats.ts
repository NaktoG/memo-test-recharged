import type { LevelId } from './level';

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
  readonly lastResult: 'won' | 'lost' | null;
}
