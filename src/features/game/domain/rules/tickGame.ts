import type { GameState } from '../entities/game';

export const tickGame = (state: GameState): GameState => {
  if (state.status !== 'playing' && state.status !== 'checking') {
    return state;
  }

  const elapsedSeconds = state.elapsedSeconds + 1;
  const remainingSeconds = Math.max(0, state.level.timeLimitSeconds - elapsedSeconds);

  return {
    ...state,
    elapsedSeconds,
    remainingSeconds,
    status: remainingSeconds === 0 ? 'lost' : state.status,
  };
};
