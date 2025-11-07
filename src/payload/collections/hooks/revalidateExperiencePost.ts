import { ExperiencePost } from "@/payload/payload-types";

import { triggerRevalidation } from "./triggerRevalidation";

import type { CollectionAfterChangeHook } from "payload";

export const revalidateExperiencePost: CollectionAfterChangeHook<
  ExperiencePost
> = async ({ doc, previousDoc, req: { payload } }) => {
  const paths: string[] = [];

  if (doc._status === "published") {
    const path = `/experiences/${doc.slug}`;

    payload.logger.info(`Revalidating experience post at path: ${path}`);

    paths.push(path);
  }

  if (previousDoc?._status === "published" && doc._status !== "published") {
    const oldPath = `/experiences/${previousDoc.slug}`;

    payload.logger.info(`Revalidating old experience post at path: ${oldPath}`);

    paths.push(oldPath);
  }

  if (paths.length > 0) {
    await triggerRevalidation({ payload, paths });
  }

  return doc;
};
