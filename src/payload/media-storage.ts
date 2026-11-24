import type { S3ClientConfig } from "@aws-sdk/client-s3";

/**
 * Media files live in a Cloudflare R2 bucket (docs/adr/0006). Payload writes
 * through R2's S3 API; visitors load each file from the bucket's own domain,
 * which Cloudflare caches for a year.
 */
export const MEDIA_BUCKET = "walterspieler-media";

export const MEDIA_ORIGIN = "https://media.walterspieler.dev";

export const mediaBucketClient: S3ClientConfig = {
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? "",
  },
  endpoint: "https://47aad70275ffa8e67414ec22f1025c76.r2.cloudflarestorage.com",
  // R2 has no AWS regions and addresses buckets by path only.
  region: "auto",
  forcePathStyle: true,
};

/**
 * A stored file's public URL. Encoded: older filenames hold spaces and
 * brackets, and a space would split the URL inside a `srcset`.
 */
export const mediaFileUrl = (filename: string) =>
  `${MEDIA_ORIGIN}/${encodeURIComponent(filename)}`;
