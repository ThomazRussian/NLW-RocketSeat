"use cache";
import { cacheLife } from "next/cache";
import { db } from "@/db";
import { sql } from "drizzle-orm";
import { codeToHtml } from "shiki";

const MAX_CODE_LINES = 3;

interface Submission {
  id: string;
  code: string;
  language: string;
  score: string;
}

export interface EntryWithHtml extends Submission {
  previewHtml: string;
  fullHtml: string;
  lineCount: number;
  needsExpansion: boolean;
}

export async function getLeaderboardEntries(
  limit: number
): Promise<EntryWithHtml[]> {
  cacheLife("hours");
  const result = await db.execute(
    sql`SELECT id, code, language, score FROM submissions ORDER BY score ASC LIMIT ${limit}`,
  );
  const submissions = result as unknown as Submission[];

  return Promise.all(
    submissions.map(async (entry) => {
      const lines = entry.code.split("\n");
      const lineCount = lines.length;
      const needsExpansion = lineCount > MAX_CODE_LINES;

      const truncatedCode = lines.slice(0, MAX_CODE_LINES).join("\n");
      const previewHtml = await codeToHtml(truncatedCode, {
        lang: entry.language,
        theme: "vesper",
      });
      const fullHtml = await codeToHtml(entry.code, {
        lang: entry.language,
        theme: "vesper",
      });

      return {
        ...entry,
        previewHtml,
        fullHtml,
        lineCount,
        needsExpansion,
      };
    }),
  );
}

export async function getLeaderboardStats(): Promise<number> {
  cacheLife("hours");
  const result = await db.execute(sql`SELECT COUNT(*) as count FROM submissions`);
  const row = result[0] as unknown as { count: string };
  return parseInt(row.count, 10);
}
