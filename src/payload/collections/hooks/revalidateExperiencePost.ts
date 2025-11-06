import { revalidatePath } from "next/cache";

import { ExperiencePost } from "@/payload/payload-types";

import type { CollectionAfterChangeHook } from "payload";

export const revalidateExperiencePost: CollectionAfterChangeHook<
  ExperiencePost
> = ({ doc, previousDoc, req: { payload } }) => {
  if (doc._status === "published") {
    const path = `/experiences/${doc.slug}`;

    payload.logger.info(`Revalidating experience post at path: ${path}`);

    try {
      revalidatePath(path);
    } catch (error) {
      payload.logger.warn(`Could not revalidate path ${path}: ${error.message}`);
    }
  }

  if (previousDoc?._status === "published" && doc._status !== "published") {
    const oldPath = `/experiences/${previousDoc.slug}`;

    payload.logger.info(`Revalidating old experience post at path: ${oldPath}`);

    try {
      revalidatePath(oldPath);
    } catch (error) {
      payload.logger.warn(`Could not revalidate path ${oldPath}: ${error.message}`);
    }
  }

  return doc;
};
