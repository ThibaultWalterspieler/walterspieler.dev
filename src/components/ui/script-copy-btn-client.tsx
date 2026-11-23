"use client";

import { ReactNode, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockHeader,
} from "@/components/ui/code-block";
import CodeBlockCopyButton from "@/components/ui/code-block-copy-button";
import { cn } from "@/lib/utils";

interface ScriptCopyBtnClientProps {
  showMultiplePackageOptions: boolean;
  /** One command per package manager, with its highlighted lines. */
  commands: { packageManager: string; command: string; lines: ReactNode }[];
  className?: string;
}

export default function ScriptCopyBtnClient({
  showMultiplePackageOptions,
  commands,
  className,
}: ScriptCopyBtnClientProps) {
  const [selected, setSelected] = useState(0);
  if (commands.length === 0) return null;
  const { command, lines } = commands[selected] ?? commands[0];

  return (
    <CodeBlock className={className}>
      {showMultiplePackageOptions ? (
        <CodeBlockHeader className="py-0">
          <div className="-ms-1.5 flex text-xs">
            {commands.map(({ packageManager }, index) => (
              <Button
                aria-pressed={index === selected}
                className={cn(
                  "relative h-8 rounded-none px-2",
                  index === selected ? "text-heading" : "text-muted",
                )}
                key={packageManager}
                onClick={() => setSelected(index)}
                size="sm"
                variant="ghost"
              >
                {packageManager}
                {/* CSS can't slide one underline across tabs of different widths, so each tab grows its own. */}
                <span
                  aria-hidden
                  className={cn(
                    "bg-accent absolute inset-x-0 bottom-0 mx-auto h-0.5 w-[90%] transition-[opacity,scale] duration-250",
                    index === selected
                      ? "scale-x-100 opacity-100"
                      : "scale-x-0 opacity-0",
                  )}
                />
              </Button>
            ))}
          </div>
          <CodeBlockActions>
            <CodeBlockCopyButton value={command} />
          </CodeBlockActions>
        </CodeBlockHeader>
      ) : (
        <CodeBlockActions>
          <CodeBlockCopyButton value={command} />
        </CodeBlockActions>
      )}
      <CodeBlockContent>{lines}</CodeBlockContent>
    </CodeBlock>
  );
}
