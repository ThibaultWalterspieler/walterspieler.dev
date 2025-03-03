"use client";

import { HTMLAttributes, useEffect, useState } from "react";

import { Check, Copy } from "lucide-react";
import { motion } from "motion/react";
import { codeToHtml } from "shiki";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ScriptCopyBtnProps extends HTMLAttributes<HTMLDivElement> {
  showMultiplePackageOptions?: boolean;
  codeLanguage: string;
  darkTheme: string;
  commandMap: Record<string, string>;
  className?: string;
}

export default function ScriptCopyBtn({
  showMultiplePackageOptions = true,
  codeLanguage,
  darkTheme,
  commandMap,
  className,
}: ScriptCopyBtnProps) {
  const packageManagers = Object.keys(commandMap);
  const [packageManager, setPackageManager] = useState(packageManagers[0]);
  const [copied, setCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState("");
  const command = commandMap[packageManager];

  useEffect(() => {
    async function loadHighlightedCode() {
      try {
        const highlighted = await codeToHtml(command, {
          lang: codeLanguage,
          themes: {
            dark: darkTheme,
          },
          defaultColor: "dark",
        });
        setHighlightedCode(highlighted);
      } catch (error) {
        console.error("Error highlighting code:", error);
        setHighlightedCode(`<pre>${command}</pre>`);
      }
    }

    loadHighlightedCode();
  }, [command, codeLanguage, darkTheme]);

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
              <div className="inline-flex cursor-pointer overflow-hidden rounded-md border border-stone-200 text-xs dark:border-stone-800">
                {packageManagers.map((pm, index) => (
                  <div className="flex items-center" key={pm}>
                    {index > 0 && (
                      <div
                        aria-hidden="true"
                        className="dark:bg-metal h-4 w-px bg-stone-200"
                      />
                    )}
                    <Button
                      className={`bg-metal hover:bg-eerie-light relative rounded-none px-2 py-1 ${
                        packageManager === pm
                          ? "text-stone-900 dark:text-stone-50"
                          : "text-stone-500 dark:text-stone-400"
                      }`}
                      onClick={() => setPackageManager(pm)}
                      size="sm"
                      variant="ghost"
                    >
                      {pm}
                      {packageManager === pm && (
                        <motion.div
                          className="bg-pearl-light absolute inset-x-0 bottom-[1px] mx-auto h-0.5 w-[90%]"
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
                className={`[&>pre]:overflow-x-auto [&>pre]:rounded-md [&>pre]:p-2 [&>pre]:px-4 [&>pre]:font-mono`}
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
              />
            ) : (
              <pre className="bg-metal border-grey rounded-md border p-2 px-4 font-mono">
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
