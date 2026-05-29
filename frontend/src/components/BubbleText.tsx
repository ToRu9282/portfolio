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

        return (
          <span
            key={`${char}-${index}`}
            onMouseEnter={() => setHoveredIndex(index)}
            className={`inline-block cursor-default transition-all duration-300 ease-out ${
              distance === 0
                ? "scale-110 brightness-[1.8] drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]"
                : distance === 1
                  ? "scale-105 brightness-[1.3]"
                  : distance === 2
                    ? "scale-[1.02] brightness-[1.1]"
                    : ""
            }`}
            aria-hidden
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </span>
  );
}
