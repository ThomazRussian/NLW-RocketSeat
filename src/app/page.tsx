import { Suspense } from "react";
import { CodeSubmit } from "@/components/code-submit";
import { MetricsCards } from "@/components/ui/metrics-cards";
import { LeaderboardSection, LeaderboardSkeleton } from "@/components/leaderboard";

export default function Home() {
  return (
    <div className="flex flex-col items-center px-10 py-16 gap-16">
      <CodeSubmit />

      <MetricsCards />

      <Suspense fallback={<LeaderboardSkeleton />}>
        <LeaderboardSection />
      </Suspense>
    </div>
  );
}
