"use client";

import { aboutData } from "@/data/about";
import { AboutProps } from "@/types/components";
import { SectionTitle } from "./ui/SectionTitle";

const About = ({ className = "" }: AboutProps) => {
  return (
    <section
      id="about"
      className={`py-10 sm:py-20 relative  ${className}`}
    >
      <div className="container mx-auto px-6 sm:px-12 relative z-10">
        <div className="mx-auto bg-gray-200 dark:bg-gray-800 rounded-xl p-5 sm:p-10">
          <SectionTitle>{aboutData.title}</SectionTitle>
          <div className="prose prose-lg dark:prose-invert mx-auto">
            {aboutData.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-gray-900 dark:text-gray-300 leading-relaxed mt-4 first:mt-0 text-justify text-sm sm:text-base"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
