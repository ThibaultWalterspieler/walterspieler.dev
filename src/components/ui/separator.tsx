"use client";

import * as React from "react";

import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";

const Separator: React.FC<
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> & {
    ref?: React.Ref<HTMLDivElement>;
  }
> = (props) => {
  const {
    className,
    orientation = "horizontal",
    decorative = true,
    ref,
    ...rest
  } = props;
  return (
    <SeparatorPrimitive.Root
      className={cn(
        "border-grey bg-metal/50 shadow-grey shrink-0 rounded-lg border",
        orientation === "horizontal" ? "h-[5px] w-full" : "h-full w-[1px]",
        className,
      )}
      decorative={decorative}
      orientation={orientation}
      ref={ref}
      {...rest}
    />
  );
};
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
