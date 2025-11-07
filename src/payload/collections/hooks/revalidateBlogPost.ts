import { revalidatePath } from "next/cache";

import { BlogPost } from "@/payload/payload-types";

import type { CollectionAfterChangeHook } from "payload";

export const revalidateBlogPost: CollectionAfterChangeHook<BlogPost> = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc._status === "published") {
    const path = `/blog/${doc.slug}`;

    payload.logger.info(`Revalidating blog post at path: ${path}`);
    revalidatePath(path);
  }

  if (previousDoc?._status === "published" && doc._status !== "published") {
    const oldPath = `/blog/${previousDoc.slug}`;

    payload.logger.info(`Revalidating old blog post at path: ${oldPath}`);

    revalidatePath(oldPath);
  }

  return doc;
};
