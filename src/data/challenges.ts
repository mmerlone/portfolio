import type { PortfolioChallenge } from "@/types/portfolio";

export const challenges: PortfolioChallenge[] = [
  {
    title:
      "Developing High-Impact and User-Centric Solutions for Global Brands",
    company: "ArcTouch Brasil",
    challenge:
      "Contribute to innovative and user-centric web applications and features for globally recognized brands, ensuring high levels of usability and accessibility in line with WCAG guidelines to reach a wider audience and meet inclusivity standards.",
    action: [
      "Developed and implemented robust front-end components using React, TypeScript, JavaScript, HTML, and CSS, prioritizing semantic structure and keyboard navigation.",
      "Conducted testing to verify functionality across different user interaction methods and assistive technologies.",
      "Ensured appropriate color contrast ratios and provided meaningful alternative text for images and other non-text content.",
      "Participated in code reviews, providing feedback on usability and inclusive design principles.",
    ],
    result: [
      "Delivered high-quality user interfaces that met the rigorous standards of globally recognized brands while being more usable for diverse users.",
      "Contributed to the development of applications that are more inclusive and accessible to a broader audience, including users with disabilities.",
      "Increased the potential reach and positive impact of the applications by prioritizing accessibility considerations.",
    ],
    technologies: [
      {
        id: "react",
      },
      {
        id: "typescript",
      },
      {
        id: "javascript",
      },
      {
        id: "html",
      },
      {
        id: "css",
      },
    ],
  },
  {
    title: "Extending and Customizing Leading SaaS Platforms",
    company: "ArcTouch Brasil",
    challenge:
      "Tailor popular SaaS platforms like Shopify and Discourse to meet specific and unique client requirements.",
    action: [
      "Developed custom themes using Shopify Liquid to create branded and engaging storefronts.",
      "Built plugins with Ruby on Rails for Discourse to extend its core functionality and community features.",
    ],
    result: [
      "Enabled clients to have customized platform experiences aligned with their brand and business needs.",
      "Enhanced platform functionality and user engagement through custom extensions.",
    ],
    technologies: [
      {
        id: "shopify-liquid",
      },
      {
        id: "ember",
      },
      {
        id: "handlebars",
      },
      {
        id: "javascript",
      },
      {
        id: "css",
      },
    ],
  },
  {
    title: "Orchestrating Seamless and Complex Content Migrations",
    company: "ArcTouch Brasil",
    challenge:
      "Migrate a significant amount of content from a WordPress platform to Contentstack with minimal data loss and disruption.",
    action: [
      "Developed and executed a comprehensive content migration strategy.",
      "Utilized TypeScript to automate the transfer and transformation of data.",
      "Ensured data integrity and performed thorough post-migration testing.",
    ],
    result: [
      "Successfully migrated content to Contentstack, providing a more modern and scalable content management solution.",
      "The migration approach and outcomes are documented in the published ArcTouch engineering case study 'Headless CMS Migration: From WordPress to Contentstack' by Marcio Merlone.",
    ],
    technologies: [
      {
        id: "wordpress",
      },
      {
        id: "contentstack",
      },
      {
        id: "data-migration",
      },
      {
        id: "javascript",
      },
      {
        id: "php",
      },
    ],
  },
  {
    title: "Architecting and Implementing Seamless Authentication Upgrades",
    company: "A1 Engenharia",
    challenge:
      "Upgrade the network authentication system from an LDAP database to Active Directory without causing any disruption to end-users.",
    action: [
      "Designed and planned the Active Directory implementation and migration strategy.",
      "Configured Active Directory services and integrated existing systems.",
      "Performed rigorous testing and implemented a phased rollout to minimize potential issues.",
    ],
    result: [
      "Successfully migrated the authentication system to Active Directory with no noticeable impact on end-users.",
      "Enhanced security and provided centralized user management for the entire network.",
    ],
    technologies: [
      {
        id: "ldap",
      },
      {
        id: "active-directory",
      },
      {
        id: "system-migration",
      },
      {
        id: "authentication-protocols",
      },
    ],
  },
  {
    title: "Modernizing Communication and Collaboration Infrastructure",
    company: "A1 Engenharia",
    challenge:
      "Extend the existing on-premises Postfix mail system with modern collaboration capabilities, postponing the company's cloud migration while offering features comparable to cloud email for several years.",
    action: [
      "Evaluated self-hosted collaboration options and selected SOGo to complement the existing mail infrastructure.",
      "Integrated and configured SOGo with the existing Postfix system, preserving email data and established workflows.",
      "Supported users in adopting calendaring, contacts, and other collaboration features.",
    ],
    result: [
      "Extended the useful life of the on-premises email platform and delayed cloud migration for several years.",
      "Delivered integrated calendaring and contacts with a user experience comparable to cloud-based email before the eventual migration.",
    ],
    technologies: [
      {
        id: "postfix",
      },
      {
        id: "dovecot",
      },
      {
        id: "sogo",
      },
      {
        id: "linux-server-administration",
      },
      {
        id: "email-protocols-imap-smtp-eas",
      },
    ],
  },
  {
    title: "Facilitating Transition to Cloud Services",
    company: "A1 Engenharia",
    challenge:
      "Migrate the company's email infrastructure to the Microsoft Cloud to leverage its scalability and features.",
    action: [
      "Planned and executed the migration of email mailboxes to Microsoft Cloud (likely Exchange Online).",
      "Configured and integrated the cloud email services with the existing network infrastructure.",
    ],
    result: [
      "Enabled the company to benefit from the scalability and features of Microsoft Cloud for email.",
      "Streamlined email management and potentially improved collaboration capabilities.",
    ],
    technologies: [
      {
        id: "microsoft-cloud-exchange-online",
      },
      {
        id: "cloud-migration-strategies",
      },
    ],
  },
  {
    title:
      "Driving Scalability and Reliability Through Strategic Virtualization",
    company: "A1 Engenharia",
    challenge:
      "Improve the reliability and scalability of the server infrastructure to support company growth.",
    action: [
      "Designed and implemented a virtualization strategy, consolidating 15 physical servers onto a new redundant SAS storage infrastructure.",
      "Deployed and managed over 60 virtual machines to host various applications and services.",
    ],
    result: [
      "Significantly improved system reliability and performance.",
      "Provided the scalable infrastructure necessary to support over 400% company growth.",
    ],
    technologies: [
      {
        id: "vmware-esxi",
      },
      {
        id: "vcenter",
      },
      {
        id: "shared-sas-storage",
      },
      {
        id: "windows-server",
      },
      {
        id: "linux",
      },
    ],
  },
  {
    title:
      "Ensuring Business Continuity Through Robust Network Management and Security",
    company: "A1 Engenharia",
    challenge:
      "Maintain high availability of critical systems and protect the network from security threats.",
    action: [
      "Implemented proactive network monitoring using Zabbix.",
      "Upgraded the firewall to a virtualized pfSense instance and configured comprehensive security rules.",
      "Implemented VLAN segmentation and secure VPN access.",
      "Established user lifecycle management and auditing processes.",
    ],
    result: [
      "Maintained uptime exceeding 99% for critical systems.",
      "Achieved zero security incidents during my tenure.",
    ],
    technologies: [
      {
        id: "pfsense",
      },
      {
        id: "vlan",
      },
      {
        id: "ipsec-vpn",
      },
      {
        id: "openvpn",
      },
      {
        id: "network-monitoring-zabbix",
      },
    ],
  },
  {
    title: "Developing User Interface Functionality for a SaaS Platform",
    company: "Locaweb Ltda.",
    challenge:
      "Enhance the functionality and user experience of the user options module within a widely used web hosting and corporate email platform.",
    action: [
      "Developed and implemented new features and improvements to the user options module using PERL, PHP, MySQL, CSS, and Smarty templates.",
      "Collaborated with other developers to integrate the module seamlessly into the existing platform.",
    ],
    result: [
      "Improved the functionality and user experience for a large user base of the Locaweb platform.",
    ],
    technologies: [
      {
        id: "perl",
      },
      {
        id: "php",
      },
      {
        id: "mysql",
      },
      {
        id: "css",
      },
      {
        id: "smarty",
      },
    ],
  },
  {
    title: "Establishing and Managing Core Internet Services",
    company: "AmbienteBrasil Ltda.",
    challenge:
      "Provide reliable and accessible internet services for the company's environmental portal with limited resources.",
    action: [
      "Deployed and configured Apache, bind, postfix, and squid on the company's servers.",
      "Managed the ongoing operation and maintenance of these critical services.",
    ],
    result: [
      "Ensured the continuous availability of the company's environmental portal and related internet services for its users.",
    ],
    technologies: [
      {
        id: "apache",
      },
      {
        id: "bind",
      },
      {
        id: "postfix-context",
      },
      {
        id: "squid-context",
      },
    ],
  },
  {
    title: "Implementing and Maintaining Internal IT Infrastructure",
    company: "Breuling & Hoffelder Ltda.",
    challenge:
      "Establish a functional and organized internal IT infrastructure for a small team.",
    action: [
      "Installed structured network cabling.",
      "Deployed and configured internal Linux servers for file sharing and other services.",
      "Contributed to the definition of processes for ISO certification.",
    ],
    result: [
      "Provided a foundational IT infrastructure to support the company's operations and facilitate future growth.",
      "Contributed to efforts aimed at achieving ISO quality standards.",
    ],
    technologies: [
      {
        id: "linux",
      },
    ],
  },
];
