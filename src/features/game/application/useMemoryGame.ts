import { useCallback, useEffect, useRef, useState } from 'react';
import { categories } from '../data/categories';
import { levels } from '../data/levels';
import type { GameOptions, GameState } from '../domain/entities/game';
import { gameEngine } from '../domain/services/gameEngine';
import { useGameStats } from './useGameStats';

const resolveDelayMs = 720;

const defaultOptions: GameOptions = {
  categoryId: categories[0]?.id ?? 'languages',
  levelId: levels[0]?.id ?? 'easy',
};

export const useMemoryGame = () => {
  const [options, setOptions] = useState<GameOptions>(defaultOptions);
  const [game, setGame] = useState<GameState | null>(null);
  const recordedGameIdRef = useRef<string | null>(null);
  const { stats, recordResult, resetStats } = useGameStats();
  const gameStatus = game?.status;
  const selectedCardKey = game?.selectedCardIds.join('|');

  const startGame = useCallback((nextOptions: GameOptions = options) => {
    recordedGameIdRef.current = null;
    setOptions(nextOptions);
    setGame(gameEngine.create(nextOptions));
  }, [options]);

  const selectCard = useCallback((cardId: string) => {
    setGame((current) => (current ? gameEngine.selectCard(current, cardId) : current));
  }, []);

  const resetGame = useCallback(() => {
    setGame(null);
    recordedGameIdRef.current = null;
  }, []);

  useEffect(() => {
    if (gameStatus !== 'playing' && gameStatus !== 'checking') {
      return undefined;
    }

    const timerId = window.setInterval(() => {
      setGame((current) => (current ? gameEngine.tick(current) : current));
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [gameStatus]);

  useEffect(() => {
    if (gameStatus !== 'checking') {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setGame((current) => (current ? gameEngine.resolveTurn(current) : current));
    }, resolveDelayMs);

    return () => window.clearTimeout(timeoutId);
  }, [gameStatus, selectedCardKey]);

  useEffect(() => {
    if (!game || (game.status !== 'won' && game.status !== 'lost')) {
      return;
    }

    if (recordedGameIdRef.current === game.id) {
      return;
    }

    recordedGameIdRef.current = game.id;
    recordResult(game);
  }, [game, recordResult]);

  return {
    categories,
    levels,
    options,
    game,
    stats,
    setOptions,
    startGame,
    selectCard,
    resetGame,
    resetStats,
  };
};
