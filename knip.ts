import type { KnipConfig } from "knip";

const config: KnipConfig = {
  ignore: [
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
