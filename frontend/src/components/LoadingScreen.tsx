import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const words = ["Структура", "Дизайн", "Код", "Заявки"];

type LoadingScreenProps = {
  onComplete: () => void;
};

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    let frame = 0;
    const startedAt = performance.now();
    const duration = 1250;

    const tick = (time: number) => {
      const progress = Math.min((time - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * 100));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
        return;
      }

      window.setTimeout(onComplete, 180);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onComplete]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setWordIndex((index) => (index + 1) % words.length);
    }, 520);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] overflow-hidden bg-void text-text"
      exit={{ opacity: 0, scale: 1.03, filter: "blur(10px)" }}
      transition={{ duration: 0.46, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="noise-layer" />
      <div className="grid-layer absolute inset-0 opacity-50" />
      <div className="scan-line" />

      <div className="absolute left-6 top-6 text-xs text-muted sm:left-10 sm:top-8">
        <span className="chrome-text">Запуск портфолио</span>
      </div>

      <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 flex-col items-center gap-6 px-6 text-center">
        <div className="h-[clamp(52px,9vw,110px)] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={words[wordIndex]}
              className="display-text metal-text text-[clamp(3rem,9vw,8rem)] leading-[1.1]"
              initial={{ y: 60, opacity: 0, filter: "blur(12px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -60, opacity: 0, filter: "blur(12px)" }}
              transition={{ duration: 0.42, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {words[wordIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="h-px w-[min(64vw,360px)] min-w-[180px] bg-white/10">
          <motion.div
            className="h-full origin-left bg-flame shadow-ember"
            style={{ scaleX: count / 100 }}
          />
        </div>
      </div>

      <div className="absolute bottom-6 right-6 text-right sm:bottom-10 sm:right-10">
        <p className="chrome-text text-xs text-muted">Загрузка</p>
        <p className="font-mono text-[clamp(3.5rem,11vw,10rem)] leading-none text-white/[0.78]">
          {String(count).padStart(3, "0")}
        </p>
      </div>
    </motion.div>
  );
}
