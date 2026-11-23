import { ChartBlock } from "@/payload/blocks/Chart";
import { CodeBlock } from "@/payload/blocks/Code";
import { EditorNoteBlock } from "@/payload/blocks/EditorNote";
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

export const BlogPosts: CollectionConfig = {
  slug: "blogPosts",
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
      required: true,
      localized: true,
    },
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "description",
      type: "textarea",
      localized: true,
    },
    {
      name: "authors",
      type: "relationship",
      relationTo: "users",
      hasMany: true,
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
        EditorNoteBlock,
        ChartBlock,
      ],
      localized: true,
    },
    {
      name: "relatedExperiencePosts",
      type: "relationship",
      relationTo: "experiencePosts",
      hasMany: true,
    },
  ],
  hooks: {
    afterChange: [revalidateCmsAfterChange],
    afterDelete: [revalidateCmsAfterDelete],
  },
};
