export type LevelId = 'easy' | 'medium' | 'hard' | 'expert';

export interface Level {
  readonly id: LevelId;
  readonly name: string;
  readonly pairCount: number;
  readonly timeLimitSeconds: number;
  readonly scoreMultiplier: number;
}
