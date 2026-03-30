"use client";

import { useState, type ReactElement } from "react";
import { portfolio } from "@/data/portfolio";
import { SectionTitle } from "@/components/ui/SectionTitle";
import ChallengeCard from "@/components/ui/ChallengeCard";
import { cn } from "@/lib/cn";

interface ChallengesSectionProps {
  className?: string;
}

const INITIAL_VISIBLE = 2;

export default function ChallengesSection({
  className,
}: ChallengesSectionProps): ReactElement {
  const [expanded, setExpanded] = useState(false);
  const challenges = portfolio.challenges ?? [];

  const visibleChallenges = expanded
    ? challenges
    : challenges.slice(0, INITIAL_VISIBLE);

  return (
    <section id="challenges" className={cn("relative my-4", className)}>
      <div className="container mx-auto px-4">
        <SectionTitle>Selected Challenges</SectionTitle>
        <p className="mb-8 text-gray-600 dark:text-gray-300">
          The contributions detailed below primarily represent work undertaken
          for previous employers and clients. Due to confidentiality agreements
          and intellectual property considerations, specific project details and
          source code are not publicly available.
        </p>
        <div
          className={cn(
            "relative overflow-hidden transition-[max-height] duration-500 ease-in-out",
            expanded ? "h-auto" : "more-to-show max-h-[120rem]",
          )}
        >
          <div className="mx-auto max-w-4xl space-y-8">
            {visibleChallenges.map((challenge, idx) => (
              <ChallengeCard
                key={challenge.title + challenge.company + idx}
                challenge={challenge}
              />
            ))}
          </div>
          {!expanded && challenges.length > INITIAL_VISIBLE && (
            <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-16 bg-gradient-to-t from-white to-transparent dark:from-gray-800 dark:to-transparent" />
          )}
        </div>
        {challenges.length > INITIAL_VISIBLE && (
          <div className="mt-4 text-center">
            <button
              onClick={(): void => setExpanded((prev) => !prev)}
              aria-expanded={expanded}
              className="rounded text-sm text-blue-600 hover:underline focus:ring-2 focus:ring-blue-400 focus:outline-none dark:text-blue-400"
            >
              {expanded ? "Show less" : "Show more"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
