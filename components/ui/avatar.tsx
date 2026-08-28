import Image from "next/image";

import { cn } from "@/lib/utils";

const portraits: Record<string, string> = {
  Sara: "/people/sara.png",
  Marcus: "/people/marcus.png",
};

type AvatarProps = {
  name: string;
  initial: string;
  className?: string;
};

export function Avatar({ name, initial, className }: AvatarProps) {
  const portrait = portraits[name];

  if (!portrait) {
    return (
      <span
        className={cn(
          "flex shrink-0 items-center justify-center bg-line-soft font-mono text-[9px] font-bold text-ink-soft",
          className,
        )}
      >
        {initial}
      </span>
    );
  }

  return (
    <Image
      src={portrait}
      alt=""
      width={128}
      height={128}
      className={cn(
        "shrink-0 object-cover shadow-[inset_0_0_0_1px_var(--color-line)]",
        className,
      )}
    />
  );
}
