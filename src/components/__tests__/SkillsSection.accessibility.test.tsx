import { render, screen, within } from "@testing-library/react";
import { axe } from "jest-axe";
import SkillsSection from "@/components/sections/SkillsSection";
import { skills } from "@/data/skills";
import { getSkillLabels } from "@/lib/skills";

describe("SkillsSection", () => {
  it("has no aXe violations with all skills visible", async (): Promise<void> => {
    const { container } = render(<SkillsSection />);

    expect(await axe(container)).toHaveNoViolations();

    expect(container.querySelectorAll("details, summary")).toHaveLength(0);
  });

  it("preserves the skills anchor and uses a nested heading outline", (): void => {
    const { container } = render(<SkillsSection className="test-skills" />);

    expect(container.querySelectorAll("#skills")).toHaveLength(1);
    expect(screen.getByRole("region", { name: "Skills" })).toHaveAttribute(
      "id",
      "skills",
    );
    expect(
      screen.getByRole("heading", { name: "Skills", level: 2 }),
    ).toHaveAttribute("id", "skills-title");
    expect(
      screen.getByRole("heading", { name: "Hard", level: 3 }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Soft", level: 3 }),
    ).toBeInTheDocument();
    expect(container.querySelector(".test-skills")).toBeInTheDocument();
  });

  it("shows all soft skill descriptions and evidence without confidence", (): void => {
    render(<SkillsSection />);
    const subsection = screen.getByRole("region", { name: "Soft" });
    const items = within(subsection).getAllByRole("listitem");

    expect(skills.soft).toHaveLength(14);
    expect(items).toHaveLength(skills.soft.length);
    expect(new Set(skills.soft.map((skill): string => skill.id)).size).toBe(
      skills.soft.length,
    );

    for (const [index, skill] of skills.soft.entries()) {
      const item = items[index];
      expect(item).toHaveAttribute("id", skill.id);
      expect(
        within(item).getByRole("heading", { name: skill.name, level: 4 }),
      ).toBeVisible();
      expect(within(item).getByText(skill.description)).toBeVisible();
      expect(item).toHaveTextContent(`Evidence: ${skill.evidence}`);
      expect(within(item).getByText(/^Evidence:/)).toBeVisible();
      expect(skill).not.toHaveProperty("confidence");
      expect(item.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    }
  });

  it("shows all hard skill clusters, descriptions, and badges immediately", (): void => {
    render(<SkillsSection />);
    const subsection = screen.getByRole("region", { name: "Hard" });
    const items = within(subsection).getAllByRole("listitem");

    expect(items).toHaveLength(skills.hard.clusters.length);
    expect(
      within(subsection).queryByText(/^View \d+ skills$/),
    ).not.toBeInTheDocument();

    for (const [index, cluster] of skills.hard.clusters.entries()) {
      const item = items[index];
      expect(
        within(item).getByRole("heading", {
          name: cluster.title,
          level: 4,
        }),
      ).toBeVisible();
      expect(within(item).getByText(cluster.description)).toBeVisible();
      expect(item.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
      for (const skill of getSkillLabels(cluster.skills)) {
        for (const badge of within(item).getAllByText(skill)) {
          expect(badge).toBeVisible();
        }
      }
    }
  });
});
