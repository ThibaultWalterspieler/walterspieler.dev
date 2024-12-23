import { GlobalConfig } from "payload";

export const MainMenu: GlobalConfig = {
  slug: "mainMenu",
  fields: [
    {
      name: "menuItems",
      type: "array",
      label: "Menu Items",
      fields: [
        {
          name: "label",
          type: "text",
          localized: true,
          required: true,
          unique: true,
        },
        {
          name: "type",
          type: "select",
          required: true,
          options: [
            {
              label: "Home",
              value: "home",
            },
            {
              label: "Blog",
              value: "blog",
            },
            {
              label: "Lab",
              value: "lab",
            },
            {
              label: "Experiences",
              value: "experiences",
            },
            {
              label: "Contact",
              value: "contact",
            },
            {
              label: "99Stud",
              value: "99Stud",
            },
            {
              label: "Other",
              value: "other",
            },
          ],
        },
        {
          name: "external",
          type: "checkbox",
          defaultValue: false,
          required: true,
        },
        {
          name: "page",
          type: "relationship",
          relationTo: "pages",
        },
        {
          name: "path",
          label: "External Path",
          type: "text",
        },
      ],
    },
  ],
};
