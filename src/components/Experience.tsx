"use client";

import { useState } from "react";
import { experiences, Experience as ExperienceType } from "@/data/experience";
import { FaExternalLinkAlt, FaBriefcase } from "react-icons/fa";
import { ExperienceProps } from "@/types/components";
import { SectionTitle } from "./ui/SectionTitle";
import Image from "next/image";
import { siteConfig } from "@/config/site";

const Experience = ({ className = "" }: ExperienceProps) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <section id="experience" className={`relative py-20 ${className}`}>
      <div className="relative z-10 container mx-auto px-4">
        <SectionTitle>Professional Experience</SectionTitle>
        <div className="mx-auto">
          <div
            className={`relative space-y-12 ${
              expanded ? "h-auto" : "more-to-show max-h-96"
            } overflow-hidden transition-all duration-500`}
          >
            {experiences.map((job: ExperienceType, index: number) => (
              <div key={index} className="group relative py-6 pl-8 sm:pl-32">
                <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-gray-200 sm:left-16 dark:bg-gray-700" />
                <div className="absolute top-8 left-0 h-4 w-4 -translate-x-1/2 transform rounded-full bg-orange-500 sm:left-16 dark:bg-orange-400" />
                <div className="absolute top-6 left-0 h-12 w-12 overflow-hidden rounded-lg bg-white shadow-md sm:left-0 sm:h-16 sm:w-16 dark:bg-gray-800">
                  {job.logo ? (
                    <Image
                      src={job.logo}
                      alt={`${job.company} logo`}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    // Fall back image fa briefcase
                    <FaBriefcase
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className="transform rounded-lg bg-white p-6 shadow-lg transition-transform hover:scale-[1.02] dark:bg-gray-800">
                  <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
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
                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    {job.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button
              onClick={handleExpand}
              className="mt-4 text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              {expanded ? "Show less" : "Show more"}
            </button>
          </div>
        </div>
        <div className="mt-12 text-center">
          <a
            href={siteConfig.links.resume}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors duration-200 hover:bg-blue-700"
          >
            View Full Resume
            <FaExternalLinkAlt className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Experience;
