import type { GameState } from '../entities/game';

export const calculateScore = (state: Pick<GameState, 'level' | 'remainingSeconds' | 'moves' | 'mistakes'>): number => {
  const timeBonus = state.remainingSeconds * 8;
  const movePenalty = state.moves * 3;
  const mistakePenalty = state.mistakes * 12;
  const base = 1000 + timeBonus - movePenalty - mistakePenalty;

  return Math.max(0, Math.round(base * state.level.scoreMultiplier));
};
