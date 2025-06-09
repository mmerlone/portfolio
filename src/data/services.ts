import { ServicesConfig } from "@/types/services";

export const servicesConfig: ServicesConfig = {
  title: "How I Can Help",
  subtitle: "Specialized solutions for your technical challenges",
  services: [
    {
      id: "migrations",
      title: "Complex System & Cloud Migrations",
      description:
        "Seamlessly migrating your critical systems (e.g., LDAP to Active Directory, legacy email to Microsoft Cloud, WordPress to modern CMS) with minimal downtime and risk.",
    },
    {
      id: "security",
      title: "Security & Infrastructure Hardening",
      description:
        "Comprehensive security audits of your network and servers. I identify vulnerabilities, implement robust solutions like pfSense firewalls and VLANs, and harden your infrastructure to eliminate threats.",
    },
    {
      id: "performance",
      title: "Performance & Scalability Optimization",
      description:
        "Is your infrastructure keeping up with your growth? I analyze your full stack—from server configuration to application code—to improve performance and ensure scalability.",
    },
  ],
}; 