import { categories } from '../../data/categories';
import { levels } from '../../data/levels';
import { tiles } from '../../data/tiles';
import type { GameOptions, GameState } from '../entities/game';
import { createGame } from '../rules/createGame';
import { resolveTurn } from '../rules/resolveTurn';
import { selectCard } from '../rules/selectCard';
import { tickGame } from '../rules/tickGame';

export const gameEngine = {
  create(options: GameOptions): GameState {
    return createGame(options, { categories, levels, tiles });
  },
  selectCard,
  resolveTurn,
  tick: tickGame,
};
