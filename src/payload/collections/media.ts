import { generateBlurDataURL } from "@/lib/blur-data-url";
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
    // Files are served straight from UploadThing (docs/adr/0003), so Payload's
    // file route has nothing to serve. Answer old /api/media/file links with a
    // 404 instead of Payload's local-disk fallback, which logs and returns 500.
    handlers: [() => new Response(null, { status: 404 })],
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
      ({ req, operation }) => {
        if ((operation === "create" || operation === "update") && req.file) {
          const randomId = crypto.randomUUID();
          req.file.name = `walterspieler_${randomId}`;
        }
      },
    ],
  },
};
