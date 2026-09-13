import type { PortfolioPathStage } from "@/types/portfolio";

export const pathStages: PortfolioPathStage[] = [
  {
    title: "Industrial Systems",
    period: "1992–2000",
    description:
      "Mechanical design and production engineering at Furukawa and PBN, working inside manufacturing plants (Bosch, Volvo, Furukawa, Siemens) on tooling, supplier coordination, and line installation. Foundation in physical systems, precision, and process discipline.",
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
      "Started owning a small office network with a linux server and an ISDN dial-up connection. Later built and ran the full IT stack for A1 Engenharia: on-premise hosting (DNS, email, web) at 99.9% uptime, virtualization consolidation (15→60+ VMs), cloud email migration, firewall/VPN/VLAN security, and monitoring (Zabbix, Graylog). Owned the decisions and lived with them for 15 years.",
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
    period: "2022–Present",
    description:
      "Transitioned to product-focused frontend engineering: React, TypeScript, Node.js, Docker, Tailwind, MUI. At ArcTouch, delivered accessible UIs for global brands (HP, Cirrus Aircraft, Quizlet, Starbucks), built Shopify/Discourse/WordPress themes, and engineered the Cirrus Aircraft WordPress-to-Contentstack migration. As personal hobby authored npm packages (react-tz-globepicker, mui7-phone-number) and open-source contributions on GitHub.",
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
