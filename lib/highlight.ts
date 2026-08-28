export type TokenType =
  | "plain"
  | "comment"
  | "keyword"
  | "string"
  | "number"
  | "function"
  | "property"
  | "operator"
  | "punctuation"
  | "success";

export type Token = { text: string; type: TokenType };

export type Language = "python" | "typescript" | "shell";

const keywords: Record<Language, string[]> = {
  python: [
    "import",
    "from",
    "def",
    "class",
    "return",
    "await",
    "async",
    "with",
    "as",
    "if",
    "else",
    "for",
    "in",
    "None",
    "True",
    "False",
  ],
  typescript: [
    "import",
    "from",
    "export",
    "const",
    "let",
    "var",
    "function",
    "return",
    "await",
    "async",
    "new",
    "type",
    "interface",
    "if",
    "else",
    "null",
    "true",
    "false",
  ],
  shell: [],
};

const patterns: { type: TokenType; re: RegExp }[] = [
  { type: "string", re: /^(["'`])(?:\\.|(?!\1)[^\\])*\1?/ },
  { type: "number", re: /^\b\d+(?:\.\d+)?\b/ },
  { type: "function", re: /^[A-Za-z_$][\w$]*(?=\s*\()/ },
  { type: "property", re: /^(?<=\.)[A-Za-z_$][\w$]*/ },
  { type: "plain", re: /^[A-Za-z_$][\w$]*/ },
  { type: "operator", re: /^[=+\-*/<>!&|:?]+/ },
  { type: "punctuation", re: /^[{}()[\],.;]/ },
  { type: "plain", re: /^\s+/ },
  { type: "plain", re: /^./ },
];

function commentPrefix(language: Language) {
  return language === "python" || language === "shell" ? "#" : "//";
}

export function highlight(line: string, language: Language): Token[] {
  const trimmed = line.trimStart();
  const prefix = commentPrefix(language);

  if (trimmed.startsWith(prefix)) {
    return [{ text: line, type: "comment" }];
  }

  if (language === "shell") {
    if (trimmed.startsWith("✔") || trimmed.startsWith("→")) {
      return [{ text: line, type: "success" }];
    }

    const tokens: Token[] = [];
    let first = true;

    for (const part of line.split(/(\s+)/)) {
      if (!part.trim()) {
        tokens.push({ text: part, type: "plain" });
        continue;
      }

      if (first) {
        tokens.push({ text: part, type: "function" });
        first = false;
      } else if (part.startsWith("-")) {
        tokens.push({ text: part, type: "operator" });
      } else {
        tokens.push({ text: part, type: "plain" });
      }
    }

    return tokens;
  }

  const words = keywords[language];
  const tokens: Token[] = [];
  let rest = line;

  while (rest.length > 0) {
    let matched = false;

    for (const { type, re } of patterns) {
      const match = re.exec(rest);

      if (!match || match[0].length === 0) continue;

      const text = match[0];
      const isWord = /^[A-Za-z_$]/.test(text);
      const resolved: TokenType =
        isWord && words.includes(text) ? "keyword" : type;

      tokens.push({ text, type: resolved });
      rest = rest.slice(text.length);
      matched = true;
      break;
    }

    if (!matched) {
      tokens.push({ text: rest, type: "plain" });
      break;
    }
  }

  return tokens;
}

export const tokenClasses: Record<TokenType, string> = {
  plain: "text-ink-soft",
  comment: "text-faint",
  keyword: "text-brand font-bold",
  string: "text-signal-green",
  number: "text-signal-amber",
  function: "text-signal-blue",
  property: "text-signal-blue",
  operator: "text-signal-pink",
  punctuation: "text-faint",
  success: "text-signal-green",
};
