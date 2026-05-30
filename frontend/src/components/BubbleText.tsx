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
            className={`transition-all duration-300 ease-out ${
              distance === 0
                ? "brightness-[2] drop-shadow-[0_0_10px_rgba(255,255,255,0.35)]"
                : distance === 1
                  ? "brightness-[1.4]"
                  : distance === 2
                    ? "brightness-[1.1]"
                    : ""
            }`}
            aria-hidden
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}
