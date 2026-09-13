import { render, screen } from "@testing-library/react";
import CaseStudyPage, {
  generateMetadata,
  generateStaticParams,
} from "@/app/case-studies/[slug]/page";
import { caseStudies, getCaseStudyHref } from "@/lib/caseStudies";
import { portfolio } from "@/data/portfolio";
import {
  type PortfolioExternalArticle,
  type PortfolioProjectItem,
} from "@/types/portfolio";

const getPageProps = (
  slug: string,
): { params: Promise<{ readonly slug: string }> } => ({
  params: Promise.resolve({ slug }),
});

const ownedCaseStudy = caseStudies.find(
  (caseStudy): caseStudy is PortfolioProjectItem => caseStudy.kind === "owned",
);
const externalCaseStudy = caseStudies.find(
  (caseStudy): caseStudy is PortfolioExternalArticle =>
    caseStudy.kind === "external",
);

if (!ownedCaseStudy || !externalCaseStudy) {
  throw new Error("Expected owned and external case study fixtures.");
}

describe("/case-studies/[slug] page", () => {
  it("generates static params for every selected engineering work item", () => {
    expect(generateStaticParams()).toEqual(
      caseStudies.map((caseStudy) => ({ slug: caseStudy.slug })),
    );
  });

  it("generates route-specific metadata", async () => {
    const [caseStudy] = caseStudies;
    const metadata = await generateMetadata(getPageProps(caseStudy.slug));

    expect(metadata.title).toBe(
      `${caseStudy.name} case study — ${portfolio.basic.name}`,
    );
    expect(metadata.description).toBe(caseStudy.description);
    expect(metadata.alternates).toEqual(
      expect.objectContaining({ canonical: getCaseStudyHref(caseStudy) }),
    );
  });

  it("renders the owned project case-study content", async () => {
    render(await CaseStudyPage(getPageProps(ownedCaseStudy.slug)));

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      ownedCaseStudy.name,
    );
    expect(screen.getByText(ownedCaseStudy.context ?? "")).toBeInTheDocument();
    expect(screen.getByText("Constraints")).toBeInTheDocument();
    expect(screen.getByText("Decisions")).toBeInTheDocument();
    expect(screen.getByText("Trade-offs")).toBeInTheDocument();
    expect(screen.getByText("Outcome")).toBeInTheDocument();
    expect(
      screen.queryByRole("img", { name: /case study/i }),
    ).not.toBeInTheDocument();
  });

  it("renders external article attribution and links", async () => {
    render(await CaseStudyPage(getPageProps(externalCaseStudy.slug)));

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      externalCaseStudy.name,
    );
    expect(screen.getByText(/Publisher: ArcTouch/)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /read the article/i }),
    ).toHaveAttribute("href", externalCaseStudy.articleUrl);
  });
});
