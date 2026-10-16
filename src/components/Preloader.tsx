import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Check if skip requested in query param
    if (new URLSearchParams(window.location.search).has('skipPreloader')) {
      onComplete();
      return;
    }

    const duration = 1200; // 1.2s smooth load
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(eased * 100);

      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setIsFinished(true);
        setTimeout(onComplete, 500);
      }
    };

    const animId = requestAnimationFrame(updateCounter);
    
    // Safety fallback
    const fallbackTimer = setTimeout(() => {
      setIsFinished(true);
      onComplete();
    }, 1800);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(fallbackTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a] text-white select-none"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <div className="flex flex-col items-center gap-6">
            {/* Monogram / Initials */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative flex items-center justify-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/5 font-clash text-2xl font-bold tracking-tight text-white md:h-20 md:w-20 md:text-3xl">
                IB
              </div>
            </motion.div>

            {/* Discipline Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center gap-2"
            >
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-[#888888]">
                Robotics
              </span>
              <span className="text-[#0066ff] font-sans text-xs">•</span>
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-[#888888]">
                Embedded
              </span>
              <span className="text-[#0066ff] font-sans text-xs">•</span>
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-[#888888]">
                SDR
              </span>
            </motion.div>

            {/* Progress line and Counter */}
            <div className="flex items-center gap-4">
              <div className="relative h-[2px] w-40 overflow-hidden bg-[#222222] md:w-56">
                <motion.div
                  className="absolute inset-0 origin-left bg-[#0066ff]"
                  style={{ transform: `scaleX(${count / 100})` }}
                />
              </div>
              <span className="font-mono text-xs tabular-nums tracking-widest text-[#999999]">
                {count.toString().padStart(3, '0')}
              </span>
            </div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-2"
            >
              <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#666666]">
                Kochi, India
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
