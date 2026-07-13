export const screenMotion = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
  transition: { duration: 0.35, ease: 'easeOut' },
} as const;

export const cardMotion = {
  hidden: { rotateY: 0, scale: 1 },
  selected: { rotateY: 180, scale: 1.04 },
  matched: { opacity: 0, scale: 0.72, rotate: 8 },
} as const;
