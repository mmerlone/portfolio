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
  name: "Marcio Merlone",
  title: "Software Engineer",
  location: "Araucária, PR, Brazil — Curitiba Area, Brazil",
  contact: {
    email: "mmerlone@gmail.com",
    linkedin: "https://www.linkedin.com/in/mmerlone",
    website: "https://mmerlone.dev.br/",
  },
  summary:
    "I am a highly experienced Software Engineer with over 20 years in IT, specializing in solving complex infrastructure problems with minimal disruption. My background spans system administration across multiple platforms (Linux, Windows, Solaris, FreeBSD), network architecture, server management, virtualization, security, and modern software development. Recently I focus on front-end development using React and TypeScript, combining infrastructure and backend knowledge to build robust, user-centric, and accessible web applications. I excel at troubleshooting, optimizing systems, and leading initiatives for stability, reliability, and performance.",
  profile:
    "Paternal — I believe focusing on people, combined with clear and fair rules, are the main factors for organizational success.",
  expertise: {
    core: [
      "Secure system migrations (LDAP → Active Directory, email systems, CMS)",
      "Infrastructure security & hardening (firewall setup, VLANs, audits)",
      "Full-stack development and performance optimization",
    ],
    technical: {
      programming: [
        "React",
        "TypeScript",
        "JavaScript",
        "PHP",
        "Perl",
        "HTML",
        "CSS",
        "Shopify Liquid",
        "Ember",
        "Handlebars",
      ],
      operatingSystems: ["Linux", "Unix", "Solaris", "FreeBSD", "Windows"],
      serversAndServices: [
        "Apache",
        "nginx",
        "IIS",
        "Tomcat",
        "sendmail",
        "Postfix",
        "Dovecot",
        "DNS",
        "FTP",
        "DHCP",
        "LDAP",
        "Samba",
        "NFS",
        "Squid",
        "Zabbix",
        "SNMP",
        "Netdisco",
        "GIT",
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
        "segmentation",
        "routing",
        "audits",
      ],
      backupAndRecovery: [
        "Bacula",
        "tape libraries",
        "rsync",
        "contingency & disaster recovery",
      ],
      cloud: ["Azure", "Microsoft Cloud migrations"],
      automation: ["bash", "PHP scripts"],
      other: [
        "Agile (Scrum)",
        "design patterns",
        "MVC",
        "accessibility (WCAG)",
      ],
    },
  },
  professionalExperience: [
    {
      company: "ArcTouch",
      role: "Senior Software Engineer",
      start: "March 2022",
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
      start: "March 2007",
      end: "March 2022",
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
      start: "April 2006",
      end: "August 2007",
      location: "Curitiba, Paraná, Brazil",
      highlights: [
        "Full-stack PHP development using Smarty templates, JavaScript, and Ajax",
        "Contributed to an in-house PHP framework using OO and MVC patterns",
      ],
    },
    {
      company: "AmbienteBrasil",
      role: "IT",
      start: "September 2005",
      end: "March 2006",
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
      start: "April 2004",
      end: "April 2005",
      location: "São Paulo, Brazil",
      highlights: [
        "Developed and maintained user modules for customer admin portal and webmail",
        "Worked with Perl and PHP using MySQL and Smarty templates",
      ],
    },
    {
      company: "Dialdata Ltda",
      role: "Full Systems Analyst",
      start: "January 2001",
      end: "March 2004",
      highlights: [
        "Installed, administered, and maintained servers on Solaris, FreeBSD, Linux, and Windows 2000",
        "Provided Level 3 support and designed resilient mail server clusters (Postfix + OpenLDAP) with load balancing",
      ],
    },
    {
      company: "Breuling & Hoffelder Ltda.",
      role: "",
      start: "April 2000",
      end: "December 2000",
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
      start: "November 1999",
      end: "April 2000",
      location: "Curitiba, PR",
      highlights: [
        "Technical sales, support, and after-sales for IBM/Lotus SmartSuite; delivered user training",
      ],
    },
    {
      company: "Furukawa Industrial S.A.",
      role: "Mechanical Design Drafter",
      start: "April 1995",
      end: "March 1999",
      location: "Curitiba, PR",
      highlights: [
        "Managed supplier negotiations, coordinated production line installation",
        "Performed 2D/3D CAD design with AutoCAD and Solid Edge",
      ],
    },
  ],
  education: [
    {
      institution: "Universidade Federal do Paraná",
      program: "Bachelor's program in Informatics",
      years: "1994–1995",
      notes: "Completed two years.",
    },
    {
      institution: "Pontifícia Universidade Católica do Paraná",
      program: "Bachelor's program in Computer Science",
      years: "1991–1992",
      notes: "Completed two years.",
    },
    {
      institution: "Centro Federal de Educação Tecnológica do Paraná",
      program: "Industrial Mechanic Technician",
      years: "1986–1989",
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
    "Hobbies include audio, acoustics, electronics, ecotourism, and technology. Interests include music, movies, TV shows, astronomy, and science.",
};
