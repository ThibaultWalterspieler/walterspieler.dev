import { revalidatePath } from "next/cache";

import { Page } from "@/payload/payload-types";

import type { CollectionAfterChangeHook } from "payload";

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
  doc,
  req: { payload },
}) => {
  const path = doc.slug === "home" ? "/" : `/${doc.slug}`;
  payload.logger.info(`Revalidating blog post at path: ${path}`);

  try {
    revalidatePath(path);
  } catch (error) {
    // Ignore revalidation errors during seeding or when not in Next.js context
    payload.logger.warn(`Could not revalidate path ${path}: ${error.message}`);
  }

  return doc;
};
