import type { MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import type { ThemeMode } from "../lib/theme";
import { cn } from "../lib/cn";

type ThemeToggleProps = {
  theme: ThemeMode;
  onToggle: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
};

export function ThemeToggle({ theme, onToggle, className }: ThemeToggleProps) {
  const isLight = theme === "light";

  return (
    <button
      type="button"
      className={cn("theme-toggle grid h-10 w-10 shrink-0 place-items-center rounded-full", className)}
      aria-label={isLight ? "Включить темную тему" : "Включить светлую тему"}
      title={isLight ? "Темная тема" : "Светлая тема"}
      onClick={onToggle}
      data-cursor
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          className="grid place-items-center"
          initial={{ rotate: isLight ? -70 : 70, scale: 0.72, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: isLight ? 70 : -70, scale: 0.72, opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.22, 0.61, 0.36, 1] }}
        >
          {isLight ? <Sun size={17} strokeWidth={1.7} /> : <Moon size={17} strokeWidth={1.7} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
