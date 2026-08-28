import Image from "next/image";

import { cn } from "@/lib/utils";

type NeatlogsMarkProps = {
  className?: string;
  priority?: boolean;
};

export function NeatlogsMark({ className, priority }: NeatlogsMarkProps) {
  return (
    <Image
      src="/nl-logo.png"
      alt=""
      width={128}
      height={128}
      priority={priority}
      className={cn("shrink-0", className)}
    />
  );
}
