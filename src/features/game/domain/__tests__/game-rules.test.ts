import { describe, expect, it } from 'vitest';
import type { Category } from '../entities/category';
import type { Level } from '../entities/level';
import type { TileDefinition } from '../entities/card';
import { createGame } from '../rules/createGame';
import { resolveTurn } from '../rules/resolveTurn';
import { selectCard } from '../rules/selectCard';
import { tickGame } from '../rules/tickGame';

const categories: readonly Category[] = [{ id: 'test', name: 'Test', description: 'Test category' }];
const levels: readonly Level[] = [{ id: 'easy', name: 'Easy', pairCount: 2, timeLimitSeconds: 3, scoreMultiplier: 1 }];
const tiles: readonly TileDefinition[] = [
  { id: 'alpha', categoryId: 'test', label: 'Alpha', imageSrc: '/alpha.svg' },
  { id: 'beta', categoryId: 'test', label: 'Beta', imageSrc: '/beta.svg' },
];

const createTestGame = () =>
  createGame(
    { categoryId: 'test', levelId: 'easy' },
    {
      categories,
      levels,
      tiles,
      now: () => 1000,
      random: () => 0.42,
    },
  );

const requireValue = <T>(value: T | undefined): T => {
  if (value === undefined) {
    throw new Error('Expected test fixture value to exist');
  }

  return value;
};

describe('game rules', () => {
  it('creates a playable game without mutating source tiles', () => {
    const game = createTestGame();

    expect(game.status).toBe('playing');
    expect(game.cards).toHaveLength(4);
    expect(game.remainingSeconds).toBe(3);
    expect(tiles.every((tile) => !('status' in tile))).toBe(true);
  });

  it('selects hidden cards and moves to checking after two selections', () => {
    const game = createTestGame();
    const first = requireValue(game.cards[0]);
    const second = requireValue(game.cards[1]);

    const afterFirst = selectCard(game, first.id);
    const afterSecond = selectCard(afterFirst, second.id);

    expect(afterFirst.selectedCardIds).toHaveLength(1);
    expect(afterSecond.selectedCardIds).toHaveLength(2);
    expect(afterSecond.status).toBe('checking');
  });

  it('marks matching pairs and wins when every card is matched', () => {
    let game = createTestGame();

    for (const pairId of ['alpha', 'beta']) {
      const pair = game.cards.filter((card) => card.pairId === pairId);
      const first = requireValue(pair[0]);
      const second = requireValue(pair[1]);

      game = selectCard(game, first.id);
      game = selectCard(game, second.id);
      game = resolveTurn(game);
    }

    expect(game.status).toBe('won');
    expect(game.score).toBeGreaterThan(0);
    expect(game.cards.every((card) => card.status === 'matched')).toBe(true);
  });

  it('loses when the timer reaches zero', () => {
    let game = createTestGame();

    game = tickGame(game);
    game = tickGame(game);
    game = tickGame(game);

    expect(game.remainingSeconds).toBe(0);
    expect(game.status).toBe('lost');
  });
});
