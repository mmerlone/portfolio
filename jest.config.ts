import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["/node_modules/", "/.kilo/"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js", "<rootDir>/src/__mocks__/next-dynamic.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@lib/(.*)$": "<rootDir>/src/lib/$1",
    "\\.module\\.css$": "identity-obj-proxy",
    "^@vercel/analytics/react$": "<rootDir>/src/__mocks__/vercel-analytics.ts",
    "^@vercel/speed-insights/next$": "<rootDir>/src/__mocks__/vercel-speed-insights.ts",
    "^@next/third-parties/google$": "<rootDir>/src/__mocks__/next-third-parties-google.ts",
  },
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.jest.json",
      },
    ],
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(@vercel|@next)/)",
  ],
};

export default config;