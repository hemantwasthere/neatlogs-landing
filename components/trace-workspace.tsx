"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";

import { Avatar } from "@/components/ui/avatar";
import { SectionLabel } from "@/components/ui/section-label";
import { Frame } from "@/components/ui/frame";
import { Spark } from "@/components/ui/icons";
import { traceSpans, type SpanKind } from "@/lib/trace-data";
import { cn } from "@/lib/utils";

const kindMeta: Record<SpanKind, { tag: string; dot: string; chip: string }> = {
  workflow: {
    tag: "flow",
    dot: "bg-ink",
    chip: "bg-ink/5 text-ink",
  },
  agent: {
    tag: "agent",
    dot: "bg-brand",
    chip: "bg-brand-soft text-brand",
  },
  llm: {
    tag: "llm",
    dot: "bg-signal-blue",
    chip: "bg-signal-blue/10 text-signal-blue",
  },
  tool: {
    tag: "tool",
    dot: "bg-signal-pink",
    chip: "bg-signal-pink/10 text-signal-pink",
  },
};

const participants = [
  { name: "Sara", initial: "S", role: "support lead" },
  { name: "Marcus", initial: "M", role: "engineer" },
  { name: "Ana", initial: "A", role: "product" },
];

const toneClasses = {
  default: "text-ink-soft",
  warn: "text-signal-amber",
  bad: "text-signal-pink",
  good: "text-signal-green",
};

