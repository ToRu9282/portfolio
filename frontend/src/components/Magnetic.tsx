import type { PointerEvent, PropsWithChildren } from "react";
import { useRef } from "react";

type MagneticProps = PropsWithChildren<{
  className?: string;
  strength?: number;
  padding?: number;
}>;

export function Magnetic({ children, className, strength = 4, padding = 120 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const within =
      event.clientX > rect.left - padding &&
      event.clientX < rect.right + padding &&
      event.clientY > rect.top - padding &&
      event.clientY < rect.bottom + padding;

    if (!within) return;

    const x = (event.clientX - rect.left - rect.width / 2) / strength;
    const y = (event.clientY - rect.top - rect.height / 2) / strength;
    element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    element.style.transition = "transform 0.22s ease-out";
  };

  const reset = () => {
    const element = ref.current;
    if (!element) return;
    element.style.transform = "translate3d(0, 0, 0)";
    element.style.transition = "transform 0.7s cubic-bezier(.19,1,.22,1)";
  };

  return (
    <div ref={ref} className={className} onPointerMove={handleMove} onPointerLeave={reset}>
      {children}
    </div>
  );
}
