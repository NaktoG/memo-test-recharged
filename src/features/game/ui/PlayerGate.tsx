import { useState } from 'react';
import { motion } from 'motion/react';
import type { Locale, TranslationDictionary } from '../application/i18n';
import type { PlayerSettings } from '../application/usePlayerSettings';
import { isValidNickname } from '../application/usePlayerSettings';
import { screenMotion } from './animations';

interface PlayerGateProps {
  readonly settings: PlayerSettings;
  readonly t: TranslationDictionary;
  readonly onSubmit: (settings: PlayerSettings) => void;
}

export const PlayerGate = ({ settings, t, onSubmit }: PlayerGateProps) => {
  const [nickname, setNickname] = useState(settings.nickname);
  const [locale, setLocale] = useState<Locale>(settings.locale);
  const [soundEnabled, setSoundEnabled] = useState(settings.soundEnabled);
  const [submitted, setSubmitted] = useState(false);
  const showError = submitted && !isValidNickname(nickname);

  return (
    <motion.section
      {...screenMotion}
      className="mx-auto grid max-w-3xl gap-6 rounded-[2rem] border border-amber-200/10 bg-neutral-950/70 p-5 text-center shadow-glow backdrop-blur-xl sm:p-8"
      aria-labelledby="player-gate-title"
    >
      <div>
        <p className="mb-3 inline-flex rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-amber-100">
          {t.lab}
        </p>
        <h2 id="player-gate-title" className="text-4xl font-black text-white sm:text-5xl">
          {t.welcomeTitle}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-stone-300">{t.welcomeSubtitle}</p>
      </div>

      <form
        className="grid gap-5 text-left"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);

          if (isValidNickname(nickname)) {
            onSubmit({ nickname, locale, soundEnabled });
          }
        }}
      >
        <label className="grid gap-2 text-sm font-semibold text-stone-200">
          {t.nicknameLabel}
          <input
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
            maxLength={16}
            autoComplete="nickname"
            placeholder={t.nicknamePlaceholder}
            aria-invalid={showError}
            aria-describedby={showError ? 'nickname-error' : undefined}
            className="min-h-14 rounded-2xl border border-amber-200/10 bg-black/80 px-4 text-lg font-bold text-stone-50 shadow-inner outline-none placeholder:text-stone-500"
          />
          {showError ? <span id="nickname-error" className="text-sm text-orange-200">{t.nicknameError}</span> : null}
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-stone-200">
            {t.languageLabel}
            <select
              value={locale}
              onChange={(event) => setLocale(event.target.value as Locale)}
              className="min-h-12 rounded-2xl border border-amber-200/10 bg-black/80 px-4 text-stone-50"
            >
              <option value="es">Español</option>
              <option value="en">English</option>
            </select>
          </label>

          <label className="flex min-h-12 items-center justify-between gap-4 rounded-2xl border border-amber-200/10 bg-black/80 px-4 text-sm font-semibold text-stone-200">
            {t.soundLabel}
            <input
              type="checkbox"
              checked={soundEnabled}
              onChange={(event) => setSoundEnabled(event.target.checked)}
              className="h-5 w-5 accent-amber-300"
            />
          </label>
        </div>

        <motion.button
          type="submit"
          className="min-h-14 rounded-2xl bg-gradient-to-r from-amber-200 via-yellow-300 to-stone-200 px-5 py-4 text-base font-black text-black shadow-glow transition hover:brightness-110"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {t.enterGame}
        </motion.button>
      </form>
    </motion.section>
  );
};
