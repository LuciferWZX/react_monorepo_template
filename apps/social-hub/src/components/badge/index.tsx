import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils.ts";

const badgeVariants = cva(
  "absolute inline-flex items-center justify-center rounded-full text-xs font-bold",
  {
    variants: {
      variant: {
        default: "bg-destructive text-destructive-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        outline: "bg-background text-foreground border border-current",
      },
      size: {
        default: "h-5 min-w-[1.25rem] px-1",
        sm: "h-4 min-w-[1rem] px-1",
        lg: "h-6 min-w-[1.5rem] px-1",
      },
      position: {
        "top-right": "-top-1 -right-1",
        "top-left": "-top-1 -left-1",
        "bottom-right": "-bottom-1 -right-1",
        "bottom-left": "-bottom-1 -left-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      position: "top-right",
    },
  },
);

interface NotificationBadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  count?: number;
  max?: number;
}

export function CountBadge({
  className,
  variant,
  size,
  position,
  count = 0,
  max = 99,
  children,
  ...props
}: NotificationBadgeProps) {
  const displayCount = count > max ? `${max}+` : count.toString();

  return count > 0 ? (
    <>
      <span
        className={cn(badgeVariants({ variant, size, position, className }))}
        {...props}
      >
        {displayCount}
      </span>
      {children}
    </>
  ) : (
    children
  );
}
