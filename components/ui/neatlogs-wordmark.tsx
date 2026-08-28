import { cn } from "@/lib/utils";
import { wordmarkPath, wordmarkViewBox } from "@/lib/wordmark";

const radius = 0.54;
const dots = wordmarkPath(radius);

type NeatlogsWordmarkProps = {
  className?: string;
};

export function NeatlogsWordmark({ className }: NeatlogsWordmarkProps) {
  return (
    <svg
      viewBox={wordmarkViewBox(radius)}
      fill="currentColor"
      role="img"
      aria-label="neatlogs"
      className={cn("w-auto shrink-0", className)}
    >
      <path d={dots} />
    </svg>
  );
}
