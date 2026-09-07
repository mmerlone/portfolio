import robots from "@/app/robots";
import sitemap from "@/app/sitemap";

describe("metadata routes", () => {
  it("publishes only the canonical page in the sitemap", () => {
    const [entry] = sitemap();

    expect(entry).toMatchObject({
      url: "https://mmerlone.dev.br/",
      changeFrequency: "monthly",
      priority: 1,
      images: ["https://mmerlone.dev.br/images/profile/profile.png"],
    });
    expect(entry.lastModified).toBeInstanceOf(Date);
  });

  it("allows crawling and advertises the canonical sitemap", () => {
    expect(robots()).toEqual({
      rules: {
        userAgent: "*",
        allow: "/",
      },
      sitemap: "https://mmerlone.dev.br/sitemap.xml",
    });
  });
});
