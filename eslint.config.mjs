import { defineConfig, globalIgnores } from "eslint/config";

import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "src/payload/payload-types.ts",
    "src/payload/migrations/**/*",
    "src/app/(payload)/**/*",
  ]),
  {
    rules: {
      "react/jsx-sort-props": "warn",
      "prefer-const": "error",
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling"],
            "object",
            "type",
            "index",
          ],
          pathGroups: [
            {
              pattern: "eslint/**",
              group: "builtin",
              position: "before",
            },
            {
              pattern: "{react,react-dom/**}",
              group: "external",
              position: "before",
            },
            {
              pattern: "@components/**",
              group: "external",
              position: "after",
            },
            {
              pattern: "@lib/**",
              group: "external",
              position: "after",
            },
            {
              pattern: "@styles/**",
              group: "external",
              position: "after",
            },
          ],
          distinctGroup: true,
          pathGroupsExcludedImportTypes: ["react"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
]);

export default eslintConfig;
