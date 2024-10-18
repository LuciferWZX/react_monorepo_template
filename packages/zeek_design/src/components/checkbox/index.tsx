"use client";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import { cn } from "@/lib/utils";
import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useContext,
} from "react";
import { DisabledContext } from "@/components/config-provider/DisabledContext.tsx";
import { Check } from "lucide-react";

const Checkbox = forwardRef<
  ElementRef<typeof CheckboxPrimitive.Root>,
  ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, disabled: customDisabled, children, ...props }, ref) => {
  const disabled = useContext(DisabledContext);
  const mergedDisabled = customDisabled ?? disabled;
  return (
    <label
      className={cn("inline-flex items-center gap-1 ", {
        "cursor-not-allowed": mergedDisabled,
      })}
    >
      <CheckboxPrimitive.Root
        ref={ref}
        className={cn(
          "zeek-outline peer h-4 w-4 shrink-0 rounded-sm border border-border shadow  disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary hover:border-primary",
          {
            "hover:border-unset": mergedDisabled,
          },
          className,
        )}
        disabled={mergedDisabled}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          className={cn("flex items-center justify-center text-current")}
        >
          <Check className="h-4 w-4" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <span className={"peer-disabled:text-muted-foreground text-sm"}>
        {children}
      </span>
    </label>
  );
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
