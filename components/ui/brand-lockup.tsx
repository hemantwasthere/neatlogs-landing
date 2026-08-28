"use client";

import { NeatlogsMark } from "@/components/ui/neatlogs-mark";
import { NeatlogsWordmark } from "@/components/ui/neatlogs-wordmark";
import { scrollToTop } from "@/lib/scroll";
import { cn } from "@/lib/utils";

type BrandLockupProps = {
  className?: string;
  priority?: boolean;
};

export function BrandLockup({ className, priority }: BrandLockupProps) {
  const onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey) return;

    event.preventDefault();
    scrollToTop();
  };

  return (
    <a
      href="/"
      onClick={onClick}
      aria-label="Neatlogs — back to top"
      className={cn("flex items-center gap-2.5", className)}
    >
      <NeatlogsMark priority={priority} className="h-6 w-6" />
      <NeatlogsWordmark className="h-[17px] text-ink" />
    </a>
  );
}
