import { type HTMLAttributes } from "react";
import { forwardRef, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface CodeBlockHeaderProps extends HTMLAttributes<HTMLDivElement> {
  language?: string;
  filename?: string;
  showDots?: boolean;
  lineCount?: number;
}

export const CodeBlockHeader = forwardRef<HTMLDivElement, CodeBlockHeaderProps>(
  ({ language, filename, showDots = true, lineCount, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge(
          "flex items-center justify-between px-4 h-10 border-b border-border bg-bg-elevated",
          className,
        )}
        {...props}
      >
        <div className="flex items-center gap-3">
          {showDots && (
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
            </div>
          )}
          {filename && (
            <span className="font-mono text-xs text-text-secondary">{filename}</span>
          )}
          {language && !filename && (
            <span className="font-mono text-xs text-text-tertiary">lang: {language}</span>
          )}
        </div>
        {lineCount !== undefined && (
          <span className="font-mono text-xs text-text-tertiary">
            {lineCount} {lineCount === 1 ? "line" : "lines"}
          </span>
        )}
      </div>
    );
  },
);

CodeBlockHeader.displayName = "CodeBlockHeader";
