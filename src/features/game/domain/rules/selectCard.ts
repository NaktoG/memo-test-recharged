import type { GameState } from '../entities/game';

export const selectCard = (state: GameState, cardId: string): GameState => {
  if (state.status !== 'playing') {
    return state;
  }

  const selectedCard = state.cards.find((card) => card.id === cardId);

  if (!selectedCard || selectedCard.status !== 'hidden' || state.selectedCardIds.length >= 2) {
    return state;
  }

  const selectedCardIds = [...state.selectedCardIds, cardId];

  return {
    ...state,
    status: selectedCardIds.length === 2 ? 'checking' : 'playing',
    selectedCardIds,
    cards: state.cards.map((card) => (card.id === cardId ? { ...card, status: 'selected' } : card)),
  };
};
