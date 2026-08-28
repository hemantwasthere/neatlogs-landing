import { cn } from "@/lib/utils";

type SectionLabelProps = {
  children: React.ReactNode;
  className?: string;
};

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-muted uppercase",
        className,
      )}
    >
      <span className="text-brand">[</span>
      {children}
      <span className="text-brand">]</span>
    </span>
  );
}
