"use client";

import * as React from "react";
import { motion, useInView } from "motion/react";

import { Frame } from "@/components/ui/frame";
import { Alert, Clock, Spark, Users } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

type Span = {
  id: string;
  label: string;
  kind: "workflow" | "agent" | "llm" | "tool";
  depth: number;
  offset: number;
  width: number;
  duration: string;
  status?: "ok" | "slow" | "flagged";
};

const spans: Span[] = [
  {
    id: "workflow",
    label: "Support Access Workflow",
    kind: "workflow",
    depth: 0,
    offset: 0,
    width: 100,
    duration: "4.8s",
  },
  {
    id: "extract",
    label: "Question Extraction Agent",
    kind: "agent",
    depth: 1,
    offset: 2,
    width: 19,
    duration: "0.9s",
    status: "ok",
  },
  {
    id: "ops",
    label: "Support Operations Agent",
    kind: "agent",
    depth: 1,
    offset: 22,
    width: 60,
    duration: "3.1s",
    status: "ok",
  },
  {
    id: "llm",
    label: "gpt-4o · tool selection",
    kind: "llm",
    depth: 2,
    offset: 24,
    width: 34,
    duration: "1.7s",
    status: "slow",
  },
  {
    id: "tool",
    label: "add_member",
    kind: "tool",
    depth: 2,
    offset: 59,
    width: 13,
    duration: "0.6s",
    status: "flagged",
  },
  {
    id: "reply",
    label: "Reply Drafting Agent",
    kind: "agent",
    depth: 1,
    offset: 83,
    width: 15,
    duration: "0.8s",
    status: "ok",
  },
];

const kindStyles: Record<Span["kind"], { bar: string; dot: string }> = {
  workflow: { bar: "bg-ink", dot: "bg-ink" },
  agent: { bar: "bg-brand", dot: "bg-brand" },
  llm: { bar: "bg-signal-blue", dot: "bg-signal-blue" },
  tool: { bar: "bg-signal-pink", dot: "bg-signal-pink" },
};

export function HeroTrace() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, amount: 0.3 });
  const [revealFix, setRevealFix] = React.useState(false);

  React.useEffect(() => {
    if (!inView) return;

    const timer = window.setTimeout(() => setRevealFix(true), 1900);

    return () => window.clearTimeout(timer);
  }, [inView]);

  return (
    <div ref={containerRef} className="relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <Frame>
          <div className="flex items-center justify-between gap-3 border-b border-line bg-surface px-4 py-2.5">
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="h-2 w-2 bg-signal-pink" />
              <span className="truncate font-mono text-[11px] tracking-[0.06em] text-muted">
                run #4821 · support-access-workflow
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden items-center gap-1.5 font-mono text-[10.5px] text-muted sm:flex">
                <Clock className="h-3 w-3" />
                4.8s
              </span>
              <div className="flex items-center gap-1.5">
                <div className="flex gap-px">
                  {["S", "M", "A"].map((initial, index) => (
                    <motion.span
                      key={initial}
                      initial={{ opacity: 0, y: -3 }}
                      animate={inView ? { opacity: 1, y: 0 } : undefined}
                      transition={{ delay: 1.1 + index * 0.12, duration: 0.3 }}
                      className="flex h-5 w-5 items-center justify-center bg-brand-soft font-mono text-[9px] font-bold text-brand"
                    >
                      {initial}
                    </motion.span>
                  ))}
                </div>
                <span className="hidden font-mono text-[10px] tracking-[0.1em] text-faint uppercase sm:inline">
                  viewing
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-1 px-4 py-4">
            {spans.map((span, index) => {
              const styles = kindStyles[span.kind];

              return (
                <motion.div
                  key={span.id}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : undefined}
                  transition={{ delay: 0.15 + index * 0.13, duration: 0.35 }}
                  className={cn(
                    "flex items-center gap-3 px-1.5 py-1",
                    span.status === "flagged" ? "bg-signal-pink/[0.07]" : null,
                  )}
                >
                  <div
                    className="flex w-[42%] min-w-0 shrink-0 items-center gap-2 sm:w-[34%]"
                    style={{ paddingLeft: `${span.depth * 12}px` }}
                  >
                    <span className={cn("h-1.5 w-1.5 shrink-0", styles.dot)} />
                    <span
                      className={cn(
                        "truncate text-[12px]",
                        span.depth === 0
                          ? "font-semibold text-ink"
                          : "text-ink-soft",
                      )}
                    >
                      {span.label}
                    </span>
                  </div>

                  <div className="relative h-4 flex-1 bg-line-soft/60">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={
                        inView ? { width: `${span.width}%` } : { width: 0 }
                      }
                      transition={{
                        delay: 0.2 + index * 0.13,
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      style={{ left: `${span.offset}%` }}
                      className={cn("absolute inset-y-0", styles.bar)}
                    />
                  </div>

                  <div className="flex w-[64px] shrink-0 items-center justify-end gap-1.5">
                    {span.status === "slow" ? (
                      <Alert className="h-3 w-3 text-signal-amber" />
                    ) : null}
                    <span className="font-mono text-[10px] text-faint">
                      {span.duration}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={revealFix ? { opacity: 1, height: "auto" } : undefined}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-surface"
          >
            <div className="flex flex-col gap-3 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-brand text-raised">
                  <Spark className="h-2.5 w-2.5" />
                </span>
                <p className="text-[12.5px] leading-relaxed text-ink-soft">
                  <span className="font-semibold text-ink">Likely cause —</span>{" "}
                  tool descriptions don&apos;t separate billable{" "}
                  <code className="bg-line-soft px-1 font-mono text-[11px] text-ink">
                    add_member
                  </code>{" "}
                  from{" "}
                  <code className="bg-line-soft px-1 font-mono text-[11px] text-ink">
                    invite_guest
                  </code>
                  .
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2 pl-7.5 sm:pl-0">
                <span className="inline-flex items-center gap-1.5 bg-raised px-2 py-1 font-mono text-[10px] text-muted shadow-[inset_0_0_0_1px_var(--color-line)]">
                  <Users className="h-3 w-3" />4 replies
                </span>
                <span className="chamfer-sm inline-flex items-center bg-ink px-2.5 py-1 text-[11px] font-semibold text-raised">
                  Ship fix
                </span>
              </div>
            </div>
          </motion.div>
        </Frame>
      </motion.div>
    </div>
  );
}
