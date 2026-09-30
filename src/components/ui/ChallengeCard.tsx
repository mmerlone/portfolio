import { type ReactElement } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { PortfolioChallenge } from "@/types/portfolio";

interface ChallengeCardProps {
  challenge: PortfolioChallenge;
}

const ChallengeCard = ({ challenge }: ChallengeCardProps): ReactElement => (
  <Card>
    <h3 className="text-primary mb-1 text-xl font-bold">{challenge.title}</h3>
    <div className="text-muted-foreground mb-2 font-semibold">
      {challenge.company}
      {challenge.period && (
        <span className="text-muted-foreground ml-2 text-sm">
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
        <Badge key={`${tech}-${index}`} variant="accent">
          {tech}
        </Badge>
      ))}
    </div>
  </Card>
);

export default ChallengeCard;
