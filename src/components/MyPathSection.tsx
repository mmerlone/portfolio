import { type ReactElement } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/cn";

interface MyPathSectionProps {
  className?: string;
}

interface PathStage {
  title: string;
  period: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

const stages: PathStage[] = [
  {
    title: "Industrial Systems",
    period: "1992–2000",
    description:
      "Mechanical design and production engineering at Furukawa and PBN, working inside manufacturing plants (Bosch, Volvo) on tooling, supplier coordination, and line installation. Foundation in physical systems, precision, and process discipline.",
    highlights: [
      "2D/3D mechanical design with AutoCAD and Solid Edge",
      "Supplier negotiations and production line installation",
      "ISO process definition and auditing",
    ],
    technologies: ["AutoCAD", "Solid Edge", "Industrial Processes", "ISO 9001"],
  },
  {
    title: "Infrastructure & Operations",
    period: "2000–2022",
    description:
      "Built and ran the full IT stack for A1 Engenharia: on-premise hosting (DNS, email, web) at 99.9% uptime, virtualization consolidation (15→60+ VMs), cloud email migration, firewall/VPN/VLAN security, and monitoring (Zabbix, Graylog). Owned the decisions and lived with them for 15 years.",
    highlights: [
      "Full internet presence: DNS, email, web hosting for 15+ years",
      "Consolidated physical servers to VMware ESXi/vCenter",
      "Migrated all email to Microsoft Exchange Cloud",
      "Implemented Zabbix monitoring and Graylog logging",
      "In-house GitLab migration from legacy CVS",
    ],
    technologies: [
      "Linux",
      "Windows Server",
      "VMware ESXi/vCenter",
      "Postfix/Dovecot/OpenLDAP",
      "pfSense/VPN/VLAN",
      "Zabbix/Graylog",
      "PHP/MySQL",
      "GitLab",
    ],
  },
  {
    title: "Software & Product Engineering",
    period: "2006–Present",
    description:
      "Transitioned to product-focused frontend engineering: React, TypeScript, Node.js, Docker, Tailwind, MUI. At ArcTouch, delivered accessible UIs for global brands (HP, Cirrus Aircraft, Quizlet), built Shopify/Discourse/WordPress themes, authored npm packages (react-tz-globepicker, mui7-phone-number), and engineered the Cirrus Aircraft WordPress-to-Contentstack migration.",
    highlights: [
      "Senior Software Engineer at ArcTouch (2022–present)",
      "Published @mmerlone/react-tz-globepicker and @mmerlone/mui7-phone-number",
      "Authored Cirrus Aircraft migration script and engineering article",
      "WCAG accessibility as architecture across client work",
      "Custom themes/integrations for Shopify, Discourse, WordPress",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Docker",
      "Tailwind",
      "Material UI",
      "Shopify Liquid",
      "WordPress",
      "Contentstack",
      "Supabase",
      "Next.js",
      "jest/Cypress",
    ],
  },
];

export default function MyPathSection({
  className,
}: MyPathSectionProps): ReactElement {
  return (
    <section
      id="my-path"
      aria-labelledby="my-path-title"
      className={cn("relative py-16", className)}
    >
      <div className="relative z-10 container mx-auto px-4">
        <SectionTitle id="my-path-title">My Path</SectionTitle>
        <div className="mx-auto max-w-4xl space-y-12">
          {stages.map((stage, idx) => (
            <article
              key={idx}
              className="border-border bg-surface rounded-lg border p-8"
            >
              <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-foreground text-xl font-semibold">
                  {stage.title}
                </h3>
                <span className="text-accent text-sm font-medium">
                  {stage.period}
                </span>
              </div>
              <p className="text-muted-foreground mb-4">{stage.description}</p>
              <ul className="text-muted-foreground mb-4 list-disc space-y-1 pl-5 text-sm">
                {stage.highlights.map((hl, i) => (
                  <li key={i}>{hl}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1.5">
                {stage.technologies.map((tech, techIdx) => (
                  <span
                    key={techIdx}
                    className="bg-surface-raised text-muted-foreground inline-block rounded px-2 py-0.5 text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
