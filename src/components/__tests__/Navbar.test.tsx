import { fireEvent, render, screen } from "@testing-library/react";
import Navbar from "@/components/Navbar";
import { caseStudies, getCaseStudyHref } from "@/lib/caseStudies";

jest.mock("next/navigation", () => ({
  usePathname: (): string => "/",
}));

describe("Navbar", () => {

  it("renders a Case studies dropdown between Root and Contact", () => {
    const { container } = render(<Navbar />);

    const desktopItems = Array.from(
      container.querySelectorAll("nav > div > div > ul > li"),
    )
      .map((item) => item.querySelector(":scope > a, :scope > button"))
      .map((item) => item?.textContent)
      .filter((label): label is string => Boolean(label));

    expect(desktopItems).toEqual(
      expect.arrayContaining(["Root", "Case studies", "Contact"]),
    );
    expect(desktopItems.indexOf("Root")).toBeLessThan(
      desktopItems.indexOf("Case studies"),
    );
    expect(desktopItems.indexOf("Case studies")).toBeLessThan(
      desktopItems.indexOf("Contact"),
    );
  });

  it("opens the Case studies dropdown with every case-study link", () => {
    render(<Navbar />);

    fireEvent.click(screen.getByRole("button", { name: /case studies/i }));

    for (const caseStudy of caseStudies) {
      expect(
        screen.getByRole("link", { name: caseStudy.name }),
      ).toHaveAttribute("href", getCaseStudyHref(caseStudy));
    }
  });

  it("renders Me link with href /", () => {
    render(<Navbar />);

    fireEvent.click(screen.getByRole("button", { name: /root/i }));
    const meLink = screen.getByRole("link", { name: "Me" });
    expect(meLink).toHaveAttribute("href", "/");
  });

  it("keeps section anchors in the URL", () => {
    render(<Navbar />);

    fireEvent.click(screen.getByRole("button", { name: /root/i }));

    expect(screen.getByRole("link", { name: "Experience" })).toHaveAttribute(
      "href",
      "/#selected-experience",
    );
  });
});
