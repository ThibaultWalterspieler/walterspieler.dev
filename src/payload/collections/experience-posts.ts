import { CodeBlock } from "@/payload/blocks/Code";
import { ImageBlock } from "@/payload/blocks/Image";
import { ParagraphBlock } from "@/payload/blocks/Paragraph";
import { QuoteBlock } from "@/payload/blocks/Quote";
import { ScriptCopyBtnBlock } from "@/payload/blocks/ScriptCopyBtn";
import { TweetCardBlock } from "@/payload/blocks/TweetCard";
import {
  revalidateCmsAfterChange,
  revalidateCmsAfterDelete,
} from "@/payload/hooks/revalidate-cms";

import type { CollectionConfig } from "payload";

export const ExperiencePosts: CollectionConfig = {
  slug: "experiencePosts",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "title",
  },
  versions: {
    drafts: { autosave: true },
  },
  fields: [
    {
      name: "slug",
      type: "text",
      unique: true,
      required: true,
      index: true,
    },
    {
      name: "title",
      type: "text",
      required: true,
      defaultValue: "Untitled",
    },
    {
      name: "description",
      type: "textarea",
      localized: true,
    },
    {
      name: "experience",
      type: "relationship",
      relationTo: "experiences",
      required: true,
    },
    {
      name: "mainImage",
      type: "upload",
      relationTo: "media",
      localized: true,
    },
    {
      name: "content",
      type: "blocks",
      blocks: [
        ParagraphBlock,
        ImageBlock,
        CodeBlock,
        ScriptCopyBtnBlock,
        QuoteBlock,
        TweetCardBlock,
      ],
      localized: true,
    },
  ],
  hooks: {
    afterChange: [revalidateCmsAfterChange],
    afterDelete: [revalidateCmsAfterDelete],
  },
};
