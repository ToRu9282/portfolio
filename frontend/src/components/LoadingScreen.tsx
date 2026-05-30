import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const words = ["дизайн", "сайты", "лендинги", "боты"];

type LoadingScreenProps = {
  onComplete: () => void;
};

function useCountUp(duration: number, onComplete: () => void) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame = 0;
    const startedAt = performance.now();

    const tick = (time: number) => {
      const progress = Math.min((time - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * 100));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
        return;
      }

      window.setTimeout(onComplete, 900);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [duration, onComplete]);

  return count;
}

function Corner({ className }: { className: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scaleX: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleX: 1, scaleY: 1 }}
      transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
    />
  );
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const count = useCountUp(1300, onComplete);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-void text-text"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <svg
          className="-rotate-90"
          width="clamp(260px,40vw,500px)"
          height="clamp(260px,40vw,500px)"
          viewBox="0 0 100 100"
        >
          <motion.circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="rgba(255,61,18,0.08)"
            strokeWidth="0.3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="rgba(255,61,18,0.15)"
            strokeWidth="0.3"
            strokeDasharray="1 3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.5, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="rgba(255,61,18,0.06)"
            strokeWidth="0.2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.7, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
      </motion.div>

      <Corner className="absolute left-6 top-6 h-8 w-px origin-bottom bg-red-500/25 sm:left-10 sm:h-12" />
      <Corner className="absolute left-6 top-6 h-px w-8 origin-right bg-red-500/25 sm:w-12" />
      <Corner className="absolute right-6 top-6 h-8 w-px origin-bottom bg-red-500/25 sm:right-10 sm:h-12" />
      <Corner className="absolute right-6 top-6 h-px w-8 origin-left bg-red-500/25 sm:w-12" />
      <Corner className="absolute bottom-6 left-6 h-8 w-px origin-top bg-red-500/25 sm:bottom-10 sm:h-12" />
      <Corner className="absolute bottom-6 left-6 h-px w-8 origin-right bg-red-500/25 sm:w-12" />
      <Corner className="absolute bottom-6 right-6 h-8 w-px origin-top bg-red-500/25 sm:bottom-10 sm:h-12" />
      <Corner className="absolute bottom-6 right-6 h-px w-8 origin-left bg-red-500/25 sm:w-12" />

      <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 flex-col items-center gap-16 px-6">
        <div className="flex flex-wrap justify-center gap-x-16 gap-y-4">
          {words.map((word, wordIdx) => (
            <span key={word} className="inline-flex">
              {word.split("").map((char, charIdx) => (
                <motion.span
                  key={`${word}-${charIdx}`}
                  className="font-['Montserrat_Thin'] text-[clamp(2.2rem,6vw,5rem)] font-thin tracking-[0.08em] text-white/85"
                  initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    delay: 0.3 + wordIdx * 0.2 + charIdx * 0.03,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </div>

        <motion.div
          className="flex flex-col items-center gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="relative h-[1px] w-[min(48vw,240px)] min-w-[140px] overflow-hidden bg-red-800/20">
            <motion.div
              className="absolute inset-0 origin-left"
              style={{
                scaleX: count / 100,
                background: "linear-gradient(90deg, transparent, #ff3d12, #ff3d12, #ff3d12, transparent)",
              }}
            />
            <motion.div
              className="absolute inset-0 origin-left opacity-50"
              style={{
                scaleX: count / 100,
                background: "linear-gradient(90deg, transparent, #ff3d12, transparent)",
                filter: "blur(3px)",
              }}
            />
          </div>
          <motion.p
            className="chrome-text text-[0.5rem] tracking-[0.25em] text-white/15"
            animate={{ opacity: [0.1, 0.35, 0.1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            {String(count).padStart(3, "0")}
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}
