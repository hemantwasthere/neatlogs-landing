"use client";

import * as React from "react";

import { Check, Copy } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

type CopyCommandProps = {
  command: string;
  className?: string;
};

export function CopyCommand({ command, className }: CopyCommandProps) {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!copied) return;

    const timer = window.setTimeout(() => setCopied(false), 1800);

    return () => window.clearTimeout(timer);
  }, [copied]);

  const handleCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }, [command]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copy: ${command}`}
      className={cn(
        "group inline-flex h-10 cursor-pointer items-center gap-2.5 bg-raised px-3 font-mono text-[12px] text-ink-soft shadow-[inset_0_0_0_1px_var(--color-line)] transition-all duration-200 hover:shadow-[inset_0_0_0_1px_var(--color-brand-line)]",
        className,
      )}
    >
      <span className="text-brand select-none">$</span>
      <span className="truncate">{command}</span>
      {copied ? (
        <Check className="h-3.5 w-3.5 shrink-0 text-signal-green" />
      ) : (
        <Copy className="h-3.5 w-3.5 shrink-0 text-faint transition-colors group-hover:text-ink" />
      )}
    </button>
  );
}
