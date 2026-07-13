import type { GameState } from '../domain/entities/game';
import { formatTime } from '../application/formatters';

interface GameHeaderProps {
  readonly game: GameState | null;
}

export const GameHeader = ({ game }: GameHeaderProps) => (
  <header className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
    <div>
      <p className="mb-3 inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-100">
        Astro Memory Lab
      </p>
      <h1 className="max-w-3xl text-balance text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
        Memo Test <span className="bg-gradient-to-r from-cyan-200 via-indigo-200 to-fuchsia-200 bg-clip-text text-transparent">Recharged</span>
      </h1>
      <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-slate-300 sm:text-lg">
        Encuentra pares, vence al reloj y sube tus mejores marcas en una experiencia responsive, accesible y animada.
      </p>
    </div>

    {game ? (
      <dl className="grid grid-cols-3 gap-3 rounded-3xl border border-white/10 bg-white/5 p-3 text-center backdrop-blur">
        <div className="rounded-2xl bg-slate-950/60 p-3">
          <dt className="text-xs uppercase tracking-widest text-slate-400">Tiempo</dt>
          <dd className="mt-1 text-xl font-black text-cyan-100" aria-live="polite">{formatTime(game.remainingSeconds)}</dd>
        </div>
        <div className="rounded-2xl bg-slate-950/60 p-3">
          <dt className="text-xs uppercase tracking-widest text-slate-400">Movs</dt>
          <dd className="mt-1 text-xl font-black text-white">{game.moves}</dd>
        </div>
        <div className="rounded-2xl bg-slate-950/60 p-3">
          <dt className="text-xs uppercase tracking-widest text-slate-400">Errores</dt>
          <dd className="mt-1 text-xl font-black text-rose-200">{game.mistakes}</dd>
        </div>
      </dl>
    ) : null}
  </header>
);
