import { Block } from "payload";

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
      options: ["shell", "typescript", "javascript", "python"],
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
