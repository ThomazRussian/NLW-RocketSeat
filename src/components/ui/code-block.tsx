import { codeToHtml } from "shiki";
import { CodeBlockHeader } from "./code-block-header";

export { CodeBlockHeader };

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
  const isTruncated = maxLines && lineCount > maxLines;

  return (
    <div className="rounded-md border border-border overflow-hidden">
      {showHeader && (
        <CodeBlockHeader
          language={language}
          filename={filename}
          showDots={showDots}
          lineCount={isTruncated ? maxLines : lineCount}
        />
      )}
      <div
        className="font-mono text-sm [&_pre]:!bg-transparent [&_pre]:!m-0 [&_pre]:!p-4"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {isTruncated && (
        <div className="px-4 py-2 border-t border-border bg-bg-elevated">
          <span className="font-mono text-xs text-text-tertiary">
            ... {lineCount - maxLines} more lines
          </span>
        </div>
      )}
    </div>
  );
}
