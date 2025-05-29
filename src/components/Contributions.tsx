"use client";

import { useState } from "react";
import { selectedContributions } from "@/data/contributions";
import { SectionTitle } from "./ui/SectionTitle";
import ContributionCard from "./ContributionCard";

const INITIAL_VISIBLE = 2; // Number of contributions to show initially

const Contributions = ({ className = "" }: { className?: string }) => {
  const [expanded, setExpanded] = useState(false);
  const handleToggle = () => setExpanded((prev) => !prev);

  const visibleContributions = expanded
    ? selectedContributions
    : selectedContributions.slice(0, INITIAL_VISIBLE);

  return (
    <section id="contributions" className={`relative py-20 ${className}`}>
      <div className="relative z-10 container mx-auto px-4">
        <SectionTitle>Selected Contributions</SectionTitle>
        <p className="mb-8 text-gray-600 dark:text-gray-300">
          The contributions detailed below primarily represent work undertaken
          for previous employers and clients. Due to confidentiality agreements
          and intellectual property considerations inherent in such engagements,
          specific project details, internal documentation, and source code
          repositories are not publicly available. This is a common aspect of
          professional software development within enterprise and client-focused
          environments, where discretion and the protection of proprietary
          information are paramount.
        </p>
        <div
          className={`relative overflow-hidden transition-[max-height] duration-500 ease-in-out ${
            expanded ? "h-auto" : "more-to-show max-h-[120rem]"
          }`}
        >
          <div className="mx-auto max-w-4xl space-y-8">
            {visibleContributions.map((contrib, idx) => (
              <ContributionCard
                key={contrib.title + contrib.company + idx}
                contribution={contrib}
              />
            ))}
          </div>
          {!expanded && selectedContributions.length > INITIAL_VISIBLE && (
            <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-16 bg-gradient-to-t from-white to-transparent dark:from-gray-800 dark:to-transparent" />
          )}
        </div>
        {selectedContributions.length > INITIAL_VISIBLE && (
          <div className="mt-4 text-center">
            <button
              onClick={handleToggle}
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
};

export default Contributions;
