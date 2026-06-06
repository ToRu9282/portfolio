type SectionLabelProps = {
  number: string;
  label: string;
  align?: "left" | "center";
};

export function SectionLabel({ number, label, align = "left" }: SectionLabelProps) {
  return (
    <div
      className={`flex items-center gap-3 sm:gap-5 ${
        align === "center" ? "justify-center" : "justify-start"
      }`}
    >
      <span className="display-text text-[clamp(2rem,4.4vw,4.4rem)] leading-none text-white/20">
        {number}
      </span>
      <span className="h-1.5 w-1.5 rounded-full bg-flame shadow-ember" />
      <span className="chrome-text text-xs text-white sm:text-sm">{label}</span>
      <span className="hidden h-px min-w-20 flex-1 bg-white/[0.12] sm:block" />
    </div>
  );
}
