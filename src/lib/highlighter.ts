import { codeToTokens } from "shiki";

import { CODE_LANGUAGES } from "@/lib/code-languages";

import type { CodeLanguage } from "@/lib/code-languages";


export interface HighlightedToken {
  content: string;
  color?: string;
}

const ALIASES: Record<string, string> = {
  sh: "bash",
  shell: "bash",
  shellscript: "bash",
  js: "javascript",
  ts: "typescript",
  yml: "yaml",
  md: "markdown",
};

/**
 * Highlights code on the server with the site's Ayu Dark palette. Returns one
 * list of tokens per line, or `null` for a language not in CODE_LANGUAGES: the
 * caller then shows the code as plain text. Tokens are plain data rendered as
 * React text, so the code is escaped like any other text.
 */
export async function highlightCode(
  code: string,
  language: string,
): Promise<HighlightedToken[][] | null> {
  const name = language.toLowerCase();
  const lang = ALIASES[name] ?? name;
  if (!isCodeLanguage(lang)) return null;

  const { tokens } = await codeToTokens(code.replace(/\n$/, ""), {
    lang,
    theme: "ayu-dark",
  });

  return tokens.map((line) =>
    line.map(({ content, color }) => ({ content, color })),
  );
}

function isCodeLanguage(name: string): name is CodeLanguage {
  return (CODE_LANGUAGES as readonly string[]).includes(name);
}
