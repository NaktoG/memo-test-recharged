import type { GameState } from '../domain/entities/game';
import { formatTime } from '../application/formatters';
import type { TranslationDictionary } from '../application/i18n';

interface GameHeaderProps {
  readonly game: GameState | null;
  readonly playerName: string;
  readonly t: TranslationDictionary;
}

export const GameHeader = ({ game, playerName, t }: GameHeaderProps) => (
  <header className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
    <div>
      <p className="mb-3 inline-flex rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-amber-100">
        {t.lab}
      </p>
      <h1 className="max-w-3xl text-balance text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
        {t.title} <span className="bg-gradient-to-r from-amber-100 via-yellow-200 to-stone-300 bg-clip-text text-transparent">Recharged</span>
      </h1>
      <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-stone-300 sm:text-lg">
        {t.subtitle}
      </p>
      {playerName ? <p className="mt-3 text-sm font-bold text-amber-100">{t.greeting}: {playerName}</p> : null}
    </div>

    {game ? (
      <dl className="grid grid-cols-3 gap-3 rounded-3xl border border-amber-200/10 bg-stone-900/35 p-3 text-center backdrop-blur">
        <div className="rounded-2xl bg-black/55 p-3">
          <dt className="text-xs uppercase tracking-widest text-stone-400">{t.time}</dt>
          <dd className="mt-1 text-xl font-black text-amber-100" aria-live="polite">{formatTime(game.remainingSeconds)}</dd>
        </div>
        <div className="rounded-2xl bg-black/55 p-3">
          <dt className="text-xs uppercase tracking-widest text-stone-400">{t.moves}</dt>
          <dd className="mt-1 text-xl font-black text-stone-50">{game.moves}</dd>
        </div>
        <div className="rounded-2xl bg-black/55 p-3">
          <dt className="text-xs uppercase tracking-widest text-stone-400">{t.mistakes}</dt>
          <dd className="mt-1 text-xl font-black text-orange-200">{game.mistakes}</dd>
        </div>
      </dl>
    ) : null}
  </header>
);
