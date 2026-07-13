import type { GameState } from '../entities/game';
import { calculateScore } from './calculateScore';
import { checkWin } from './checkWin';

export const resolveTurn = (state: GameState): GameState => {
  if (state.status !== 'checking' || state.selectedCardIds.length !== 2) {
    return state;
  }

  const [firstId, secondId] = state.selectedCardIds;
  const first = state.cards.find((card) => card.id === firstId);
  const second = state.cards.find((card) => card.id === secondId);

  if (!first || !second) {
    return { ...state, status: 'playing', selectedCardIds: [] };
  }

  const isMatch = first.pairId === second.pairId;
  const cards = state.cards.map((card) => {
    if (card.id !== first.id && card.id !== second.id) {
      return card;
    }

    return { ...card, status: isMatch ? ('matched' as const) : ('hidden' as const) };
  });

  const nextState: GameState = {
    ...state,
    cards,
    selectedCardIds: [],
    moves: state.moves + 1,
    mistakes: isMatch ? state.mistakes : state.mistakes + 1,
    status: 'playing',
  };

  if (!checkWin(cards)) {
    return nextState;
  }

  return {
    ...nextState,
    status: 'won',
    score: calculateScore(nextState),
  };
};
