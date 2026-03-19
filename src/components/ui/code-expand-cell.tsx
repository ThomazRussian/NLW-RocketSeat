"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface CodeExpandCellProps {
  previewHtml: string;
  fullHtml: string;
  needsExpansion: boolean;
  lineCount: number;
}

export function CodeExpandCell({
  previewHtml,
  fullHtml,
  needsExpansion,
  lineCount,
}: CodeExpandCellProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col gap-2 w-full">
      <div
        className={`rounded border border-border overflow-hidden transition-all duration-300 ${
          isExpanded ? "max-h-none" : "max-h-[72px]"
        }`}
      >
        <div
          className="font-mono text-xs [&_pre]:!m-0 [&_pre]:!p-3 [&_pre]:!bg-transparent"
          dangerouslySetInnerHTML={{
            __html: isExpanded ? fullHtml : previewHtml,
          }}
        />
      </div>
      {needsExpansion && (
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1.5 text-text-tertiary hover:text-text-secondary transition-colors font-mono text-xs"
        >
          <ChevronDown
            className={`w-3 h-3 transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
          {isExpanded ? "$ collapse" : "$ expand"}
        </button>
      )}
    </div>
  );
}
