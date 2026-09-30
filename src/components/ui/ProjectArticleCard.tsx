import { type ReactElement } from "react";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/SocialIcons";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getCaseStudyHref } from "@/lib/caseStudies";
import { type PortfolioWorkItem } from "@/types/portfolio";

interface ProjectArticleCardProps {
  project: PortfolioWorkItem;
}

export function ProjectArticleCard({
  project,
}: ProjectArticleCardProps): ReactElement {
  return (
    <Card
      padding="none"
      id={project.kind === "external" ? `${project.slug}-article` : undefined}
      className="flex flex-col overflow-hidden"
    >
      {project.heroImage && (
        <figure className="bg-muted relative aspect-video w-full overflow-hidden">
          <Image
            src={project.heroImage.src}
            alt={project.heroImage.alt}
            fill
            sizes={
              project.heroImage.sizes ??
              "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            }
            className="h-full w-full object-cover transition-opacity duration-300"
            loading="lazy"
          />
        </figure>
      )}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-foreground mb-2 text-xl font-semibold">
          {project.name}
        </h3>
        {project.description && (
          <p className="text-muted-foreground mb-4 flex-1 text-sm">
            {project.description}
          </p>
        )}
        {project.kind === "external" ? (
          <p className="text-muted-foreground mb-4 text-xs">
            Publisher: {project.publisher} · Author: {project.author}
          </p>
        ) : null}
        {project.role && (
          <p className="text-muted-foreground mb-4 text-xs font-medium">
            Role: {project.role}
          </p>
        )}
        {project.technologies && project.technologies.length > 0 && (
          <div className="m-4 flex flex-wrap gap-2">
            {project.technologies.map((tech, idx) => (
              <Badge key={`${project.name}-${tech}-${idx}`}>{tech}</Badge>
            ))}
          </div>
        )}
        <div className="flex flex-wrap gap-3">
          <Link
            href={getCaseStudyHref(project)}
            className="content-action-link text-primary hover:text-primary/80 inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
          >
            <ExternalLink size={14} strokeWidth={2.5} />
            View case study
          </Link>
          {project.kind === "external" ? (
            <>
              <a
                href={project.articleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="content-action-link text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
              >
                <ExternalLink size={14} strokeWidth={2.5} />
                Read the article
              </a>
              <a
                href={project.authorProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="content-action-link text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
              >
                <ExternalLink size={14} strokeWidth={2.5} />
                ArcTouch author profile
              </a>
            </>
          ) : (
            <>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="content-action-link text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
              >
                <ExternalLink size={14} strokeWidth={2.5} />
                Live demo
              </a>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="content-action-link text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
              >
                <GithubIcon size={14} strokeWidth={2.5} />
                GitHub
              </a>
              {project.npm && (
                <a
                  href={project.npm}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="content-action-link text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
                >
                  <ExternalLink size={14} strokeWidth={2.5} />
                  npm
                </a>
              )}
              {project.otherLinks?.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="content-action-link text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
                >
                  <ExternalLink size={14} strokeWidth={2.5} />
                  {link.label}
                </a>
              ))}
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
