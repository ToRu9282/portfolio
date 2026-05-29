import type { AnchorHTMLAttributes, ButtonHTMLAttributes, PropsWithChildren } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "../lib/cn";

type CommonProps = PropsWithChildren<{
  className?: string;
}>;

export function PrimaryLink({
  children,
  className,
  ...props
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cn(
        "chrome-text group inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-flame/80 px-6 py-3 text-[0.72rem] text-flame shadow-ember transition hover:bg-flame hover:text-white sm:px-8",
        className
      )}
      {...props}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
    </a>
  );
}

export function GhostButton({
  children,
  className,
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "chrome-text inline-flex min-h-11 items-center justify-center rounded-full border border-white/[0.14] px-5 py-3 text-[0.72rem] text-white transition hover:border-flame/60 hover:bg-white/[0.08]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
