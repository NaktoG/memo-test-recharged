import { motion } from 'motion/react';
import type { GameCard as GameCardEntity } from '../domain/entities/card';
import { cardMotion } from './animations';

interface GameCardProps {
  readonly card: GameCardEntity;
  readonly disabled: boolean;
  readonly onSelect: (cardId: string) => void;
}

export const GameCard = ({ card, disabled, onSelect }: GameCardProps) => {
  const isRevealed = card.status === 'selected' || card.status === 'matched';

  return (
    <motion.button
      type="button"
      aria-label={isRevealed ? `Carta revelada: ${card.label}` : `Revelar carta ${card.label}`}
      disabled={disabled || card.status !== 'hidden'}
      onClick={() => onSelect(card.id)}
      className="group relative aspect-square min-h-20 rounded-[1.35rem] border border-white/10 bg-slate-950/60 p-2 shadow-lg outline-none [perspective:900px] disabled:cursor-not-allowed sm:rounded-[1.75rem]"
      initial={false}
      animate={cardMotion[card.status]}
      whileHover={card.status === 'hidden' ? { y: -4, scale: 1.02 } : undefined}
      whileTap={card.status === 'hidden' ? { scale: 0.96 } : undefined}
      transition={{ duration: 0.36, ease: 'easeOut' }}
    >
      <span className="absolute inset-0 rounded-[inherit] bg-gradient-to-br from-cyan-300/20 via-indigo-300/10 to-fuchsia-300/20 opacity-0 blur-xl transition group-hover:opacity-100" />
      <span className="relative flex h-full w-full items-center justify-center rounded-[inherit] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950">
        {isRevealed ? (
          <img src={card.imageSrc} alt="" className="h-[62%] w-[62%] object-contain drop-shadow-2xl" draggable={false} />
        ) : (
          <span className="grid h-full w-full place-items-center rounded-[inherit] bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.26),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.02))] text-2xl font-black text-cyan-100">
            ?
          </span>
        )}
      </span>
    </motion.button>
  );
};
