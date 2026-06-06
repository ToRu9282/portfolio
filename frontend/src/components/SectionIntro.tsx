import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

type SectionIntroProps = {
  number: string;
  label: string;
  title: ReactNode;
  text?: string;
  align?: "left" | "center";
};

export function SectionIntro({ number, label, title, text, align = "left" }: SectionIntroProps) {
  return (
    <Reveal>
      <SectionLabel number={number} label={label} align={align} />
      <div className={`mt-6 ${align === "center" ? "mx-auto text-center" : ""} max-w-[700px]`}>
        <h2 className="section-title display-text metal-text text-[clamp(1.7rem,3.2vw,3.25rem)] leading-[1.1]">{title}</h2>
        {text ? <p className="mt-4 max-w-[620px] text-[0.98rem] leading-7 text-white/[0.64] sm:text-base sm:leading-8">{text}</p> : null}
      </div>
    </Reveal>
  );
}
