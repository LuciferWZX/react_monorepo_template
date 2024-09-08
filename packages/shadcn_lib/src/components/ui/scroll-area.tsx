import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import { cn } from "../../lib/utils";

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> & {
    hideHorizontal?: boolean;
    hideVertical?: boolean;
    breakAll?: boolean;
    classes?: {
      viewport?: string;
      corner?: string;
      thumb?: string | { vertical?: string; horizontal?: string };
    };
  }
>(
  (
    {
      className,
      breakAll,
      children,
      hideHorizontal,
      hideVertical,
      classes,
      ...props
    },
    ref,
  ) => (
    <ScrollAreaPrimitive.Root
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        className={cn(
          "h-full w-full rounded-[inherit]",
          {
            "break-all": breakAll,
          },
          classes?.viewport,
        )}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      {!hideVertical && (
        <ScrollBar
          thumbClassName={
            typeof classes?.thumb === "string"
              ? classes.thumb
              : classes?.thumb?.vertical
          }
        />
      )}
      {!hideHorizontal && (
        <ScrollBar
          thumbClassName={
            typeof classes?.thumb === "string"
              ? classes.thumb
              : classes?.thumb?.horizontal
          }
          orientation={"horizontal"}
        />
      )}
      <ScrollAreaPrimitive.Corner className={classes?.corner} />
    </ScrollAreaPrimitive.Root>
  ),
);
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<
    typeof ScrollAreaPrimitive.ScrollAreaScrollbar
  > & {
    thumbClassName?: string;
  }
>(({ className, orientation = "vertical", thumbClassName, ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className,
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb
      className={cn("relative flex-1 rounded-full bg-border", thumbClassName)}
    />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
