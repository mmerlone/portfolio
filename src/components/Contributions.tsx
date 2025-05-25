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
    <section id="contributions" className={`py-20 relative ${className}`}>
      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle>Selected Contributions</SectionTitle>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8 italic">
          (Note: Due to the proprietary nature of many of these projects,
          specific details and code repositories are often not publicly
          available.)
        </p>
        <div
          className={`relative overflow-hidden transition-[max-height] duration-500 ease-in-out ${
            expanded ? "h-auto" : "max-h-[120rem] more-to-show"
          }`}
        >
          <div className="max-w-4xl mx-auto space-y-8">
            {visibleContributions.map((contrib, idx) => (
              <ContributionCard
                key={contrib.title + contrib.company + idx}
                contribution={contrib}
              />
            ))}
          </div>
          {!expanded && selectedContributions.length > INITIAL_VISIBLE && (
            <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none bg-gradient-to-t from-white to-transparent dark:from-gray-800 dark:to-transparent" />
          )}
        </div>
        {selectedContributions.length > INITIAL_VISIBLE && (
          <div className="mt-4 text-center">
            <button
              onClick={handleToggle}
              aria-expanded={expanded}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
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
