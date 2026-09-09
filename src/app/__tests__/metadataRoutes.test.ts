import sitemap from "@/app/sitemap";

describe("metadata routes", () => {
  it("publishes the homepage in the sitemap", () => {
    const [entry] = sitemap();

    expect(entry).toMatchObject({
      url: "https://mmerlone.dev.br/",
      changeFrequency: "monthly",
      priority: 1,
      images: ["https://mmerlone.dev.br/images/profile/profile.png"],
    });
    expect(entry.lastModified).toBeInstanceOf(Date);
  });

  it("publishes /about, /contact, and /privacy at or below homepage priority", () => {
    const entries = sitemap();
    const [homepage] = entries;

    const about = entries.find(
      (entry) => entry.url === "https://mmerlone.dev.br/about",
    );
    const contact = entries.find(
      (entry) => entry.url === "https://mmerlone.dev.br/contact",
    );
    const privacy = entries.find(
      (entry) => entry.url === "https://mmerlone.dev.br/privacy",
    );

    expect(about).toMatchObject({
      changeFrequency: "yearly",
      priority: 0.6,
    });
    expect(contact).toMatchObject({
      changeFrequency: "yearly",
      priority: 0.6,
    });
    expect(privacy).toMatchObject({
      changeFrequency: "yearly",
      priority: 0.3,
    });

    for (const entry of [about, contact, privacy]) {
      expect(entry?.lastModified).toBeInstanceOf(Date);
      expect(entry?.priority ?? 0).toBeLessThanOrEqual(homepage.priority ?? 1);
    }
  });

  it("does not publish non-HTML representations in the sitemap", () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls).not.toContain("https://mmerlone.dev.br/index.md");
    expect(urls).not.toContain("https://mmerlone.dev.br/llms.txt");
    expect(urls).not.toContain("https://mmerlone.dev.br/robots.txt");
  });
});
