import type { PropsWithChildren } from "react";
import { motion } from "framer-motion";

type RevealProps = PropsWithChildren<{
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
}>;

export function Reveal({ children, className, delay = 0, y = 28, x = 0 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -60px 0px" }}
      transition={{ delay, duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}
