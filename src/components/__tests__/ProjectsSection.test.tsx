import { render, screen } from "@testing-library/react";
import ProjectsSection from "@/components/sections/ProjectsSection";
import { portfolio } from "@/data/portfolio";
import { getCaseStudyHref } from "@/lib/caseStudies";

describe("ProjectsSection", () => {
  it("links every selected engineering work card to a case-study page", () => {
    render(<ProjectsSection />);

    const caseStudyLinks = screen.getAllByRole("link", {
      name: /view case study/i,
    });

    expect(caseStudyLinks).toHaveLength(portfolio.openSourceProjects.length);
    const renderedHrefs = caseStudyLinks.map((link) =>
      link.getAttribute("href"),
    );
    for (const project of portfolio.openSourceProjects) {
      expect(renderedHrefs).toContain(getCaseStudyHref(project));
    }
  });

  it("does not render inline expandable case-study details inside cards", () => {
    const { container } = render(<ProjectsSection />);

    expect(container.querySelector("details")).toBeNull();
    expect(screen.queryByText("Case study details")).not.toBeInTheDocument();
  });
});
