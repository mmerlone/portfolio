import eslintJs from "@eslint/js";
import nextPlugin from "eslint-config-next"; // This is the typical import for eslint-config-next flat configs
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";

/** @type {import('eslint').Linter.FlatConfig[]} */
const eslintConfig = [
  // Global ignores
  {
    ignores: [
      ".next/",
      "node_modules/",
      "dist/",
      ".DS_Store",
      // any other specific files or directories to ignore
    ],
  },

  // Base ESLint recommended rules
  eslintJs.configs.recommended,

  // TypeScript configurations
  // This uses the tseslint.config factory function for convenience.
  // It typically includes:
  // - tseslint.configs.base (base TypeScript rules)
  // - tseslint.configs.eslintRecommended (disables ESLint core rules handled by TypeScript)
  // - tseslint.configs.recommended (recommended TypeScript specific rules)
  // You might need to adjust based on the exact exports of typescript-eslint v8+
  ...tseslint.configs.recommended, // Or more specific configs like tseslint.configs.strict if preferred

  // Configuration for Next.js
  // eslint-config-next should provide its flat config objects directly.
  // The exact structure might need verification with eslint-config-next v15 docs.
  // It often looks like an object with rules, plugins, etc., or an array of configs.
  // Assuming `nextPlugin` is the main config object or array from `eslint-config-next`
  // If `eslint-config-next` exports an array, spread it: `...nextPlugin`
  // If it's an object, just: `nextPlugin`
  // For v15, it's likely an object that might need to be spread or accessed via specific properties.
  // A common pattern is `nextPlugin.configs.recommended` or similar.
  // Given the original `compat.extends("next/core-web-vitals", "next/typescript")`,
  // `eslint-config-next` likely bundles these.
  // Let's assume `eslint-config-next` itself is the config object or needs to be spread.
  // This is a placeholder; the actual structure from `eslint-config-next` v15 needs to be confirmed.
  // It might be an array:
  // ...nextPlugin,
  // Or an object:
  nextPlugin, // This is a common way if 'eslint-config-next' exports a single flat config object or an array.

  // Prettier configuration (must be last to override other formatting rules)
  eslintConfigPrettier,

  // Custom project-specific rules or overrides
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"], // Target specific file types
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        React: "readonly", // if using React globally (less common with modules)
      },
      parserOptions: {
        project: true, // Usually true for typescript-eslint to enable type-aware linting
        tsconfigRootDir: import.meta.dirname, // Or simply __dirname if not using ES modules strictly
      },
    },
    rules: {
      // Example: disable a specific rule
      // "no-console": "warn",
      // Add any project-specific rule overrides here
      // "@typescript-eslint/no-unused-vars": "warn",

      // Ensure Next.js specific rules from `eslint-config-next` are active.
      // `eslint-config-next` should handle this, but you can override if needed.
    },
  },
];

export default eslintConfig;
