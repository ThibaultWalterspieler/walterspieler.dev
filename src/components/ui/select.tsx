"use client";

import * as React from "react";

import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger: React.FC<
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    ref?: React.Ref<HTMLButtonElement>;
  }
> = (props) => {
  const { className, children, ref, ...rest } = props;
  return (
    <SelectPrimitive.Trigger
      className={cn(
        "focus:ring-metal dark:bg-metal dark:ring-offset-metal flex h-10 w-full items-center justify-between rounded-md border border-stone-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-stone-500 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 dark:border-stone-800 dark:placeholder:text-stone-400 dark:focus:ring-stone-300 [&>span]:line-clamp-1",
        className,
      )}
      ref={ref}
      {...rest}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="size-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
};
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton: React.FC<
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton> & {
    ref?: React.Ref<HTMLDivElement>;
  }
> = (props) => {
  const { className, ref, ...rest } = props;
  return (
    <SelectPrimitive.ScrollUpButton
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className,
      )}
      ref={ref}
      {...rest}
    >
      <ChevronUp className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
};
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton: React.FC<
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton> & {
    ref?: React.Ref<HTMLDivElement>;
  }
> = (props) => {
  const { className, ref, ...rest } = props;
  return (
    <SelectPrimitive.ScrollDownButton
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className,
      )}
      ref={ref}
      {...rest}
    >
      <ChevronDown className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
};
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent: React.FC<
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & {
    ref?: React.Ref<HTMLDivElement>;
  }
> = (props) => {
  const { className, children, position = "popper", ref, ...rest } = props;
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className={cn(
          "text-metal data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:bg-metal relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-stone-200 bg-white shadow-md dark:border-stone-800 dark:text-stone-50",
          {
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1":
              position === "popper",
          },
          className,
        )}
        position={position}
        ref={ref}
        {...rest}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
};
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel: React.FC<
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label> & {
    ref?: React.Ref<HTMLDivElement>;
  }
> = (props) => {
  const { className, ref, ...rest } = props;
  return (
    <SelectPrimitive.Label
      className={cn("py-1.5 pr-2 pl-8 text-sm font-semibold", className)}
      ref={ref}
      {...rest}
    />
  );
};
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem: React.FC<
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & {
    ref?: React.Ref<HTMLDivElement>;
  }
> = (props) => {
  const { className, children, ref, ...rest } = props;
  return (
    <SelectPrimitive.Item
      className={cn(
        "relative flex w-full cursor-default items-center rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-stone-100 focus:text-stone-900 data-disabled:pointer-events-none data-disabled:opacity-50 dark:focus:bg-stone-800 dark:focus:text-stone-50",
        className,
      )}
      ref={ref}
      {...rest}
    >
      <span className="absolute left-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>

      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
};
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator: React.FC<
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator> & {
    ref?: React.Ref<HTMLDivElement>;
  }
> = (props) => {
  const { className, ref, ...rest } = props;
  return (
    <SelectPrimitive.Separator
      className={cn(
        "-mx-1 my-1 h-px bg-stone-100 dark:bg-stone-800",
        className,
      )}
      ref={ref}
      {...rest}
    />
  );
};
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
