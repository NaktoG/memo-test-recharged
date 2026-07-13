import type { GameCard } from '../entities/card';

export const checkWin = (cards: readonly GameCard[]): boolean => cards.every((card) => card.status === 'matched');
