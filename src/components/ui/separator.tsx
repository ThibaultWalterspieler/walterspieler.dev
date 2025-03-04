"use client";

import * as React from "react";

import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";

const Separator = (
  {
    ref,
    className,
    orientation = "horizontal",
    decorative = true,
    ...props
  }: React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> & {
    ref: React.RefObject<React.ElementRef<typeof SeparatorPrimitive.Root>>;
  }
) => (<SeparatorPrimitive.Root
  className={cn(
    "shrink-0 rounded-lg border border-grey bg-metal/50 shadow-grey",
    orientation === "horizontal" ? "h-[5px] w-full" : "h-full w-[1px]",
    className,
  )}
  decorative={decorative}
  orientation={orientation}
  ref={ref}
  {...props}
/>);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
