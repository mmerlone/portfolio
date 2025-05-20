export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

export const experiences: Experience[] = [
  {
    title: "Senior Software Engineer",
    company: "ArcTouch LLC",
    period: "2022 - Present",
    description:
      "At ArcTouch Brasil, as a Senior Software Engineer, I contributed to innovative and user-centric projects impacting globally recognized brands such as HP, Cirrus Aircraft, TwelveSouth, AKQA, Quizlet, and others. Leveraging my expertise in React and TypeScript, my focus was on building efficient and responsive user interfaces that adhered to strict accessibility requirements (WCAG guidelines). This involved applying best practices and adhering to coding standards within collaborative agile (Scrum) cross-functional teams. Ensuring the quality and reliability of our solutions was paramount, and I was actively involved in writing and maintaining comprehensive unit and integration tests. This role demanded strong problem-solving abilities, meticulous attention to detail in testing and debugging, and effective communication to ensure seamless integration with diverse stakeholders. I proactively researched and incorporated industry best practices, demonstrating my continuous learning mindset and commitment to delivering high-quality and scalable applications that met the diverse needs of leading organizations and their global user base, with a strong emphasis on inclusivity through accessibility.",
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Docker",
      "Tailwind",
      "Agile",
      "Scrum",
      "jest",
      "Cypress",
      "Shopify theme",
      "Discourse theme",
      "WordPress theme",
      "Accessibility",
      "WCAG",
      "Responsive Design",
      "Scalable Applications",
      "Inclusivity",
      "Accessibility",
    ],
  },
  {
    title: "IT Staff",
    company: "A1 Engenharia e Gerenciamento Ltda",
    period: "2007 - 2022",
    description:
      "As the Network and Systems Manager at A1 Engenharia e Gerenciamento Ltda. for over 14 years, I played a pivotal role in maintaining and evolving the company's core IT infrastructure, which was foundational to its operations and significant growth. A key aspect of my responsibilities involved the critical Intranet application, a bespoke platform essential for company-wide project management. This application served as the central system where all employees logged their working hours, providing the vital data underpinning project costing, resource allocation, and overall business intelligence. Recognizing its importance, I inherited and diligently supported this PHP-based application (initially PHP 3, later maintained up to PHP 5.3), ensuring its stability and reliability. Furthermore, I led a substantial overhaul of the underlying infrastructure, including the virtualization of 15 physical servers into over 60 VMs, which directly enhanced the performance and resilience required to support the growing demands of this mission-critical application and the company's over 400% growth during my tenure. My proactive management and strategic upgrades of the network, security, and server environment were instrumental in providing a stable and scalable foundation for this core business system and the entire organization's success.",
    technologies: [
      "PHP",
      "MySQL",
      "Linux",
      "Windows Server",
      "Self Hosted Email, DNS, MX, etc.",
      "Virtualization",
      "Networking",
      "Security",
      "Infrastructure",
      "Project Management",
      "Team Leadership",
      "Cost Reduction",
      "Reliability",
      "Performance",
      "Growth",
      "Uptime",
      "VPN",
      "Firewall",
      "VLAN",
      "Routing",
      "Archiving",
      "Backup",
      "Open-Source",
      "ISO 9001",
      "Auditing",
    ],
  },
  {
    title: "Senior Systems Analyst",
    company: "Locaweb Ltda",
    period: "2004 - 2005",
    description:
      "As a Senior Systems Analyst at Locaweb Ltda., a leading web hosting and corporate email provider, my primary focus was on enhancing the user experience and functionality of their core platforms. I was directly involved in the development and maintenance of the user options module for the customer administration portal and the webmail interface. This work required proficiency in a diverse technology stack, including PERL for backend logic and PHP for frontend presentation, coupled with MySQL for data management. I also utilized CSS and Smarty templates to ensure a consistent and user-friendly design across the applications. This role demanded a strong understanding of web application development, attention to detail in implementing user-facing features, and the ability to contribute to a high-traffic, customer-centric platform within a fast-paced environment.",
    technologies: ["JavaScript", "React", "Node.js", "PostgreSQL"],
  },
  {
    title: "Full Systems Analyst",
    company: "Dialdata Ltda.",
    period: "2001 - 2004",
    description:
      "Navigating the technological landscape of the early days of dial-up internet, my role as a Full Systems Analyst at Dialdata Ltda., an internet service provider, involved critical responsibilities in maintaining the backbone of internet connectivity. Spanning the period of dial-up and early dedicated access, along with various hosting and colocation services, I was deeply engaged in the installation, administration, and maintenance of a diverse server ecosystem, encompassing Solaris, FreeBSD, Linux, and Windows 2000. Providing Level 3 technical support for essential services like web hosting, email, and DNS demanded a robust understanding of these platforms and adept troubleshooting in a rapidly evolving digital environment. A key achievement was the design, deployment, and migration of a resilient mail server cluster, leveraging Postfix and OpenLDAP with load balancing to ensure reliable communication infrastructure for our growing user base. This foundational experience honed my skills in managing heterogeneous systems, ensuring high availability of core internet services, and resolving complex technical challenges inherent in the nascent stages of widespread internet access.",
    technologies: [
      "Solaris",
      "FreeBSD",
      "Linux",
      "Windows 2000",
      "Postfix",
      "Sendmail",
      "OpenLDAP",
      "DNS",
    ],
  },
  {
    title: "Systems Analyst and Auditor",
    company: "Breuling & Hoffelder Ltda.",
    period: "2000 - 2000",
    description:
      "At Breuling & Hoffelder Ltda., I served as a Systems Analyst and Auditor, responsible for establishing and refining the company's internal IT infrastructure and operational processes for a team of around a dozen users. Key contributions included implementing a structured network cabling system and deploying an internal Linux server to provide essential services such as file sharing, email, intranet, and DNS, supported by an on-demand dial-up ISDN connectivity and a Squid proxy. I played a role in defining systematic processes and standardization efforts aligned with future ISO certification goals. Additionally, I oversaw the implementation of an internal telephone system and automated electronic timekeeping, and conducted internal audits at remote client work posts to ensure adherence to quality standards.",
    technologies: [
      "Linux",
      "Structured Cabling",
      "ISDN",
      "Squid",
      "ISO 9001 (concepts)",
    ],
  },
];
