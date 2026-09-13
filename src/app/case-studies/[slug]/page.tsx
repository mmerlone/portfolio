import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { type ReactElement } from "react";
import { ArrowSquareOutIcon, GithubLogoIcon } from "@phosphor-icons/react/ssr";
import { portfolio } from "@/data/portfolio";
import {
  caseStudies,
  getCaseStudyBySlug,
  getCaseStudyHref,
} from "@/lib/caseStudies";
import {
  type PortfolioProjectItem,
  type PortfolioWorkItem,
} from "@/types/portfolio";

interface CaseStudyPageProps {
  readonly params: Promise<{
    readonly slug: string;
  }>;
}

interface CaseStudyLink {
  readonly label: string;
  readonly href: string;
  readonly icon: "external" | "github";
}

export function generateStaticParams(): { slug: string }[] {
  return caseStudies.map((caseStudy) => ({ slug: caseStudy.slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {
      title: `Case study not found — ${portfolio.basic.name}`,
    };
  }

  return {
    title: `${caseStudy.name} case study — ${portfolio.basic.name}`,
    description:
      caseStudy.description ??
      `Engineering case study for ${caseStudy.name} by ${portfolio.basic.name}.`,
    alternates: {
      canonical: getCaseStudyHref(caseStudy),
    },
  };
}

function getOwnedProjectLinks(project: PortfolioProjectItem): CaseStudyLink[] {
  return [
    { label: "Live demo", href: project.demo, icon: "external" },
    { label: "GitHub", href: project.github, icon: "github" },
    ...(project.npm
      ? [{ label: "npm", href: project.npm, icon: "external" as const }]
      : []),
    ...(project.otherLinks?.map((link) => ({
      label: link.label,
      href: link.url,
      icon: "external" as const,
    })) ?? []),
  ];
}

function getCaseStudyLinks(caseStudy: PortfolioWorkItem): CaseStudyLink[] {
  if (caseStudy.kind === "external") {
    return [
      {
        label: "Read the article",
        href: caseStudy.articleUrl,
        icon: "external",
      },
      {
        label: "ArcTouch author profile",
        href: caseStudy.authorProfileUrl,
        icon: "external",
      },
    ];
  }

  return getOwnedProjectLinks(caseStudy);
}

function LinkIcon({ icon }: Pick<CaseStudyLink, "icon">): ReactElement {
  if (icon === "github") {
    return <GithubLogoIcon size={16} weight="bold" />;
  }

  return <ArrowSquareOutIcon size={16} weight="bold" />;
}

export default async function CaseStudyPage({
  params,
}: CaseStudyPageProps): Promise<ReactElement> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  const links = getCaseStudyLinks(caseStudy);
  const constraints =
    caseStudy.kind === "owned" ? (caseStudy.constraints ?? []) : [];
  const decisions =
    caseStudy.kind === "owned" ? (caseStudy.decisions ?? []) : [];
  const tradeoffs =
    caseStudy.kind === "owned" ? (caseStudy.tradeoffs ?? []) : [];

  return (
    <main className="container mx-auto px-4 py-24">
      <article className="mx-auto max-w-4xl">
        <Link
          href="/#selected-engineering-work"
          className="content-action-link text-muted-foreground hover:text-foreground mb-8 inline-flex text-sm font-medium transition-colors"
        >
          Back to selected engineering work
        </Link>

        <header className="mb-10">
          <p className="text-accent mb-3 text-sm font-semibold tracking-wide uppercase">
            Case study
          </p>
          <h1 className="text-foreground balanced-heading mb-5 text-4xl font-bold md:text-5xl">
            {caseStudy.name}
          </h1>
          {caseStudy.description && (
            <p className="text-muted-foreground text-xl leading-relaxed">
              {caseStudy.description}
            </p>
          )}
        </header>

        {caseStudy.heroImage && (
          <figure className="border-border bg-surface-muted mb-10 overflow-hidden rounded-xl border">
            <Image
              src={caseStudy.heroImage.src}
              alt={caseStudy.heroImage.alt}
              width={caseStudy.heroImage.width ?? 1600}
              height={caseStudy.heroImage.height ?? 900}
              sizes={caseStudy.heroImage.sizes ?? "(max-width: 768px) 100vw, 896px"}
              className="h-auto w-full object-cover"
              priority
            />
          </figure>
        )}

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <div className="space-y-10">
            {caseStudy.role && (
              <section aria-labelledby="case-study-role">
                <h2
                  id="case-study-role"
                  className="text-foreground mb-3 text-2xl font-semibold"
                >
                  Role
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {caseStudy.role}
                </p>
              </section>
            )}

            {caseStudy.kind === "external" && (
              <section aria-labelledby="case-study-publication">
                <h2
                  id="case-study-publication"
                  className="text-foreground mb-3 text-2xl font-semibold"
                >
                  Publication
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Publisher: {caseStudy.publisher} · Author: {caseStudy.author}
                </p>
              </section>
            )}

            {caseStudy.kind === "owned" && caseStudy.context && (
              <section aria-labelledby="case-study-context">
                <h2
                  id="case-study-context"
                  className="text-foreground mb-3 text-2xl font-semibold"
                >
                  Context
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {caseStudy.context}
                </p>
              </section>
            )}

            {constraints.length > 0 && (
              <section aria-labelledby="case-study-constraints">
                <h2
                  id="case-study-constraints"
                  className="text-foreground mb-3 text-2xl font-semibold"
                >
                  Constraints
                </h2>
                <ul className="text-muted-foreground list-disc space-y-2 pl-5 leading-relaxed">
                  {constraints.map((constraint) => (
                    <li key={constraint}>{constraint}</li>
                  ))}
                </ul>
              </section>
            )}

            {decisions.length > 0 && (
              <section aria-labelledby="case-study-decisions">
                <h2
                  id="case-study-decisions"
                  className="text-foreground mb-3 text-2xl font-semibold"
                >
                  Decisions
                </h2>
                <ul className="text-muted-foreground list-disc space-y-2 pl-5 leading-relaxed">
                  {decisions.map((decision) => (
                    <li key={decision}>{decision}</li>
                  ))}
                </ul>
              </section>
            )}

            {tradeoffs.length > 0 && (
              <section aria-labelledby="case-study-tradeoffs">
                <h2
                  id="case-study-tradeoffs"
                  className="text-foreground mb-3 text-2xl font-semibold"
                >
                  Trade-offs
                </h2>
                <ul className="text-muted-foreground list-disc space-y-2 pl-5 leading-relaxed">
                  {tradeoffs.map((tradeoff) => (
                    <li key={tradeoff}>{tradeoff}</li>
                  ))}
                </ul>
              </section>
            )}

            {caseStudy.kind === "owned" && caseStudy.outcome && (
              <section aria-labelledby="case-study-outcome">
                <h2
                  id="case-study-outcome"
                  className="text-foreground mb-3 text-2xl font-semibold"
                >
                  Outcome
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {caseStudy.outcome}
                </p>
              </section>
            )}
          </div>

          <aside className="border-border bg-surface h-fit rounded-xl border p-5">
            {caseStudy.technologies && caseStudy.technologies.length > 0 && (
              <section
                aria-labelledby="case-study-technologies"
                className="mb-6"
              >
                <h2
                  id="case-study-technologies"
                  className="text-foreground mb-3 text-base font-semibold"
                >
                  Technologies
                </h2>
                <ul className="flex flex-wrap gap-2">
                  {caseStudy.technologies.map((technology) => (
                    <li
                      key={technology}
                      className="bg-surface-raised text-muted-foreground rounded px-2 py-1 text-xs font-medium"
                    >
                      {technology}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section aria-labelledby="case-study-links">
              <h2
                id="case-study-links"
                className="text-foreground mb-3 text-base font-semibold"
              >
                Links
              </h2>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="content-action-link text-accent hover:text-accent-strong inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
                    >
                      <LinkIcon icon={link.icon} />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      </article>
    </main>
  );
}
