import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
};

const variants = {
  primary: "chamfer-sm bg-ink text-raised hover:bg-brand",
  secondary:
    "chamfer-sm bg-raised text-ink shadow-[inset_0_0_0_1px_var(--color-line)] hover:shadow-[inset_0_0_0_1px_var(--color-brand-line)] hover:bg-brand-soft",
  ghost: "text-muted hover:text-ink hover:bg-line-soft",
};

const sizes = {
  sm: "h-8 px-3 text-[12.5px]",
  md: "h-10 px-4 text-[13.5px]",
  lg: "h-11 px-5 text-[14px]",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
}: ButtonProps) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex cursor-pointer items-center justify-center gap-2 font-medium whitespace-nowrap transition-colors duration-200",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </a>
  );
}
