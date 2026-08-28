import { marqueeBrands } from "@/lib/brands";

export function FrameworkMarquee() {
  return (
    <section className="relative border-y border-line bg-surface">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 tx-hatch opacity-[0.35]"
      />

      <div className="relative py-8">
        <p className="text-center font-mono text-[10.5px] tracking-[0.22em] text-faint uppercase">
          instruments the stack you already run
        </p>

        <div className="group/marquee fade-edges mt-6 overflow-hidden">
          <div className="flex w-max animate-marquee items-center group-hover/marquee:[animation-play-state:paused]">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                className="flex shrink-0 items-center"
                aria-hidden={copy === 1}
              >
                {marqueeBrands.map((brand) => (
                  <div
                    key={`${copy}-${brand.name}`}
                    style={{ "--brand": brand.color } as React.CSSProperties}
                    className="group/brand flex shrink-0 items-center gap-2.5 px-5"
                  >
                    <brand.Icon className="h-4.5 w-4.5 shrink-0 text-faint transition-colors duration-300 group-hover/brand:text-(color:--brand)" />
                    <span className="font-mono text-[12.5px] tracking-[0.04em] whitespace-nowrap text-muted transition-colors duration-300 group-hover/brand:text-ink">
                      {brand.name}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
