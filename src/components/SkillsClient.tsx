"use client";

import { type ReactElement, createElement } from "react";
import Image from "next/image";
import { skillIconMap } from "./skillIconMap";
import { type SkillsWrapperProps } from "@/types/components";

const SkillsClient = ({
  categories,
  categoryIcons,
}: SkillsWrapperProps): ReactElement => {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {Object.entries(categories).map(([category, skills]) => (
        <div
          key={category}
          className="transform rounded-lg bg-white p-6 shadow transition-transform hover:scale-105 dark:bg-gray-800"
        >
          <div className="mb-4 flex items-center gap-3">
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
                  createElement(skillIconMap[skill.iconUrl], {
                    className: "w-6 h-6 text-slate-950 dark:text-slate-50",
                  })
                ) : (
                  // Fallback to Image component if iconUrl is a URL
                  <div className="relative h-6 w-6">
                    <Image
                      src={((): string => {
                        // Helper function to ensure a relative path starts with "/" or is absolute
                        if (/^https?:\/\//i.test(skill.iconUrl)) {
                          return skill.iconUrl;
                        }
                        return skill.iconUrl.startsWith("/")
                          ? skill.iconUrl
                          : `/${skill.iconUrl}`;
                      })()}
                      alt={`${skill.name} icon`}
                      width={24}
                      height={24}
                      className="h-full w-full object-contain"
                      unoptimized
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
