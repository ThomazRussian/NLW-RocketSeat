import { forwardRef, type HTMLAttributes } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const badgeVariants = tv({
  base: "inline-flex items-center justify-center font-mono text-xs font-medium transition-colors",
  variants: {
    variant: {
      critical: "bg-error text-error-foreground",
      warning: "bg-warning text-warning-foreground",
      good: "bg-success text-success-foreground",
      verdict: "bg-info text-info-foreground",
    },
    size: {
      sm: "px-2 py-0.5 rounded-[4px]",
      default: "px-2.5 py-1 rounded-[6px]",
    },
  },
  defaultVariants: {
    variant: "good",
    size: "default",
  },
});

type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>;

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <span
        className={badgeVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    );
  },
);

Badge.displayName = "Badge";
