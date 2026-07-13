import { AnimatePresence, motion } from 'motion/react';
import { useMemoryGame } from '../application/useMemoryGame';
import { GameBoard } from './GameBoard';
import { GameHeader } from './GameHeader';
import { GameResult } from './GameResult';
import { StartScreen } from './StartScreen';
import { StatsPanel } from './StatsPanel';

export default function GameApp() {
  const memoryGame = useMemoryGame();
  const { game, stats, resetStats } = memoryGame;

  return (
    <section className="relative isolate mx-auto flex min-h-[calc(100svh-5rem)] w-full max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
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
          <GameHeader game={game} />

          <AnimatePresence mode="wait">
            {!game ? (
              <StartScreen key="start" {...memoryGame} />
            ) : game.status === 'won' || game.status === 'lost' ? (
              <GameResult key="result" game={game} onPlayAgain={() => memoryGame.startGame(memoryGame.options)} onReset={memoryGame.resetGame} />
            ) : (
              <GameBoard key={game.id} game={game} onSelectCard={memoryGame.selectCard} />
            )}
          </AnimatePresence>
        </div>

        <StatsPanel stats={stats} activeLevel={game?.level.id ?? memoryGame.options.levelId} onResetStats={resetStats} />
      </div>
    </section>
  );
}
