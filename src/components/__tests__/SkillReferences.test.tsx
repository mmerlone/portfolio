import { render, screen, within } from "@testing-library/react";
import { ProjectArticleCard } from "@/components/ui/ProjectArticleCard";
import ChallengeCard from "@/components/ui/ChallengeCard";
import MyPathSection from "@/components/sections/MyPathSection";
import { projects } from "@/data/projects";
import { challenges } from "@/data/challenges";
import { pathStages } from "@/data/pathStages";
import { getSkillLabels } from "@/lib/skills";

describe("contextual technology labels", () => {
  it("renders every owned and external work label, including versions", (): void => {
    for (const project of projects) {
      const { container, unmount } = render(
        <ProjectArticleCard project={project} />,
      );
      for (const label of getSkillLabels(project.technologies ?? [])) {
        expect(within(container).getByText(label)).toBeVisible();
      }
      expect(container).not.toHaveTextContent("[object Object]");
      unmount();
    }
  });

  it("renders every challenge label without changing the source context", (): void => {
    for (const challenge of challenges) {
      const { container, unmount } = render(
        <ChallengeCard challenge={challenge} />,
      );
      for (const label of getSkillLabels(challenge.technologies)) {
        expect(within(container).getAllByText(label).length).toBeGreaterThan(0);
      }
      expect(container).not.toHaveTextContent("[object Object]");
      unmount();
    }
  });

  it("resolves path-stage technology labels", (): void => {
    render(<MyPathSection />);
    for (const stage of pathStages) {
      for (const label of getSkillLabels(stage.technologies)) {
        expect(screen.getAllByText(label).length).toBeGreaterThan(0);
      }
    }
  });
});
