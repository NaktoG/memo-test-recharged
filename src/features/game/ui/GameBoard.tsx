import { motion } from 'motion/react';
import type { GameState } from '../domain/entities/game';
import { screenMotion } from './animations';
import { GameCard } from './GameCard';

interface GameBoardProps {
  readonly game: GameState;
  readonly onSelectCard: (cardId: string) => void;
}

export const GameBoard = ({ game, onSelectCard }: GameBoardProps) => (
  <motion.div {...screenMotion}>
    <div className="mb-5 flex flex-wrap items-center gap-3 text-sm text-slate-300">
      <span className="rounded-full bg-white/10 px-3 py-1">{game.category.name}</span>
      <span className="rounded-full bg-white/10 px-3 py-1">{game.level.name}</span>
      <span className="rounded-full bg-white/10 px-3 py-1">{game.cards.length / 2} pares</span>
    </div>

    <div className="grid grid-cols-[repeat(auto-fit,minmax(clamp(4.7rem,18vw,8rem),1fr))] gap-3 sm:gap-4">
      {game.cards.map((card) => (
        <GameCard key={card.id} card={card} disabled={game.status === 'checking'} onSelect={onSelectCard} />
      ))}
    </div>
  </motion.div>
);
