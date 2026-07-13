import { useCallback, useEffect, useState } from 'react';
import type { GameState } from '../domain/entities/game';
import type { GameStats } from '../domain/entities/stats';
import { applyGameResult, clearStats, createInitialStats, readStats, writeStats } from '../domain/services/statsStorage';

export const useGameStats = () => {
  const [stats, setStats] = useState<GameStats>(() => createInitialStats());

  useEffect(() => {
    setStats(readStats());
  }, []);

  const recordResult = useCallback((game: GameState, playerName: string) => {
    setStats((current) => {
      const next = applyGameResult(current, game, playerName);
      writeStats(next);
      return next;
    });
  }, []);

  const resetStats = useCallback(() => {
    setStats(clearStats());
  }, []);

  return { stats, recordResult, resetStats };
};
