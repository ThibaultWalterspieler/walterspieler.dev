import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";

const Breadcrumb: React.FC<
  React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ReactNode;
    ref?: React.Ref<HTMLElement>;
  }
> = (props) => {
  const { ref, ...rest } = props;
  return <nav aria-label="breadcrumb" ref={ref} {...rest} />;
};
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList: React.FC<
  React.ComponentPropsWithoutRef<"ol"> & { ref?: React.Ref<HTMLOListElement> }
> = (props) => {
  const { className, ref, ...rest } = props;
  return (
    <ol
      className={cn(
        "flex flex-wrap items-center gap-1.5 text-sm break-words text-stone-500 sm:gap-2.5 dark:text-stone-400",
        className,
      )}
      ref={ref}
      {...rest}
    />
  );
};
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem: React.FC<
  React.ComponentPropsWithoutRef<"li"> & { ref?: React.Ref<HTMLLIElement> }
> = (props) => {
  const { className, ref, ...rest } = props;
  return (
    <li
      className={cn("inline-flex items-center gap-1.5", className)}
      ref={ref}
      {...rest}
    />
  );
};
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink: React.FC<
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean;
    ref?: React.Ref<HTMLAnchorElement>;
  }
> = (props) => {
  const { asChild, className, ref, ...rest } = props;
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      className={cn(
        "transition-colors hover:text-stone-950 dark:hover:text-stone-50",
        className,
      )}
      ref={ref}
      {...rest}
    />
  );
};
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage: React.FC<
  React.ComponentPropsWithoutRef<"span"> & { ref?: React.Ref<HTMLSpanElement> }
> = (props) => {
  const { className, ref, ...rest } = props;
  return (
    <span
      aria-current="page"
      aria-disabled="true"
      className={cn("font-normal text-stone-950 dark:text-stone-50", className)}
      ref={ref}
      role="link"
      {...rest}
    />
  );
};
BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) => (
  <li
    aria-hidden="true"
    className={cn("[&>svg]:size-3.5", className)}
    role="presentation"
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    role="presentation"
    {...props}
  >
    <MoreHorizontal className="size-4" />
    <span className="sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis";

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
};
