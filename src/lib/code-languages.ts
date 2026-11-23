/**
 * The languages a Code block can be highlighted in, offered as a select in the
 * admin. Payload stores the select as a Postgres enum: changing this list
 * needs a migration.
 */
export const CODE_LANGUAGES = [
  "bash",
  "css",
  "diff",
  "html",
  "javascript",
  "json",
  "jsonc",
  "jsx",
  "markdown",
  "python",
  "sql",
  "tsx",
  "typescript",
  "yaml",
] as const;

export type CodeLanguage = (typeof CODE_LANGUAGES)[number];
