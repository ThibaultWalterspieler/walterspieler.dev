import { codeToHtml } from "shiki";

export interface HighlightedCommand {
  command: string;
  /** Shiki's HTML, or `null` when it could not highlight: the button shows the command as plain text. */
  html: string | null;
}

/** Highlights each command of a ScriptCopyBtn, keyed like `commandMap`. */
export async function highlightCommands(
  commandMap: Record<string, string>,
  codeLanguage: string,
  darkTheme: string,
): Promise<Record<string, HighlightedCommand>> {
  const entries = await Promise.all(
    Object.entries(commandMap).map(async ([packageManager, command]) => {
      try {
        const html = await codeToHtml(command, {
          lang: codeLanguage,
          themes: { dark: darkTheme },
          defaultColor: "dark",
        });
        return [packageManager, { command, html }] as const;
      } catch (error) {
        console.error("Error highlighting code:", error);
        return [packageManager, { command, html: null }] as const;
      }
    }),
  );

  return Object.fromEntries(entries);
}
