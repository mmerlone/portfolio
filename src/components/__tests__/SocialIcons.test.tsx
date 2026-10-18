import { render } from "@testing-library/react";
import {
  FacebookIcon,
  getSocialIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  WebsiteIcon,
} from "@/components/ui/SocialIcons";

describe("getSocialIcon", () => {
  it.each([
    ["linkedin", LinkedinIcon],
    ["github", GithubIcon],
    ["website", WebsiteIcon],
    ["instagram", InstagramIcon],
    ["facebook", FacebookIcon],
  ])("returns the matching icon for %s", (name, expected) => {
    expect(getSocialIcon(name)).toBe(expected);
  });

  it.each([
    ["GitHub", GithubIcon],
    ["LINKEDIN", LinkedinIcon],
  ])("matches %s case-insensitively", (name, expected) => {
    expect(getSocialIcon(name)).toBe(expected);
  });

  it.each([
    ["an unknown name", "mastodon"],
    ["an empty string", ""],
    ["whitespace only", "   "],
  ])("falls back to WebsiteIcon for %s", (_label, name) => {
    expect(getSocialIcon(name)).toBe(WebsiteIcon);
  });

  it.each([
    "constructor",
    "__proto__",
    "toString",
    "hasOwnProperty",
    "valueOf",
  ])("falls back to WebsiteIcon for the prototype key %s", (name) => {
    expect(getSocialIcon(name)).toBe(WebsiteIcon);
  });

  it("returns a renderable SVG component for a prototype key", () => {
    const Icon = getSocialIcon("constructor");
    const { container } = render(<Icon />);

    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
