import { describe, expect, it } from 'vitest';
import { isValidNickname } from '../usePlayerSettings';

describe('player settings', () => {
  it('accepts simple nicknames within the allowed range', () => {
    expect(isValidNickname('Nico')).toBe(true);
    expect(isValidNickname('  Player One  ')).toBe(true);
  });

  it('rejects empty, tiny, or too long nicknames', () => {
    expect(isValidNickname('')).toBe(false);
    expect(isValidNickname('A')).toBe(false);
    expect(isValidNickname('this nickname is too long')).toBe(false);
  });
});
