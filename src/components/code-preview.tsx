"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface CodePreviewProps {
  html: string;
  lineCount?: number;
  needsExpansion?: boolean;
}

export function CodePreview({
  html,
  lineCount,
  needsExpansion = false,
}: CodePreviewProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full">
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? "max-h-[1000px]" : "max-h-[72px]"
        }`}
      >
        <div
          className="rounded-md border border-border overflow-hidden font-mono text-sm [&_pre]:!bg-transparent [&_pre]:!m-0 [&_pre]:!p-4 [&_pre]:!bg-bg-input"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>

      {needsExpansion && lineCount !== undefined && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 px-3 py-1.5 border border-border rounded text-text-secondary font-mono text-xs hover:bg-bg-elevated transition-colors flex items-center gap-2"
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
