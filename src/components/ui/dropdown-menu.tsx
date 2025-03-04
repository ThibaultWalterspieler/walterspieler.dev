"use client";

import * as React from "react";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = ({
  ref,
  className,
  inset,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
  ref: React.RefObject<
    React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>
  >;
  inset?: boolean;
}) => (
  <DropdownMenuPrimitive.SubTrigger
    className={cn(
      "dark:focus:bg-metal flex cursor-default items-center rounded-xs px-2 py-1.5 text-sm outline-hidden select-none focus:bg-stone-100 data-[state=open]:bg-stone-100 dark:data-[state=open]:bg-stone-800",
      {
        "pl-8": inset,
      },
      className,
    )}
    ref={ref}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto size-4" />
  </DropdownMenuPrimitive.SubTrigger>
);
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent> & {
  ref: React.RefObject<
    React.ElementRef<typeof DropdownMenuPrimitive.SubContent>
  >;
}) => (
  <DropdownMenuPrimitive.SubContent
    className={cn(
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-grey dark:bg-eerie-dark z-50 min-w-[8rem] overflow-hidden rounded-md border border-stone-200 bg-white p-1 text-stone-950 shadow-lg dark:text-stone-50",
      className,
    )}
    ref={ref}
    {...props}
  />
);
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = ({
  ref,
  className,
  sideOffset = 4,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> & {
  ref: React.RefObject<React.ElementRef<typeof DropdownMenuPrimitive.Content>>;
}) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:bg-eerie-dark z-50 min-w-[8rem] overflow-hidden rounded-md border border-stone-200 bg-white p-1 text-stone-950 shadow-md dark:border-stone-800 dark:text-stone-50",
        className,
      )}
      ref={ref}
      sideOffset={sideOffset}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
);
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = ({ ref, className, inset, ...props }) => (
  <DropdownMenuPrimitive.Item
    className={cn(
      "dark:focus:bg-metal relative flex cursor-default items-center rounded-xs px-2 py-1.5 text-sm outline-hidden transition-colors select-none focus:bg-stone-100 focus:text-stone-900 data-disabled:pointer-events-none data-disabled:opacity-50 dark:focus:text-stone-50",
      {
        "pl-8": inset,
      },
      className,
    )}
    ref={ref}
    {...props}
  />
);
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = ({
  ref,
  className,
  children,
  checked,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem> & {
  ref: React.RefObject<
    React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>
  >;
}) => (
  <DropdownMenuPrimitive.CheckboxItem
    checked={checked}
    className={cn(
      "dark:focus:bg-metal relative flex cursor-default items-center rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden transition-colors select-none focus:bg-stone-100 focus:text-stone-900 data-disabled:pointer-events-none data-disabled:opacity-50 dark:focus:text-stone-50",
      className,
    )}
    ref={ref}
    {...props}
  >
    <span className="absolute left-2 flex size-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="size-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
);
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = ({
  ref,
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem> & {
  ref: React.RefObject<
    React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>
  >;
}) => (
  <DropdownMenuPrimitive.RadioItem
    className={cn(
      "dark:focus:bg-metal relative flex cursor-default items-center rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden transition-colors select-none focus:bg-stone-100 focus:text-stone-900 data-disabled:pointer-events-none data-disabled:opacity-50 dark:focus:text-stone-50",
      className,
    )}
    ref={ref}
    {...props}
  >
    <span className="absolute left-2 flex size-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="size-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
);
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = ({ ref, className, inset, ...props }) => (
  <DropdownMenuPrimitive.Label
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      {
        "pl-8": inset,
      },
      className,
    )}
    ref={ref}
    {...props}
  />
);
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator> & {
  ref: React.RefObject<
    React.ElementRef<typeof DropdownMenuPrimitive.Separator>
  >;
}) => (
  <DropdownMenuPrimitive.Separator
    className={cn("-mx-1 my-1 h-px bg-stone-100 dark:bg-stone-800", className)}
    ref={ref}
    {...props}
  />
);
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
};