export function TraceWorkspace() {
  const [activeId, setActiveId] = React.useState("tool");

  const activeSpan = React.useMemo(
    () => traceSpans.find((span) => span.id === activeId) ?? traceSpans[0],
    [activeId],
  );

  return (
    <section id="workspace" className="relative py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 tx-hatch opacity-[0.18]"
      />

      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="max-w-2xl">
          <SectionLabel>shared context</SectionLabel>
          <h2 className="mt-4 text-[32px] leading-[1.02] text-balance sm:text-[44px]">
            One trace. Your whole team.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-muted text-balance sm:text-[17px]">
            Simple enough for the domain expert who spotted the problem. Detailed
            enough for the engineer who has to fix it. Click any step to see what
            the agent saw.
          </p>
        </div>

        <Frame className="mt-10">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-surface px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping bg-signal-pink" />
                <span className="relative inline-flex h-2 w-2 bg-signal-pink" />
              </span>
              <span className="font-mono text-[12px] text-ink">run #4821</span>
              <span className="bg-signal-pink/12 px-2 py-0.5 font-mono text-[10px] tracking-[0.12em] font-bold text-signal-pink uppercase">
                needs review
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-[11px] text-muted">
              <span>4.8s</span>
              <span className="text-line">·</span>
              <span>$0.0141</span>
              <span className="text-line">·</span>
              <span>6 spans</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)]">
            <div className="flex flex-col border-b border-line p-3 lg:border-r lg:border-b-0">
              <p className="px-2 pt-1 pb-2.5 font-mono text-[10px] tracking-[0.14em] text-faint uppercase">
                execution tree
              </p>

              <div className="space-y-0.5">
                {traceSpans.map((span) => {
                  const meta = kindMeta[span.kind];
                  const isActive = span.id === activeId;

                  return (
                    <button
                      key={span.id}
                      type="button"
                      onClick={() => setActiveId(span.id)}
                      className={cn(
                        "group relative flex w-full cursor-pointer items-center gap-2 py-2 pr-2 text-left transition-colors",
                        isActive
                          ? "bg-brand-soft"
                          : "hover:bg-line-soft/70",
                      )}
                      style={{ paddingLeft: `${8 + span.depth * 14}px` }}
                    >
                      {span.depth > 0 ? (
                        <span
                          className="absolute inset-y-0 w-px bg-line-soft"
                          style={{ left: `${span.depth * 14}px` }}
                        />
                      ) : null}

                      <span
                        className={cn(
                          "h-1.5 w-1.5 shrink-0",
                          meta.dot,
                        )}
                      />

                      <span
                        className={cn(
                          "min-w-0 flex-1 truncate text-[12.5px]",
                          isActive
                            ? "font-medium text-ink"
                            : "text-ink-soft group-hover:text-ink",
                        )}
                      >
                        {span.label}
                      </span>

                      {span.status === "flagged" ? (
                        <span className="h-1.5 w-1.5 shrink-0 bg-signal-pink" />
                      ) : null}
                      {span.status === "slow" ? (
                        <span className="h-1.5 w-1.5 shrink-0 bg-signal-amber" />
                      ) : null}

                      <span className="shrink-0 font-mono text-[10.5px] text-faint">
                        {span.duration}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 flex items-center gap-3 border-t border-line-soft px-2 pt-3 font-mono text-[10px] text-faint">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 bg-signal-pink" />
                  failure
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 bg-signal-amber" />
                  latency
                </span>
              </div>

              <div className="mt-6 bg-surface p-3 shadow-[inset_0_0_0_1px_var(--color-line)] lg:mt-auto">
                <p className="font-mono text-[10px] tracking-[0.14em] text-faint uppercase">
                  on this trace
                </p>

                <div className="mt-2.5 space-y-2">
                  {participants.map((participant) => (
                    <div
                      key={participant.name}
                      className="flex items-center gap-2"
                    >
                      <Avatar
                        name={participant.name}
                        initial={participant.initial}
                        className="h-5 w-5"
                      />
                      <span className="text-[11.5px] text-ink-soft">
                        {participant.name}
                      </span>
                      <span className="ml-auto font-mono text-[10px] text-faint">
                        {participant.role}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex items-center gap-1.5 border border-dashed border-line px-2 py-1.5 font-mono text-[10.5px] text-faint">
                  <Spark className="h-2.5 w-2.5 text-brand" />
                  ask neatlogs about this run
                </div>
              </div>
            </div>

            <div className="min-w-0 p-4 sm:p-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSpan.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={cn(
                        "px-2 py-0.5 font-mono text-[10px] font-bold tracking-[0.12em] uppercase",
                        kindMeta[activeSpan.kind].chip,
                      )}
                    >
                      {kindMeta[activeSpan.kind].tag}
                    </span>
                    <h3 className="text-[15px] font-medium">
                      {activeSpan.label}
                    </h3>
                  </div>

                  <p className="mt-2.5 max-w-xl text-[13.5px] leading-relaxed text-muted">
                    {activeSpan.summary}
                  </p>

                  <dl className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                    {activeSpan.rows.map((row) => (
                      <div
                        key={row.label}
                        className="flex items-baseline justify-between gap-3 border-b border-line-soft pb-1.5"
                      >
                        <dt className="font-mono text-[10.5px] tracking-wide text-faint uppercase">
                          {row.label}
                        </dt>
                        <dd
                          className={cn(
                            "truncate text-right font-mono text-[11.5px]",
                            toneClasses[row.tone ?? "default"],
                          )}
                        >
                          {row.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-4 bg-surface shadow-[inset_0_0_0_1px_var(--color-line)]">
                    <div className="border-b border-line px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] text-faint uppercase">
                      {activeSpan.payload.title}
                    </div>
                    <pre className="no-scrollbar overflow-x-auto px-3 py-2.5 font-mono text-[11.5px] leading-[1.75] text-ink-soft">
                      {activeSpan.payload.lines.join("\n")}
                    </pre>
                  </div>

                  <div className="mt-4">
                    <p className="font-mono text-[10px] tracking-[0.14em] text-faint uppercase">
                      thread on this span
                    </p>

                    {activeSpan.comments.length > 0 ? (
                      <div className="mt-2.5 space-y-2.5">
                        {activeSpan.comments.map((comment, index) => (
                          <motion.div
                            key={comment.author + index}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + index * 0.08 }}
                            className={cn(
                              "flex gap-2.5 p-2.5",
                              comment.ai
                                ? "bg-brand-soft shadow-[inset_0_0_0_1px_var(--color-brand-line)]"
                                : "bg-surface shadow-[inset_0_0_0_1px_var(--color-line)]",
                            )}
                          >
                            {comment.ai ? (
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-brand text-raised">
                                <Spark className="h-3 w-3" />
                              </span>
                            ) : (
                              <Avatar
                                name={comment.author}
                                initial={comment.initial}
                                className="h-6 w-6"
                              />
                            )}

                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-[12px] font-medium text-ink">
                                  {comment.author}
                                </span>
                                <span className="font-mono text-[10px] text-faint">
                                  {comment.time}
                                </span>
                              </div>
                              <p className="mt-0.5 text-[12.5px] leading-relaxed text-ink-soft">
                                {comment.body}
                              </p>
                              {comment.reactions ? (
                                <div className="mt-1.5 flex gap-1.5">
                                  {comment.reactions.map((reaction) => (
                                    <span
                                      key={reaction}
                                      className="bg-surface px-1.5 py-0.5 text-[10px] text-muted shadow-[inset_0_0_0_1px_var(--color-line)]"
                                    >
                                      {reaction}
                                    </span>
                                  ))}
                                </div>
                              ) : null}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="mt-2.5 border border-dashed border-line px-3 py-4 text-center font-mono text-[11.5px] text-faint">
                        No comments yet — start the thread on this span
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Frame>
      </div>
    </section>
  );
}
