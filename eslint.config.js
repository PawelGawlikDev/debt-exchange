import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import pluginQuery from "@tanstack/eslint-plugin-query";
import { globalIgnores } from "eslint/config";
import vitest from "@vitest/eslint-plugin";
import playwright from "eslint-plugin-playwright";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },
  ...pluginQuery.configs["flat/recommended"],
  {
    files: ["**/*.test.ts"],
    plugins: { vitest },
    rules: {
      ...vitest.configs.recommended.rules,
    },
  },
  {
    ...playwright.configs["flat/recommended"],
    files: ["tests/**/*.ts", "tests/**/*.tsx"],
    rules: {
      ...playwright.configs["flat/recommended"].rules,
    },
  },
]);
