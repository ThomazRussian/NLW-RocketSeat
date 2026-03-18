import { createTRPCRouter } from "../init";
import { metricsRouter } from "./metrics";
import { submissionsRouter } from "./submissions";

export const appRouter = createTRPCRouter({
  metrics: metricsRouter,
  submissions: submissionsRouter,
});

export type AppRouter = typeof appRouter;
