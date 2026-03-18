import Link from "next/link";
import { codeToHtml } from "shiki";
import { getLeaderboard, getAllSubmissionsCount } from "@/lib/queries";
import { CodePreview } from "@/components/code-preview";

interface LeaderboardEntry {
  id: string;
  code: string;
  language: string;
  score: string;
}

const MAX_PREVIEW_LINES = 3;

async function getRenderedCode(code: string, language: string) {
  const html = await codeToHtml(code, {
    lang: language,
    theme: "vesper",
  });
  return html;
}

export async function LeaderboardSection() {
  const [submissions, totalCount] = await Promise.all([
    getLeaderboard(3),
    getAllSubmissionsCount(),
  ]);

  const entriesWithHtml = await Promise.all(
    submissions.map(async (entry: LeaderboardEntry) => {
      const lineCount = entry.code.split("\n").length;
      const needsExpansion = lineCount > MAX_PREVIEW_LINES;
      const codeToRender = needsExpansion
        ? entry.code.split("\n").slice(0, MAX_PREVIEW_LINES).join("\n")
        : entry.code;

      const html = await getRenderedCode(codeToRender, entry.language);

      return {
        ...entry,
        html,
        lineCount: needsExpansion ? lineCount - MAX_PREVIEW_LINES : 0,
        needsExpansion,
      };
    })
  );

  return (
    <div className="flex flex-col gap-6 w-full max-w-[960px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-accent-green font-mono text-sm font-bold">//</span>
          <span className="text-text-primary font-mono text-sm font-bold">
            shame_leaderboard
          </span>
        </div>
        <Link
          href="/leaderboard"
          className="px-3 py-1.5 border border-border rounded text-text-secondary font-mono text-xs hover:bg-bg-elevated transition-colors"
        >
          $ view_all &gt;&gt;
        </Link>
      </div>
      <p className="text-text-tertiary font-mono text-xs">
        // the worst code on the internet, ranked by shame
      </p>

        <div className="border border-border rounded-md overflow-hidden">
          <div className="flex items-center h-10 px-5 bg-bg-surface border-b border-border">
            <div className="w-12 shrink-0">
              <span className="font-mono text-xs text-text-tertiary">rank</span>
            </div>
            <div className="w-16 shrink-0">
              <span className="font-mono text-xs text-text-tertiary">score</span>
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-mono text-xs text-text-tertiary">code</span>
            </div>
            <div className="w-24 shrink-0">
              <span className="font-mono text-xs text-text-tertiary">lang</span>
            </div>
          </div>

          {entriesWithHtml.length > 0 ? (
            entriesWithHtml.map((entry, index) => (
              <div
                key={entry.id}
                className="flex items-start px-5 py-3 border-b border-border last:border-b-0"
              >
                <div className="w-12 shrink-0 pt-1">
                  <span className="font-mono text-sm text-text-tertiary">#{index + 1}</span>
                </div>
                <div className="w-16 shrink-0 pt-1">
                  <span className="font-mono text-sm font-bold text-accent-red">
                    {Number(entry.score).toFixed(1)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <CodePreview
                    html={entry.html}
                    lineCount={entry.lineCount}
                    needsExpansion={entry.needsExpansion}
                  />
                </div>
                <div className="w-24 shrink-0 pl-4 pt-1">
                  <span className="font-mono text-xs text-text-tertiary">{entry.language}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="px-5 py-8 text-center">
              <p className="text-text-tertiary font-mono text-sm">
                no submissions yet. be the first to get roasted!
              </p>
            </div>
          )}
        </div>

      <div className="flex justify-center gap-2 py-4">
        <span className="text-text-tertiary font-mono text-xs">
          showing top {entriesWithHtml.length} of {totalCount.toLocaleString()} ·
        </span>
        <Link
          href="/"
          className="text-text-tertiary font-mono text-xs hover:text-text-secondary transition-colors"
        >
          submit your code &gt;&gt;
        </Link>
      </div>
    </div>
  );
}
