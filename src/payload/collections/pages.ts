import { CollectionConfig } from "payload";

import { ButtonBlock } from "@/payload/blocks/Button";
import { CodeBlock } from "@/payload/blocks/Code";
import { ExperienceBlock } from "@/payload/blocks/Experience";
import { ImageBlock } from "@/payload/blocks/Image";
import { MySocialsBlock } from "@/payload/blocks/MySocials";
import { ParagraphBlock } from "@/payload/blocks/Paragraph";
import { QuoteBlock } from "@/payload/blocks/Quote";
import { ScriptCopyBtnBlock } from "@/payload/blocks/ScriptCopyBtn";
import { TweetCardBlock } from "@/payload/blocks/TweetCard";

import { revalidatePage } from "./hooks/revalidatePage";

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      localized: true,
      unique: true,
      required: true,
    },
    {
      name: "slug",
      type: "text",
      unique: true,
      required: true,
    },
    {
      name: "content",
      type: "blocks",
      blocks: [
        ParagraphBlock,
        ImageBlock,
        ScriptCopyBtnBlock,
        CodeBlock,
        QuoteBlock,
        ExperienceBlock,
        MySocialsBlock,
        ButtonBlock,
        TweetCardBlock,
      ],
      localized: true,
    },
  ],
  hooks: {
    afterChange: [revalidatePage],
  },
};
