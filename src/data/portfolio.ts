import { type Portfolio } from "@/types/portfolio";

/**
 * Source-of-truth portfolio data.
 *
 * This exported `portfolio` object is typed as `Portfolio` and used by
 * the application to render resume and profile sections. Keep this file
 * in sync with `src/types/portfolio.ts` when fields change.
 *
 * @type {Portfolio}
 * @readonly
 */
export const portfolio: Portfolio = {
  basic: {
    name: "Marcio Merlone",
    title: "Software Engineer",
    label: "Platform Architect & Full-Stack Reliability Engineer",
    location: "Araucária, PR, Brazil — Curitiba Area, Brazil",
    contact: {
      email: "mmerlone@gmail.com",
      linkedin: "https://www.linkedin.com/in/mmerlone",
      website: "https://mmerlone.dev.br/",
    },
    summary:
      "Bridging the gap between ambitious technical vision and reliable production systems through collaborative engineering and operational empathy. Specialist in building resilient, accessible platforms that scale from foundational infrastructure to pixel-perfect UIs for global brands like HP, Starbucks, Cirrus Aircraft and others",
    technical: {
      programming: [
        "React",
        "TypeScript",
        "JavaScript",
        "PHP",
        "Perl",
        "HTML",
        "CSS",
        "SQL",
        "Bash",
      ],
      operatingSystems: ["Linux", "Unix", "Solaris", "FreeBSD", "Windows"],
      serversAndServices: [
        "DNS",
        "FTP",
        "DHCP",
        "LDAP",
        "NFS",
        "SNMP",
        "GIT",
        "SMTP",
        "IMAP",
        "POP3",
        "Apache",
        "nginx",
        "IIS",
        "Tomcat",
        "sendmail",
        "Postfix",
        "Dovecot",
        "Samba",
        "Squid",
        "Zabbix",
        "Netdisco",
        "Graylog",
        "Openfire RTC Server",
      ],
      databases: ["MySQL", "MariaDB", "PostgreSQL", "MS-SQL"],
      platformsAndTools: ["Shopify", "Discourse", "Contentstack", "WordPress"],
      virtualization: ["VMware ESXi", "vCenter", "VirtualBox"],
      networkingAndSecurity: [
        "pfSense/OPNSense",
        "ACL",
        "VLAN",
        "IPsec VPN",
        "OpenVPN",
        "RLS",
        "SSL",
        "TLS",
        "firewalls",
        "intrusion detection",
        "network monitoring",
      ],
      backupAndRecovery: [
        "Bacula",
        "tape libraries",
        "rsync",
        "contingency & disaster recovery",
      ],
      cloud: ["Azure", "Microsoft Cloud migrations"],
      automation: ["bash", "node"],
      other: ["design systems", "MVC", "WCAG accessibility"],
    },
    expertise: [
      {
        name: "Resilient Platform Architecture",
        keywords: [
          "Microsoft",
          "Samba4",
          "Postfix",
          "Dovecot",
          "OpenLDAP",
          "DNS",
          "DHCP",
          "LDAP",
          "GIT",
          "VMware ESXi",
          "vCenter",
          "Zabbix",
          "Graylog",
        ],
        description:
          "Architecting resilient internal applications to ensuring reliability and performance with a 99.9% uptime.",
      },
      {
        name: "High-Performance UI Architecture",
        keywords: ["React", "TypeScript", "JavaScript", "WCAG"],
        description:
          "Scaling global frontend systems for Fortune 500 brands with a focus on 'Accessibility as Architecture'.",
      },
      {
        name: "Operational Stewardship",
        keywords: [
          "Hardware",
          "Networking",
          "Security",
          "Monitoring",
          "Backups",
          "Process",
          "Planning",
        ],
        description:
          "A 14-year track record of 'living with decisions,' evolving mission-critical legacy ERPs into scalable cloud-ready environments.",
      },
    ],
  },
  professionalExperience: [
    {
      company: "ArcTouch",
      role: "Senior Software Engineer",
      start: "2022-03",
      end: "Present",
      location: "Remote",
      description:
        "Front-end development using React and TypeScript for clients such as HP, Cirrus Aircraft, AKQA, and Quizlet. Implementing efficient, responsive UIs following best practices, collaborating with cross-functional teams, and participating in agile rituals. Writing and maintaining unit and integration tests, contributing to accessibility efforts (WCAG), and developing custom themes and integrations for Shopify and Discourse.",
      highlights: [
        "Front-end development using React and TypeScript for clients such as HP, Cirrus Aircraft, AKQA, and Quizlet",
        "Implemented efficient, responsive UIs following best practices",
        "Collaborated with cross-functional teams and participated in agile rituals",
        "Wrote and maintained unit and integration tests",
        "Contributed to accessibility efforts (WCAG)",
        "Developed custom themes and integrations for Shopify and Discourse",
      ],
    },
    {
      company: "A1 Tecnologia Industrial",
      role: "IT Staff / Network & Systems Manager",
      start: "2007-03",
      end: "2022-03",
      location: "Curitiba Area, Brazil",
      description:
        "Successfully sustained a continuous network growth and infrastructure modernization for 15 years, ensuring performance, security, compliance, and reliability.",
      highlights: [
        "Managed systems, servers, network SLA, intranet development, provisioning, IT security, mail flow, backups, and IT roadmap",
        "Implemented an in-house GitLab server, replacing CVS",
        "Coordinated IT architecture, network, server, and database access",
        "Consolidated physical servers into virtual environments (VMware ESXi → vCenter)",
        "Migrated users to Microsoft Cloud",
        "Upgraded firewalls and orchestrated site migrations",
        "Integrated remote offices via secure VPN and implemented VLAN strategies",
        "Deployed monitoring and logging (Zabbix, Graylog)",
        "Managed bespoke PHP intranet as product owner",
      ],
    },
    {
      company: "Áton Tecnologia",
      role: "PHP Developer",
      start: "2006-04",
      end: "2007-08",
      location: "Curitiba, Paraná, Brazil",
      highlights: [
        "Full-stack PHP development using Smarty templates, JavaScript, and Ajax",
        "Contributed to an in-house PHP framework using OO and MVC patterns",
      ],
    },
    {
      company: "AmbienteBrasil",
      role: "IT",
      start: "2005-09",
      end: "2006-03",
      location: "Curitiba, Paraná, Brazil",
      description:
        "Managed IT infrastructure, including web, DNS, email (IMAP), proxy, and firewall servers, while also acting as a full-stack PHP developer and product owner.",
      highlights: [
        "Deployed and managed web, DNS, email (IMAP), proxy, and firewall servers",
        "Acted as full-stack PHP developer and product owner; managed long-distance wireless network",
      ],
    },
    {
      company: "Locaweb Ltda",
      role: "Senior Systems Analyst",
      start: "2004-04",
      end: "2005-04",
      location: "São Paulo, Brazil",
      highlights: [
        "Developed and maintained user modules for customer admin portal and webmail",
        "Worked with Perl and PHP using MySQL and Smarty templates",
      ],
    },
    {
      company: "Dialdata Ltda",
      role: "Full Systems Analyst",
      start: "2001-01",
      end: "2004-03",
      highlights: [
        "Installed, administered, and maintained servers on Solaris, FreeBSD, Linux, and Windows 2000",
        "Provided Level 3 support and designed resilient mail server clusters (Postfix + OpenLDAP) with load balancing",
      ],
    },
    {
      company: "Breuling & Hoffelder Ltda.",
      role: "",
      start: "2000-04",
      end: "2000-12",
      location: "São José Dos Pinhais, PR",
      highlights: [
        "Oversaw structured network cabling and deployed internal Linux servers for sharing, email, intranet, and DNS",
        "Implemented dial-up/ISDN connectivity and Squid proxy",
        "Defined systems/processes for ISO compliance and conducted training and audits",
      ],
    },
    {
      company: "Visywork e-Bussiness System",
      role: "Technical and Commercial Consultant",
      start: "1999-11",
      end: "2000-04",
      location: "Curitiba, PR",
      highlights: [
        "Technical sales, support, and after-sales for IBM/Lotus SmartSuite; delivered user training",
      ],
    },
    {
      company: "Furukawa Industrial S.A.",
      role: "Mechanical Design Drafter",
      start: "1995-04",
      end: "1999-03",
      location: "Curitiba, PR",
      highlights: [
        "Managed supplier negotiations, coordinated production line installation",
        "Performed 2D/3D CAD design with AutoCAD and Solid Edge",
      ],
    },
  ],
  openSourceProjects: [
    {
      name: "YwyBase",
      description:
        "A Solid Ground to Scale. A comprehensive Next.js application with authentication, Material UI, and modern best practices.",
      demo: "https://ywybase.vercel.app/",
      github: "https://github.com/mmerlone/ywybase",
      technologies: [
        "Next.js 15+",
        "React 19+",
        "Supabase",
        "TailwindCSS",
        "TypeScript",
        "Material UI",
        "Sentry",
        "Pino Logger",
      ],
    },
    {
      name: "mui7-phone-number",
      description:
        "A phone number input component for MUI v7+ with auto-formatting, country selection, and full TypeScript support.",
      demo: "https://ywybase.vercel.app/demos/mui7-phone-number/",
      github: "https://github.com/mmerlone/mui7-phone-number",
      technologies: ["React 19+", "TypeScript", "Material UI v7+"],
    },
    {
      name: "react-tz-globepicker",
      description:
        "Interactive globe picker for React applications that need timezone selection, timezone visualization, or a compact world-time UI.",
      demo: "https://ywybase.vercel.app/demos/react-tz-globepicker/",
      github: "https://github.com/mmerlone/react-tz-globepicker",
      technologies: ["React 19+", "TypeScript"],
    },
  ],
  education: [
    {
      institution: "Universidade Federal do Paraná",
      program: "Bachelor's program in Informatics",
      years: "1994-1995",
      notes: "Completed two years.",
    },
    {
      institution: "Pontifícia Universidade Católica do Paraná",
      program: "Bachelor's program in Computer Science",
      years: "1991-1992",
      notes: "Completed two years.",
    },
    {
      institution: "Centro Federal de Educação Tecnológica do Paraná",
      program: "Industrial Mechanic Technician",
      years: "1986-1989",
    },
  ],
  languages: [
    { language: "Portuguese", level: "Native or Bilingual" },
    { language: "English", level: "Full Professional / Fluent (C1)" },
    { language: "Spanish", level: "Elementary / Basic" },
  ],
  certifications: [
    "ISO 9001:2008 Internal Auditor",
    "Microsoft Certified Professional (ID #2432097, 2003)",
    "Various Microsoft courses (Windows 2000 support, networking, SQL Server 2000)",
    "SQL database introduction",
    "Introduction to Project Management (PMBOK)",
    "React, ES6+, Agile, Scrum",
  ],
  additionalInformation:
    "Hobbies include audio, acoustics, electronics, ecotourism, and everything else related to technology and the world. Interests include music, movies, TV shows, astronomy, and science.",
};
