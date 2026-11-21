import { defineConfig } from "vitest/config";

export default defineConfig({
  // Same aliases as the app: read from tsconfig.json's `paths`
  resolve: { tsconfigPaths: true },
  test: {
    include: ["src/**/*.test.ts"],
  },
});
