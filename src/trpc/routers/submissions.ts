import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import { db } from "@/db";
import { submissions } from "@/db/schema";
import { eq, asc, count } from "drizzle-orm";

export const submissionsRouter = createTRPCRouter({
  getLeaderboard: baseProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
      }),
    )
    .query(async ({ input }) => {
      const data = await db
        .select({
          id: submissions.id,
          code: submissions.code,
          language: submissions.language,
          score: submissions.score,
          roastText: submissions.roastText,
          createdAt: submissions.createdAt,
        })
        .from(submissions)
        .orderBy(asc(submissions.score))
        .limit(input.limit);

      return data;
    }),

  getById: baseProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ input }) => {
      const [submission] = await db
        .select()
        .from(submissions)
        .where(eq(submissions.id, input.id));

      return submission ?? null;
    }),

  getCount: baseProcedure.query(async () => {
    const [result] = await db.select({ count: count() }).from(submissions);

    return Number(result?.count ?? 0);
  }),
});
