import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import nextPlugin from "@next/eslint-plugin-next";
import prettier from "eslint-config-prettier/flat";
import globals from "globals";

export default [
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "build/**",
      "coverage/**",
      "*.config.js",
      "*.config.cjs",
      "vite.config.*",
      "vitest.config.*",
      "tsconfig.tsbuildinfo",
      "src/components/archive/**",
      "src/data/archive/**",
      "src/types/archive/**",
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactPlugin.configs.flat.recommended,

  /* Next & React Configuration */
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    plugins: {
      "react-hooks": reactHooks,
      "@next/next": nextPlugin,
    },
    settings: {
      react: { version: "19" },
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2024,
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,

      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",

      "react/react-in-jsx-scope": "off",
      "react/prop-types": "error",
      "react/no-deprecated": "error",

      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "react",
              importNames: ["default"],
              message:
                "Please use named imports (e.g. import { useState } from 'react') instead of the default React import.",
            },
          ],
        },
      ],
    },
  },

  /* Base JavaScript / TypeScript Unified Quality Rules */
  {
    rules: {
      "no-console": "error",
      "no-debugger": "error",
      "no-implicit-coercion": "error",
      "no-duplicate-imports": "error",
      "no-var": "error",
      "prefer-const": "error",
      eqeqeq: ["error", "always"],
      curly: ["error", "multi-line"],
    },
  },

  /* TypeScript Strict Rules */
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2024,
      },
    },
    rules: {
      // Disable base rules in favor of TypeScript equivalents
      "no-unused-vars": "off",
      "no-use-before-define": "off",
      "no-shadow": "off",
      "no-redeclare": "off",

      "@typescript-eslint/no-unused-vars": [
        "error",
        { ignoreRestSiblings: true },
      ],
      "@typescript-eslint/no-use-before-define": "error",
      "@typescript-eslint/no-shadow": "error",
      "@typescript-eslint/no-redeclare": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      "@typescript-eslint/return-await": ["error", "in-try-catch"],

      // Type safety
      "@typescript-eslint/no-unsafe-assignment": "error",
      "@typescript-eslint/no-unsafe-return": "error",
      "@typescript-eslint/no-unsafe-member-access": "error",
      "@typescript-eslint/no-unsafe-call": "error",
      "@typescript-eslint/await-thenable": "error",

      // Async handling
      "@typescript-eslint/no-floating-promises": [
        "error",
        { ignoreVoid: false },
      ],
      "@typescript-eslint/no-misused-promises": [
        "error",
        { checksVoidReturn: { attributes: false } },
      ],

      // Code style
      "@typescript-eslint/explicit-function-return-type": [
        "error",
        {
          allowExpressions: false,
          allowTypedFunctionExpressions: true,
        },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
      "@typescript-eslint/consistent-type-exports": "error",
      "@typescript-eslint/prefer-nullish-coalescing": "warn",
      "@typescript-eslint/prefer-optional-chain": "error",

      // Restricted patterns
      "no-restricted-syntax": [
        "error",
        {
          selector:
            "TSAsExpression[expression.type='TSAsExpression'][expression.typeAnnotation.type='TSUnknownKeyword']",
          message: "Double casting with 'as unknown as' is forbidden.",
        },
        {
          selector: "TSAsExpression[typeAnnotation.type='TSAnyKeyword']",
          message: "Casting to 'any' is forbidden.",
        },
        {
          selector:
            "TSAsExpression[expression.type='TSAsExpression'] > TSAsExpression",
          message: "Triple casting is forbidden.",
        },
        {
          selector:
            "CallExpression[callee.object.name='JSON'][callee.property.name='parse']",
          message: "Unsafe JSON.parse usage detected. Use a validation layer.",
        },
        {
          selector:
            "TSAsExpression > CallExpression[callee.property.name='json']",
          message: "Do not cast fetch().json() directly. Validate first.",
        },
      ],
    },
  },

  /* Declaration files */
  {
    files: ["**/*.d.ts"],
    rules: {
      "@typescript-eslint/prefer-nullish-coalescing": "off",
    },
  },

  /* Test files - relaxed rules */
  {
    files: [
      "**/*.test.ts",
      "**/*.test.tsx",
      "**/*.spec.ts",
      "**/*.spec.tsx",
      "**/__tests__/**/*.ts",
      "**/__tests__/**/*.tsx",
    ],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "no-restricted-syntax": "off",
    },
  },

  /* Scripts - Node.js environment */
  {
    files: ["scripts/**/*"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2024,
      },
    },
    rules: {
      "no-console": "off",
      "no-restricted-syntax": "off",
    },
  },

  prettier,
];
