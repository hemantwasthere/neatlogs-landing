import { cn } from "@/lib/utils";

type FrameProps = {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  tone?: "plain" | "hatch" | "brand";
  ticks?: boolean;
};

const tones = {
  plain: "bg-line-soft/40",
  hatch: "tx-hatch opacity-100",
  brand: "tx-hatch-brand",
};

export function Frame({
  children,
  className,
  innerClassName,
  tone = "hatch",
  ticks = true,
}: FrameProps) {
  return (
    <div className={cn("relative p-1.5", tones[tone], className)}>
      {ticks ? <CornerTicks /> : null}
      <div
        className={cn(
          "relative bg-raised shadow-[inset_0_0_0_1px_var(--color-line)]",
          innerClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function CornerTicks({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("pointer-events-none", className)}>
      <span className="absolute top-0 left-0 h-2 w-2 border-t border-l border-ink/40" />
      <span className="absolute top-0 right-0 h-2 w-2 border-t border-r border-ink/40" />
      <span className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-ink/40" />
      <span className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-ink/40" />
    </span>
  );
}

export function RuleLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="h-px flex-1 bg-line" />
      <span className="bg-brand-soft px-2 py-0.5 font-mono text-[10px] tracking-[0.16em] text-brand uppercase">
        {children}
      </span>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}
