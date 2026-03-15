import { type ButtonHTMLAttributes, forwardRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: "inline-flex items-center justify-center gap-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  variants: {
    variant: {
      primary: "bg-accent-green text-neutral-900 enabled:hover:bg-accent-green/90",
      secondary: "bg-secondary text-neutral-900 enabled:hover:bg-secondary/90",
      outline: "border border-border bg-transparent enabled:hover:bg-secondary",
      ghost: "enabled:hover:bg-secondary",
      destructive: "bg-accent-red text-white enabled:hover:bg-accent-red/90",
      danger: "bg-accent-red text-white enabled:hover:bg-accent-red/90",
    },
    size: {
      default: "px-6 py-2.5 rounded-[11px]",
      sm: "px-4 py-1.5 rounded-lg text-xs",
      lg: "px-8 py-3 rounded-[11px]",
      icon: "size-10 rounded-lg",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
