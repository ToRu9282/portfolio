import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [active, setActive] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const smoothX = useSpring(x, { stiffness: 380, damping: 34, mass: 0.4 });
  const smoothY = useSpring(y, { stiffness: 380, damping: 34, mass: 0.4 });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return;

    const move = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      document.documentElement.style.setProperty("--mouse-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${event.clientY}px`);
    };

    const enterInteractive = () => setActive(true);
    const leaveInteractive = () => setActive(false);

    window.addEventListener("pointermove", move);
    const interactiveElements = document.querySelectorAll("a, button, input, textarea, select, [data-cursor]");
    interactiveElements.forEach((element) => {
      element.addEventListener("pointerenter", enterInteractive);
      element.addEventListener("pointerleave", leaveInteractive);
    });

    return () => {
      window.removeEventListener("pointermove", move);
      interactiveElements.forEach((element) => {
        element.removeEventListener("pointerenter", enterInteractive);
        element.removeEventListener("pointerleave", leaveInteractive);
      });
    };
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9998] hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-flame/80 mix-blend-screen md:block"
      style={{ x: smoothX, y: smoothY }}
      animate={{
        scale: active ? 1.85 : 1,
        backgroundColor: active ? "rgba(255,61,18,0.12)" : "rgba(255,61,18,0)"
      }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-flame shadow-ember" />
    </motion.div>
  );
}
