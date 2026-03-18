import type { Metadata } from "next";
import { ScoreRing } from "@/components/ui/score-ring";
import { CodeBlock } from "@/components/ui/code-block";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Roast Results | devroast",
  description: "Your code has been roasted. See the analysis and improvements.",
};

const STATIC_ROAST_DATA = {
  id: "abc123-def456-ghi789",
  score: 3.5,
  verdict: "needs_serious_help",
  roastQuote: "this code looks like it was written during a power outage... in 2005.",
  language: "javascript",
  lines: 7,
  submittedCode: `function calculateTotal(items) {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    total = total + items[i].price;
  }
  return total;
  
  // TODO: handle tax calculation
  // TODO: handle currency conversion
}`,
  issues: [
    {
      type: "error" as const,
      title: "using var instead of const/let",
      description:
        "var is function-scoped and leads to hoisting bugs. use const by default, let when reassignment is needed.",
    },
    {
      type: "error" as const,
      title: "imperative loop pattern",
      description:
        "for loops are verbose and error-prone. use .reduce() or .map() for cleaner, functional transformations.",
    },
    {
      type: "success" as const,
      title: "clear naming conventions",
      description:
        "calculateTotal and items are descriptive, self-documenting names that communicate intent without comments.",
    },
    {
      type: "success" as const,
      title: "single responsibility",
      description:
        "the function does one thing well — calculates a total. no side effects, no mixed concerns, no hidden complexity.",
    },
  ],
  improvedCode: `function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}`,
};

function getVerdictColor(verdict: string) {
  if (verdict.includes("serious_help") || verdict.includes("disaster")) {
    return "bg-accent-red";
  }
  if (verdict.includes("needs_work")) {
    return "bg-accent-amber";
  }
  return "bg-accent-green";
}

function getIssueIcon(type: "error" | "success") {
  return type === "error" ? "✗" : "✓";
}

function getIssueColor(type: "error" | "success") {
  return type === "error" ? "text-accent-red" : "text-accent-green";
}

export default async function RoastResultsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex flex-col items-center w-full max-w-240 mx-auto px-10 py-10">
      <div className="flex flex-col gap-10 w-full">
        <div className="flex items-center gap-12">
          <ScoreRing value={STATIC_ROAST_DATA.score} size="lg" />
          <div className="flex flex-col gap-4 flex-1">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${getVerdictColor(STATIC_ROAST_DATA.verdict)}`} />
              <span className={`font-mono text-sm font-medium ${getVerdictColor(STATIC_ROAST_DATA.verdict).replace("bg-", "text-")}`}>
                verdict: {STATIC_ROAST_DATA.verdict}
              </span>
            </div>
            <blockquote className="text-text-primary font-mono text-xl leading-relaxed">
              &ldquo;{STATIC_ROAST_DATA.roastQuote}&rdquo;
            </blockquote>
            <div className="flex items-center gap-4 text-text-tertiary font-mono text-xs">
              <span>lang: {STATIC_ROAST_DATA.language}</span>
              <span>·</span>
              <span>{STATIC_ROAST_DATA.lines} lines</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 border border-border rounded text-text-primary font-mono text-xs hover:bg-bg-elevated transition-colors">
                $ share_roast
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-border" />

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="text-accent-green font-mono text-sm font-bold">&gt;</span>
            <span className="text-text-primary font-mono text-sm font-bold">submitted_code</span>
          </div>
          <CodeBlock
            code={STATIC_ROAST_DATA.submittedCode}
            language={STATIC_ROAST_DATA.language}
            filename={`code.${STATIC_ROAST_DATA.language === "javascript" ? "js" : STATIC_ROAST_DATA.language}`}
          />
        </div>

        <div className="border-t border-border" />

        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <span className="text-accent-green font-mono text-sm font-bold">&gt;</span>
            <span className="text-text-primary font-mono text-sm font-bold">analysis</span>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {STATIC_ROAST_DATA.issues.map((issue, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <span className={`font-mono text-sm ${getIssueColor(issue.type)}`}>
                      {getIssueIcon(issue.type)}
                    </span>
                    <CardTitle className="font-mono text-sm">{issue.title}</CardTitle>
                  </div>
                  <CardDescription className="font-mono text-xs">
                    {issue.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        <div className="border-t border-border" />

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="text-accent-green font-mono text-sm font-bold">&gt;</span>
            <span className="text-text-primary font-mono text-sm font-bold">improved_code</span>
          </div>
          <CodeBlock
            code={STATIC_ROAST_DATA.improvedCode}
            language={STATIC_ROAST_DATA.language}
            filename={`improved_code.${STATIC_ROAST_DATA.language === "javascript" ? "js" : STATIC_ROAST_DATA.language}`}
          />
        </div>
      </div>
    </div>
  );
}
