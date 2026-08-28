import { highlight, tokenClasses, type Language } from "@/lib/highlight";
import { cn } from "@/lib/utils";

type CodeBlockProps = {
  code: string;
  language: Language;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  className?: string;
};

export function CodeBlock({
  code,
  language,
  showLineNumbers = false,
  highlightLines = [],
  className,
}: CodeBlockProps) {
  const lines = code.split("\n");

  return (
    <pre
      className={cn(
        "no-scrollbar overflow-x-auto font-mono text-[12px] leading-[1.85]",
        className,
      )}
    >
      <code>
        {lines.map((line, index) => (
          <div
            key={index}
            className={cn(
              "flex px-3.5",
              highlightLines.includes(index + 1)
                ? "bg-brand/[0.08] shadow-[inset_2px_0_0_var(--color-brand)]"
                : null,
            )}
          >
            {showLineNumbers ? (
              <span className="mr-3.5 w-4 shrink-0 text-right text-faint select-none">
                {index + 1}
              </span>
            ) : null}

            <span className="min-w-0">
              {line.length === 0 ? (
                <span> </span>
              ) : (
                highlight(line, language).map((token, tokenIndex) => (
                  <span key={tokenIndex} className={tokenClasses[token.type]}>
                    {token.text}
                  </span>
                ))
              )}
            </span>
          </div>
        ))}
      </code>
    </pre>
  );
}
