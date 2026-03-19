import { codeToHtml } from "shiki";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showHeader?: boolean;
  showDots?: boolean;
  maxLines?: number;
}

export async function CodeBlock({
  code,
  language = "javascript",
  filename,
  showHeader = true,
  showDots = true,
  maxLines,
}: CodeBlockProps) {
  const codeToRender = maxLines
    ? code.split("\n").slice(0, maxLines).join("\n")
    : code;

  const html = await codeToHtml(codeToRender, {
    lang: language,
    theme: "vesper",
  });

  const lineCount = code.split("\n").length;
  const isTruncated = Boolean(maxLines && lineCount > maxLines);

  return (
    <div className="rounded-md border border-border overflow-hidden">
      {showHeader && (
        <div className="flex items-center justify-between px-4 h-10 border-b border-border bg-bg-elevated">
          <div className="flex items-center gap-3">
            {showDots && (
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
              </div>
            )}
            {filename && (
              <span className="font-mono text-xs text-text-secondary">
                {filename}
              </span>
            )}
            {!filename && (
              <span className="font-mono text-xs text-text-tertiary">
                lang: {language}
              </span>
            )}
          </div>
          <span className="font-mono text-xs text-text-tertiary">
            {isTruncated ? maxLines : lineCount}{" "}
            {lineCount === 1 ? "line" : "lines"}
          </span>
        </div>
      )}
      <div
        className="font-mono text-sm [&_pre]:!bg-transparent [&_pre]:!m-0 [&_pre]:!p-4"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {isTruncated && (
        <div className="px-4 py-2 border-t border-border bg-bg-elevated">
          <span className="font-mono text-xs text-text-tertiary">
            ... {lineCount - (maxLines ?? 0)} more lines
          </span>
        </div>
      )}
    </div>
  );
}
