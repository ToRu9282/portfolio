type BubbleTextProps = {
  text: string;
  className?: string;
};

export function BubbleText({ text, className = "" }: BubbleTextProps) {
  return (
    <span className={className} aria-label={text}>
      {text}
    </span>
  );
}
