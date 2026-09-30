import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["/node_modules/", "/.kilo/"],
  // Every test, fixture, and manual mock lives under src/, so that is the only
  // tree worth crawling. Without this, jest walks the whole repository root,
  // which includes the Agent Manager worktrees under .kilo/ — eight more full
  // copies of the project, ~800MB — duplicating every src/__mocks__ module and
  // stalling startup on filesystem I/O before a single test is reported.
  roots: ["<rootDir>/src"],
  modulePathIgnorePatterns: ["<rootDir>/.kilo/"],
  setupFilesAfterEnv: [
    "<rootDir>/jest.setup.js",
    "<rootDir>/src/__mocks__/next-dynamic.ts",
    "<rootDir>/src/__mocks__/navigation-menu.tsx",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@lib/(.*)$": "<rootDir>/src/lib/$1",
    "\\.module\\.css$": "identity-obj-proxy",
    "^@vercel/analytics/react$": "<rootDir>/src/__mocks__/vercel-analytics.ts",
    "^@vercel/speed-insights/next$":
      "<rootDir>/src/__mocks__/vercel-speed-insights.ts",
    "^@next/third-parties/google$":
      "<rootDir>/src/__mocks__/next-third-parties-google.ts",
  },
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.jest.json",
      },
    ],
  },
  transformIgnorePatterns: ["/node_modules/(?!(@vercel|@next)/)"],
};

export default config;
