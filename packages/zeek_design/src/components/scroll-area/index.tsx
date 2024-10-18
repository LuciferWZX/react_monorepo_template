"use client";

import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import useSize from "@/components/config-provider/hooks/useSize.ts";
import { SizeType } from "@/components/config-provider/SizeContext.tsx";

const ScrollArea = forwardRef<
  ElementRef<typeof ScrollAreaPrimitive.Root>,
  ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> & {
    classes?: {
      viewport?: string;
    };
    hiddenScrollbar?: {
      horizontal?: boolean;
      vertical?: boolean;
    };
  }
>(({ className, children, hiddenScrollbar, classes, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport
      className={cn("h-full w-full rounded-[inherit]", classes?.viewport)}
    >
      {children}
    </ScrollAreaPrimitive.Viewport>
    {!hiddenScrollbar?.vertical && <ScrollBar />}
    {!hiddenScrollbar?.horizontal && <ScrollBar orientation={"horizontal"} />}
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = forwardRef<
  ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar> & {
    componentSize?: SizeType;
  }
>(({ className, orientation = "vertical", componentSize, ...props }, ref) => {
  const mergedSize = useSize((ctxSize) => componentSize ?? ctxSize) ?? "middle";
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      ref={ref}
      orientation={orientation}
      className={cn(
        "flex touch-none select-none transition-colors",
        orientation === "vertical" &&
          "h-full w-2.5 border-l border-l-transparent p-[1px]",
        orientation === "horizontal" &&
          "h-2.5 flex-col border-t border-t-transparent p-[1px]",
        {
          "w-2": orientation === "vertical" && mergedSize === "small",
          "h-2": orientation === "horizontal" && mergedSize === "small",
        },
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-md bg-border" />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
});
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
