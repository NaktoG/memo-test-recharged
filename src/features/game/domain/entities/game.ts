import type { GameCard } from './card';
import type { Category } from './category';
import type { Level } from './level';

export type GameStatus = 'idle' | 'playing' | 'checking' | 'won' | 'lost';

export interface GameOptions {
  readonly categoryId: Category['id'];
  readonly levelId: Level['id'];
}

export interface GameState {
  readonly id: string;
  readonly status: GameStatus;
  readonly category: Category;
  readonly level: Level;
  readonly cards: readonly GameCard[];
  readonly selectedCardIds: readonly string[];
  readonly startedAt: number;
  readonly elapsedSeconds: number;
  readonly remainingSeconds: number;
  readonly moves: number;
  readonly mistakes: number;
  readonly score: number;
}
