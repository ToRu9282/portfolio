import { useState } from "react";

type BubbleTextProps = {
  text: string;
  className?: string;
};

export function BubbleText({ text, className = "" }: BubbleTextProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <span onMouseLeave={() => setHoveredIndex(null)} className={className} aria-label={text}>
      {text.split("").map((char, index) => {
        const distance = hoveredIndex === null ? null : Math.abs(hoveredIndex - index);
        const weight =
          distance === 0
            ? "font-black text-white"
            : distance === 1
              ? "font-bold text-white/[0.9]"
              : distance === 2
                ? "font-semibold text-white/[0.75]"
                : "font-normal";

        return (
          <span
            key={`${char}-${index}`}
            onMouseEnter={() => setHoveredIndex(index)}
            className={`inline-block transition-all duration-300 ease-out ${weight}`}
            aria-hidden
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </span>
  );
}
