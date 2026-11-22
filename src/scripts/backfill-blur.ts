import { getPayload } from "payload";

import { generateBlurDataURL } from "@/lib/blur-data-url";
import config from "@payload-config";

import { BASE_URL } from "../../next.constants.mjs";

/**
 * Fills `blurDataUrl` on images uploaded before it existed (docs/adr/0002).
 * Safe to rerun: it only touches images that have none. Pages pick the
 * placeholders up at their next Revalidation (any save in the admin).
 */
const payload = await getPayload({ config });

const { docs } = await payload.find({
  collection: "media",
  where: { blurDataUrl: { exists: false } },
  limit: 1000,
  depth: 0,
});

const images = docs.filter(
  (doc) => doc.mimeType?.startsWith("image/") && doc.url,
);
payload.logger.info(
  `Backfilling blur placeholders for ${images.length} images`,
);

let failed = 0;

for (const doc of images) {
  const url = new URL(doc.url!, BASE_URL);

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const blurDataURL = await generateBlurDataURL(
      Buffer.from(await response.arrayBuffer()),
    );

    await payload.update({
      collection: "media",
      id: doc.id,
      data: { blurDataUrl: blurDataURL },
      // Outside Next.js there is no page cache to expire.
      context: { disableRevalidate: true },
    });
    payload.logger.info(`✅ ${doc.filename}`);
  } catch (error) {
    failed += 1;
    payload.logger.error({ err: error }, `❌ ${doc.filename} (${url})`);
  }
}

payload.logger.info(`Done: ${images.length - failed} filled, ${failed} failed`);
process.exit(failed ? 1 : 0);
