export function LeaderboardSkeleton() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-[960px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-accent-green font-mono text-sm font-bold">//</span>
          <span className="text-text-primary font-mono text-sm font-bold">
            shame_leaderboard
          </span>
        </div>
      </div>
      <p className="text-text-tertiary font-mono text-xs">
        // the worst code on the internet, ranked by shame
      </p>

      <div className="border border-border rounded-md overflow-hidden">
        <div className="flex items-center h-10 px-5 bg-bg-surface border-b border-border">
          <div className="w-12 shrink-0">
            <div className="h-3 w-6 bg-bg-elevated rounded animate-pulse" />
          </div>
          <div className="w-16 shrink-0">
            <div className="h-3 w-8 bg-bg-elevated rounded animate-pulse" />
          </div>
          <div className="flex-1">
            <div className="h-3 w-12 bg-bg-elevated rounded animate-pulse" />
          </div>
          <div className="w-24 shrink-0">
            <div className="h-3 w-12 bg-bg-elevated rounded animate-pulse" />
          </div>
        </div>

        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-start px-5 py-3 border-b border-border last:border-b-0"
          >
            <div className="w-12 shrink-0 pt-1">
              <div className="h-4 w-6 bg-bg-elevated rounded animate-pulse" />
            </div>
            <div className="w-16 shrink-0 pt-1">
              <div className="h-4 w-8 bg-bg-elevated rounded animate-pulse" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="h-4 w-full max-w-[300px] bg-bg-elevated rounded animate-pulse" />
              <div className="h-4 w-full max-w-[250px] bg-bg-elevated rounded animate-pulse" />
              <div className="h-4 w-full max-w-[200px] bg-bg-elevated rounded animate-pulse" />
              <div className="h-6 w-32 bg-bg-elevated rounded animate-pulse mt-2" />
            </div>
            <div className="w-24 shrink-0 pl-4 pt-1">
              <div className="h-4 w-16 bg-bg-elevated rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
