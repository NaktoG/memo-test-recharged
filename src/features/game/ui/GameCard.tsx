import { motion } from 'motion/react';
import type { TranslationDictionary } from '../application/i18n';
import type { GameCard as GameCardEntity } from '../domain/entities/card';

interface GameCardProps {
  readonly card: GameCardEntity;
  readonly t: TranslationDictionary;
  readonly disabled: boolean;
  readonly onSelect: (cardId: string) => void;
}

export const GameCard = ({ card, t, disabled, onSelect }: GameCardProps) => {
  const isRevealed = card.status === 'selected' || card.status === 'matched';

  return (
    <motion.button
      type="button"
      aria-label={isRevealed ? `${t.revealedCard}: ${card.label}` : `${t.revealCard}: ${card.label}`}
      disabled={disabled || card.status !== 'hidden'}
      onClick={() => onSelect(card.id)}
      className="group relative aspect-square min-h-20 rounded-[1.35rem] border border-white/10 bg-slate-950/60 p-2 shadow-lg outline-none [perspective:900px] disabled:cursor-not-allowed sm:rounded-[1.75rem]"
      initial={false}
      animate={{ opacity: card.status === 'matched' ? 0 : 1, scale: card.status === 'matched' ? 0.72 : 1 }}
      whileHover={card.status === 'hidden' ? { y: -4, scale: 1.02 } : undefined}
      whileTap={card.status === 'hidden' ? { scale: 0.96 } : undefined}
      transition={{ duration: 0.28, ease: 'easeOut' }}
    >
      <span className="absolute inset-0 rounded-[inherit] bg-gradient-to-br from-cyan-300/20 via-indigo-300/10 to-fuchsia-300/20 opacity-0 blur-xl transition group-hover:opacity-100" />
      <motion.span
        className="relative block h-full w-full rounded-[inherit] [transform-style:preserve-3d]"
        animate={{ rotateY: isRevealed ? 180 : 0 }}
        transition={{ duration: 0.42, ease: 'easeInOut' }}
      >
        <span className="absolute inset-0 grid place-items-center rounded-[inherit] border border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.26),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.02))] text-2xl font-black text-cyan-100 [backface-visibility:hidden]">
          ?
        </span>
        <span className="absolute inset-0 flex items-center justify-center rounded-[inherit] border border-cyan-200/20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <img src={card.imageSrc} alt="" className="h-[62%] w-[62%] object-contain drop-shadow-2xl" draggable={false} />
        </span>
      </motion.span>
    </motion.button>
  );
};
