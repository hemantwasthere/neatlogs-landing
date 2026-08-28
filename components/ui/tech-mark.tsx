import { cn } from "@/lib/utils";

type TechMarkProps = {
  label: string;
  className?: string;
};

export function TechMark({ label, className }: TechMarkProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex h-4.5 w-4.5 shrink-0 items-center justify-center bg-ink/8 font-mono text-[9px] leading-none font-bold tracking-tight",
        className,
      )}
    >
      {label}
    </span>
  );
}
