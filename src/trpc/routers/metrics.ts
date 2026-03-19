import { baseProcedure, createTRPCRouter } from "../init";
import { db } from "@/db";
import { submissions } from "@/db/schema";
import { count, avg } from "drizzle-orm";

export const metricsRouter = createTRPCRouter({
  getMetrics: baseProcedure.query(async () => {
    const [countResult] = await db.select({ count: count() }).from(submissions);

    const [avgResult] = await db
      .select({ avg: avg(submissions.score) })
      .from(submissions);

    const totalSubmissions = countResult?.count ?? 0;
    const avgScore = avgResult?.avg ? Number(avgResult.avg) : 0;

    return {
      totalSubmissions,
      averageScore: Math.round(avgScore * 10) / 10,
    };
  }),
});
