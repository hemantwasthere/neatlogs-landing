"use client";

import { motion } from "motion/react";

import { CursorLogo, GitHubLogo, LinearLogo, SlackLogo } from "@/components/ui/brand-logos";
import { Alert, ArrowRight, Check, Spark } from "@/components/ui/icons";

const sparkPoints = [
  8, 11, 9, 13, 10, 12, 9, 14, 11, 13, 12, 15, 13, 16, 14, 18, 22, 31, 44, 52,
];

export function DetectVisual() {
  const max = Math.max(...sparkPoints);
  const path = sparkPoints
    .map((value, index) => {
      const x = (index / (sparkPoints.length - 1)) * 260;
      const y = 76 - (value / max) * 64;

      return `${index === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <div className="space-y-3">
      <div className="bg-surface p-4 shadow-[inset_0_0_0_1px_var(--color-line)]">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-faint uppercase">
            failure rate · revenue q&a
          </span>
          <span className="bg-signal-pink/12 px-2 py-0.5 font-mono text-[10px] font-bold text-signal-pink">
            3.4× baseline
          </span>
        </div>

        <svg viewBox="0 0 260 88" className="mt-3 h-24 w-full" fill="none">
          <line
            x1="0"
            y1="58"
            x2="260"
            y2="58"
            stroke="var(--color-line)"
            strokeWidth="1"
            strokeDasharray="3 4"
          />
          <motion.path
            d={path}
            stroke="var(--color-signal-pink)"
            strokeWidth="2"
            strokeLinecap="square"
            strokeLinejoin="miter"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          />
          <motion.rect
            x="256"
            y={(76 - (sparkPoints[19] / max) * 64 - 4).toFixed(1)}
            width="8"
            height="8"
            fill="var(--color-signal-pink)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, duration: 0.3 }}
          />
          <text
            x="4"
            y="54"
            className="font-mono"
            fontSize="8"
            fill="var(--color-faint)"
          >
            7d avg
          </text>
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="bg-surface p-3.5 shadow-[inset_0_0_0_1px_var(--color-line)]"
      >
        <div className="flex items-center gap-2">
          <SlackLogo className="h-3.5 w-3.5 text-muted" />
          <span className="font-mono text-[11.5px] font-bold">
            #neatlogs-agent
          </span>
          <span className="font-mono text-[10px] text-faint">09:12 AM</span>
        </div>

        <div className="mt-2.5 flex gap-2.5 border-l-2 border-signal-pink pl-2.5">
          <Alert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-signal-pink" />
          <div>
            <p className="text-[12.5px] font-semibold text-ink">
              Spike detected — outdated source cited
            </p>
            <p className="mt-0.5 font-mono text-[11px] text-muted">
              seen in 3 runs · latest #4821
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function InvestigateVisual() {
  const evidence = [
    { label: "prompt v13", detail: "tool boundary undefined", weight: 3 },
    { label: "add_member", detail: "no billing guard", weight: 3 },
    { label: "gpt-4o", detail: "latency within range", weight: 1 },
  ];

  return (
    <div className="space-y-3">
      <div className="bg-brand-soft p-4 shadow-[inset_0_0_0_1px_var(--color-brand-line)]">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center bg-brand text-raised">
            <Spark className="h-2.5 w-2.5" />
          </span>
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-brand uppercase">
            neatlogs analysis
          </span>
        </div>
        <p className="mt-2.5 text-[13px] leading-relaxed text-ink-soft">
          Both access tools looked valid to the model. Nothing in the prompt
          separates billable members from non-billable guests.
        </p>
      </div>

      <div className="bg-surface p-4 shadow-[inset_0_0_0_1px_var(--color-line)]">
        <p className="font-mono text-[10.5px] tracking-[0.14em] text-faint uppercase">
          evidence from the trace
        </p>

        <div className="mt-3 space-y-2">
          {evidence.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + index * 0.11, duration: 0.35 }}
              className="flex items-center gap-2.5"
            >
              <code className="shrink-0 bg-line-soft px-1.5 py-0.5 font-mono text-[10.5px] text-ink">
                {item.label}
              </code>
              <span className="min-w-0 flex-1 truncate text-[12px] text-muted">
                {item.detail}
              </span>
              <div className="flex shrink-0 gap-px">
                {[0, 1, 2].map((bar) => (
                  <span
                    key={bar}
                    className={
                      bar < item.weight ? "h-3 w-1.5 bg-brand" : "h-3 w-1.5 bg-line"
                    }
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ActVisual() {
  const targets = [
    { name: "Linear", Logo: LinearLogo },
    { name: "GitHub", Logo: GitHubLogo },
    { name: "Cursor", Logo: CursorLogo },
  ];

  return (
    <div className="space-y-3">
      <div className="bg-surface p-4 shadow-[inset_0_0_0_1px_var(--color-line)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[13px] font-semibold">Fix tool selection logic</p>
            <p className="mt-0.5 text-[12px] text-muted">
              Distinguish paid members from guest collaborators
            </p>
          </div>
          <span className="shrink-0 bg-signal-green/12 px-2 py-0.5 font-mono text-[9.5px] tracking-[0.1em] text-signal-green uppercase">
            ready
          </span>
        </div>

        <div className="mt-3 bg-raised font-mono text-[11px] leading-[1.75] shadow-[inset_0_0_0_1px_var(--color-line)]">
          <div className="border-b border-line px-2.5 py-1 text-[10px] text-faint">
            tools/add_member.md
          </div>
          <div className="py-1">
            <div className="flex gap-2 bg-signal-pink/[0.08] px-2.5 py-0.5 shadow-[inset_2px_0_0_var(--color-signal-pink)]">
              <span className="w-2 shrink-0 font-bold text-signal-pink">-</span>
              <span className="text-ink-soft">Adds a user to the workspace.</span>
            </div>
            <div className="flex gap-2 bg-signal-green/[0.09] px-2.5 py-0.5 shadow-[inset_2px_0_0_var(--color-signal-green)]">
              <span className="w-2 shrink-0 font-bold text-signal-green">+</span>
              <span className="text-ink-soft">
                Adds a <b className="font-bold">billable</b> member. For external
                collaborators use invite_guest.
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface p-4 shadow-[inset_0_0_0_1px_var(--color-line)]">
        <p className="font-mono text-[10.5px] tracking-[0.14em] text-faint uppercase">
          send fix to
        </p>

        <div className="mt-3 grid grid-cols-3 gap-px bg-line">
          {targets.map(({ name, Logo }, index) => (
            <motion.button
              key={name}
              type="button"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.09, duration: 0.3 }}
              className="flex cursor-pointer flex-col items-center gap-1.5 bg-raised px-2 py-2.5 transition-colors hover:bg-brand-soft"
            >
              <Logo className="h-4 w-4 text-muted" />
              <span className="font-mono text-[10.5px] text-ink-soft">
                {name}
              </span>
            </motion.button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="mt-3 flex items-center justify-center gap-1.5 bg-signal-green/[0.1] py-2 font-mono text-[11px] text-signal-green"
        >
          <Check className="h-3.5 w-3.5" />
          NEAT-412 created
          <ArrowRight className="h-3 w-3" />
          in review
        </motion.div>
      </div>
    </div>
  );
}
