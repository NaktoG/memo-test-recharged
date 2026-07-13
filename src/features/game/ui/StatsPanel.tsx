import type { GameStats } from '../domain/entities/stats';
import type { LevelId } from '../domain/entities/level';
import { formatNullableTime, formatTime } from '../application/formatters';
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
    <aside className="rounded-[2rem] border border-amber-200/10 bg-neutral-950/65 p-5 shadow-glow backdrop-blur-xl lg:sticky lg:top-6 lg:self-start">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-amber-200">{t.stats}</p>
          <h2 className="mt-2 text-2xl font-black text-white">{t.progress}</h2>
        </div>
        <button type="button" onClick={onResetStats} className="min-h-10 rounded-full border border-amber-200/10 px-4 text-xs font-bold text-stone-200 hover:bg-amber-200/10">
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

      <div className="mt-5 rounded-3xl border border-amber-300/20 bg-amber-300/10 p-4">
        <p className="text-sm font-bold text-amber-100">{t.activeBest}</p>
        <dl className="mt-4 grid grid-cols-2 gap-3">
          <Stat label={t.time} value={formatNullableTime(best.bestTimeSeconds)} compact />
          <Stat label={t.bestScore} value={best.bestScore} compact />
        </dl>
      </div>

      <section className="mt-5 rounded-3xl border border-amber-200/10 bg-black/35 p-4" aria-labelledby="local-ranking-title">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 id="local-ranking-title" className="text-sm font-black uppercase tracking-[0.22em] text-amber-100">
              {t.ranking}
            </h3>
            <p className="mt-1 text-xs text-stone-400">{t.rankingSubtitle}</p>
          </div>
          <span className="rounded-full bg-amber-200/10 px-2.5 py-1 text-xs font-black text-amber-100">Top 10</span>
        </div>

        {stats.leaderboard.length === 0 ? (
          <p className="mt-4 rounded-2xl bg-stone-900/55 p-4 text-sm text-stone-300">{t.noRanking}</p>
        ) : (
          <ol className="mt-4 grid gap-2">
            {stats.leaderboard.map((entry, index) => (
              <li key={entry.id} className="grid grid-cols-[2rem_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl bg-stone-900/55 p-3">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-amber-200 text-sm font-black text-black">{index + 1}</span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-black text-stone-50" title={entry.playerName}>{entry.playerName}</p>
                  <p className="text-xs text-stone-400">{t.levels[entry.levelId]} · {formatTime(entry.elapsedSeconds)} · {entry.moves} {t.moves}</p>
                </div>
                <span className="text-right text-sm font-black text-amber-100">{entry.score}</span>
              </li>
            ))}
          </ol>
        )}
      </section>
    </aside>
  );
};

interface StatProps {
  readonly label: string;
  readonly value: string | number;
  readonly compact?: boolean;
}

const Stat = ({ label, value, compact = false }: StatProps) => (
  <div className={`rounded-2xl bg-stone-900/55 ${compact ? 'p-3' : 'p-4'}`}>
    <dt className="text-xs uppercase tracking-wider text-stone-400">{label}</dt>
    <dd className="mt-1 text-2xl font-black text-stone-50">{value}</dd>
  </div>
);
