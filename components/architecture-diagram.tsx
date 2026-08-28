"use client";

import { motion } from "motion/react";

import { brandByName } from "@/lib/brands";

const workspaceParts = ["Traces", "Prompts", "Evals", "Dashboards"];

const outputs = [
  { note: "alerts", brand: brandByName("Slack") },
  { note: "tasks", brand: brandByName("Linear") },
  { note: "PRs", brand: brandByName("GitHub") },
  { note: "handoff", brand: brandByName("Cursor") },
];

const outputY = [104, 172, 240, 308];

const mobileNodes = [
  {
    step: "01",
    title: "Your agent",
    body: "Any framework — LLM calls, tool calls, retries.",
  },
  {
    step: "02",
    title: "neatlogs.init()",
    body: "Two lines. Every run lands in the workspace.",
  },
  {
    step: "03",
    title: "Traces, prompts, evals, dashboards",
    body: "Your team reads, comments, and decides in one place.",
  },
  {
    step: "04",
    title: "Slack, Linear, GitHub, Cursor",
    body: "The fix goes where your team already works.",
  },
];

const connectors = [
  "M182 206 H252",
  "M414 206 H452",
  ...outputY.map((y) => `M668 206 C 706 206, 712 ${y}, 748 ${y}`),
];

export function ArchitectureDiagram() {
  return (
    <>
      <div className="hidden lg:block">
        <svg
          viewBox="0 8 980 330"
          className="w-full"
          role="img"
          aria-label="Neatlogs sits between your agent runtime and the tools your team already uses"
        >
          <defs>
            <pattern
              id="diagram-hatch"
              width="6"
              height="6"
              patternTransform="rotate(-55)"
              patternUnits="userSpaceOnUse"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="6"
                stroke="var(--color-brand-line)"
                strokeWidth="1"
              />
            </pattern>
          </defs>

          {[
            { x: 96, label: "01 instrument" },
            { x: 560, label: "02 collect & collaborate" },
            { x: 864, label: "03 act" },
          ].map((header) => (
            <text
              key={header.label}
              x={header.x}
              y="26"
              textAnchor="middle"
              fontSize="10"
              letterSpacing="2"
              fill="var(--color-faint)"
              className="font-mono uppercase"
            >
              {header.label}
            </text>
          ))}

          {connectors.map((d, index) => (
            <g key={d}>
              <motion.path
                d={d}
                fill="none"
                stroke="var(--color-line)"
                strokeWidth="1.2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
              />
              <path
                d={d}
                fill="none"
                stroke="var(--color-brand)"
                strokeWidth="2.5"
                strokeLinecap="butt"
                strokeDasharray="12 988"
                className="animate-packet"
                style={{ animationDelay: `${index * 0.52}s` }}
              />
            </g>
          ))}

          <g>
            <rect
              x="12"
              y="158"
              width="170"
              height="96"
              fill="var(--color-raised)"
              stroke="var(--color-line)"
            />
            <text
              x="97"
              y="190"
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill="var(--color-ink)"
            >
              Your agent
            </text>
            <text
              x="97"
              y="210"
              textAnchor="middle"
              fontSize="11"
              fill="var(--color-muted)"
            >
              any framework
            </text>
            <text
              x="97"
              y="234"
              textAnchor="middle"
              fontSize="9.5"
              letterSpacing="0.5"
              fill="var(--color-faint)"
              className="font-mono"
            >
              LLM · tools · retries
            </text>
          </g>

          <g>
            <rect
              x="252"
              y="184"
              width="162"
              height="44"
              fill="var(--color-brand-soft)"
              stroke="var(--color-brand-line)"
            />
            <text
              x="333"
              y="211"
              textAnchor="middle"
              fontSize="12"
              fill="var(--color-brand)"
              className="font-mono"
            >
              neatlogs.init()
            </text>
          </g>

          <g>
            <rect
              x="446"
              y="62"
              width="222"
              height="288"
              fill="url(#diagram-hatch)"
              opacity="0.25"
            />
            <rect
              x="452"
              y="68"
              width="210"
              height="276"
              fill="var(--color-raised)"
              stroke="var(--color-line)"
            />
            <rect
              x="452"
              y="68"
              width="210"
              height="36"
              fill="var(--color-surface)"
              stroke="var(--color-line)"
            />
            <text
              x="557"
              y="91"
              textAnchor="middle"
              fontSize="11.5"
              letterSpacing="1.4"
              fontWeight="700"
              fill="var(--color-ink)"
              className="font-mono uppercase"
            >
              neatlogs
            </text>

            {workspaceParts.map((part, index) => (
              <g key={part}>
                <rect
                  x="470"
                  y={126 + index * 52}
                  width="174"
                  height="38"
                  fill="var(--color-surface)"
                  stroke="var(--color-line-soft)"
                />
                <rect
                  x="470"
                  y={126 + index * 52}
                  width="3"
                  height="38"
                  fill="var(--color-brand)"
                />
                <text
                  x="486"
                  y={150 + index * 52}
                  fontSize="11.5"
                  fill="var(--color-ink-soft)"
                >
                  {part}
                </text>
              </g>
            ))}
          </g>

          {outputs.map((output, index) => {
            const y = outputY[index];

            return (
              <g key={output.brand.name}>
                <rect
                  x="748"
                  y={y - 20}
                  width="222"
                  height="40"
                  fill="var(--color-raised)"
                  stroke="var(--color-line)"
                />
                <output.brand.Icon
                  x={768}
                  y={y - 8}
                  width={16}
                  height={16}
                  fill={output.brand.color}
                />
                <text
                  x="794"
                  y={y + 4}
                  fontSize="12"
                  fill="var(--color-ink-soft)"
                >
                  {output.brand.name}
                </text>
                <text
                  x="952"
                  y={y + 4}
                  textAnchor="end"
                  fontSize="9.5"
                  fill="var(--color-faint)"
                  className="font-mono"
                >
                  {output.note}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="space-y-px bg-line lg:hidden">
        {mobileNodes.map((node) => (
          <div key={node.step} className="flex gap-3.5 bg-raised p-4">
            <span className="font-mono text-[11px] font-bold text-brand">
              {node.step}
            </span>
            <div className="min-w-0">
              <p className="text-[14px] font-semibold">{node.title}</p>
              <p className="mt-0.5 text-[13px] text-muted">{node.body}</p>

              {node.step === "04" ? (
                <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-2">
                  {outputs.map((output) => (
                    <span
                      key={output.brand.name}
                      className="flex items-center gap-1.5 font-mono text-[11px] text-ink-soft"
                    >
                      <output.brand.Icon
                        className="h-3.5 w-3.5 shrink-0"
                        fill={output.brand.color}
                      />
                      {output.note}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
