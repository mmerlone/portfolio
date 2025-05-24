"use client";

import { useState } from "react";
import { experiences, Experience as ExperienceType } from "@/data/experience";
import { FaExternalLinkAlt } from "react-icons/fa";
import { ExperienceProps } from "@/types/components"; // Updated import
import { SectionTitle } from "./ui/SectionTitle";
import Image from "next/image";
import { siteConfig } from "@/config/site";

const Experience = ({ className = "" }: ExperienceProps) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <section id="experience" className={`py-20 relative ${className}`}>
      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle>Professional Experience</SectionTitle>
        <div className="max-w-4xl mx-auto">
          <div
            className={`relative space-y-12 ${
              expanded ? "h-auto" : "max-h-96 more-to-show"
            } overflow-hidden transition-all duration-500`}
          >
            {experiences.map((job: ExperienceType, index: number) => (
              // Render job timeline entries...
              <div key={index} className="relative pl-8 sm:pl-32 py-6 group">
                {/* Timeline line and dot */}
                <div className="absolute left-0 sm:left-16 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
                <div className="absolute left-0 sm:left-16 top-8 w-4 h-4 rounded-full bg-orange-500 dark:bg-orange-400 transform -translate-x-1/2" />
                {/* Company logo */}
                <div className="absolute left-0 sm:left-0 top-6 w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-md">
                  {job.logo && (
                    <Image
                      src={job.logo}
                      alt={`${job.company} logo`}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                {/* Content */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform transition-transform hover:scale-[1.02]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {job.title}
                      </h3>
                      <p className="text-lg text-gray-600 dark:text-gray-300">
                        {job.company}
                      </p>
                    </div>
                    <div className="text-sm text-orange-600 dark:text-orange-400">
                      {job.period}
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {job.description}
                  </p>
                  {/* More details... */}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={handleExpand}
            className="mt-4 text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        </div>
        <div className="text-center mt-12">
          <a
            href={siteConfig.links.resume}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
          >
            View Full Resume
            <FaExternalLinkAlt className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Experience;
