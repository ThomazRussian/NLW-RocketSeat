"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import {
  TableRow,
  TableCell,
  TableRankCell,
  TableScoreCell,
  TableCodeCell,
  TableLangCell,
} from "@/components/ui/table-row";

const STATIC_LEADERBOARD = [
  {
    rank: 1,
    score: 1.2,
    code: "function calculateTotal(items) { return items.reduce((acc, item) => acc + item.price, 0); }",
    language: "javascript",
  },
  {
    rank: 2,
    score: 2.8,
    code: "const x = 1; if (x = 1) { console.log('ok'); }",
    language: "javascript",
  },
  {
    rank: 3,
    score: 3.5,
    code: "for (let i = 0; i < 100; i++) { console.log(i); } // bad practice",
    language: "javascript",
  },
];

export default function Home() {
  const [code, setCode] = useState("");
  const [roastMode, setRoastMode] = useState(true);

  const handleSubmit = () => {
    console.log("Submitting code:", code, "Roast mode:", roastMode);
  };

  return (
    <div className="flex flex-col items-center px-10 py-16 gap-8">
      <div className="flex flex-col items-center gap-3 w-full max-w-[780px]">
        <div className="flex items-center gap-3">
          <span className="text-accent-green font-mono text-4xl font-bold">$</span>
          <h1 className="text-text-primary font-mono text-4xl font-bold">
            paste your code. get roasted.
          </h1>
        </div>
        <p className="text-text-secondary font-mono text-sm">
          // drop your code below and we&apos;ll rate it — brutally honest or full
          roast mode
        </p>
      </div>

      <div className="w-full max-w-[780px] border border-border rounded-md overflow-hidden">
        <div className="flex items-center justify-between h-10 px-4 border-b border-border bg-bg-elevated">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent-red" />
            <div className="w-3 h-3 rounded-full bg-accent-amber" />
            <div className="w-3 h-3 rounded-full bg-accent-green" />
          </div>
          <span className="font-mono text-xs text-text-tertiary">code.js</span>
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="// paste your code here..."
          className="w-full h-[360px] p-4 bg-bg-input font-mono text-sm text-text-primary resize-none focus:outline-none placeholder:text-text-tertiary"
          spellCheck={false}
        />
      </div>

      <div className="flex items-center justify-between w-full max-w-[780px]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Toggle checked={roastMode} onCheckedChange={setRoastMode} size="sm" />
            <span
              className={`font-mono text-sm ${roastMode ? "text-accent-green" : "text-text-secondary"}`}
            >
              roast mode
            </span>
          </div>
          <span className="text-text-tertiary font-mono text-xs">
            // maximum sarcasm enabled
          </span>
        </div>
        <Button onClick={handleSubmit} className="font-mono">
          $ roast_my_code
        </Button>
      </div>

      <div className="h-[60px]" />

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
          </div>
          {STATIC_LEADERBOARD.map((entry) => (
            <TableRow key={entry.rank}>
              <TableRankCell rank={entry.rank} />
              <TableScoreCell score={entry.score} />
              <TableCodeCell>{entry.code}</TableCodeCell>
              <TableLangCell language={entry.language} />
            </TableRow>
          ))}
        </div>

        <div className="flex justify-center gap-2 py-4">
          <span className="text-text-tertiary font-mono text-xs">
            showing top 3 of 2,847 ·
          </span>
          <Link
            href="/leaderboard"
            className="text-text-tertiary font-mono text-xs hover:text-text-secondary transition-colors"
          >
            view full leaderboard &gt;&gt;
          </Link>
        </div>
      </div>

      <div className="h-[60px]" />
    </div>
  );
}
