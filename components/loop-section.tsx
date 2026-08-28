"use client";

import * as React from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";

import { SectionLabel } from "@/components/ui/section-label";
import { Alert, Compass, Ship } from "@/components/ui/icons";
import { Frame } from "@/components/ui/frame";
import {
  ActVisual,
  DetectVisual,
  InvestigateVisual,
} from "@/components/loop-visuals";
import { cn } from "@/lib/utils";

const steps = [
  {
    id: "detect",
    index: "01",
    title: "Detect",
    tagline: "Catch the spike early",
    body: "Neatlogs watches production for unusual patterns — failure rates, regressions, cost drift — and pings the right person in the channel they already read.",
    Icon: Alert,
    Visual: DetectVisual,
  },
  {
    id: "investigate",
    index: "02",
    title: "Investigate",
    tagline: "Find out what went wrong",
    body: "Ask in the thread. Neatlogs reads the full trace — prompts, tool calls, retries — and comes back with a likely cause and the evidence behind it.",
    Icon: Compass,
    Visual: InvestigateVisual,
  },
  {
    id: "act",
    index: "03",
    title: "Act",
    tagline: "Move from insight to action",
    body: "Turn the finding into a concrete change. Send it to your task board, open a PR, or hand it straight to a coding agent with the trace attached.",
    Icon: Ship,
    Visual: ActVisual,
  },
];

export function LoopSection() {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  React.useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      const next = Math.min(
        steps.length - 1,
        Math.max(0, Math.floor(value * steps.length)),
      );

      setActiveIndex(next);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const activeStep = steps[activeIndex];
  const ActiveVisual = activeStep.Visual;

  return (
    <section id="loop" className="relative border-y border-line bg-surface">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 tx-dots opacity-40"
      />

      <div ref={trackRef} className="relative h-[280vh] lg:h-[300vh]">
        <div className="sticky top-0 flex min-h-screen items-center py-20">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-6">
            <div className="max-w-2xl">
              <SectionLabel>the loop</SectionLabel>
              <h2 className="mt-4 text-[32px] leading-[1.02] text-balance sm:text-[44px]">
                See the issue. Ship the next step.
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-muted text-balance sm:text-[17px]">
                Detect an anomaly, investigate the cause, and push the fix
                forward — in minutes, not sprints.
              </p>
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
              <div className="lg:self-start">
                <div className="relative">
                  <div className="absolute top-0 bottom-0 left-0 w-px bg-line" />
                  <motion.div
                    style={{ scaleY: progressScale }}
                    className="absolute top-0 bottom-0 left-0 w-px origin-top bg-brand"
                  />

                  {steps.map((step, index) => {
                    const isActive = index === activeIndex;
                    const isPast = index < activeIndex;

                    return (
                      <div
                        key={step.id}
                        className={cn(
                          "relative py-5 pl-6 transition-opacity duration-500",
                          isActive ? "opacity-100" : "opacity-45",
                        )}
                      >
                        <span
                          className={cn(
                            "absolute top-[26px] -left-[5px] h-2.5 w-2.5 transition-colors duration-300",
                            isActive || isPast ? "bg-brand" : "bg-line",
                          )}
                        />

                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span
                            className={cn(
                              "flex h-7 w-7 shrink-0 items-center justify-center transition-colors duration-300",
                              isActive
                                ? "bg-brand text-raised"
                                : "bg-line-soft text-muted",
                            )}
                          >
                            <step.Icon className="h-3.5 w-3.5" />
                          </span>

                          <span className="font-mono text-[11px] text-faint">
                            {step.index}
                          </span>

                          <h3 className="text-[19px] leading-none">
                            {step.title}
                          </h3>

                          <span className="text-[13.5px] text-muted">
                            {step.tagline}
                          </span>
                        </div>

                        <AnimatePresence initial={false}>
                          {isActive ? (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{
                                duration: 0.35,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              className="overflow-hidden"
                            >
                              <p className="pt-2.5 pl-10 text-[13.5px] leading-relaxed text-muted">
                                {step.body}
                              </p>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </div>
                    );
                  })}

                </div>

                <p className="pt-4 pl-6 font-mono text-[10px] tracking-[0.14em] text-faint uppercase">
                  scroll to advance · {activeIndex + 1} of {steps.length}
                </p>
              </div>

              <div className="relative lg:self-start lg:min-h-[420px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Frame tone="plain" ticks={false} innerClassName="p-3">
                      <ActiveVisual />
                    </Frame>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
