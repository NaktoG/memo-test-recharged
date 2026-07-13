import { motion } from 'motion/react';
import type { Dispatch, SetStateAction } from 'react';
import type { Category } from '../domain/entities/category';
import type { GameOptions } from '../domain/entities/game';
import type { Level } from '../domain/entities/level';
import { screenMotion } from './animations';

interface StartScreenProps {
  readonly categories: readonly Category[];
  readonly levels: readonly Level[];
  readonly options: GameOptions;
  readonly setOptions: Dispatch<SetStateAction<GameOptions>>;
  readonly startGame: (options?: GameOptions) => void;
}

export const StartScreen = ({ categories, levels, options, setOptions, startGame }: StartScreenProps) => {
  const selectedCategory = categories.find((category) => category.id === options.categoryId) ?? categories[0];

  return (
    <motion.div {...screenMotion} className="grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(20rem,1fr)]">
      <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur sm:p-7">
        <h2 className="text-2xl font-black text-white">Configura tu desafio</h2>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          Elige una categoria y una dificultad. La partida se genera desde reglas de dominio puras y sin mutar datos base.
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-1">
          <label className="grid gap-2 text-sm font-semibold text-slate-200">
            Categoria
            <select
              value={options.categoryId}
              onChange={(event) => setOptions((current) => ({ ...current, categoryId: event.target.value }))}
              className="min-h-12 rounded-2xl border border-white/10 bg-slate-950/80 px-4 text-white"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-semibold text-slate-200">
            Dificultad
            <select
              value={options.levelId}
              onChange={(event) => setOptions((current) => ({ ...current, levelId: event.target.value as GameOptions['levelId'] }))}
              className="min-h-12 rounded-2xl border border-white/10 bg-slate-950/80 px-4 text-white"
            >
              {levels.map((level) => (
                <option key={level.id} value={level.id}>{level.name} - {level.pairCount} pares</option>
              ))}
            </select>
          </label>
        </div>

        <motion.button
          type="button"
          onClick={() => startGame(options)}
          className="mt-7 min-h-14 w-full rounded-2xl bg-gradient-to-r from-cyan-300 via-indigo-300 to-fuchsia-300 px-5 py-4 text-base font-black text-slate-950 shadow-glow transition hover:brightness-110"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Iniciar partida
        </motion.button>
      </div>

      <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6 backdrop-blur">
        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-fuchsia-400/20 blur-3xl" />
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-cyan-200">Preview</p>
        <h3 className="mt-4 text-3xl font-black text-white">{selectedCategory?.name}</h3>
        <p className="mt-3 max-w-lg text-slate-300">{selectedCategory?.description}</p>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <motion.div
              key={index}
              className="aspect-square rounded-3xl border border-white/10 bg-gradient-to-br from-white/15 to-white/[0.03]"
              animate={{ y: [0, -8, 0] }}
              transition={{ delay: index * 0.08, duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};
