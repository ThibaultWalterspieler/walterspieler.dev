import { revalidateTag } from "next/cache";

import { CMS_CACHE_TAG } from "@/lib/payload/cms-cache-tag";

import { shouldRevalidate } from "./should-revalidate";

import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
  PayloadRequest,
  RequestContext,
} from "payload";

const revalidateCms = (req: PayloadRequest, context: RequestContext) => {
  // Scripts run outside Next.js (the seed), where revalidateTag has no cache to expire.
  if (context.disableRevalidate) {
    return;
  }

  try {
    // Payload runs in the same Next.js app, so the cache is expired in-process.
    // `expire: 0`: the owner reloading the page right after a save sees the change.
    revalidateTag(CMS_CACHE_TAG, { expire: 0 });
    req.payload.logger.info("Revalidation: expired the CMS cache");
  } catch (error) {
    req.payload.logger.error({ err: error }, "Revalidation failed");
  }
};

export const revalidateCmsAfterChange: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req,
  context,
}) => {
  if (shouldRevalidate(doc, previousDoc)) {
    revalidateCms(req, context);
  }

  return doc;
};

export const revalidateCmsAfterDelete: CollectionAfterDeleteHook = ({
  doc,
  req,
  context,
}) => {
  revalidateCms(req, context);

  return doc;
};

export const revalidateCmsAfterGlobalChange: GlobalAfterChangeHook = ({
  doc,
  req,
  context,
}) => {
  revalidateCms(req, context);

  return doc;
};
