import { BlogPost } from "@/payload/payload-types";

import { triggerRevalidation } from "./triggerRevalidation";

import type { CollectionAfterChangeHook } from "payload";

export const revalidateBlogPost: CollectionAfterChangeHook<BlogPost> = async ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  const paths: string[] = [];

  if (doc._status === "published") {
    const path = `/blog/${doc.slug}`;

    payload.logger.info(`Revalidating blog post at path: ${path}`);
    paths.push(path);
  }

  if (previousDoc?._status === "published" && doc._status !== "published") {
    const oldPath = `/blog/${previousDoc.slug}`;

    payload.logger.info(`Revalidating old blog post at path: ${oldPath}`);

    paths.push(oldPath);
  }

  if (paths.length > 0) {
    await triggerRevalidation({ payload, paths });
  }

  return doc;
};
