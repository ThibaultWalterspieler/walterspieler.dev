import { Page } from "@/payload/payload-types";

import { triggerRevalidation } from "./triggerRevalidation";

import type { CollectionAfterChangeHook } from "payload";

export const revalidatePage: CollectionAfterChangeHook<Page> = async ({
  doc,
  req: { payload },
}) => {
  const path = doc.slug === "home" ? "/" : `/${doc.slug}`;
  payload.logger.info(`Revalidating blog post at path: ${path}`);

  await triggerRevalidation({ payload, paths: [path] });

  return doc;
};
