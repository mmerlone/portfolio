"use client";

import { siteConfig } from "@/config/site";
import { AboutProps } from "@/types/components";
import { SectionTitle } from "./ui/SectionTitle";

const About = ({ className = "" }: AboutProps) => {
  return (
    <section
      id="about"
      className={`py-20 relative section-background-primary ${className}`}
    >
      {/* Background with texture */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          <SectionTitle>{siteConfig.about.title}</SectionTitle>
          <div className="prose prose-lg dark:prose-invert mx-auto">
            {siteConfig.about.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4 first:mt-0"
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
