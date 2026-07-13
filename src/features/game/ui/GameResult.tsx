import { motion } from 'motion/react';
import type { GameState } from '../domain/entities/game';
import { formatTime } from '../application/formatters';
import { interpolate, type TranslationDictionary } from '../application/i18n';
import { screenMotion } from './animations';

interface GameResultProps {
  readonly game: GameState;
  readonly t: TranslationDictionary;
  readonly onPlayAgain: () => void;
  readonly onReset: () => void;
}

export const GameResult = ({ game, t, onPlayAgain, onReset }: GameResultProps) => {
  const won = game.status === 'won';

  return (
    <motion.section {...screenMotion} className="grid min-h-[24rem] place-items-center rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-6 text-center" aria-live="polite">
      <div className="max-w-xl">
        <p className={`text-sm font-black uppercase tracking-[0.35em] ${won ? 'text-emerald-200' : 'text-rose-200'}`}>
          {won ? t.victoryUnlocked : t.timeExpired}
        </p>
        <h2 className="mt-4 text-5xl font-black text-white sm:text-6xl">{won ? t.winner : t.gameOver}</h2>
        <p className="mt-4 text-slate-300">
          {won
            ? interpolate(t.wonSummary, { level: t.levels[game.level.id], time: formatTime(game.elapsedSeconds), moves: game.moves })
            : interpolate(t.lostSummary, { moves: game.moves })}
        </p>

        <dl className="mt-7 grid grid-cols-3 gap-3">
          <div className="rounded-2xl bg-slate-950/60 p-4">
            <dt className="text-xs uppercase text-slate-400">{t.score}</dt>
            <dd className="text-2xl font-black text-cyan-100">{game.score}</dd>
          </div>
          <div className="rounded-2xl bg-slate-950/60 p-4">
            <dt className="text-xs uppercase text-slate-400">{t.time}</dt>
            <dd className="text-2xl font-black text-white">{formatTime(game.elapsedSeconds)}</dd>
          </div>
          <div className="rounded-2xl bg-slate-950/60 p-4">
            <dt className="text-xs uppercase text-slate-400">{t.mistakes}</dt>
            <dd className="text-2xl font-black text-rose-100">{game.mistakes}</dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <motion.button type="button" onClick={onPlayAgain} className="min-h-12 rounded-2xl bg-cyan-300 px-6 font-black text-slate-950" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            {t.playAgain}
          </motion.button>
          <button type="button" onClick={onReset} className="min-h-12 rounded-2xl border border-white/10 bg-white/10 px-6 font-bold text-white hover:bg-white/15">
            {t.changeSettings}
          </button>
        </div>
      </div>
    </motion.section>
  );
};
