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
 * Copies every Media file from UploadThing to R2 (docs/adr/0006) under its
 * filename, which is what Media URLs are now built from. Run it before the
 * deploy that moves Media to R2, then once more after it: it skips files R2
 * already has. It reads the database and writes only to R2.
 *
 * UploadThing's file keys are read with SQL: Payload's schema lost them with
 * the UploadThing adapter, but their columns stay until the clean-up migration.
 */
type UploadThingFile = {
  key: string | null;
  filename: string;
  mimeType: string;
};

const payload = await getPayload({ config });
const db = payload.db as unknown as PostgresAdapter;

// A Media row holds the original and one file per width, each with its own
// UploadThing key.
const fileColumns = [
  { key: "_key", filename: "filename", mimeType: "mime_type" },
  ...MEDIA_WIDTHS.map((width) => {
    const size = `sizes_${mediaSizeName(width)}`;
    return {
      key: `${size}__key`,
      filename: `${size}_filename`,
      mimeType: `${size}_mime_type`,
    };
  }),
];

const { rows } = await db.pool.query<Record<string, string | null>>(
  `SELECT ${fileColumns
    .flatMap((columns) => Object.values(columns))
    .join(", ")} FROM media`,
);

const files: UploadThingFile[] = rows.flatMap((row) =>
  fileColumns.flatMap((columns) => {
    const filename = row[columns.filename];
    const mimeType = row[columns.mimeType];
    if (!filename || !mimeType) return [];
    return [{ key: row[columns.key], filename, mimeType }];
  }),
);

const bucket = new S3Client(mediaBucketClient);

// The file's size in bytes, or `undefined` if the bucket doesn't have it.
const sizeInBucket = async (filename: string) => {
  try {
    const head = await bucket.send(
      new HeadObjectCommand({ Bucket: MEDIA_BUCKET, Key: filename }),
    );
    return head.ContentLength ?? 0;
  } catch (error) {
    if (error instanceof NotFound) return undefined;
    throw error;
  }
};

payload.logger.info(`Copying ${files.length} Media files to R2`);

let copied = 0;
let skipped = 0;
let failed = 0;
let bytes = 0;

for (const file of files) {
  try {
    const size = await sizeInBucket(file.filename);
    if (size !== undefined) {
      skipped += 1;
      bytes += size;
      continue;
    }
    // Uploads made after the move to R2 have no UploadThing copy.
    if (!file.key) throw new Error("not in R2 and no UploadThing key");

    const response = await fetch(`https://utfs.io/f/${file.key}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const body = Buffer.from(await response.arrayBuffer());
    await bucket.send(
      new PutObjectCommand({
        Bucket: MEDIA_BUCKET,
        Key: file.filename,
        Body: body,
        ContentType: file.mimeType,
      }),
    );
    copied += 1;
    bytes += body.length;
    payload.logger.info(`✅ ${file.filename}`);
  } catch (error) {
    failed += 1;
    payload.logger.error({ err: error }, `❌ ${file.filename} (${file.key})`);
  }
}

payload.logger.info(
  `Done: ${copied} copied, ${skipped} already in R2, ${failed} failed (${(bytes / 1e6).toFixed(1)} MB in R2)`,
);
process.exit(failed ? 1 : 0);
