"use client";

import { useState } from "react";

import { Check, Copy } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { HighlightedCommand } from "@/components/ui/highlight-commands";

interface ScriptCopyBtnClientProps {
  showMultiplePackageOptions: boolean;
  /** One highlighted command per package manager. */
  commands: Record<string, HighlightedCommand>;
  className?: string;
}

export default function ScriptCopyBtnClient({
  showMultiplePackageOptions,
  commands,
  className,
}: ScriptCopyBtnClientProps) {
  const packageManagers = Object.keys(commands);
  const [packageManager, setPackageManager] = useState(packageManagers[0]);
  const [copied, setCopied] = useState(false);
  const { command, html: highlightedCode } = commands[packageManager];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "mx-auto flex max-w-md items-center justify-center",
        className,
      )}
    >
      <div className="w-full space-y-2">
        <div className="mb-2 flex items-center justify-between">
          {showMultiplePackageOptions && (
            <div className="relative">
              <div className="border-border inline-flex cursor-pointer overflow-hidden rounded-md border text-xs">
                {packageManagers.map((pm, index) => (
                  <div className="flex items-center" key={pm}>
                    {index > 0 && (
                      <div aria-hidden="true" className="bg-border h-4 w-px" />
                    )}
                    <Button
                      className={`bg-surface hover:bg-surface-hover relative rounded-none px-2 py-1 ${
                        packageManager === pm ? "text-heading" : "text-muted"
                      }`}
                      onClick={() => setPackageManager(pm)}
                      size="sm"
                      variant="ghost"
                    >
                      {pm}
                      {packageManager === pm && (
                        <motion.div
                          className="bg-accent absolute inset-x-0 bottom-[1px] mx-auto h-0.5 w-[90%]"
                          initial={false}
                          layoutId="activeTab"
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="relative flex items-center">
          <div className="min-w-[300px] grow font-mono">
            {highlightedCode ? (
              <div
                className={`[&>pre]:border-border [&>pre]:bg-surface! [&>pre]:overflow-x-auto [&>pre]:rounded-md [&>pre]:border [&>pre]:p-2 [&>pre]:px-4 [&>pre]:font-mono`}
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
              />
            ) : (
              <pre className="bg-surface border-border rounded-md border p-2 px-4 font-mono">
                {command}
              </pre>
            )}
          </div>
          <Button
            aria-label={copied ? "Copied" : "Copy to clipboard"}
            className="relative ml-2 rounded-md"
            onClick={copyToClipboard}
            size="icon"
            variant="outline"
          >
            <span className="sr-only">{copied ? "Copied" : "Copy"}</span>
            <Copy
              className={`size-4 transition-all duration-300 ${
                copied ? "scale-0" : "scale-100"
              }`}
            />
            <Check
              className={`absolute inset-0 m-auto size-4 transition-all duration-300 ${
                copied ? "scale-100" : "scale-0"
              }`}
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
