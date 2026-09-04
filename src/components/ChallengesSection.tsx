import { type ReactElement } from "react";
import { portfolio } from "@/data/portfolio";
import { SectionTitle } from "@/components/ui/SectionTitle";
import ChallengeCard from "@/components/ui/ChallengeCard";
import { cn } from "@/lib/cn";

interface ChallengesSectionProps {
  className?: string;
}

export default function ChallengesSection({
  className,
}: ChallengesSectionProps): ReactElement {
  const challenges = portfolio.challenges ?? [];

  return (
    <section
      id="challenges"
      aria-labelledby="challenges-title"
      className={cn("relative my-4", className)}
    >
      <div className="container mx-auto px-4">
        <SectionTitle id="challenges-title">Selected Challenges</SectionTitle>
        <p className="text-muted-foreground mb-8">
          The contributions detailed below primarily represent work undertaken
          for previous employers and clients. Due to confidentiality agreements
          and intellectual property considerations, specific project details and
          source code are not publicly available.
        </p>
        <div className={cn("relative")}>
          <div className="mx-auto max-w-4xl space-y-8">
            {challenges.map((challenge, idx) => (
              <ChallengeCard
                key={`${challenge.title}-${challenge.company}-${idx}`}
                challenge={challenge}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
