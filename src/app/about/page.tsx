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
  const { name, title, label, summary, location, expertise } = portfolio.basic;

  return (
    <main className="container mx-auto px-4 py-24">
      <h1 className="text-foreground mb-6 text-center text-4xl font-bold md:text-5xl">
        About {name}
      </h1>
      <div className="mx-auto max-w-3xl">
        <p className="text-accent mb-8 text-center text-xl font-semibold">
          {title}
          {label ? ` — ${label}` : ""}
        </p>

        <Section>
          <SectionTitle id="about-background">Background</SectionTitle>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {summary}
          </p>
        </Section>

        <Section>
          <SectionTitle id="about-expertise">Areas of Expertise</SectionTitle>
          <ul className="text-muted-foreground space-y-4">
            {expertise.map((area) => (
              <li key={area.name}>
                <span className="text-foreground font-semibold">
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
          <p className="text-muted-foreground flex items-center justify-center gap-2 text-center">
            <MapPinIcon size={16} weight="bold" />
            {location}
          </p>
        </Section>
      </div>

      <Section>
        <Credits />
      </Section>
    </main>
  );
}
