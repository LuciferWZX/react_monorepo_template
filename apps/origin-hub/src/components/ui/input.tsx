import { cn } from "@/lib/utils";
import { ComponentProps, forwardRef } from "react";

const Input = forwardRef<HTMLInputElement, ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm shadow-black/5 transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-ring/70 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 disabled:cursor-not-allowed  disabled:bg-muted",
          type === "search" &&
            "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none",
          type === "file" &&
            "p-0 pr-3 italic text-muted-foreground/70 file:me-3 file:h-full file:border-0 file:border-r file:border-solid file:border-input file:bg-transparent file:px-3 file:text-sm file:font-medium file:not-italic file:text-foreground",
          {
            "border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/20":
              props["aria-invalid"],
          },
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
