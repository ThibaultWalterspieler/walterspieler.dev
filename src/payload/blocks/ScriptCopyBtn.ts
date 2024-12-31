import { Block } from "payload";
import { bundledLanguages } from "shiki";

export const ScriptCopyBtnBlock: Block = {
  slug: "ScriptCopyBtn",
  fields: [
    {
      name: "showMultiplePackageOptions",
      type: "checkbox",
      defaultValue: true,
    },
    {
      name: "codeLanguage",
      type: "select",
      options: Object.keys(bundledLanguages),
      defaultValue: "shell",
    },
    {
      name: "commandMap",
      type: "json",
      required: true,
      jsonSchema: {
        uri: "a://b/foo.json",
        fileMatch: ["a://b/foo.json"],
        schema: {
          type: "object",
          additionalProperties: {
            type: "string",
          },
        },
      },
    },
  ],
};
