import { db } from "@/db";
import { sql } from "drizzle-orm";
import type { Submission } from "@/db/schema";

const MOCK_ROASTS = [
  "This code is so bad, even the compiler is crying.",
  "I've seen better code in a Hello World tutorial.",
  "Your variable names are more confusing than the code itself.",
  "This is why we can't have nice things in programming.",
  "If this code were a joke, you'd be the punchline.",
  "My grandmother codes better than this, and she's been dead for 20 years.",
  "This code would fail a job interview immediately.",
  "The only thing worse than this code is your git commit messages.",
  "This is a perfect example of how NOT to write software.",
  "Did you even read the documentation before writing this?",
];

export async function submitCode(
  code: string,
  language: string,
  isRoastMode: boolean,
): Promise<Submission> {
  const score = (Math.random() * 10).toFixed(1);
  const roastText = isRoastMode
    ? MOCK_ROASTS[Math.floor(Math.random() * MOCK_ROASTS.length)]
    : `Code analysis: ${language} code detected. Consider improving readability.`;

  const result = await db.execute(
    sql`INSERT INTO submissions (code, language, "isRoastMode", score, "roastText")
     VALUES (${code}, ${language}, ${isRoastMode}, ${score}, ${roastText})
     RETURNING id, code, language, "isRoastMode", score, "roastText", "createdAt"`,
  );

  return result[0] as unknown as Submission;
}

export async function getLeaderboard(limit = 10): Promise<Submission[]> {
  const result = await db.execute(
    sql`SELECT id, code, language, "isRoastMode", score, "roastText", "createdAt"
     FROM submissions
     ORDER BY score ASC
     LIMIT ${limit}`,
  );

  return result as unknown as Submission[];
}

export async function getAllSubmissionsCount(): Promise<number> {
  const result = await db.execute(
    sql`SELECT COUNT(*) as count FROM submissions`,
  );
  const row = result[0] as unknown as { count: string };
  return parseInt(row.count, 10);
}
