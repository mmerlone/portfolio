import { portfolio } from "@/data/portfolio";

export interface TechnicalSkillCluster {
  title: string;
  description: string;
  skills: string[];
}

export const skillClusters: TechnicalSkillCluster[] = [
  {
    title: "Product Engineering",
    description:
      "Frontend architecture, component systems, and accessible UI implementation for global brands.",
    skills: [
      ...portfolio.basic.technical.programming.filter((skill) =>
        ["React", "TypeScript", "JavaScript", "HTML", "CSS"].includes(skill),
      ),
      ...portfolio.basic.technical.platformsAndTools,
      ...portfolio.basic.technical.other.filter((skill) =>
        ["design systems", "WCAG accessibility"].includes(skill),
      ),
    ],
  },
  {
    title: "Systems & Infrastructure",
    description:
      "On-premise and cloud infrastructure, virtualization, networking, and operational tooling.",
    skills: [
      ...portfolio.basic.technical.operatingSystems,
      ...portfolio.basic.technical.hardware,
      ...portfolio.basic.technical.serversAndServices.filter((skill) =>
        [
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
          "sendmail",
          "Postfix",
          "Dovecot",
          "OpenLDAP",
          "Samba",
          "AD",
          "IAM",
          "DRP",
          "Squid",
          "Zabbix",
          "Netdisco",
          "Graylog",
          "Openfire RTC Server",
          "IPAM",
          "GitLab",
          "Docker",
        ].includes(skill),
      ),
      ...portfolio.basic.technical.virtualization,
      ...portfolio.basic.technical.networkingAndSecurity,
      ...portfolio.basic.technical.backupAndRecovery,
      ...portfolio.basic.technical.cloud,
    ],
  },
  {
    title: "Data & Services",
    description:
      "Database technologies, backend services, and content platforms.",
    skills: [
      ...portfolio.basic.technical.databases,
      ...portfolio.basic.technical.serversAndServices.filter((skill) =>
        ["Tomcat"].includes(skill),
      ),
      ...portfolio.basic.technical.platformsAndTools.filter((skill) =>
        ["SOGo"].includes(skill),
      ),
    ],
  },
  {
    title: "Engineering Practice",
    description:
      "Automation, methodologies, and cross-cutting technical competencies.",
    skills: [
      ...portfolio.basic.technical.automation,
      ...portfolio.basic.technical.programming.filter((skill) =>
        ["PHP", "Perl", "SQL", "Bash"].includes(skill),
      ),
      ...portfolio.basic.technical.other.filter((skill) =>
        ["MVC"].includes(skill),
      ),
    ],
  },
];
