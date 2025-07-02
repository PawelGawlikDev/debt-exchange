import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/unit/*.test.tsx", "tests/unit/*.test.ts"],
    environment: "jsdom",
    setupFiles: "./vitest-setup.ts",
    maxConcurrency: 1,
    globals: true,
    reporters: process.env.GITHUB_ACTIONS
      ? ["default", "github-actions"]
      : ["default"],
  },
});
