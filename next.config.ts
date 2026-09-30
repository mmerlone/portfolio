import { type NextConfig } from "next";
import { buildSecurityHeaders } from "./src/lib/buildSecurityHeaders";

interface HeaderRoute {
  source: string;
  headers: { key: string; value: string }[];
}

/**
 * Next.js rejects `/_next/*` dev requests whose `Origin` header it does not
 * recognize, answering 403. Chrome sends an `Origin` on every module script
 * fetch, so opening the dev server over a LAN address (for example on a real
 * phone) serves the HTML but refuses every chunk: the page never hydrates, and
 * client behaviour such as the mobile menu or the scroll-to-top button stays
 * dead. The same block also fails the HMR websocket handshake.
 *
 * Hosts are listed without scheme or port, which is the shape Next matches on,
 * and `*` matches a single DNS segment. The private ranges cover a router-assigned
 * address without pinning one lease.
 */
const config: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  allowedDevOrigins: ["localhost", "127.0.0.1", "192.168.*.*", "10.*.*.*"],
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
