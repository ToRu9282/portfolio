import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

const interactiveSelector = 'a, button, input, textarea, select, [data-cursor]';

export function CustomCursor() {
  const [active, setActive] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const activeRef = useRef(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return;

    const halfSize = 20;

    const move = (event: PointerEvent) => {
      x.set(event.clientX - halfSize);
      y.set(event.clientY - halfSize);
      document.documentElement.style.setProperty("--mouse-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${event.clientY}px`);
    };

    const updateHover = (event: MouseEvent) => {
      const target = event.target as Element;
      const isInteractive = !!target.closest(interactiveSelector);
      if (isInteractive !== activeRef.current) {
        activeRef.current = isInteractive;
        setActive(isInteractive);
      }
    };

    window.addEventListener("pointermove", move);
    document.addEventListener("mouseover", updateHover);
    document.addEventListener("mouseout", updateHover);

    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("mouseover", updateHover);
      document.removeEventListener("mouseout", updateHover);
    };
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[10001] h-10 w-10 rounded-full border border-flame/80 mix-blend-screen max-md:hidden"
      style={{ x, y }}
      animate={{
        scale: active ? 1.85 : 1,
        backgroundColor: active ? "rgba(255,61,18,0.12)" : "rgba(255,61,18,0)"
      }}
      transition={{ duration: 0.15, ease: "easeOut" }}
    >
      <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-flame shadow-ember" />
    </motion.div>
  );
}
