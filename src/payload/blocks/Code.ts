import { Block } from "payload";

import { CODE_LANGUAGES } from "@/lib/code-languages";

export const CodeBlock: Block = {
  slug: "Code",
  fields: [
    {
      name: "title",
      type: "text",
      admin: { description: "Shown above the code, e.g. a file name." },
    },
    {
      name: "language",
      type: "select",
      required: true,
      defaultValue: "typescript",
      options: [...CODE_LANGUAGES],
    },
    { name: "code", type: "code", localized: true },
    { name: "lineNumbers", type: "checkbox", defaultValue: false },
  ],
};
