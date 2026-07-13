import { motion } from 'motion/react';
import type { TranslationDictionary } from '../application/i18n';
import type { GameState } from '../domain/entities/game';
import { screenMotion } from './animations';
import { GameCard } from './GameCard';

interface GameBoardProps {
  readonly game: GameState;
  readonly t: TranslationDictionary;
  readonly onSelectCard: (cardId: string) => void;
}

export const GameBoard = ({ game, t, onSelectCard }: GameBoardProps) => (
  <motion.div {...screenMotion}>
    <div className="mb-5 flex flex-wrap items-center gap-3 text-sm text-stone-300">
      <span className="rounded-full bg-amber-200/10 px-3 py-1">{t.categories[game.category.id]?.name ?? game.category.name}</span>
      <span className="rounded-full bg-amber-200/10 px-3 py-1">{t.levels[game.level.id]}</span>
      <span className="rounded-full bg-amber-200/10 px-3 py-1">{game.cards.length / 2} {t.pairs}</span>
    </div>

    <div className="grid grid-cols-[repeat(auto-fit,minmax(clamp(4.7rem,18vw,8rem),1fr))] gap-3 sm:gap-4">
      {game.cards.map((card) => (
        <GameCard key={card.id} card={card} t={t} disabled={game.status === 'checking'} onSelect={onSelectCard} />
      ))}
    </div>
  </motion.div>
);
