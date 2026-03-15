import { forwardRef, type HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface ScoreRingProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: "sm" | "default" | "lg";
}

const sizes = {
  sm: 120,
  default: 180,
  lg: 240,
};

export const ScoreRing = forwardRef<HTMLDivElement, ScoreRingProps>(
  ({ value, max = 10, size = "default", className, ...props }, ref) => {
    const dimension = sizes[size];
    const percentage = (value / max) * 100;
    const circumference = 2 * Math.PI * (dimension / 2 - 8);
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    const getScoreColor = () => {
      if (percentage >= 70) return "text-accent-green";
      if (percentage >= 40) return "text-accent-amber";
      return "text-accent-red";
    };

    return (
      <div
        ref={ref}
        className={twMerge("relative inline-flex items-center justify-center", className)}
        style={{ width: dimension, height: dimension }}
        {...props}
      >
        <svg
          className="absolute inset-0 -rotate-90"
          width={dimension}
          height={dimension}
          role="img"
          aria-label={`Score: ${value} out of ${max}`}
        >
          <title>Score ring</title>
          <circle
            cx={dimension / 2}
            cy={dimension / 2}
            r={dimension / 2 - 8}
            fill="none"
            stroke="currentColor"
            strokeWidth={4}
            className="text-border"
          />
          <circle
            cx={dimension / 2}
            cy={dimension / 2}
            r={dimension / 2 - 8}
            fill="none"
            stroke="currentColor"
            strokeWidth={4}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={`${getScoreColor()} transition-all duration-500`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-mono text-text-primary"
            style={{ fontSize: dimension * 0.27 }}
          >
            {value}
          </span>
          <span
            className="font-mono text-text-tertiary"
            style={{ fontSize: dimension * 0.09 }}
          >
            /{max}
          </span>
        </div>
      </div>
    );
  },
);

ScoreRing.displayName = "ScoreRing";
