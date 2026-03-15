import { codeToHtml } from "shiki";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export async function CodeBlock({
  code,
  language = "javascript",
}: CodeBlockProps) {
  const html = await codeToHtml(code, {
    lang: language,
    theme: "vesper",
  });

  return (
    <div className="rounded-md border border-border overflow-hidden">
      <div className="flex items-center justify-between px-4 py-0 h-10 border-b border-border bg-bg-elevated">
        <span className="font-mono text-xs text-text-tertiary">
          lang: {language}
        </span>
        <span className="font-mono text-xs text-text-tertiary">
          {code.split("\n").length} lines
        </span>
      </div>
      {/* eslint-disable-next-line security/noDangerouslySetInnerHtml */}
      <div
        className="font-mono text-sm [&_pre]:!bg-transparent [&_pre]:!m-0 [&_pre]:!p-4"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
