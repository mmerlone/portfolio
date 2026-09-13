import { type NextConfig } from "next";
import { buildSecurityHeaders } from "./src/lib/buildSecurityHeaders";

interface HeaderRoute {
  source: string;
  headers: { key: string; value: string }[];
}

const config: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  headers: (): HeaderRoute[] => {
    const headers = buildSecurityHeaders();
    return [
      {
        source: "/:path*",
        headers: Object.entries(headers).map(([key, value]) => ({
          key,
          value,
        })),
      },
    ];
  },
};

export default config;
