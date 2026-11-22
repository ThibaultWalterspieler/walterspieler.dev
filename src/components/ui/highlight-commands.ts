import { codeToHtml } from "shiki";

/**
 * Highlights each command of a ScriptCopyBtn, keyed like `commandMap`.
 * A command shiki cannot highlight maps to `null`: the button shows it as plain text.
 */
export async function highlightCommands(
  commandMap: Record<string, string>,
  codeLanguage: string,
  darkTheme: string,
): Promise<Record<string, string | null>> {
  const entries = await Promise.all(
    Object.entries(commandMap).map(async ([packageManager, command]) => {
      try {
        const html = await codeToHtml(command, {
          lang: codeLanguage,
          themes: { dark: darkTheme },
          defaultColor: "dark",
        });
        return [packageManager, html] as const;
      } catch (error) {
        console.error("Error highlighting code:", error);
        return [packageManager, null] as const;
      }
    }),
  );

  return Object.fromEntries(entries);
}
