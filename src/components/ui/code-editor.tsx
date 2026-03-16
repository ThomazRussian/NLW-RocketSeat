"use client";

import { useState, useCallback, type HTMLAttributes } from "react";
import { codeToHtml } from "shiki";
import hljs from "highlight.js";
import { Loader2, ChevronDown } from "lucide-react";

interface CodeEditorProps extends HTMLAttributes<HTMLDivElement> {
  placeholder?: string;
  maxLines?: number;
  theme?: "light" | "dark";
  onCodeChange?: (code: string) => void;
}

type HighlightedState = {
  code: string;
  language: string;
  highlightedHtml: string;
} | null;

const FALLBACK_LANGUAGE = "plaintext";

const LANGUAGE_LABELS: Record<string, string> = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  python: "Python",
  java: "Java",
  cpp: "C++",
  csharp: "C#",
  go: "Go",
  rust: "Rust",
  ruby: "Ruby",
  php: "PHP",
  swift: "Swift",
  kotlin: "Kotlin",
  html: "HTML",
  css: "CSS",
  json: "JSON",
  sql: "SQL",
  bash: "Bash",
  shell: "Shell",
  plaintext: "Plain Text",
};

export function CodeEditor({
  placeholder = "// paste your code here...",
  maxLines = 100,
  theme = "dark",
  onCodeChange,
  className,
  ...props
}: CodeEditorProps) {
  const [inputCode, setInputCode] = useState("");
  const [highlightedState, setHighlightedState] = useState<HighlightedState>(null);
  const [showHighlight, setShowHighlight] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [detectedLanguage, setDetectedLanguage] = useState<string>("");

  const detectLanguage = useCallback((code: string): string => {
    const result = hljs.highlightAuto(code);
    return result.language || FALLBACK_LANGUAGE;
  }, []);

  const highlightCode = useCallback(async (code: string, language?: string) => {
    const lang = language || detectLanguage(code);
    setDetectedLanguage(lang);
    
    const lines = code.split("\n");
    const truncatedCode = lines.length > maxLines
      ? lines.slice(0, maxLines).join("\n")
      : code;

    setHighlightedState({ code: truncatedCode, language: lang, highlightedHtml: "" });
    
    setIsLoading(true);
    
    try {
      const highlightedHtml = await codeToHtml(truncatedCode, {
        lang: lang === FALLBACK_LANGUAGE ? "text" : lang,
        theme: theme === "dark" ? "vesper" : "github-light",
      });

      setHighlightedState({ code: truncatedCode, language: lang, highlightedHtml });
    } catch {
      const fallbackHtml = await codeToHtml(truncatedCode, {
        lang: "text",
        theme: theme === "dark" ? "vesper" : "github-light",
      });
      setHighlightedState({ code: truncatedCode, language: lang, highlightedHtml: fallbackHtml });
    } finally {
      setIsLoading(false);
    }
  }, [detectLanguage, maxLines, theme]);

  const handlePaste = useCallback((e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    
    setInputCode(pastedText);
    highlightCode(pastedText);
    setShowHighlight(true);
    onCodeChange?.(pastedText);
  }, [highlightCode, onCodeChange]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputCode(value);
    
    if (showHighlight && highlightedState) {
      highlightCode(value, highlightedState.language);
    }
    onCodeChange?.(value);
  }, [highlightedState, highlightCode, showHighlight, onCodeChange]);

  const codeLines = showHighlight && highlightedState 
    ? highlightedState.code.split("\n")
    : inputCode.split("\n");

  const displayedLines = codeLines.slice(0, maxLines);
  const displayLanguage = detectedLanguage || (highlightedState?.language || "");
  const languageLabel = LANGUAGE_LABELS[displayLanguage.toLowerCase()] || displayLanguage;

  return (
    <div className={className} {...props}>
      <div className="w-full border border-border rounded-md overflow-hidden">
        <div className="flex items-center justify-between h-10 px-4 border-b border-border bg-bg-elevated">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent-red" />
            <div className="w-3 h-3 rounded-full bg-accent-amber" />
            <div className="w-3 h-3 rounded-full bg-accent-green" />
          </div>
          {showHighlight && (detectedLanguage || highlightedState) ? (
            <div className="flex items-center gap-1.5 font-mono text-xs text-text-tertiary">
              {isLoading && <Loader2 className="w-3 h-3 animate-spin" />}
              {!isLoading && <ChevronDown className="w-3 h-3" />}
              <span>{languageLabel}</span>
            </div>
          ) : (
            <span className="font-mono text-xs text-text-tertiary">code.js</span>
          )}
        </div>

        {showHighlight && highlightedState ? (
          <div className="relative min-h-[360px] bg-bg-input">
            <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col items-end pr-3 py-4 bg-bg-elevated border-r border-border font-mono text-sm text-text-tertiary select-none">
              {displayedLines.map((_, index) => (
                <span key={index} className="leading-[1.5]">
                  {index + 1}
                </span>
              ))}
            </div>
            
            {isLoading ? (
              <div className="ml-12 p-4 font-mono text-sm text-text-primary whitespace-pre-wrap">
                {highlightedState.code}
              </div>
            ) : (
              <div
                className="ml-12 p-4 font-mono text-sm text-text-primary [&_pre]:!bg-transparent [&_pre]:!m-0 [&_pre]:!p-0 [&_pre]:!overflow-visible [&_span]:!leading-[1.5]"
                dangerouslySetInnerHTML={{ __html: highlightedState.highlightedHtml }}
              />
            )}
            
            <textarea
              value={inputCode}
              onChange={handleChange}
              className="absolute inset-0 ml-12 p-4 w-[calc(100%-3rem)] h-full bg-transparent font-mono text-sm text-transparent caret-text-primary resize-none focus:outline-none"
              style={{ lineHeight: "1.5" }}
              spellCheck={false}
              readOnly
            />
          </div>
        ) : (
          <textarea
            value={inputCode}
            onPaste={handlePaste}
            onChange={handleChange}
            placeholder={placeholder}
            className="w-full h-[360px] p-4 bg-bg-input font-mono text-sm text-text-primary resize-none focus:outline-none placeholder:text-text-tertiary"
            spellCheck={false}
          />
        )}

        <div className="flex items-center justify-between h-8 px-4 border-t border-border bg-bg-elevated">
          <div className="flex items-center gap-2">
            {isLoading && (
              <div className="flex items-center gap-1.5 text-text-tertiary">
                <Loader2 className="w-3 h-3 animate-spin" />
                <span className="font-mono text-xs">Detecting language...</span>
              </div>
            )}
          </div>
          <span className="font-mono text-xs text-text-tertiary">
            {displayedLines.length} / {maxLines} lines
          </span>
        </div>
      </div>
    </div>
  );
}
