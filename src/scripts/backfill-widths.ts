import { getPayload } from "payload";

import { getStoredWidths, isServedAtStoredWidths } from "@/lib/media-widths";
import { isDatabaseConfirmed } from "@/payload/is-local-database";
import config from "@payload-config";

/**
 * Stores the Media widths (docs/adr/0005) for images uploaded before they
 * existed. Safe to rerun: it skips images that have them, and GIFs and SVGs,
 * which pages serve as uploaded.
 *
 * Each image is uploaded again under its own name, so Payload resizes it like
 * any upload but keeps the old file: pages cached until the next Revalidation
 * still point at it. Those old files stay on UploadThing; the log lists them.
 *
 * It overwrites each image's file fields, so against a remote database it runs
 * only when CONFIRM_DATABASE_HOST names that database's host.
 */
const databaseUri = process.env.DATABASE_URI ?? "";

if (!isDatabaseConfirmed(databaseUri, process.env.CONFIRM_DATABASE_HOST)) {
  console.error("❌ DATABASE_URI points at a remote database.");
  console.error("Set CONFIRM_DATABASE_HOST to its host to backfill it.");
  process.exit(1);
}

const payload = await getPayload({ config });

const { docs } = await payload.find({
  collection: "media",
  limit: 1000,
  depth: 0,
});

const images = docs.filter(
  (doc) =>
    doc.url &&
    doc.filename &&
    isServedAtStoredWidths(doc.mimeType) &&
    !getStoredWidths(doc),
);
payload.logger.info(`Backfilling stored widths for ${images.length} images`);

let failed = 0;

for (const doc of images) {
  try {
    const response = await fetch(doc.url!);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = Buffer.from(await response.arrayBuffer());

    await payload.update({
      collection: "media",
      id: doc.id,
      data: {},
      file: {
        data,
        mimetype: doc.mimeType!,
        name: doc.filename!,
        size: data.length,
      },
      // Same name: Payload deletes a replaced file only when the name changes.
      overwriteExistingFiles: true,
      // Outside Next.js there is no page cache to expire.
      context: { disableRevalidate: true, keepFilename: true },
    });
    payload.logger.info(`✅ ${doc.filename} (old file left: ${doc.url})`);
  } catch (error) {
    failed += 1;
    payload.logger.error({ err: error }, `❌ ${doc.filename} (${doc.url})`);
  }
}

payload.logger.info(`Done: ${images.length - failed} filled, ${failed} failed`);
process.exit(failed ? 1 : 0);
