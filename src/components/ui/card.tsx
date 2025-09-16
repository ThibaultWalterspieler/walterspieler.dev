import * as React from "react";

import { cn } from "@/lib/utils";

const Card: React.FC<
  React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
> = (props) => {
  const { className, ref, ...rest } = props;
  return (
    <div
      className={cn(
        "dark:border-eerie-light dark:bg-metal rounded-lg border border-stone-200 bg-white text-stone-950 shadow-xs dark:text-stone-50",
        className,
      )}
      ref={ref}
      {...rest}
    />
  );
};
Card.displayName = "Card";

const CardHeader: React.FC<
  React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
> = (props) => {
  const { className, ref, ...rest } = props;
  return (
    <div
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      ref={ref}
      {...rest}
    />
  );
};
CardHeader.displayName = "CardHeader";

const CardTitle: React.FC<
  React.HTMLAttributes<HTMLHeadingElement> & {
    ref?: React.Ref<HTMLHeadingElement>;
  }
> = (props) => {
  const { className, ref, ...rest } = props;
  return (
    <h3
      className={cn(
        "text-2xl leading-none font-semibold tracking-tight",
        className,
      )}
      ref={ref}
      {...rest}
    />
  );
};
CardTitle.displayName = "CardTitle";

const CardDescription: React.FC<
  React.HTMLAttributes<HTMLParagraphElement> & {
    ref?: React.Ref<HTMLParagraphElement>;
  }
> = (props) => {
  const { className, ref, ...rest } = props;
  return (
    <p
      className={cn("text-sm text-stone-500 dark:text-stone-400", className)}
      ref={ref}
      {...rest}
    />
  );
};
CardDescription.displayName = "CardDescription";

const CardContent: React.FC<
  React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
> = (props) => {
  const { className, ref, ...rest } = props;
  return <div className={cn("p-6 pt-0", className)} ref={ref} {...rest} />;
};
CardContent.displayName = "CardContent";

const CardFooter: React.FC<
  React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
> = (props) => {
  const { className, ref, ...rest } = props;
  return (
    <div
      className={cn("flex items-center p-6 pt-0", className)}
      ref={ref}
      {...rest}
    />
  );
};
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
