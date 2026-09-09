import { siteConfig } from "@/config/site";

// MetadataRoute.Robots has no passthrough for custom directives like
// Content-Signal, so robots.txt is built manually via a Route Handler.
export function GET(): Response {
  const body = [
    "User-agent: *",
    "Content-Signal: search=yes,ai-input=yes,ai-train=yes,use=full",
    "Allow: /",
    "",
    `Sitemap: ${siteConfig.url}/sitemap.xml`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
