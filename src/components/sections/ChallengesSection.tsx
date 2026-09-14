import { type ReactElement } from "react";
import { portfolio } from "@/data/portfolio";
import { SectionTitle } from "@/components/ui/SectionTitle";
import ChallengeCard from "@/components/ui/ChallengeCard";

interface SelectedExperienceSectionProps {
  className?: string;
}

export default function SelectedExperienceSection({
  className,
}: SelectedExperienceSectionProps): ReactElement {
  const challenges = portfolio.challenges ?? [];

  return (
    <section
      id="selected-experience"
      aria-labelledby="selected-experience-title"
      className={"relative my-4 " + (className ?? "")}
    >
      <div className="container mx-auto px-4">
        <SectionTitle id="selected-experience-title">
          Selected experience
        </SectionTitle>
        <p className="mb-8 text-gray-600 dark:text-gray-300">
          The contributions detailed below primarily represent work undertaken
          for previous employers and clients. Due to confidentiality agreements
          and intellectual property considerations, specific project details and
          source code are not publicly available.
        </p>
        <div className="relative">
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
