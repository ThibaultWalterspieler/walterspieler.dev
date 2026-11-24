import * as React from "react";

import { cn } from "@/lib/utils";

import type { HighlightedToken } from "@/lib/highlighter";

/*
  Adapted from shadcn/ui's Code Block (radix-nova registry, November 2026):
  its colour tokens mapped to the site's Ayu palette, and the parts the site
  doesn't use (footer, sizes, diff line variants) left out. The copy button
  lives in code-block-copy-button.tsx so the rest stays server-rendered.
*/

function CodeBlock({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "group/code-block border-border bg-surface text-foreground has-[>[data-slot=code-block-content]:focus-visible]:ring-accent relative flex w-full min-w-0 flex-col overflow-hidden rounded-lg border text-sm has-[>[data-slot=code-block-content]:focus-visible]:ring-2",
        className,
      )}
      data-slot="code-block"
      {...props}
    />
  );
}

function CodeBlockHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "border-border text-muted flex min-w-0 shrink-0 items-center gap-2 border-b px-3 py-1.5 *:has-[>[data-slot=code-block-title]]:min-w-0",
        className,
      )}
      data-slot="code-block-header"
      {...props}
    />
  );
}

function CodeBlockTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "text-heading min-w-0 truncate font-mono text-xs font-medium",
        className,
      )}
      data-slot="code-block-title"
      {...props}
    />
  );
}

function CodeBlockActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        // Without a header, the actions float at the top end and show on hover or focus.
        "ms-auto -me-1.5 flex shrink-0 items-center gap-1 [[data-slot=code-block]>&]:absolute [[data-slot=code-block]>&]:end-2 [[data-slot=code-block]>&]:top-1.5 [[data-slot=code-block]>&]:z-10 [[data-slot=code-block]>&]:m-0 [[data-slot=code-block]>&]:opacity-0 [[data-slot=code-block]>&]:transition-opacity [[data-slot=code-block]>&]:group-focus-within/code-block:opacity-100 [[data-slot=code-block]>&]:group-hover/code-block:opacity-100 [[data-slot=code-block]>&]:pointer-coarse:opacity-100",
        className,
      )}
      data-slot="code-block-actions"
      {...props}
    />
  );
}

function CodeBlockContent({
  className,
  children,
  lineNumbers = false,
  ...props
}: React.ComponentProps<"pre"> & { lineNumbers?: boolean }) {
  return (
    <pre
      className={cn(
        "min-h-0 min-w-0 overflow-auto px-3 py-3 text-start font-mono leading-relaxed outline-none",
        className,
      )}
      data-numbered={lineNumbers || undefined}
      data-slot="code-block-content"
      dir="ltr"
      style={{ counterReset: "line 0" }}
      tabIndex={0}
      {...props}
    >
      <code className="grid min-h-lh min-w-max content-start in-data-numbered:grid-cols-[auto_1fr]">
        {children}
      </code>
    </pre>
  );
}

function CodeBlockLine({
  className,
  children,
  ...props
}: React.ComponentProps<"span">) {
  // An empty line holds a newline so copying a selection keeps blank lines.
  const empty =
    children === undefined ||
    children === null ||
    children === "" ||
    (Array.isArray(children) && children.length === 0);

  return (
    <span
      className={cn(
        "before:text-muted relative -mx-3 block min-h-lh px-3 before:min-w-6 before:text-end in-data-numbered:col-span-2 in-data-numbered:grid in-data-numbered:grid-cols-subgrid in-data-numbered:gap-x-3 in-data-numbered:[counter-increment:line] in-data-numbered:before:content-[counter(line)] in-data-numbered:before:select-none in-data-numbered:supports-[content:counter(line)_/_'']:before:content-[counter(line)_/_'']",
        className,
      )}
      data-slot="code-block-line"
      {...props}
    >
      <span className="min-w-0">{empty ? "\n" : children}</span>
    </span>
  );
}

/** One CodeBlockLine per line: Shiki's tokens when there are some, the raw code otherwise. */
function CodeBlockLines({
  code,
  lines,
}: {
  code: string;
  lines: HighlightedToken[][] | null;
}) {
  if (!lines) {
    return code
      .replace(/\n$/, "")
      .split("\n")
      .map((line, index) => <CodeBlockLine key={index}>{line}</CodeBlockLine>);
  }

  return lines.map((line, index) => (
    <CodeBlockLine key={index}>
      {line.map((token, tokenIndex) => (
        <span key={tokenIndex} style={{ color: token.color }}>
          {token.content}
        </span>
      ))}
    </CodeBlockLine>
  ));
}

export {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockHeader,
  CodeBlockLines,
  CodeBlockTitle,
};
