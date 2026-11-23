import { BlogPost } from "@payload-types";

/**
 * A blog post's Updated date (GLOSSARY.md): the date of its most recent
 * Editor's note of kind update. Corrections don't count, and Payload's
 * `updatedAt` can't serve: it moves on every save, autosaves included.
 */
export function getUpdatedDate(
  content: BlogPost["content"] | undefined,
): string | undefined {
  let latest: string | undefined;

  for (const block of content ?? []) {
    if (block.blockType !== "EditorNote" || block.kind !== "update") continue;
    if (!latest || Date.parse(block.date) > Date.parse(latest)) {
      latest = block.date;
    }
  }

  return latest;
}
