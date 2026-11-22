import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-[color,background-color,border-color,scale] active:scale-[0.97] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-heading text-background hover:bg-heading/90",
        destructive: "bg-danger text-background hover:bg-danger/90",
        outline:
          "border border-border bg-surface hover:bg-surface-hover hover:text-heading",
        secondary:
          "border-border bg-surface text-heading hover:bg-surface-hover",
        ghost: "hover:bg-surface-hover hover:text-heading",
        link: "text-heading underline-offset-4 hover:underline hover:text-accent",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button: React.FC<ButtonProps & { ref?: React.Ref<HTMLButtonElement> }> = (
  props,
) => {
  const { className, variant, size, asChild = false, ref, ...rest } = props;
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...rest}
    />
  );
};
Button.displayName = "Button";

export { Button, buttonVariants };
