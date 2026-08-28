"use client";

import { motion } from "motion/react";

import { SectionLabel } from "@/components/ui/section-label";
import { ArrowRight, Check, Close } from "@/components/ui/icons";

const before = [
  "A screenshot of a bad answer pasted into Slack",
  "An engineer re-runs it locally and can't reproduce",
  "Someone guesses at the prompt and edits it in place",
  "Nobody knows whether the change helped",
];

const after = [
  "The exact run, linked — every span, prompt, and tool call",
  "Comments land on the span that actually failed",
  "A suggested fix, with the evidence that motivated it",
  "The next runs prove whether it worked",
];

export function ContrastSection() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="max-w-2xl">
          <SectionLabel>why it matters</SectionLabel>
          <h2 className="mt-4 text-[32px] leading-[1.02] text-balance sm:text-[44px]">
            Agent bugs aren&apos;t stack traces
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-muted text-balance sm:text-[17px]">
            They&apos;re judgement calls buried in a prompt, a tool description, or
            a retry three steps back. Which is why the person who spots them
            usually isn&apos;t the person who can fix them.
          </p>
        </div>

        <div className="relative mt-10 grid gap-px bg-line lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-surface p-5 sm:p-7"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 tx-hatch opacity-25"
            />

            <div className="relative flex items-center gap-2.5">
              <span className="flex h-6 w-6 items-center justify-center bg-line-soft text-muted">
                <Close className="h-3 w-3" />
              </span>
              <span className="font-mono text-[10.5px] tracking-[0.18em] text-faint uppercase">
                today
              </span>
            </div>

            <ul className="relative mt-5 space-y-0">
              {before.map((item, index) => (
                <li
                  key={item}
                  className="flex items-start gap-3 border-t border-line/60 py-3 last:border-b"
                >
                  <span className="mt-0.5 font-mono text-[10.5px] text-faint">
                    0{index + 1}
                  </span>
                  <span className="text-[14px] leading-relaxed text-muted line-through decoration-line decoration-1">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-raised p-5 sm:p-7"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-0 right-0 h-28 w-28 tx-hatch-brand opacity-40 [mask-image:linear-gradient(225deg,#000,transparent)]"
            />

            <div className="relative flex items-center gap-2.5">
              <span className="flex h-6 w-6 items-center justify-center bg-brand text-raised">
                <Check className="h-3 w-3" />
              </span>
              <span className="font-mono text-[10.5px] tracking-[0.18em] text-brand uppercase">
                with neatlogs
              </span>
            </div>

            <ul className="relative mt-5 space-y-0">
              {after.map((item, index) => (
                <li
                  key={item}
                  className="flex items-start gap-3 border-t border-line/60 py-3 last:border-b"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25 + index * 0.09, duration: 0.3 }}
                    className="mt-1 flex h-3.5 w-3.5 shrink-0 items-center justify-center bg-brand text-raised"
                  >
                    <Check className="h-2 w-2" />
                  </motion.span>
                  <span className="text-[14px] leading-relaxed text-ink-soft">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          <span className="absolute top-1/2 left-1/2 hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-ink text-raised lg:flex">
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </section>
  );
}
