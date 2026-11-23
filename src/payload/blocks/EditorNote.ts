import { Block } from "payload";

export const EditorNoteBlock: Block = {
  slug: "EditorNote",
  labels: { singular: "Editor's note", plural: "Editor's notes" },
  fields: [
    {
      name: "kind",
      type: "select",
      required: true,
      defaultValue: "update",
      options: [
        { label: "Update", value: "update" },
        { label: "Correction", value: "correction" },
      ],
      admin: {
        description:
          'Update: the world changed since publishing. Correction: the article was wrong. Only updates set the article\'s "Updated" date.',
      },
    },
    {
      name: "date",
      type: "date",
      required: true,
      admin: { date: { pickerAppearance: "dayOnly" } },
    },
    { name: "body", type: "richText", required: true, localized: true },
  ],
};
