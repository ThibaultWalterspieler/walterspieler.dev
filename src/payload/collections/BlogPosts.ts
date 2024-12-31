import { ScriptCopyBtnBlock } from "@/payload/blocks/ScriptCopyBtn";
import { TweetCardBlock } from "@/payload/blocks/TweetCard";

import { CodeBlock } from "../blocks/Code";
import { ImageBlock } from "../blocks/Image";
import { ParagraphBlock } from "../blocks/Paragraph";
import { QuoteBlock } from "../blocks/Quote";

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
};
