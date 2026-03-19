import type { Metadata } from "next";
import Link from "next/link";
import { CodeExpandCell } from "@/components/ui/code-expand-cell";
import {
  TableCell,
  TableLangCell,
  TableRankCell,
  TableRow,
  TableScoreCell,
} from "@/components/ui/table-row";
import {
  getLeaderboardEntries,
  getLeaderboardStats,
  type EntryWithHtml,
} from "@/components/leaderboard";

export const metadata: Metadata = {
  title: "Shame Leaderboard | devroast",
  description:
    "The most roasted code on the internet. View the worst submissions ranked by shame.",
};

export default async function LeaderboardPage() {
  const [entries, totalCount] = await Promise.all([
    getLeaderboardEntries(15),
    getLeaderboardStats(),
  ]);

  const avgScore =
    entries.length > 0
      ? (
          entries.reduce((acc, entry) => acc + Number(entry.score), 0) /
          entries.length
        ).toFixed(1)
      : "0.0";

  return (
    <div className="flex flex-col items-center w-full max-w-[960px] mx-auto px-10 py-20">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex items-center gap-3">
          <span className="text-accent-green font-mono text-[32px] font-bold">
            &gt;
          </span>
          <h1 className="text-text-primary font-mono text-[28px] font-bold">
            shame_leaderboard
          </h1>
        </div>

        <p className="text-text-secondary font-mono text-sm">
          {/* the most roasted code on the internet */}
        </p>

        <div className="flex items-center gap-2">
          <span className="text-text-tertiary font-mono text-xs">
            {totalCount.toLocaleString()} submissions
          </span>
          <span className="text-text-tertiary font-mono text-xs">·</span>
          <span className="text-text-tertiary font-mono text-xs">
            avg score: {avgScore}/10
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-5 w-full mt-10">
        <div className="border border-border rounded overflow-hidden">
          <div className="flex items-center h-12 px-5 bg-bg-surface border-b border-border">
            <TableCell width={50}>
              <span className="font-mono text-xs text-text-tertiary">rank</span>
            </TableCell>
            <TableCell width={70}>
              <span className="font-mono text-xs text-text-tertiary">
                score
              </span>
            </TableCell>
            <TableCell width="fill">
              <span className="font-mono text-xs text-text-tertiary">code</span>
            </TableCell>
            <TableCell width={80}>
              <span className="font-mono text-xs text-text-tertiary">lang</span>
            </TableCell>
          </div>

          {entries.length > 0 ? (
            entries.map((entry: EntryWithHtml, index: number) => (
              <TableRow key={entry.id} className="overflow-hidden">
                <TableRankCell rank={index + 1} />
                <TableScoreCell score={Number(entry.score)} />
                <TableCell width="fill" className="overflow-hidden">
                  <CodeExpandCell
                    previewHtml={entry.previewHtml}
                    fullHtml={entry.fullHtml}
                    needsExpansion={entry.needsExpansion}
                    lineCount={entry.lineCount}
                  />
                </TableCell>
                <TableLangCell language={entry.language} className="pl-4" />
              </TableRow>
            ))
          ) : (
            <div className="px-5 py-12 text-center border-b border-border">
              <p className="text-text-tertiary font-mono text-sm">
                no submissions yet. be the first to get roasted!
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-center gap-2 py-4">
          <span className="text-text-tertiary font-mono text-xs">
            showing top {entries.length} of {totalCount.toLocaleString()} ·
          </span>
          <Link
            href="/"
            className="text-text-tertiary font-mono text-xs hover:text-text-secondary transition-colors"
          >
            submit your code &gt;&gt;
          </Link>
        </div>
      </div>
    </div>
  );
}
