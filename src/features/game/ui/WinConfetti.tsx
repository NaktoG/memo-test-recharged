import { motion } from 'motion/react';

const colors = ['#d8aa3d', '#f2cf74', '#a8915f', '#fafaf9', '#78716c', '#d08770'] as const;

export const WinConfetti = () => (
  <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
    {Array.from({ length: 70 }).map((_, index) => {
      const left = `${(index * 37) % 100}%`;
      const color = colors[index % colors.length];
      const rotate = (index * 47) % 360;
      const delay = (index % 14) * 0.035;

      return (
        <motion.span
          key={index}
          className="absolute top-[-1rem] h-3 w-2 rounded-[0.2rem]"
          style={{ left, backgroundColor: color }}
          initial={{ y: -40, rotate, opacity: 0 }}
          animate={{ y: '105vh', rotate: rotate + 540, opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.7, delay, ease: 'easeOut' }}
        />
      );
    })}
  </div>
);
