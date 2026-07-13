import type { GameCard, TileDefinition } from '../entities/card';
import type { Category } from '../entities/category';
import type { GameOptions, GameState } from '../entities/game';
import type { Level } from '../entities/level';
import { shuffleCards, type RandomSource } from './shuffleCards';

interface CreateGameDependencies {
  readonly categories: readonly Category[];
  readonly levels: readonly Level[];
  readonly tiles: readonly TileDefinition[];
  readonly now?: () => number;
  readonly random?: RandomSource;
}

const buildCards = (selectedTiles: readonly TileDefinition[], random: RandomSource): GameCard[] =>
  shuffleCards(
    selectedTiles.flatMap((tile) => [
      {
        id: `${tile.id}-a`,
        pairId: tile.id,
        label: tile.label,
        imageSrc: tile.imageSrc,
        status: 'hidden' as const,
      },
      {
        id: `${tile.id}-b`,
        pairId: tile.id,
        label: tile.label,
        imageSrc: tile.imageSrc,
        status: 'hidden' as const,
      },
    ]),
    random,
  );

export const createGame = (options: GameOptions, dependencies: CreateGameDependencies): GameState => {
  const category = dependencies.categories.find((item) => item.id === options.categoryId);
  const level = dependencies.levels.find((item) => item.id === options.levelId);

  if (!category) {
    throw new Error(`Unknown category: ${options.categoryId}`);
  }

  if (!level) {
    throw new Error(`Unknown level: ${options.levelId}`);
  }

  const categoryTiles = dependencies.tiles.filter((tile) => tile.categoryId === category.id);

  if (categoryTiles.length < level.pairCount) {
    throw new Error(`Category ${category.name} does not have enough tiles for ${level.name}`);
  }

  const random = dependencies.random ?? Math.random;
  const now = dependencies.now ?? Date.now;
  const selectedTiles = shuffleCards(categoryTiles, random).slice(0, level.pairCount);
  const startedAt = now();

  return {
    id: `game-${startedAt}`,
    status: 'playing',
    category,
    level,
    cards: buildCards(selectedTiles, random),
    selectedCardIds: [],
    startedAt,
    elapsedSeconds: 0,
    remainingSeconds: level.timeLimitSeconds,
    moves: 0,
    mistakes: 0,
    score: 0,
  };
};
