import {
  AnthropicLogo,
  CrewAILogo,
  CursorLogo,
  DiscordLogo,
  GeminiLogo,
  GitHubLogo,
  GoogleLogo,
  HaystackLogo,
  JiraLogo,
  LangChainLogo,
  LinearLogo,
  NotionLogo,
  OpenAILogo,
  OpenTelemetryLogo,
  PydanticLogo,
  PythonLogo,
  SlackLogo,
  TypeScriptLogo,
} from "@/components/ui/brand-logos";
import { TechMark } from "@/components/ui/tech-mark";

export type Brand = {
  name: string;
  color: string;
  Icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
};

const ink = "#12110f";

const mark = (label: string) =>
  function Mark({ className }: { className?: string }) {
    return <TechMark label={label} className={className} />;
  };

export const frameworks: Brand[] = [
  { name: "LangChain", color: "#1c3c3c", Icon: LangChainLogo },
  { name: "CrewAI", color: "#ff5a50", Icon: CrewAILogo },
  { name: "LlamaIndex", color: ink, Icon: mark("LI") },
  { name: "AutoGen", color: ink, Icon: mark("AG") },
  { name: "Pydantic AI", color: "#e92063", Icon: PydanticLogo },
  { name: "Agno", color: ink, Icon: mark("AO") },
  { name: "DSPy", color: ink, Icon: mark("DS") },
  { name: "Haystack", color: ink, Icon: HaystackLogo },
];

export const models: Brand[] = [
  { name: "OpenAI", color: "#412991", Icon: OpenAILogo },
  { name: "Anthropic", color: "#d97757", Icon: AnthropicLogo },
  { name: "Gemini", color: "#8e75b2", Icon: GeminiLogo },
  { name: "Google", color: "#4285f4", Icon: GoogleLogo },
];

export const destinations: Brand[] = [
  { name: "Slack", color: "#4a154b", Icon: SlackLogo },
  { name: "Linear", color: "#5e6ad2", Icon: LinearLogo },
  { name: "GitHub", color: "#181717", Icon: GitHubLogo },
  { name: "Jira", color: "#0052cc", Icon: JiraLogo },
  { name: "Notion", color: ink, Icon: NotionLogo },
  { name: "Cursor", color: ink, Icon: CursorLogo },
  { name: "Discord", color: "#5865f2", Icon: DiscordLogo },
  { name: "Webhooks", color: ink, Icon: mark("WH") },
];

export const runtimes: Brand[] = [
  { name: "Python", color: "#3776ab", Icon: PythonLogo },
  { name: "TypeScript", color: "#3178c6", Icon: TypeScriptLogo },
  { name: "OpenTelemetry", color: "#f5a800", Icon: OpenTelemetryLogo },
  { name: "REST API", color: ink, Icon: mark("API") },
];

export const marqueeBrands: Brand[] = [
  ...frameworks,
  ...models.slice(0, 3),
  ...runtimes.slice(0, 2),
];

const byName = new Map(
  [...frameworks, ...models, ...destinations, ...runtimes].map((brand) => [
    brand.name,
    brand,
  ]),
);

export function brandByName(name: string) {
  return byName.get(name) as Brand;
}
