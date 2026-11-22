type Versioned = { _status?: "draft" | "published" | null } | null | undefined;

/**
 * Whether a save can change what visitors see. Visitors see published posts
 * only, so a draft saved over a draft (every autosave while editing) changes
 * nothing public. Documents without drafts have no `_status` and always count.
 */
export const shouldRevalidate = (doc: Versioned, previousDoc: Versioned) =>
  doc?._status !== "draft" || previousDoc?._status === "published";
