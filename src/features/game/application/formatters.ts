export const formatTime = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export const formatNullableTime = (totalSeconds: number | null): string =>
  totalSeconds === null ? '--' : formatTime(totalSeconds);
