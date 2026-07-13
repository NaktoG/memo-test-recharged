import type { GameStats } from '../domain/entities/stats';
import type { LevelId } from '../domain/entities/level';
import { formatNullableTime } from '../application/formatters';
import type { TranslationDictionary } from '../application/i18n';

interface StatsPanelProps {
  readonly stats: GameStats;
  readonly activeLevel: LevelId;
  readonly t: TranslationDictionary;
  readonly onResetStats: () => void;
}

export const StatsPanel = ({ stats, activeLevel, t, onResetStats }: StatsPanelProps) => {
  const best = stats.bestByLevel[activeLevel];
  const winRate = stats.gamesPlayed === 0 ? 0 : Math.round((stats.gamesWon / stats.gamesPlayed) * 100);

  return (
    <aside className="rounded-[2rem] border border-white/10 bg-slate-950/45 p-5 shadow-glow backdrop-blur-xl lg:sticky lg:top-6 lg:self-start">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-fuchsia-200">{t.stats}</p>
          <h2 className="mt-2 text-2xl font-black text-white">{t.progress}</h2>
        </div>
        <button type="button" onClick={onResetStats} className="min-h-10 rounded-full border border-white/10 px-4 text-xs font-bold text-slate-200 hover:bg-white/10">
          {t.reset}
        </button>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-3">
        <Stat label={t.played} value={stats.gamesPlayed} />
        <Stat label={t.winRate} value={`${winRate}%`} />
        <Stat label={t.won} value={stats.gamesWon} />
        <Stat label={t.lost} value={stats.gamesLost} />
        <Stat label={t.streak} value={stats.currentStreak} />
        <Stat label={t.bestStreak} value={stats.bestStreak} />
      </dl>

      <div className="mt-5 rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-4">
        <p className="text-sm font-bold text-cyan-100">{t.activeBest}</p>
        <dl className="mt-4 grid grid-cols-2 gap-3">
          <Stat label={t.time} value={formatNullableTime(best.bestTimeSeconds)} compact />
          <Stat label={t.bestScore} value={best.bestScore} compact />
        </dl>
      </div>
    </aside>
  );
};

interface StatProps {
  readonly label: string;
  readonly value: string | number;
  readonly compact?: boolean;
}

const Stat = ({ label, value, compact = false }: StatProps) => (
  <div className={`rounded-2xl bg-white/[0.06] ${compact ? 'p-3' : 'p-4'}`}>
    <dt className="text-xs uppercase tracking-wider text-slate-400">{label}</dt>
    <dd className="mt-1 text-2xl font-black text-white">{value}</dd>
  </div>
);
