import { type ReactElement } from "react";
import type { Metadata } from "next";
import { EnvelopeSimpleIcon, MapPinIcon } from "@phosphor-icons/react/ssr";
import { portfolio } from "@/data/portfolio";
import { renderSocialLinks } from "@/components/renderSocialLinks";
import { SectionTitle } from "@/components/ui/SectionTitle";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: `Contact — ${portfolio.basic.name}`,
  description: `Email and social links to contact ${portfolio.basic.name} directly.`,
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage(): ReactElement {
  const { name, contact, social, location } = portfolio.basic;

  return (
    <main className="container mx-auto px-4 py-24">
      <h1 className="text-foreground mb-6 text-center text-4xl font-bold md:text-5xl">
        Contact {name}
      </h1>
      <div className="mx-auto max-w-3xl">
        <Section>
          <SectionTitle id="contact-email">Email</SectionTitle>
          <p className="text-center">
            <a
              href={`mailto:${contact.email}`}
              className="text-muted-foreground hover:text-accent inline-flex items-center gap-2"
            >
              <EnvelopeSimpleIcon size={20} weight="bold" />
              {contact.email}
            </a>
          </p>
        </Section>

        <Section>
          <SectionTitle id="contact-social">Social Links</SectionTitle>
          <div className="flex justify-center space-x-4">
            {social && renderSocialLinks(social)}
          </div>
        </Section>

        <Section>
          <SectionTitle id="contact-location">Location</SectionTitle>
          <p className="text-muted-foreground flex items-center justify-center gap-2 text-center">
            <MapPinIcon size={20} weight="bold" />
            {location}
          </p>
        </Section>
      </div>
    </main>
  );
}
