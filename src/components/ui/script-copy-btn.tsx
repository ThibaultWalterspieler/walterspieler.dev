import { cacheLife } from "next/cache";

import { highlightCommands } from "@/components/ui/highlight-commands";
import ScriptCopyBtnClient from "@/components/ui/script-copy-btn-client";

interface ScriptCopyBtnProps {
  showMultiplePackageOptions?: boolean;
  codeLanguage: string;
  darkTheme: string;
  commandMap: Record<string, string>;
  className?: string;
}

// Highlights on the server so shiki stays out of the browser bundle.
export default async function ScriptCopyBtn({
  showMultiplePackageOptions = true,
  codeLanguage,
  darkTheme,
  commandMap,
  className,
}: ScriptCopyBtnProps) {
  // Shiki reads Date.now(), which Cache Components refuses while prerendering
  // outside a cache scope. The output depends only on the props: keep it for good.
  "use cache";
  cacheLife("max");

  const highlightedCommandMap = await highlightCommands(
    commandMap,
    codeLanguage,
    darkTheme,
  );

  return (
    <ScriptCopyBtnClient
      className={className}
      commandMap={commandMap}
      highlightedCommandMap={highlightedCommandMap}
      showMultiplePackageOptions={showMultiplePackageOptions}
    />
  );
}
