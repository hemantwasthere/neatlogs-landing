export type SpanKind = "agent" | "llm" | "tool" | "workflow";

export type DetailRow = {
  label: string;
  value: string;
  tone?: "default" | "warn" | "bad" | "good";
};

export type Comment = {
  author: string;
  initial: string;
  time: string;
  body: string;
  ai?: boolean;
  reactions?: string[];
};

export type TraceSpan = {
  id: string;
  label: string;
  kind: SpanKind;
  depth: number;
  duration: string;
  status: "ok" | "slow" | "flagged";
  summary: string;
  rows: DetailRow[];
  payload: { title: string; lines: string[] };
  comments: Comment[];
};

export const traceSpans: TraceSpan[] = [
  {
    id: "workflow",
    label: "Support Access Workflow",
    kind: "workflow",
    depth: 0,
    duration: "4.8s",
    status: "flagged",
    summary:
      "A customer emailed about an unexpected charge. The workflow read the email, picked a tool, and confirmed the action back to them.",
    rows: [
      { label: "Trigger", value: "inbound_email" },
      { label: "Steps", value: "3 agents · 1 tool · 2 LLM calls" },
      { label: "Total cost", value: "$0.0141" },
      { label: "Outcome", value: "Wrong access tier granted", tone: "bad" },
    ],
    payload: {
      title: "customer email",
      lines: [
        "To      @billing-support",
        "Cc      @design-agency",
        "Subject Unexpected charge for external agency",
        "",
        "We gave our external design agency access to one",
        "dashboard, but they were charged as a paid seat.",
      ],
    },
    comments: [
      {
        author: "Sara",
        initial: "S",
        time: "2:43 PM",
        body: "Third report this week — all of them external collaborators.",
        reactions: ["👀 1"],
      },
    ],
  },
  {
    id: "extract",
    label: "Question Extraction Agent",
    kind: "agent",
    depth: 1,
    duration: "0.9s",
    status: "ok",
    summary:
      "Parsed the inbound email into a structured request. Classification was correct — the failure happens downstream.",
    rows: [
      { label: "Intent", value: "grant_access", tone: "good" },
      { label: "Confidence", value: "0.94", tone: "good" },
      { label: "Entities", value: "agency@partner.co · 1 dashboard" },
    ],
    payload: {
      title: "structured output",
      lines: [
        "{",
        '  "intent": "grant_access",',
        '  "external": true,',
        '  "scope": "single_dashboard",',
        '  "billable_hint": null',
        "}",
      ],
    },
    comments: [],
  },
  {
    id: "ops",
    label: "Support Operations Agent",
    kind: "agent",
    depth: 1,
    duration: "3.1s",
    status: "flagged",
    summary:
      "Decided what to do about the request. This is where the run went wrong — the reasoning was fine, the tool choice wasn't.",
    rows: [
      { label: "Tools available", value: "add_member · invite_guest" },
      { label: "Tool chosen", value: "add_member", tone: "bad" },
      { label: "Prompt", value: "support-ops · v13" },
      { label: "Cost", value: "$0.0058" },
    ],
    payload: {
      title: "agent reasoning",
      lines: [
        "The customer wants their design agency to see",
        "one dashboard. add_member grants workspace",
        "access, which covers that. Using add_member",
        "with role=viewer.",
      ],
    },
    comments: [
      {
        author: "Sara",
        initial: "S",
        time: "2:42 PM",
        body: "Reasoning looks sane — it just never learned that external means non-billable.",
      },
    ],
  },
  {
    id: "llm",
    label: "gpt-4o · tool selection",
    kind: "llm",
    depth: 2,
    duration: "1.7s",
    status: "slow",
    summary:
      "The model had to choose between two access tools. Both descriptions looked valid, so it defaulted to the first match.",
    rows: [
      { label: "Model", value: "gpt-4o-2024-11-20" },
      { label: "Latency", value: "1.7s · p95 for this span", tone: "warn" },
      { label: "Tokens", value: "1,284 in · 96 out" },
      { label: "Cost", value: "$0.0058" },
    ],
    payload: {
      title: "system prompt · v13",
      lines: [
        "You are the Support Operations Agent. Read the",
        "customer's email, figure out what they need, choose",
        "the right tool, and confirm what was done.",
        "",
        "Tools: add_member, invite_guest",
      ],
    },
    comments: [
      {
        author: "Marcus",
        initial: "M",
        time: "2:43 PM",
        body: "@neatlogs why did it pick add_member instead of invite_guest?",
        reactions: ["👍 1"],
      },
      {
        author: "neatlogs AI",
        initial: "N",
        time: "2:43 PM",
        ai: true,
        body: "The tool descriptions explain what each tool does, but not when to use one over the other. Nothing tells the model that external, non-billable access should go through invite_guest.",
        reactions: ["💡 1", "🎯 2"],
      },
    ],
  },
  {
    id: "tool",
    label: "add_member",
    kind: "tool",
    depth: 2,
    duration: "0.6s",
    status: "flagged",
    summary:
      "The wrong tool ran. It succeeded technically — and created a billable seat for an external collaborator.",
    rows: [
      { label: "Tool", value: "add_member", tone: "bad" },
      { label: "Expected", value: "invite_guest", tone: "good" },
      { label: "Result", value: "member created · billable", tone: "bad" },
      { label: "Blast radius", value: "3 runs in the last 7 days", tone: "warn" },
    ],
    payload: {
      title: "tool call",
      lines: [
        "add_member({",
        '  email: "agency@partner.co",',
        '  role: "viewer",',
        '  seat:  "paid"',
        "})",
        "",
        "→ 201 member.created",
      ],
    },
    comments: [
      {
        author: "Sara",
        initial: "S",
        time: "2:44 PM",
        body: "This should have used the guest invite flow. Fix the tool description so the boundary is explicit.",
        reactions: ["🎯 2"],
      },
    ],
  },
  {
    id: "reply",
    label: "Reply Drafting Agent",
    kind: "agent",
    depth: 1,
    duration: "0.8s",
    status: "ok",
    summary:
      "Confirmed the action back to the customer. The reply was accurate about what happened — which is how the charge got noticed.",
    rows: [
      { label: "Channel", value: "email" },
      { label: "Tone check", value: "passed", tone: "good" },
      { label: "Cost", value: "$0.0083" },
    ],
    payload: {
      title: "drafted reply",
      lines: [
        "Hi — I've added agency@partner.co to your",
        "workspace with viewer access. This adds one",
        "seat to your current plan.",
      ],
    },
    comments: [],
  },
];
