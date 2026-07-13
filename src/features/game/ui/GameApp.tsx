import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { dictionaries } from '../application/i18n';
import { usePlayerSettings } from '../application/usePlayerSettings';
import { useMemoryGame } from '../application/useMemoryGame';
import { useSoundEffects } from '../application/useSoundEffects';
import { GameBoard } from './GameBoard';
import { GameHeader } from './GameHeader';
import { GameResult } from './GameResult';
import { PlayerGate } from './PlayerGate';
import { StartScreen } from './StartScreen';
import { StatsPanel } from './StatsPanel';
import { WinConfetti } from './WinConfetti';

export default function GameApp() {
  const memoryGame = useMemoryGame();
  const { game, stats, resetStats } = memoryGame;
  const { settings, isReady, updateSettings, clearPlayer } = usePlayerSettings();
  const t = dictionaries[settings.locale];
  const playSound = useSoundEffects(settings.soundEnabled);
  const previousStatusRef = useRef(game?.status);
  const matchedCountRef = useRef(0);
  const selectedCardKey = game?.selectedCardIds.join('|') ?? '';
  const matchedCount = game?.cards.filter((card) => card.status === 'matched').length ?? 0;

  useEffect(() => {
    if (selectedCardKey) {
      playSound('flip');
    }
  }, [playSound, selectedCardKey]);

  useEffect(() => {
    if (matchedCount > matchedCountRef.current && game?.status !== 'won') {
      playSound('match');
    }

    matchedCountRef.current = matchedCount;
  }, [game?.status, matchedCount, playSound]);

  useEffect(() => {
    const previousStatus = previousStatusRef.current;
    previousStatusRef.current = game?.status;

    if (previousStatus === game?.status) {
      return;
    }

    if (game?.status === 'won') {
      playSound('win');
    }

    if (game?.status === 'lost') {
      playSound('lose');
    }
  }, [game?.status, playSound]);

  if (!isReady) {
    return null;
  }

  return (
    <section className="relative isolate mx-auto flex min-h-[calc(100svh-5rem)] w-full max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
      {game?.status === 'won' ? <WinConfetti /> : null}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          aria-hidden="true"
          className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl sm:h-[28rem] sm:w-[28rem]"
          animate={{ scale: [1, 1.12, 1], opacity: [0.45, 0.8, 0.45] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="grid flex-1 gap-5 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="min-w-0 rounded-[2rem] border border-white/10 bg-slate-950/45 p-4 shadow-glow backdrop-blur-xl sm:p-6 lg:p-8">
          <GameHeader game={game} playerName={settings.nickname} t={t} />

          <AnimatePresence mode="wait">
            {!settings.nickname ? (
              <PlayerGate key="player" settings={settings} t={t} onSubmit={updateSettings} />
            ) : !game ? (
              <StartScreen key="start" {...memoryGame} settings={settings} t={t} onUpdateSettings={updateSettings} onClearPlayer={clearPlayer} />
            ) : game.status === 'won' || game.status === 'lost' ? (
              <GameResult key="result" game={game} t={t} onPlayAgain={() => memoryGame.startGame(memoryGame.options)} onReset={memoryGame.resetGame} />
            ) : (
              <GameBoard key={game.id} game={game} t={t} onSelectCard={memoryGame.selectCard} />
            )}
          </AnimatePresence>
        </div>

        <StatsPanel stats={stats} activeLevel={game?.level.id ?? memoryGame.options.levelId} t={t} onResetStats={resetStats} />
      </div>
    </section>
  );
}
