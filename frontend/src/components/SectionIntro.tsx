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
      <div className={`mt-7 ${align === "center" ? "mx-auto text-center" : ""} max-w-[760px]`}>
        <h2 className="display-text metal-text text-[clamp(2.25rem,5.4vw,5.4rem)]">{title}</h2>
        {text ? <p className="mt-5 max-w-[680px] text-base leading-8 text-white/[0.64] sm:text-lg">{text}</p> : null}
      </div>
    </Reveal>
  );
}
