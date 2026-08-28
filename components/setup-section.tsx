"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";

import { SectionLabel } from "@/components/ui/section-label";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { CodeBlock } from "@/components/ui/code-block";
import { CopyCommand } from "@/components/ui/copy-command";
import { Frame, RuleLabel } from "@/components/ui/frame";
import type { Language } from "@/lib/highlight";
import { cn } from "@/lib/utils";

type Snippet = {
  id: string;
  label: string;
  file: string;
  install: string;
  language: Language;
  code: string;
  highlightLines: number[];
};

const snippets: Snippet[] = [
  {
    id: "python",
    label: "Python",
    file: "agent.py",
    install: "pip install -U neatlogs",
    language: "python",
    highlightLines: [1, 3],
    code: `import neatlogs

neatlogs.init()

# every LLM call, tool call and retry
# from here on is traced
agent.run(inbound_email)`,
  },
  {
    id: "typescript",
    label: "TypeScript",
    file: "agent.ts",
    install: "bun add neatlogs",
    language: "typescript",
    highlightLines: [1, 3],
    code: `import { init } from "neatlogs";

init();

// spans stream in as the agent runs
await agent.run(inboundEmail);`,
  },
  {
    id: "wizard",
    label: "Auto-detect",
    file: "terminal",
    install: "npx @neatlogs/wizard",
    language: "shell",
    highlightLines: [],
    code: `✔ detected  langchain, openai
✔ installed neatlogs
✔ patched   src/agent.py

→ first trace in 30 seconds`,
  },
];

export function SetupSection() {
  const [activeId, setActiveId] = React.useState("python");

  const active = snippets.find((snippet) => snippet.id === activeId)!;

  return (
    <section
      id="start"
      className="relative border-y border-line bg-surface py-20 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 tx-grid opacity-50"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <SectionLabel>setup</SectionLabel>
            <h2 className="mt-4 text-[32px] leading-[1.02] text-balance sm:text-[44px]">
              Two lines to your first trace
            </h2>
            <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-muted sm:text-[17px]">
              No collectors to run, no schema to design. Drop the SDK in, keep
              your framework, and every LLM call, tool call, and retry shows up
              in the workspace.
            </p>

            <ul className="mt-6 space-y-0">
              {[
                "Works with whatever you already run — no rewrite",
                "Auto-instruments popular frameworks out of the box",
                "Self-host or use the managed workspace",
              ].map((item, index) => (
                <li
                  key={item}
                  className="flex items-start gap-3 border-t border-line py-3 last:border-b"
                >
                  <span className="mt-0.5 font-mono text-[10.5px] text-brand">
                    0{index + 1}
                  </span>
                  <span className="text-[14px] leading-relaxed text-ink-soft">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <Frame>
            <div className="flex items-center justify-between border-b border-line bg-surface pr-3">
              <div className="flex">
                {snippets.map((snippet) => (
                  <button
                    key={snippet.id}
                    type="button"
                    onClick={() => setActiveId(snippet.id)}
                    className={cn(
                      "relative cursor-pointer px-3.5 py-2.5 font-mono text-[11px] tracking-[0.08em] uppercase transition-colors",
                      snippet.id === activeId
                        ? "text-ink"
                        : "text-faint hover:text-ink-soft",
                    )}
                  >
                    {snippet.label}
                    {snippet.id === activeId ? (
                      <motion.span
                        layoutId="snippet-underline"
                        className="absolute inset-x-0 -bottom-px h-0.5 bg-brand"
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      />
                    ) : null}
                  </button>
                ))}
              </div>

              <span className="hidden font-mono text-[10px] text-faint sm:block">
                {active.file}
              </span>
            </div>

            <div className="p-3">
              <CopyCommand command={active.install} className="w-full" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="mt-3 bg-surface py-3 shadow-[inset_0_0_0_1px_var(--color-line)]"
                >
                  <CodeBlock
                    code={active.code}
                    language={active.language}
                    highlightLines={active.highlightLines}
                    showLineNumbers={active.language !== "shell"}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </Frame>
        </div>

        <div className="mt-16 sm:mt-20">
          <RuleLabel className="mb-8">where the data goes</RuleLabel>
          <ArchitectureDiagram />
        </div>
      </div>
    </section>
  );
}
