import * as React from "react";

import { cn } from "@/lib/utils";

const Card = (
  {
    ref,
    className,
    ...props
  }: React.HTMLAttributes<HTMLDivElement> & {
    ref: React.RefObject<HTMLDivElement>;
  }
) => (<div
  className={cn(
    "rounded-lg border border-stone-200 bg-white text-stone-950 shadow-xs dark:border-eerie-light dark:bg-metal dark:text-stone-50",
    className,
  )}
  ref={ref}
  {...props}
/>);
Card.displayName = "Card";

const CardHeader = (
  {
    ref,
    className,
    ...props
  }: React.HTMLAttributes<HTMLDivElement> & {
    ref: React.RefObject<HTMLDivElement>;
  }
) => (<div
  className={cn("flex flex-col space-y-1.5 p-6", className)}
  ref={ref}
  {...props}
/>);
CardHeader.displayName = "CardHeader";

const CardTitle = (
  {
    ref,
    className,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement> & {
    ref: React.RefObject<HTMLParagraphElement>;
  }
) => (<h3
  className={cn(
    "text-2xl font-semibold leading-none tracking-tight",
    className,
  )}
  ref={ref}
  {...props}
/>);
CardTitle.displayName = "CardTitle";

const CardDescription = (
  {
    ref,
    className,
    ...props
  }: React.HTMLAttributes<HTMLParagraphElement> & {
    ref: React.RefObject<HTMLParagraphElement>;
  }
) => (<p
  className={cn("text-sm text-stone-500 dark:text-stone-400", className)}
  ref={ref}
  {...props}
/>);
CardDescription.displayName = "CardDescription";

const CardContent = (
  {
    ref,
    className,
    ...props
  }: React.HTMLAttributes<HTMLDivElement> & {
    ref: React.RefObject<HTMLDivElement>;
  }
) => (<div className={cn("p-6 pt-0", className)} ref={ref} {...props} />);
CardContent.displayName = "CardContent";

const CardFooter = (
  {
    ref,
    className,
    ...props
  }: React.HTMLAttributes<HTMLDivElement> & {
    ref: React.RefObject<HTMLDivElement>;
  }
) => (<div
  className={cn("flex items-center p-6 pt-0", className)}
  ref={ref}
  {...props}
/>);
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
