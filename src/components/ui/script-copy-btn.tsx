import { cacheLife } from "next/cache";

import { CodeBlockLines } from "@/components/ui/code-block";
import ScriptCopyBtnClient from "@/components/ui/script-copy-btn-client";
import { highlightCode } from "@/lib/highlighter";

interface ScriptCopyBtnProps {
  showMultiplePackageOptions?: boolean;
  codeLanguage: string;
  commandMap: Record<string, string>;
  className?: string;
}

// Highlights on the server so shiki stays out of the browser bundle.
export default async function ScriptCopyBtn({
  showMultiplePackageOptions = true,
  codeLanguage,
  commandMap,
  className,
}: ScriptCopyBtnProps) {
  // Shiki reads Date.now(), which Cache Components refuses while prerendering
  // outside a cache scope. The output depends only on the props: keep it for good.
  "use cache";
  cacheLife("max");

  const commands = await Promise.all(
    Object.entries(commandMap).map(async ([packageManager, command]) => ({
      packageManager,
      command,
      lines: (
        <CodeBlockLines
          code={command}
          lines={await highlightCode(command, codeLanguage)}
        />
      ),
    })),
  );

  return (
    <ScriptCopyBtnClient
      className={className}
      commands={commands}
      showMultiplePackageOptions={showMultiplePackageOptions}
    />
  );
}
