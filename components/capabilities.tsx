"use client";

import { motion } from "motion/react";

import { SectionLabel } from "@/components/ui/section-label";
import { ArrowRight, Gauge, Layers, Scale, Search, Terminal } from "@/components/ui/icons";
import {
  DashboardVisual,
  EvalVisual,
  PromptVisual,
  SdkVisual,
  SearchVisual,
} from "@/components/capability-visuals";
import { cn } from "@/lib/utils";

const capabilities = [
  {
    id: "search",
    index: "01",
    Icon: Search,
    label: "AI search",
    title: "Find the right trace fast",
    body: "Ask in plain English. Neatlogs surfaces the runs, spans, and patterns that matter, so nobody greps through raw logs at 2am.",
    Visual: SearchVisual,
    span: "lg:col-span-3",
  },
  {
    id: "prompts",
    index: "02",
    Icon: Layers,
    label: "Prompt registry",
    title: "Manage prompts in one place",
    body: "Prompts, edits, and versions live together. Compare any two, see which runs used which, and roll back the moment a change makes things worse.",
    Visual: PromptVisual,
    span: "lg:col-span-3",
  },
  {
    id: "evals",
    index: "03",
    Icon: Scale,
    label: "Evaluations",
    title: "Evals without the setup pain",
    body: "Define what good looks like, pick what to review, and collect structured feedback from humans and LLM judges in minutes.",
    Visual: EvalVisual,
    span: "lg:col-span-2",
  },
  {
    id: "dashboards",
    index: "04",
    Icon: Gauge,
    label: "Dashboards",
    title: "Build the dashboard you need",
    body: "Describe the signal you care about and get a live view of it — failures, latency, cost, regressions, or a detection you wrote yourself.",
    Visual: DashboardVisual,
    span: "lg:col-span-4",
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="relative py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 tx-grid opacity-45"
      />

      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="max-w-2xl">
          <SectionLabel>platform</SectionLabel>
          <h2 className="mt-4 text-[32px] leading-[1.02] text-balance sm:text-[44px]">
            Everything you need to debug agentic workflows
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-muted text-balance sm:text-[17px]">
            The tools your team needs to understand and improve agent behaviour —
            in one place, sharing one source of truth.
          </p>
        </div>

        <div className="mt-10 grid gap-px bg-line lg:grid-cols-6">
          {capabilities.map((capability, index) => (
            <motion.article
              key={capability.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: (index % 2) * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={cn(
                "group relative flex min-w-0 flex-col bg-raised p-5 transition-colors duration-300 hover:bg-surface sm:p-6",
                capability.span,
              )}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-0 right-0 h-16 w-16 tx-hatch-brand opacity-0 transition-opacity duration-300 group-hover:opacity-40 [mask-image:linear-gradient(225deg,#000,transparent)]"
              />

              <div className="flex items-center gap-2.5">
                <span className="flex h-6 w-6 items-center justify-center bg-brand-soft text-brand">
                  <capability.Icon className="h-3.5 w-3.5" />
                </span>
                <span className="font-mono text-[10.5px] tracking-[0.16em] text-faint uppercase">
                  {capability.label}
                </span>
                <span className="ml-auto font-mono text-[10.5px] text-line">
                  {capability.index}
                </span>
              </div>

              <h3 className="mt-4 text-[20px] leading-[1.15] text-balance">
                {capability.title}
              </h3>
              <p className="mt-2 max-w-lg text-[13.5px] leading-relaxed text-muted">
                {capability.body}
              </p>

              <div className="mt-5 min-w-0">
                <capability.Visual />
              </div>
            </motion.article>
          ))}

          <div className="flex min-w-0 flex-col gap-5 bg-raised p-5 sm:p-6 lg:col-span-6 lg:flex-row lg:items-center lg:gap-10">
            <div className="lg:max-w-sm">
              <div className="flex items-center gap-2.5">
                <span className="flex h-6 w-6 items-center justify-center bg-brand-soft text-brand">
                  <Terminal className="h-3.5 w-3.5" />
                </span>
                <span className="font-mono text-[10.5px] tracking-[0.16em] text-faint uppercase">
                  open sdk
                </span>
              </div>

              <h3 className="mt-4 text-[20px] leading-[1.15] text-balance">
                Trace anything you can call
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
                One decorator wraps any function — a retrieval step, a ranker, a
                pricing lookup — and it shows up in the same trace as the model
                calls around it.
              </p>

              <a
                href="https://docs.neatlogs.com"
                className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.1em] text-brand uppercase transition-colors hover:text-ink"
              >
                Read the SDK reference
                <ArrowRight className="h-3 w-3" />
              </a>
            </div>

            <div className="min-w-0 flex-1">
              <SdkVisual />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
