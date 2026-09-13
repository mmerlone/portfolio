import type { KnipConfig } from "knip";

const config: KnipConfig = {
  ignore: [
    // Data and public assets: never removed, kept intentionally.
    "src/data/**",
    "public",
    "public/archive/**",
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
