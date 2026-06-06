import { memo, useCallback, useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { CustomCursor } from "../components/CustomCursor";
import { Header } from "../components/Header";
import { LoadingScreen } from "../components/LoadingScreen";
import { HeroSection } from "./sections/HeroSection";
import { AboutSection, FaqSection, PricingSection, ProblemSection, ProcessSection, ServicesSection } from "./sections/MarketingSections";
import { ProjectStack } from "../features/projects/ProjectStack";
import { ContactSection } from "./sections/ContactSection";
import { Footer } from "./sections/Footer";
import { LegalPage } from "./legal/LegalPage";
import { applyTheme, getInitialTheme, nextTheme, type ThemeMode } from "../lib/theme";

type ThemeBurst = {
  id: number;
  x: number;
  y: number;
  radius: number;
  color: string;
  glow: string;
};

const THEME_REVEAL_COMMIT_MS = 320;
const THEME_REVEAL_TOTAL_MS = 940;

const MarketingExperience = memo(function MarketingExperience() {
  return (
    <>
      <main className="relative overflow-x-clip bg-void">
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <ProblemSection />
        <ProjectStack />
        <ProcessSection />
        <PricingSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
});

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);
  const [themeBurst, setThemeBurst] = useState<ThemeBurst | null>(null);
  const fallbackTimers = useRef<number[]>([]);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  const completeLoading = useCallback(() => setIsLoading(false), []);
  const pathname = typeof window === "undefined" ? "/" : window.location.pathname;
  const legalType = pathname === "/offer" ? "offer" : pathname === "/privacy" ? "privacy" : null;

  useLayoutEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    return () => {
      fallbackTimers.current.forEach(window.clearTimeout);
      document.documentElement.classList.remove("theme-revealing");
    };
  }, []);

  const commitTheme = useCallback((next: ThemeMode) => {
    applyTheme(next);
    setTheme(next);
  }, []);

  const toggleTheme = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const next = nextTheme(theme);
      const rect = event.currentTarget.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );
      const root = document.documentElement;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      fallbackTimers.current.forEach(window.clearTimeout);
      fallbackTimers.current = [];
      root.classList.remove("theme-revealing");

      if (reducedMotion) {
        commitTheme(next);
        return;
      }

      root.classList.add("theme-revealing");
      setThemeBurst({
        id: Date.now(),
        x,
        y,
        radius: Math.ceil(radius + 48),
        color: next === "light" ? "#f7f8fb" : "#060606",
        glow: next === "light" ? "rgba(239, 59, 19, 0.18)" : "rgba(255, 61, 18, 0.28)"
      });

      fallbackTimers.current = [
        window.setTimeout(() => commitTheme(next), THEME_REVEAL_COMMIT_MS),
        window.setTimeout(() => {
          root.classList.remove("theme-revealing");
          setThemeBurst(null);
        }, THEME_REVEAL_TOTAL_MS)
      ];
    },
    [commitTheme, theme]
  );

  const themeBurstOverlay = themeBurst ? (
    <>
      <motion.div
        key={`${themeBurst.id}-veil`}
        aria-hidden
        className="theme-veil pointer-events-none fixed inset-0 z-[10001]"
        style={{ backgroundColor: themeBurst.color }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.26, 0.18, 0] }}
        transition={{ duration: THEME_REVEAL_TOTAL_MS / 1000, times: [0, 0.24, 0.62, 1], ease: [0.22, 0.61, 0.36, 1] }}
      />
      <motion.div
        key={`${themeBurst.id}-burst`}
        aria-hidden
        className="theme-burst pointer-events-none fixed inset-0 z-[10002]"
        style={{
          backgroundColor: themeBurst.color,
          boxShadow: `0 0 42px ${themeBurst.glow}`
        }}
        initial={{ clipPath: `circle(0px at ${themeBurst.x}px ${themeBurst.y}px)`, opacity: 1 }}
        animate={{ clipPath: `circle(${themeBurst.radius}px at ${themeBurst.x}px ${themeBurst.y}px)`, opacity: [1, 1, 0] }}
        transition={{
          clipPath: { duration: 0.72, ease: [0.25, 0.1, 0.25, 1] },
          opacity: { duration: THEME_REVEAL_TOTAL_MS / 1000, times: [0, 0.72, 1], ease: [0.22, 0.61, 0.36, 1] }
        }}
      />
    </>
  ) : null;

  if (legalType) {
    return (
      <>
        <CustomCursor />
        <motion.div
          className="fixed left-0 right-0 top-0 z-[9997] h-[3px] origin-left bg-flame shadow-ember"
          style={{ scaleX: progress }}
        />
        <LegalPage type={legalType} theme={theme} onThemeToggle={toggleTheme} />
        {themeBurstOverlay}
      </>
    );
  }

  return (
    <>
      <AnimatePresence>{isLoading ? <LoadingScreen onComplete={completeLoading} /> : null}</AnimatePresence>
      {!isLoading && <CustomCursor />}
      <motion.div
        className="fixed left-0 right-0 top-0 z-[9997] h-[3px] origin-left bg-flame shadow-ember"
        style={{ scaleX: progress }}
      />
      <Header theme={theme} onThemeToggle={toggleTheme} />
      <MarketingExperience />
      {themeBurstOverlay}
    </>
  );
}
