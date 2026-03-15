import { Switch } from "@base-ui/react/switch";
import { forwardRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const toggleVariants = tv({
  base: "group relative inline-flex shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page disabled:pointer-events-none disabled:opacity-50",
  variants: {
    variant: {
      default: "bg-border data-[checked]:bg-accent-green",
    },
    size: {
      sm: "h-5 w-9",
      default: "h-6 w-11",
      lg: "h-7 w-[3.25rem]",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const toggleThumbVariants = tv({
  base: "pointer-events-none block rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out",
  variants: {
    size: {
      sm: "h-4 w-4 data-[checked]:translate-x-4",
      default: "h-5 w-5 data-[checked]:translate-x-5",
      lg: "h-6 w-6 data-[checked]:translate-x-6",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

type ToggleProps = Omit<React.ComponentProps<typeof Switch.Root>, "className"> &
  VariantProps<typeof toggleVariants> & {
    className?: string;
  };

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <Switch.Root
        ref={ref}
        className={toggleVariants({ variant, size, className })}
        {...props}
      >
        <Switch.Thumb className={toggleThumbVariants({ size })} />
      </Switch.Root>
    );
  },
);

Toggle.displayName = "Toggle";
