'use client';

import { siteConfig } from '@/config/site';
import { AboutProps } from '@/types/components';

const About = ({ className = '' }: AboutProps) => {
  return (
    <section id="about" className={`py-20 relative ${className}`}>
      {/* Background with texture */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-orange-600 dark:text-orange-400 mb-8 text-center">
            {siteConfig.about.title}
          </h2>
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