"use client";

import { useEffect, useState } from "react";

import { Check, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Copies `value`; a polite live region announces "Copied" for screen readers. */
export default function CodeBlockCopyButton({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timeout);
  }, [copied]);

  return (
    <>
      <Button
        aria-label={copied ? "Copied" : "Copy"}
        className={cn("bg-surface size-7", className)}
        data-copied={copied || undefined}
        onClick={() => {
          navigator.clipboard
            .writeText(value)
            .then(() => setCopied(true))
            .catch(() => {});
        }}
        size="icon"
        variant="ghost"
      >
        {copied ? (
          <Check className="text-accent size-3.5" />
        ) : (
          <Copy className="size-3.5" />
        )}
      </Button>
      <span aria-live="polite" className="sr-only">
        {copied ? "Copied" : ""}
      </span>
    </>
  );
}
