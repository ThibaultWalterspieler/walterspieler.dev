import { generateBlurDataURL } from "@/lib/blur-data-url";
import { MEDIA_WIDTHS, mediaSizeName } from "@/lib/media-widths";
import {
  revalidateCmsAfterChange,
  revalidateCmsAfterDelete,
} from "@/payload/hooks/revalidate-cms";

import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      defaultValue: "Image alt",
      localized: true,
    },
    {
      // Set from the file on upload (docs/adr/0002); never edited by hand.
      name: "blurDataUrl",
      type: "text",
      admin: { hidden: true },
    },
  ],
  upload: {
    // Files are served straight from R2 (docs/adr/0004, docs/adr/0006), so
    // Payload's file route has nothing to serve. Answer old /api/media/file
    // links with a 404 instead of Payload's local-disk fallback, which logs
    // and returns 500.
    handlers: [() => new Response(null, { status: 404 })],
    // Every image is also stored at each width, as WebP, so pages never wait
    // on a resize (docs/adr/0005). An image narrower than a width keeps its
    // own width there rather than being enlarged: every image has every width.
    imageSizes: MEDIA_WIDTHS.map((width) => ({
      name: mediaSizeName(width),
      width,
      withoutEnlargement: true,
      formatOptions: { format: "webp", options: { quality: 80 } },
      // The width's name keeps each file's name unique. Payload's default,
      // `<name>-<w>x<h>`, repeats when a narrow image is kept at its own width
      // twice, and R2 stores files by name: one would overwrite the other.
      generateImageName: ({ originalName, sizeName, extension }) =>
        `${originalName}-${sizeName}.${extension}`,
    })),
  },
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        if (req.file?.mimetype.startsWith("image/")) {
          try {
            data.blurDataUrl = await generateBlurDataURL(req.file.data);
          } catch (error) {
            // An upload never fails over its placeholder; the image renders without one.
            req.payload.logger.error({ err: error }, "Blur placeholder failed");
          }
        }

        return data;
      },
    ],
    afterChange: [revalidateCmsAfterChange],
    afterDelete: [revalidateCmsAfterDelete],
    beforeOperation: [
      ({ req, operation, context }) => {
        // The size backfill re-uploads an image under its own name, so the URL
        // that cached pages still show keeps working (backfill-widths.ts).
        if (context.keepFilename) return;

        if ((operation === "create" || operation === "update") && req.file) {
          const randomId = crypto.randomUUID();
          req.file.name = `walterspieler_${randomId}`;
        }
      },
    ],
  },
};
