import type { KnipConfig } from "knip";

const config: KnipConfig = {
  ignore: [
    // Kept intentionally for an upcoming refactor; not wired up yet.
    "src/components/Section.tsx",
    // Logging infrastructure kept intentionally for future use; not wired up yet.
    "src/lib/logger/**",
    "src/types/logger.types.ts",
  ],
  ignoreDependencies: [
    // Consumed only via CSS `@import`, invisible to static JS/TS analysis.
    "tailwindcss",
    "open-props",
  ],
};

export default config;
