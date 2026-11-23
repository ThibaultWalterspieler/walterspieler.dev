import {
  HeadObjectCommand,
  NotFound,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getPayload } from "payload";

import { MEDIA_WIDTHS, mediaSizeName } from "@/lib/media-widths";
import { MEDIA_BUCKET, mediaBucketClient } from "@/payload/media-storage";
import config from "@payload-config";

import type { PostgresAdapter } from "@payloadcms/db-postgres";

/**
 * Copies every Media file from UploadThing to the media bucket (docs/adr/0006)
 * under its filename, which is what Media URLs are now built from. Run it
 * before the deploy that moves Media to R2, then once more after it: it skips
 * files the bucket already has. It reads the database and writes only to R2.
 *
 * UploadThing's file keys are read with SQL: Payload's schema lost them with
 * the UploadThing adapter, but their columns stay until the clean-up migration.
 */
type StoredFile = { key: string; filename: string; mimeType: string };

const payload = await getPayload({ config });
const db = payload.db as unknown as PostgresAdapter;

// The original's columns, then each width's: `sizes_w640__key` and so on.
const columnPrefixes = [
  "",
  ...MEDIA_WIDTHS.map((width) => `sizes_${mediaSizeName(width)}_`),
];

const { rows } = await db.pool.query<Record<string, string | null>>(
  `SELECT ${columnPrefixes
    .map((prefix) => `${prefix}_key, ${prefix}filename, ${prefix}mime_type`)
    .join(", ")} FROM media`,
);

const files: StoredFile[] = rows.flatMap((row) =>
  columnPrefixes
    .map((prefix) => ({
      key: row[`${prefix}_key`],
      filename: row[`${prefix}filename`],
      mimeType: row[`${prefix}mime_type`],
    }))
    .filter((file): file is StoredFile =>
      Boolean(file.key && file.filename && file.mimeType),
    ),
);

const bucket = new S3Client(mediaBucketClient);

const isInBucket = async (filename: string) => {
  try {
    await bucket.send(
      new HeadObjectCommand({ Bucket: MEDIA_BUCKET, Key: filename }),
    );
    return true;
  } catch (error) {
    if (error instanceof NotFound) return false;
    throw error;
  }
};

payload.logger.info(`Copying ${files.length} Media files to R2`);

let copied = 0;
let skipped = 0;
let failed = 0;

for (const file of files) {
  try {
    if (await isInBucket(file.filename)) {
      skipped += 1;
      continue;
    }

    const response = await fetch(`https://utfs.io/f/${file.key}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    await bucket.send(
      new PutObjectCommand({
        Bucket: MEDIA_BUCKET,
        Key: file.filename,
        Body: Buffer.from(await response.arrayBuffer()),
        ContentType: file.mimeType,
      }),
    );
    copied += 1;
    payload.logger.info(`✅ ${file.filename}`);
  } catch (error) {
    failed += 1;
    payload.logger.error({ err: error }, `❌ ${file.filename} (${file.key})`);
  }
}

payload.logger.info(
  `Done: ${copied} copied, ${skipped} already in R2, ${failed} failed`,
);
process.exit(failed ? 1 : 0);
