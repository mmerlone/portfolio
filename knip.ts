import type { KnipConfig } from "knip";

const config: KnipConfig = {
  ignore: [
    // Data and public assets: never removed, kept intentionally.
    "src/data/**",
    "public/**",
    "public/archive/**",
    // Internal utilities in cookies.ts used by exported functions (knip doesn't detect intra-file usage).
    "src/lib/cookies.ts",
    // Reserved logger pieces with no caller yet. The server logger (used by the
    // sitemap) is the only one wired up; the isomorphic logger has a known
    // child() context defect that must be fixed before anything imports it.
    "src/lib/logger/client.ts",
    "src/lib/logger/isomorphic.ts",
    // timeOperation() is a reserved helper; maskEmail() in the same file is used.
    "src/lib/logger/utils.ts",
    // SocialIcons exports used dynamically via getSocialIcon() - knip can't detect dynamic imports.
    "src/components/ui/SocialIcons.tsx",
  ],
};

export default config;
