'use client';

import { experiences, Experience as ExperienceType } from '@/data/experience';
import { FaBriefcase, FaExternalLinkAlt } from 'react-icons/fa';
import { ExperienceProps } from '@/types/components';

const Experience = ({ className = '' }: ExperienceProps) => {
  return (
    <section id="experience" className={`py-20 relative ${className}`}>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-orange-600 dark:text-orange-400 mb-12 text-center">
          Professional Experience
        </h2>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {experiences.map((job: ExperienceType, index: number) => (
              <div 
                key={index}
                className="relative pl-8 sm:pl-32 py-6 group"
              >
                {/* Timeline line */}
                <div className="absolute left-0 sm:left-16 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
                
                {/* Timeline dot */}
                <div className="absolute left-0 sm:left-16 top-8 w-4 h-4 rounded-full bg-orange-500 dark:bg-orange-400 transform -translate-x-1/2" />

                {/* Company logo */}
                <div className="absolute left-0 sm:left-0 top-6 w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-md">
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                    <FaBriefcase className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                  </div>
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

                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                      Technologies & Skills:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {job.technologies.map((tech: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View Full Resume Button */}
        <div className="mt-12 text-center">
          <a
            href="/documents/MarcioMerlone.pdf"
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