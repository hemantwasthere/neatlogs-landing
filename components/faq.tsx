"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";

import { SectionLabel } from "@/components/ui/section-label";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What is Neatlogs?",
    answer:
      "A collaborative debugging workspace for AI agents. Your team traces runs, understands what happened, comments directly on the failing span, investigates the likely cause, and ships the fix — all in one place.",
  },
  {
    question: "How is this different from an observability tool?",
    answer:
      "Standard observability tells you what happened and stops there. Neatlogs is built around the debugging workflow that comes next: shared traces, threaded comments, evaluations, tasks, and suggested fixes, so a team moves from issue to fix instead of from dashboard to dashboard.",
  },
  {
    question: "How hard is it to get started?",
    answer:
      "Add the SDK and initialize Neatlogs with two lines of code, then run your agent. Traces start streaming in immediately. If you'd rather not touch the code yourself, the setup wizard auto-detects your stack and instruments it for you.",
  },
  {
    question: "Can non-technical teammates use it?",
    answer:
      "That's the point. Neatlogs is a shared context layer for domain experts and engineers — traces are readable and commentable by anyone on the team, so the person who noticed the problem can point at exactly where it went wrong.",
  },
  {
    question: "Does it work with my framework?",
    answer:
      "Most likely. LangChain, CrewAI, LlamaIndex, AutoGen, Pydantic AI, Agno, DSPy, and Haystack are auto-instrumented, and OpenAI, Anthropic, and Google calls are captured with cost and latency. Anything else can be traced through the open SDK.",
  },
  {
    question: "What happens to our data?",
    answer:
      "You choose. Run the managed workspace, or self-host so traces never leave your infrastructure. Either way you control retention and who on your team can see which projects.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative border-t border-line bg-surface py-20 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 tx-hatch opacity-[0.18]"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionLabel>faq</SectionLabel>
            <h2 className="mt-4 text-[32px] leading-[1.02] text-balance sm:text-[40px]">
              Common questions
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-muted">
              How Neatlogs drops into your workflow, and what changes when it
              does.
            </p>

            <div className="mt-6 bg-raised p-4 shadow-[inset_0_0_0_1px_var(--color-line)]">
              <p className="text-[13.5px] font-medium">Still need help?</p>
              <p className="mt-1 text-[13px] leading-relaxed text-muted">
                We&apos;re happy to jump on a call and dig into your stack.
              </p>
              <Button
                href="#demo"
                variant="secondary"
                size="sm"
                className="mt-3.5"
              >
                Contact support
              </Button>
            </div>
          </div>

          <div className="divide-y divide-line border-y border-line">
            {faqs.map((faq, index) => {
              const isOpen = index === openIndex;

              return (
                <div key={faq.question}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="group flex w-full cursor-pointer items-start gap-4 py-5 text-left"
                  >
                    <span className="mt-1 shrink-0 font-mono text-[11px] text-brand">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span
                      className={cn(
                        "flex-1 text-[15.5px] font-semibold transition-colors",
                        isOpen ? "text-ink" : "text-ink-soft group-hover:text-ink",
                      )}
                    >
                      {faq.question}
                    </span>

                    <span
                      className={cn(
                        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center transition-all duration-300",
                        isOpen
                          ? "rotate-180 bg-brand text-raised"
                          : "bg-line-soft text-muted group-hover:bg-brand-soft group-hover:text-brand",
                      )}
                    >
                      <ChevronDown className="h-3 w-3" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pr-9 pb-5 pl-8 text-[14px] leading-relaxed text-muted">
                          {faq.answer}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
