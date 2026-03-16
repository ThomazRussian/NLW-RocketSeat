"use client";

import { useQuery } from "@tanstack/react-query";
import NumberFlow from "@number-flow/react";
import { useTRPC } from "@/trpc/client";

export function MetricsCards() {
  const trpc = useTRPC();
  const { data } = useQuery(
    trpc.metrics.getMetrics.queryOptions(undefined, {
      placeholderData: (previousData) => previousData ?? { totalSubmissions: 0, averageScore: 0 },
    })
  );

  return (
    <div className="flex gap-8">
      <div className="flex flex-col items-center">
        <NumberFlow
          value={data?.totalSubmissions ?? 0}
          className="font-mono text-3xl font-bold text-accent-green"
        />
        <span className="font-mono text-xs text-text-tertiary mt-1">
          roasted codes
        </span>
      </div>
      <div className="w-px bg-border" />
      <div className="flex flex-col items-center">
        <NumberFlow
          value={data?.averageScore ?? 0}
          className="font-mono text-3xl font-bold text-accent-green"
        />
        <span className="font-mono text-xs text-text-tertiary mt-1">
          average score
        </span>
      </div>
    </div>
  );
}
