import { type ReactElement } from "react";
import type { PortfolioChallenge } from "@/types/portfolio";

interface ChallengeCardProps {
  challenge: PortfolioChallenge;
}

const ChallengeCard = ({ challenge }: ChallengeCardProps): ReactElement => (
  <article className="border-border bg-surface rounded-lg border p-6">
    <h3 className="text-accent mb-1 text-xl font-bold">{challenge.title}</h3>
    <div className="text-muted-foreground mb-2 font-semibold">
      {challenge.company}
      {challenge.period && (
        <span className="text-subtle-foreground ml-2 text-sm">
          ({challenge.period})
        </span>
      )}
    </div>
    <div className="mb-2">
      <span className="text-foreground font-semibold">Challenge:</span>
      <span className="text-muted-foreground ml-1">{challenge.challenge}</span>
    </div>
    <div className="mb-2">
      <span className="text-foreground font-semibold">Action:</span>
      <ul className="text-muted-foreground ml-6 list-disc">
        {challenge.action.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
    <div className="mb-2">
      <span className="text-foreground font-semibold">Result:</span>
      <ul className="text-muted-foreground ml-6 list-disc">
        {challenge.result.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
    <div className="mt-2 flex flex-wrap gap-2">
      {challenge.technologies.map((tech, index) => (
        <span
          key={`${tech}-${index}`}
          className="bg-accent-soft text-accent-soft-foreground inline-block rounded px-2 py-1 text-xs font-semibold"
        >
          {tech}
        </span>
      ))}
    </div>
  </article>
);

export default ChallengeCard;
