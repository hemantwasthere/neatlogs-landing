"use client";

import { motion } from "motion/react";

import { SectionLabel } from "@/components/ui/section-label";
import { destinations, frameworks, models, runtimes } from "@/lib/brands";

const groups = [
  {
    label: "frameworks",
    caption: "auto-instrumented",
    items: frameworks,
  },
  {
    label: "models",
    caption: "cost + latency per call",
    items: models,
  },
  {
    label: "where your team works",
    caption: "alerts, tasks, handoffs",
    items: destinations,
  },
  {
    label: "runtimes",
    caption: "sdk + open standards",
    items: runtimes,
  },
];

export function Integrations() {
  return (
    <section id="integrations" className="relative py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 tx-dots opacity-40"
      />

      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="max-w-2xl">
          <SectionLabel>integrations</SectionLabel>
          <h2 className="mt-4 text-[32px] leading-[1.02] text-balance sm:text-[44px]">
            Fits the way your team already works
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-muted text-balance sm:text-[17px]">
            Neatlogs meets your stack where it is — the frameworks you build on,
            the models you call, and the tools where decisions actually get made.
          </p>
        </div>

        <div className="mt-10 space-y-7">
          {groups.map((group) => (
            <div key={group.label}>
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[10.5px] tracking-[0.18em] text-ink uppercase">
                  {group.label}
                </span>
                <span className="h-px flex-1 bg-line" />
                <span className="font-mono text-[10.5px] text-faint">
                  {group.caption}
                </span>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-px bg-line lg:grid-cols-4">
                {group.items.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.35, delay: index * 0.035 }}
                    className="group flex items-center gap-3 bg-raised px-4 py-3.5 transition-colors duration-200 hover:bg-brand-soft"
                  >
                    <item.Icon className="h-4.5 w-4.5 shrink-0 text-muted transition-colors group-hover:text-brand" />
                    <span className="truncate text-[13.5px] text-ink-soft transition-colors group-hover:text-ink">
                      {item.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center font-mono text-[11px] tracking-[0.08em] text-faint uppercase">
          plus an open SDK — instrument anything that makes an LLM call
        </p>
      </div>
    </section>
  );
}
