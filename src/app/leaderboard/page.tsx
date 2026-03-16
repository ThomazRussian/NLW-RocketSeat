import type { Metadata } from "next";
import Link from "next/link";
import {
  TableRow,
  TableCell,
  TableRankCell,
  TableScoreCell,
  TableCodeCell,
  TableLangCell,
} from "@/components/ui/table-row";

export const metadata: Metadata = {
  title: "Shame Leaderboard | devroast",
  description: "The most roasted code on the internet. View the worst submissions ranked by shame.",
};

const LEADERBOARD_DATA = [
  {
    rank: 1,
    score: 1.2,
    code: 'eval(prompt("enter code"))',
    language: "javascript",
    lines: 3,
  },
  {
    rank: 2,
    score: 2.1,
    code: "if (password == 'password') { return true; }",
    language: "javascript",
    lines: 1,
  },
  {
    rank: 3,
    score: 2.8,
    code: "const x = 1; if (x = 1) { console.log('ok'); }",
    language: "javascript",
    lines: 2,
  },
  {
    rank: 4,
    score: 3.1,
    code: "for (let i = 0; i < 1000000; i++) { console.log(i); }",
    language: "javascript",
    lines: 1,
  },
  {
    rank: 5,
    score: 3.5,
    code: "function bad() { eval(userInput); }",
    language: "javascript",
    lines: 1,
  },
  {
    rank: 6,
    score: 3.9,
    code: "SELECT * FROM users WHERE 1=1",
    language: "sql",
    lines: 1,
  },
  {
    rank: 7,
    score: 4.2,
    code: "// TODO: fix this later\nconsole.log('hack');",
    language: "javascript",
    lines: 2,
  },
  {
    rank: 8,
    score: 4.5,
    code: "while(true) { fetch('/api/ping'); }",
    language: "javascript",
    lines: 1,
  },
];

const TOTAL_SUBMISSIONS = 2847;
const AVG_SCORE = 4.2;

export default function LeaderboardPage() {
  return (
    <div className="flex flex-col items-center w-full max-w-[960px] mx-auto px-10 py-20">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex items-center gap-3">
          <span className="text-accent-green font-mono text-[32px] font-bold">&gt;</span>
          <h1 className="text-text-primary font-mono text-[28px] font-bold">
            shame_leaderboard
          </h1>
        </div>

        <p className="text-text-secondary font-mono text-sm">
          // the most roasted code on the internet
        </p>

        <div className="flex items-center gap-2">
          <span className="text-text-tertiary font-mono text-xs">
            {TOTAL_SUBMISSIONS.toLocaleString()} submissions
          </span>
          <span className="text-text-tertiary font-mono text-xs">·</span>
          <span className="text-text-tertiary font-mono text-xs">
            avg score: {AVG_SCORE}/10
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
              <span className="font-mono text-xs text-text-tertiary">score</span>
            </TableCell>
            <TableCell width="fill">
              <span className="font-mono text-xs text-text-tertiary">code</span>
            </TableCell>
            <TableCell width={100}>
              <span className="font-mono text-xs text-text-tertiary">lang</span>
            </TableCell>
            <TableCell width={60}>
              <span className="font-mono text-xs text-text-tertiary">lines</span>
            </TableCell>
          </div>

          {LEADERBOARD_DATA.map((entry) => (
            <TableRow key={entry.rank}>
              <TableRankCell rank={entry.rank} />
              <TableScoreCell score={entry.score} />
              <TableCodeCell>{entry.code}</TableCodeCell>
              <TableLangCell language={entry.language} />
              <TableCell width={60}>
                <span className="font-mono text-xs text-text-tertiary">
                  {entry.lines} {entry.lines === 1 ? "line" : "lines"}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </div>

        <div className="flex justify-center gap-2 py-4">
          <span className="text-text-tertiary font-mono text-xs">
            showing top {LEADERBOARD_DATA.length} of {TOTAL_SUBMISSIONS.toLocaleString()} ·
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
