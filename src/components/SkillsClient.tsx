'use client';

import React from 'react';
import Image from 'next/image';
import { skillIconMap } from './skillIconMap';
import { SkillsClientProps } from '@/types/components';

const SkillsClient = ({ categories, categoryIcons }: SkillsClientProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Object.entries(categories).map(([category, skills]) => (
        <div 
          key={category}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transform transition-transform hover:scale-105"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="text-gray-900 dark:text-white">
              {categoryIcons[category]}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {category}
            </h3>
          </div>
          
          <ul className="space-y-2">
            {skills.map((skill) => (
              <li 
                key={skill.name} // Assuming skill.name is unique within its category
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
              >
                {skillIconMap[skill.iconUrl] ? (
                  // Render Font Awesome icon if mapped
                  React.createElement(skillIconMap[skill.iconUrl], {
                    className: "w-6 h-6 text-slate-950 dark:text-slate-50",
                  })
                ) : (
                  // Fallback to Image component if iconUrl is a URL
                  <div className="w-6 h-6 relative">
                    <Image
                      src={skill.iconUrl} // Assumes this is a valid URL
                      alt={`${skill.name} icon`}
                      width={24}
                      height={24}
                      className="w-full h-full object-contain"
                      unoptimized // Retained from original, remove if not needed
                    />
                  </div>
                )}
                {skill.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SkillsClient; 