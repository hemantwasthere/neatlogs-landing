"use client";

import * as React from "react";
import { motion } from "motion/react";

import { CodeBlock } from "@/components/ui/code-block";
import { Check, Search, Spark } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const queries = [
  "runs that failed with status 500",
  "tool accuracy across prompt versions",
  "where did cost spike this week?",
];

const results = [
  { id: "#4821", meta: "add_member · wrong tier", tone: "pink" },
  { id: "#4790", meta: "add_member · wrong tier", tone: "pink" },
  { id: "#4755", meta: "timeout · retry succeeded", tone: "amber" },
];

export function SearchVisual() {
  const [queryIndex, setQueryIndex] = React.useState(0);
  const [typed, setTyped] = React.useState("");

  React.useEffect(() => {
    const query = queries[queryIndex];
    let position = 0;

    const typer = window.setInterval(() => {
      position += 1;
      setTyped(query.slice(0, position));

      if (position >= query.length) {
        window.clearInterval(typer);
        window.setTimeout(
          () => setQueryIndex((current) => (current + 1) % queries.length),
          2400,
        );
      }
    }, 40);

    return () => window.clearInterval(typer);
  }, [queryIndex]);

  return (
    <div className="bg-surface p-3 shadow-[inset_0_0_0_1px_var(--color-line)]">
      <div className="flex items-center gap-2 bg-raised px-2.5 py-2 shadow-[inset_0_0_0_1px_var(--color-line)]">
        <Search className="h-3.5 w-3.5 shrink-0 text-brand" />
        <span className="min-w-0 flex-1 truncate font-mono text-[11.5px] text-ink-soft">
          {typed}
          <span className="ml-px inline-block h-3 w-[7px] translate-y-0.5 animate-blink bg-brand" />
        </span>
      </div>

      <div className="mt-2 space-y-px bg-line">
        {results.map((result, index) => (
          <motion.div
            key={result.id}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.09 }}
            className="flex items-center gap-2.5 bg-raised px-2.5 py-2"
          >
            <span
              className={cn(
                "h-2 w-2 shrink-0",
                result.tone === "pink" ? "bg-signal-pink" : "bg-signal-amber",
              )}
            />
            <span className="shrink-0 font-mono text-[11px] font-bold text-ink">
              run {result.id}
            </span>
            <span className="min-w-0 flex-1 truncate font-mono text-[11px] text-muted">
              {result.meta}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="mt-2 flex items-center gap-1.5 font-mono text-[10px] tracking-[0.06em] text-faint uppercase">
        <Spark className="h-2.5 w-2.5 text-brand" />
        3 of 412 runs matched in 240ms
      </div>
    </div>
  );
}

const versions = ["v12", "v13", "v14", "v15"];

const diffLines = [
  { type: "context", text: "You are a billing support agent." },
  { type: "context", text: "Use the knowledge base to answer." },
  { type: "remove", text: "Always use the latest pricing." },
  { type: "add", text: "Use pricing effective on the request date." },
  { type: "add", text: "Cite the source and its date." },
];

export function PromptVisual() {
  const [active, setActive] = React.useState("v14");

  return (
    <div className="bg-surface p-3 shadow-[inset_0_0_0_1px_var(--color-line)]">
      <div className="flex items-center gap-px">
        {versions.map((version) => (
          <button
            key={version}
            type="button"
            onClick={() => setActive(version)}
            className={cn(
              "cursor-pointer px-2.5 py-1 font-mono text-[10.5px] transition-colors",
              version === active
                ? "bg-ink text-raised"
                : "bg-raised text-muted shadow-[inset_0_0_0_1px_var(--color-line)] hover:text-ink",
            )}
          >
            {version}
          </button>
        ))}
        <span className="ml-auto bg-signal-green/12 px-2 py-1 font-mono text-[9.5px] tracking-[0.1em] text-signal-green uppercase">
          {active === "v14" ? "production" : "draft"}
        </span>
      </div>

      <div className="mt-2 bg-raised font-mono text-[11px] leading-[1.8] shadow-[inset_0_0_0_1px_var(--color-line)]">
        {diffLines.map((line) => (
          <div
            key={line.text}
            className={cn(
              "flex gap-2 px-2.5 py-0.5",
              line.type === "add"
                ? "bg-signal-green/[0.09] shadow-[inset_2px_0_0_var(--color-signal-green)]"
                : null,
              line.type === "remove"
                ? "bg-signal-pink/[0.08] shadow-[inset_2px_0_0_var(--color-signal-pink)]"
                : null,
            )}
          >
            <span
              className={cn(
                "w-2 shrink-0 font-bold select-none",
                line.type === "add" ? "text-signal-green" : null,
                line.type === "remove" ? "text-signal-pink" : null,
                line.type === "context" ? "text-line" : null,
              )}
            >
              {line.type === "add" ? "+" : line.type === "remove" ? "-" : " "}
            </span>
            <span
              className={cn(
                "truncate",
                line.type === "context" ? "text-faint" : "text-ink-soft",
              )}
            >
              {line.text}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-center gap-2">
        <span className="bg-raised px-2 py-1 text-[10.5px] text-muted shadow-[inset_0_0_0_1px_var(--color-line)]">
          Roll back
        </span>
        <span className="bg-ink px-2 py-1 text-[10.5px] text-raised">
          Promote
        </span>
        <span className="ml-auto font-mono text-[10px] text-faint">
          +2 −1 · 3 runs
        </span>
      </div>
    </div>
  );
}

const evalRows = [
  { label: "cited correct source", score: 4 },
  { label: "chose the right tool", score: 2 },
  { label: "tone matched policy", score: 5 },
];

export function EvalVisual() {
  const [rated, setRated] = React.useState<Record<string, number>>({});

  React.useEffect(() => {
    const timers = evalRows.map((row, index) =>
      window.setTimeout(
        () => setRated((current) => ({ ...current, [row.label]: row.score })),
        500 + index * 520,
      ),
    );

    return () => timers.forEach(window.clearTimeout);
  }, []);

  return (
    <div className="bg-surface p-3 shadow-[inset_0_0_0_1px_var(--color-line)]">
      <div className="space-y-px bg-line">
        {evalRows.map((row) => {
          const score = rated[row.label];

          return (
            <div
              key={row.label}
              className="flex items-center gap-2.5 bg-raised px-2.5 py-2"
            >
              <span className="min-w-0 flex-1 truncate text-[11.5px] text-ink-soft">
                {row.label}
              </span>

              <div className="flex shrink-0 gap-px">
                {[1, 2, 3, 4, 5].map((tick) => (
                  <motion.span
                    key={tick}
                    animate={{
                      backgroundColor:
                        score && tick <= score
                          ? score <= 2
                            ? "var(--color-signal-pink)"
                            : "var(--color-signal-green)"
                          : "var(--color-line)",
                    }}
                    transition={{ delay: tick * 0.05, duration: 0.25 }}
                    className="h-3.5 w-2"
                  />
                ))}
              </div>

              <span className="w-3 shrink-0">
                {score ? (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="block text-signal-green"
                  >
                    <Check className="h-3 w-3" />
                  </motion.span>
                ) : null}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-2 flex items-center gap-1.5 font-mono text-[10px] tracking-[0.06em] text-faint uppercase">
        <Spark className="h-2.5 w-2.5 text-brand" />
        human + LLM judges, one rubric
      </div>
    </div>
  );
}

const tiles = [
  { label: "failure rate", value: "2.1%", trend: [6, 8, 5, 9, 7, 11, 18] },
  { label: "p95 latency", value: "3.4s", trend: [12, 10, 13, 11, 14, 12, 13] },
  { label: "cost / run", value: "$0.014", trend: [4, 6, 5, 8, 7, 9, 12] },
];

export function DashboardVisual() {
  return (
    <div className="bg-surface p-3 shadow-[inset_0_0_0_1px_var(--color-line)]">
      <div className="flex items-center gap-2 bg-raised px-2.5 py-2 shadow-[inset_0_0_0_1px_var(--color-line)]">
        <Spark className="h-3 w-3 shrink-0 text-brand" />
        <span className="min-w-0 flex-1 truncate font-mono text-[11px] text-ink-soft">
          track tool-selection errors by agent, weekly
        </span>
        <span className="shrink-0 bg-ink px-1.5 py-0.5 text-[9.5px] text-raised">
          Build
        </span>
      </div>

      <div className="mt-2 grid grid-cols-3 gap-px bg-line">
        {tiles.map((tile, tileIndex) => {
          const max = Math.max(...tile.trend);

          return (
            <motion.div
              key={tile.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 + tileIndex * 0.09 }}
              className="bg-raised p-2"
            >
              <p className="truncate font-mono text-[8.5px] tracking-[0.12em] text-faint uppercase">
                {tile.label}
              </p>
              <p className="mt-0.5 font-mono text-[13px] font-bold text-ink">
                {tile.value}
              </p>

              <div className="mt-1.5 flex h-6 items-end gap-px">
                {tile.trend.map((point, pointIndex) => (
                  <motion.span
                    key={pointIndex}
                    initial={{ height: 0 }}
                    animate={{ height: `${(point / max) * 100}%` }}
                    transition={{
                      delay: 0.3 + tileIndex * 0.09 + pointIndex * 0.04,
                      duration: 0.35,
                    }}
                    className={cn(
                      "flex-1",
                      pointIndex === tile.trend.length - 1
                        ? "bg-brand"
                        : "bg-brand/25",
                    )}
                  />
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export function SdkVisual() {
  return (
    <div className="bg-surface py-3 shadow-[inset_0_0_0_1px_var(--color-line)]">
      <CodeBlock
        language="python"
        highlightLines={[3]}
        code={`@neatlogs.trace(name="pricing_lookup")
def lookup(sku: str) -> Price:
    return catalog.price(sku)`}
      />
    </div>
  );
}
