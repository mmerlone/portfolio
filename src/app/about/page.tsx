import { type ReactElement } from "react";
import type { Metadata } from "next";
import { MapPinIcon } from "@phosphor-icons/react/ssr";
import { portfolio } from "@/data/portfolio";
import { SectionTitle } from "@/components/ui/SectionTitle";
import Section from "@/components/Section";
import Credits from "@/components/Credits";

export const metadata: Metadata = {
  title: `About — ${portfolio.basic.name}`,
  description: `Background, expertise, and location for ${portfolio.basic.name}, ${portfolio.basic.title}.`,
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage(): ReactElement {
  const { name, label, summary, location, expertise } = portfolio.basic;

  return (
    <main className="container mx-auto px-4 py-24">
      <h1 className="mb-6 text-center text-4xl font-bold text-gray-900 md:text-5xl dark:text-gray-100">
        About {name}
      </h1>
      <div className="mx-auto max-w-3xl">
        <p className="mb-8 text-center text-xl font-semibold text-orange-600 dark:text-orange-400">
          {label}
        </p>

        <Section>
          <SectionTitle id="about-background">Background</SectionTitle>
          <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            {summary}
          </p>
        </Section>

        <Section>
          <SectionTitle id="about-expertise">Areas of Expertise</SectionTitle>
          <ul className="space-y-4 text-gray-600 dark:text-gray-300">
            {expertise.map((area) => (
              <li key={area.name}>
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {area.name}
                </span>
                {": "}
                {area.description}
              </li>
            ))}
          </ul>
        </Section>

        <Section>
          <SectionTitle id="about-location">Location</SectionTitle>
          <p className="flex items-center justify-center gap-2 text-center text-gray-600 dark:text-gray-300">
            <MapPinIcon size={16} weight="bold" />
            {location}
          </p>
        </Section>
      </div>

      <Credits />
    </main>
  );
}
