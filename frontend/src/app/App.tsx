import { useCallback, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { CustomCursor } from "../components/CustomCursor";
import { Header } from "../components/Header";
import { LoadingScreen } from "../components/LoadingScreen";
import { HeroSection } from "./sections/HeroSection";
import { FaqSection, PricingSection, ProblemSection, ProcessSection, ServicesSection } from "./sections/MarketingSections";
import { ProjectStack } from "../features/projects/ProjectStack";
import { ContactSection } from "./sections/ContactSection";
import { Footer } from "./sections/Footer";

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  const completeLoading = useCallback(() => setIsLoading(false), []);

  return (
    <>
      <AnimatePresence>{isLoading ? <LoadingScreen onComplete={completeLoading} /> : null}</AnimatePresence>
      <CustomCursor />
      <motion.div
        className="fixed left-0 right-0 top-0 z-[9997] h-[3px] origin-left bg-flame shadow-ember"
        style={{ scaleX: progress }}
      />
      <Header />
      <main className="relative overflow-x-clip bg-void">
        <HeroSection />
        <ServicesSection />
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
}
