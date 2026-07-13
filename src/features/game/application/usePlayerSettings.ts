import { useCallback, useEffect, useState } from 'react';
import type { Locale } from './i18n';

const STORAGE_KEY = 'memo-test.player.v1';

export interface PlayerSettings {
  readonly nickname: string;
  readonly locale: Locale;
  readonly soundEnabled: boolean;
}

const defaultSettings: PlayerSettings = {
  nickname: '',
  locale: 'es',
  soundEnabled: true,
};

const normalizeNickname = (nickname: string): string => nickname.trim().replace(/\s+/g, ' ').slice(0, 16);

export const isValidNickname = (nickname: string): boolean => {
  const normalized = nickname.trim().replace(/\s+/g, ' ');
  return normalized.length >= 2 && normalized.length <= 16;
};

const readSettings = (): PlayerSettings => {
  const raw = globalThis.localStorage?.getItem(STORAGE_KEY);

  if (!raw) {
    return defaultSettings;
  }

  try {
    return { ...defaultSettings, ...JSON.parse(raw) } as PlayerSettings;
  } catch {
    return defaultSettings;
  }
};

const writeSettings = (settings: PlayerSettings): void => {
  globalThis.localStorage?.setItem(STORAGE_KEY, JSON.stringify(settings));
};

export const usePlayerSettings = () => {
  const [settings, setSettings] = useState<PlayerSettings>(defaultSettings);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setSettings(readSettings());
    setIsReady(true);
  }, []);

  const updateSettings = useCallback((nextSettings: PlayerSettings) => {
    const normalized = { ...nextSettings, nickname: normalizeNickname(nextSettings.nickname) };
    setSettings(normalized);
    writeSettings(normalized);
  }, []);

  const clearPlayer = useCallback(() => {
    globalThis.localStorage?.removeItem(STORAGE_KEY);
    setSettings(defaultSettings);
  }, []);

  return { settings, isReady, updateSettings, clearPlayer };
};
