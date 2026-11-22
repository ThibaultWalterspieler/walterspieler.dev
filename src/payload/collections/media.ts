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
  ],
  upload: true,
  hooks: {
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
