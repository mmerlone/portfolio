import type {
  CatalogReference,
  HardSkillSelections,
  SoftSkill,
} from "@/types/skills";

const catalog = {
  react: {
    name: "React",
    variants: {
      "v19-plus": "React 19+",
    },
  },
  typescript: {
    name: "TypeScript",
  },
  javascript: {
    name: "JavaScript",
  },
  php: {
    name: "PHP",
  },
  perl: {
    name: "Perl",
  },
  html: {
    name: "HTML",
  },
  css: {
    name: "CSS",
  },
  sql: {
    name: "SQL",
  },
  bash: {
    name: "Bash",
  },
  linux: {
    name: "Linux",
  },
  unix: {
    name: "Unix",
  },
  solaris: {
    name: "Solaris",
  },
  freebsd: {
    name: "FreeBSD",
  },
  windows: {
    name: "Windows",
  },
  ibm: {
    name: "IBM",
  },
  dell: {
    name: "Dell",
  },
  idrac: {
    name: "iDrac",
  },
  "tape-libraries": {
    name: "tape libraries",
  },
  unifi: {
    name: "UniFi",
  },
  ubiquiti: {
    name: "Ubiquiti",
  },
  raid: {
    name: "RAID",
  },
  das: {
    name: "DAS",
  },
  sas: {
    name: "SAS",
  },
  dns: {
    name: "DNS",
  },
  ftp: {
    name: "FTP",
  },
  dhcp: {
    name: "DHCP",
  },
  ldap: {
    name: "LDAP",
  },
  nfs: {
    name: "NFS",
  },
  snmp: {
    name: "SNMP",
  },
  git: {
    name: "Git",
  },
  smtp: {
    name: "SMTP",
  },
  imap: {
    name: "IMAP",
  },
  pop3: {
    name: "POP3",
  },
  apache: {
    name: "Apache",
  },
  nginx: {
    name: "nginx",
  },
  iis: {
    name: "IIS",
  },
  tomcat: {
    name: "Tomcat",
  },
  sendmail: {
    name: "sendmail",
  },
  postfix: {
    name: "Postfix",
  },
  dovecot: {
    name: "Dovecot",
  },
  openldap: {
    name: "OpenLDAP",
  },
  samba: {
    name: "Samba",
  },
  ad: {
    name: "AD",
  },
  iam: {
    name: "IAM",
  },
  drp: {
    name: "DRP",
  },
  squid: {
    name: "Squid",
  },
  zabbix: {
    name: "Zabbix",
  },
  netdisco: {
    name: "Netdisco",
  },
  graylog: {
    name: "Graylog",
  },
  "openfire-rtc-server": {
    name: "Openfire RTC Server",
  },
  ipam: {
    name: "IPAM",
  },
  gitlab: {
    name: "GitLab",
  },
  docker: {
    name: "Docker",
  },
  mysql: {
    name: "MySQL",
  },
  mariadb: {
    name: "MariaDB",
  },
  postgresql: {
    name: "PostgreSQL",
  },
  "ms-sql": {
    name: "MS-SQL",
  },
  mongodb: {
    name: "MongoDB",
  },
  shopify: {
    name: "Shopify",
  },
  discourse: {
    name: "Discourse",
  },
  contentstack: {
    name: "Contentstack",
  },
  wordpress: {
    name: "WordPress",
  },
  sogo: {
    name: "SOGo",
  },
  "vmware-esxi": {
    name: "VMware ESXi",
  },
  vcenter: {
    name: "vCenter",
  },
  virtualbox: {
    name: "VirtualBox",
  },
  "pfsense-opnsense": {
    name: "pfSense/OPNSense",
  },
  acl: {
    name: "ACL",
  },
  vlan: {
    name: "VLAN",
  },
  "ipsec-vpn": {
    name: "IPsec VPN",
  },
  openvpn: {
    name: "OpenVPN",
  },
  rls: {
    name: "RLS",
  },
  ssl: {
    name: "SSL",
  },
  tls: {
    name: "TLS",
  },
  firewalls: {
    name: "firewalls",
  },
  ids: {
    name: "IDS",
  },
  "network-monitoring": {
    name: "network monitoring",
  },
  routing: {
    name: "routing",
  },
  switching: {
    name: "switching",
  },
  wireless: {
    name: "wireless",
  },
  "network-design": {
    name: "network design",
  },
  "network-security": {
    name: "network security",
  },
  bacula: {
    name: "Bacula",
  },
  rsync: {
    name: "rsync",
  },
  "contingency-disaster-recovery": {
    name: "contingency & disaster recovery",
  },
  storage: {
    name: "storage",
  },
  azure: {
    name: "Azure",
  },
  "microsoft-cloud-migrations": {
    name: "Microsoft Cloud migrations",
  },
  "node-js": {
    name: "Node.js",
  },
  husky: {
    name: "husky",
  },
  "design-systems": {
    name: "design systems",
  },
  mvc: {
    name: "MVC",
  },
  "wcag-accessibility": {
    name: "WCAG accessibility",
  },
  "tailwind-css": {
    name: "Tailwind CSS",
    variants: {
      v4: "Tailwind CSS 4",
    },
  },
  agile: {
    name: "Agile",
  },
  scrum: {
    name: "Scrum",
  },
  jest: {
    name: "Jest",
  },
  cypress: {
    name: "Cypress",
  },
  "shopify-theme": {
    name: "Shopify theme",
  },
  "discourse-theme": {
    name: "Discourse theme",
  },
  "wordpress-theme": {
    name: "WordPress theme",
  },
  accessibility: {
    name: "Accessibility",
  },
  wcag: {
    name: "WCAG",
  },
  "responsive-design": {
    name: "Responsive Design",
  },
  "scalable-applications": {
    name: "Scalable Applications",
  },
  inclusivity: {
    name: "Inclusivity",
  },
  microsoft: {
    name: "Microsoft",
  },
  samba4: {
    name: "Samba4",
  },
  proxmox: {
    name: "Proxmox",
  },
  backup: {
    name: "Backup",
  },
  hardware: {
    name: "Hardware",
  },
  networking: {
    name: "Networking",
  },
  monitoring: {
    name: "Monitoring",
  },
  backups: {
    name: "Backups",
  },
  process: {
    name: "Process",
  },
  planning: {
    name: "Planning",
  },
  "self-hosted-email-dns-mx-etc": {
    name: "Self Hosted Email, DNS, MX, etc.",
  },
  virtualization: {
    name: "Virtualization",
  },
  security: {
    name: "Security",
  },
  infrastructure: {
    name: "Infrastructure",
  },
  "project-management": {
    name: "Project Management",
  },
  "team-leadership": {
    name: "Team Leadership",
  },
  "cost-reduction": {
    name: "Cost Reduction",
  },
  reliability: {
    name: "Reliability",
  },
  performance: {
    name: "Performance",
  },
  growth: {
    name: "Growth",
  },
  uptime: {
    name: "Uptime",
  },
  "next-js": {
    name: "Next.js",
    variants: {
      "v16-plus": "Next.js 16+",
      "v15-plus": "Next.js 15+",
    },
  },
  sass: {
    name: "Sass",
  },
  "open-props": {
    name: "Open Props",
  },
  "lucide-icons": {
    name: "Lucide Icons",
  },
  "next-themes": {
    name: "next-themes",
  },
  "pino-logger": {
    name: "Pino Logger",
  },
  vercel: {
    name: "Vercel",
  },
  "jest-axe": {
    name: "jest-axe",
  },
  knip: {
    name: "Knip",
  },
  vite: {
    name: "Vite",
  },
  "three-js": {
    name: "Three.js",
  },
  "react-three-fiber": {
    name: "React Three Fiber",
  },
  "react-three-drei": {
    name: "React Three Drei",
  },
  supabase: {
    name: "Supabase",
  },
  "material-ui": {
    name: "Material UI",
    variants: {
      "v7-plus": "Material UI v7+",
    },
  },
  sentry: {
    name: "Sentry",
  },
  "data-migration": {
    name: "Data Migration",
  },
  "windows-server": {
    name: "Windows Server",
  },
  vpn: {
    name: "VPN",
  },
  firewall: {
    name: "Firewall",
  },
  "routing-context": {
    name: "Routing",
  },
  archiving: {
    name: "Archiving",
  },
  "open-source": {
    name: "Open-Source",
  },
  "iso-9001": {
    name: "ISO 9001",
  },
  auditing: {
    name: "Auditing",
  },
  proxy: {
    name: "Proxy",
  },
  "wireless-networking": {
    name: "Wireless Networking",
  },
  smarty: {
    name: "Smarty",
  },
  "windows-2000": {
    name: "Windows 2000",
  },
  qmail: {
    name: "qmail",
  },
  "structured-cabling": {
    name: "Structured Cabling",
  },
  isdn: {
    name: "ISDN",
  },
  autocad: {
    name: "AutoCAD",
  },
  "solid-edge": {
    name: "Solid Edge",
  },
  "physical-clipboard-and-paper": {
    name: "Physical clipboard and paper",
  },
  "ink-pen": {
    name: "Ink pen",
  },
  technographer: {
    name: "technographer",
  },
  "shopify-liquid": {
    name: "Shopify Liquid",
  },
  ember: {
    name: "Ember",
  },
  handlebars: {
    name: "Handlebars",
  },
  "active-directory": {
    name: "Active Directory",
  },
  "system-migration": {
    name: "System Migration",
  },
  "authentication-protocols": {
    name: "Authentication Protocols",
  },
  "linux-server-administration": {
    name: "Linux Server Administration",
  },
  "email-protocols-imap-smtp-eas": {
    name: "Email Protocols (IMAP, SMTP, EAS)",
  },
  "microsoft-cloud-exchange-online": {
    name: "Microsoft Cloud (Exchange Online)",
  },
  "cloud-migration-strategies": {
    name: "Cloud Migration Strategies",
  },
  "shared-sas-storage": {
    name: "Shared SAS Storage",
  },
  pfsense: {
    name: "pfSense",
  },
  "network-monitoring-zabbix": {
    name: "Network Monitoring (Zabbix)",
  },
  bind: {
    name: "bind",
  },
  "postfix-context": {
    name: "postfix",
  },
  "squid-context": {
    name: "squid",
  },
  "industrial-processes": {
    name: "Industrial Processes",
  },
  "vmware-esxi-vcenter": {
    name: "VMware ESXi/vCenter",
  },
  "postfix-dovecot-openldap": {
    name: "Postfix/Dovecot/OpenLDAP",
  },
  "pfsense-vpn-vlan": {
    name: "pfSense/VPN/VLAN",
  },
  "zabbix-graylog": {
    name: "Zabbix/Graylog",
  },
  "php-mysql": {
    name: "PHP/MySQL",
  },
  "jest-cypress": {
    name: "jest/Cypress",
  },
} as const;

export const skills = {
  hard: {
    catalog,
    categories: [
      {
        id: "programming",
        name: "Programming Languages",
        skills: [
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
            id: "php",
          },
          {
            id: "perl",
          },
          {
            id: "html",
          },
          {
            id: "css",
          },
          {
            id: "sql",
          },
          {
            id: "bash",
          },
        ],
      },
      {
        id: "operatingSystems",
        name: "Operating Systems",
        skills: [
          {
            id: "linux",
          },
          {
            id: "unix",
          },
          {
            id: "solaris",
          },
          {
            id: "freebsd",
          },
          {
            id: "windows",
          },
        ],
      },
      {
        id: "hardware",
        name: "Hardware",
        skills: [
          {
            id: "ibm",
          },
          {
            id: "dell",
          },
          {
            id: "idrac",
          },
          {
            id: "tape-libraries",
          },
          {
            id: "unifi",
          },
          {
            id: "ubiquiti",
          },
          {
            id: "raid",
          },
          {
            id: "das",
          },
          {
            id: "sas",
          },
        ],
      },
      {
        id: "serversAndServices",
        name: "Servers & Services",
        skills: [
          {
            id: "dns",
          },
          {
            id: "ftp",
          },
          {
            id: "dhcp",
          },
          {
            id: "ldap",
          },
          {
            id: "nfs",
          },
          {
            id: "snmp",
          },
          {
            id: "git",
          },
          {
            id: "smtp",
          },
          {
            id: "imap",
          },
          {
            id: "pop3",
          },
          {
            id: "apache",
          },
          {
            id: "nginx",
          },
          {
            id: "iis",
          },
          {
            id: "tomcat",
          },
          {
            id: "sendmail",
          },
          {
            id: "postfix",
          },
          {
            id: "dovecot",
          },
          {
            id: "openldap",
          },
          {
            id: "samba",
          },
          {
            id: "ad",
          },
          {
            id: "iam",
          },
          {
            id: "drp",
          },
          {
            id: "squid",
          },
          {
            id: "zabbix",
          },
          {
            id: "netdisco",
          },
          {
            id: "graylog",
          },
          {
            id: "openfire-rtc-server",
          },
          {
            id: "ipam",
          },
          {
            id: "gitlab",
          },
          {
            id: "docker",
          },
        ],
      },
      {
        id: "databases",
        name: "Databases",
        skills: [
          {
            id: "mysql",
          },
          {
            id: "mariadb",
          },
          {
            id: "postgresql",
          },
          {
            id: "ms-sql",
          },
          {
            id: "mongodb",
          },
        ],
      },
      {
        id: "platformsAndTools",
        name: "Platforms & Tools",
        skills: [
          {
            id: "shopify",
          },
          {
            id: "discourse",
          },
          {
            id: "contentstack",
          },
          {
            id: "wordpress",
          },
          {
            id: "sogo",
          },
        ],
      },
      {
        id: "virtualization",
        name: "Virtualization",
        skills: [
          {
            id: "vmware-esxi",
          },
          {
            id: "vcenter",
          },
          {
            id: "virtualbox",
          },
        ],
      },
      {
        id: "networkingAndSecurity",
        name: "Networking & Security",
        skills: [
          {
            id: "pfsense-opnsense",
          },
          {
            id: "acl",
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
            id: "rls",
          },
          {
            id: "ssl",
          },
          {
            id: "tls",
          },
          {
            id: "firewalls",
          },
          {
            id: "ids",
          },
          {
            id: "network-monitoring",
          },
          {
            id: "routing",
          },
          {
            id: "switching",
          },
          {
            id: "wireless",
          },
          {
            id: "network-design",
          },
          {
            id: "network-security",
          },
        ],
      },
      {
        id: "backupAndRecovery",
        name: "Backup & Recovery",
        skills: [
          {
            id: "bacula",
          },
          {
            id: "rsync",
          },
          {
            id: "contingency-disaster-recovery",
          },
          {
            id: "storage",
          },
        ],
      },
      {
        id: "cloud",
        name: "Cloud",
        skills: [
          {
            id: "azure",
          },
          {
            id: "microsoft-cloud-migrations",
          },
        ],
      },
      {
        id: "automation",
        name: "Automation",
        skills: [
          {
            id: "bash",
          },
          {
            id: "node-js",
          },
          {
            id: "husky",
          },
        ],
      },
      {
        id: "other",
        name: "Other",
        skills: [
          {
            id: "design-systems",
          },
          {
            id: "mvc",
          },
          {
            id: "wcag-accessibility",
          },
        ],
      },
    ],
    clusters: [
      {
        id: "product-engineering",
        title: "Product Engineering",
        description:
          "Frontend architecture, component systems, and accessible UI implementation for global brands.",
        icon: "CodeXml",
        skills: [
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
          {
            id: "shopify",
          },
          {
            id: "discourse",
          },
          {
            id: "contentstack",
          },
          {
            id: "wordpress",
          },
          {
            id: "sogo",
          },
          {
            id: "design-systems",
          },
          {
            id: "wcag-accessibility",
          },
        ],
      },
      {
        id: "systems-infrastructure",
        title: "Systems & Infrastructure",
        description:
          "On-premise and cloud infrastructure, virtualization, networking, and operational tooling.",
        icon: "Server",
        skills: [
          {
            id: "linux",
          },
          {
            id: "unix",
          },
          {
            id: "solaris",
          },
          {
            id: "freebsd",
          },
          {
            id: "windows",
          },
          {
            id: "ibm",
          },
          {
            id: "dell",
          },
          {
            id: "idrac",
          },
          {
            id: "tape-libraries",
          },
          {
            id: "unifi",
          },
          {
            id: "ubiquiti",
          },
          {
            id: "raid",
          },
          {
            id: "das",
          },
          {
            id: "sas",
          },
          {
            id: "dns",
          },
          {
            id: "ftp",
          },
          {
            id: "dhcp",
          },
          {
            id: "ldap",
          },
          {
            id: "nfs",
          },
          {
            id: "snmp",
          },
          {
            id: "git",
          },
          {
            id: "smtp",
          },
          {
            id: "imap",
          },
          {
            id: "pop3",
          },
          {
            id: "apache",
          },
          {
            id: "nginx",
          },
          {
            id: "iis",
          },
          {
            id: "sendmail",
          },
          {
            id: "postfix",
          },
          {
            id: "dovecot",
          },
          {
            id: "openldap",
          },
          {
            id: "samba",
          },
          {
            id: "ad",
          },
          {
            id: "iam",
          },
          {
            id: "drp",
          },
          {
            id: "squid",
          },
          {
            id: "zabbix",
          },
          {
            id: "netdisco",
          },
          {
            id: "graylog",
          },
          {
            id: "openfire-rtc-server",
          },
          {
            id: "ipam",
          },
          {
            id: "gitlab",
          },
          {
            id: "docker",
          },
          {
            id: "vmware-esxi",
          },
          {
            id: "vcenter",
          },
          {
            id: "virtualbox",
          },
          {
            id: "pfsense-opnsense",
          },
          {
            id: "acl",
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
            id: "rls",
          },
          {
            id: "ssl",
          },
          {
            id: "tls",
          },
          {
            id: "firewalls",
          },
          {
            id: "ids",
          },
          {
            id: "network-monitoring",
          },
          {
            id: "routing",
          },
          {
            id: "switching",
          },
          {
            id: "wireless",
          },
          {
            id: "network-design",
          },
          {
            id: "network-security",
          },
          {
            id: "bacula",
          },
          {
            id: "rsync",
          },
          {
            id: "contingency-disaster-recovery",
          },
          {
            id: "storage",
          },
          {
            id: "azure",
          },
          {
            id: "microsoft-cloud-migrations",
          },
        ],
      },
      {
        id: "data-services",
        title: "Data & Services",
        description:
          "Database technologies, backend services, and content platforms.",
        icon: "Database",
        skills: [
          {
            id: "mysql",
          },
          {
            id: "mariadb",
          },
          {
            id: "postgresql",
          },
          {
            id: "ms-sql",
          },
          {
            id: "mongodb",
          },
          {
            id: "tomcat",
          },
          {
            id: "sogo",
          },
        ],
      },
      {
        id: "engineering-practice",
        title: "Engineering Practice",
        description:
          "Automation, methodologies, and cross-cutting technical competencies.",
        icon: "Wrench",
        skills: [
          {
            id: "bash",
          },
          {
            id: "node-js",
          },
          {
            id: "husky",
          },
          {
            id: "php",
          },
          {
            id: "perl",
          },
          {
            id: "sql",
          },
          {
            id: "mvc",
          },
        ],
      },
    ],
    expertise: [
      {
        id: "high-performance-ui-architecture",
        name: "High-Performance UI Architecture",
        description:
          "Scaling global frontend systems for Fortune 500 brands with a focus on 'Accessibility as Architecture'.",
        keywords: [
          {
            id: "react",
          },
          {
            id: "typescript",
          },
          {
            id: "node-js",
          },
          {
            id: "docker",
          },
          {
            id: "tailwind-css",
          },
          {
            id: "agile",
          },
          {
            id: "scrum",
          },
          {
            id: "jest",
          },
          {
            id: "cypress",
          },
          {
            id: "shopify-theme",
          },
          {
            id: "discourse-theme",
          },
          {
            id: "wordpress-theme",
          },
          {
            id: "accessibility",
          },
          {
            id: "wcag",
          },
          {
            id: "responsive-design",
          },
          {
            id: "scalable-applications",
          },
          {
            id: "inclusivity",
          },
        ],
      },
      {
        id: "resilient-platform-architecture",
        name: "Resilient Platform Architecture",
        description:
          "Architecting resilient internal applications to ensuring reliability and performance with a 99.9% uptime.",
        keywords: [
          {
            id: "microsoft",
          },
          {
            id: "samba4",
          },
          {
            id: "postfix",
          },
          {
            id: "dovecot",
          },
          {
            id: "openldap",
          },
          {
            id: "dns",
          },
          {
            id: "dhcp",
          },
          {
            id: "ldap",
          },
          {
            id: "ad",
          },
          {
            id: "git",
          },
          {
            id: "vmware-esxi",
          },
          {
            id: "vcenter",
          },
          {
            id: "proxmox",
          },
          {
            id: "zabbix",
          },
          {
            id: "graylog",
          },
          {
            id: "ipam",
          },
          {
            id: "backup",
          },
        ],
      },
      {
        id: "operational-stewardship",
        name: "Operational Stewardship",
        description:
          "A 20+ year track record of 'living with decisions,' evolving mission-critical legacy ERPs into scalable cloud-ready environments.",
        keywords: [
          {
            id: "hardware",
          },
          {
            id: "networking",
          },
          {
            id: "monitoring",
          },
          {
            id: "backups",
          },
          {
            id: "process",
          },
          {
            id: "planning",
          },
          {
            id: "self-hosted-email-dns-mx-etc",
          },
          {
            id: "virtualization",
          },
          {
            id: "security",
          },
          {
            id: "infrastructure",
          },
          {
            id: "project-management",
          },
          {
            id: "team-leadership",
          },
          {
            id: "cost-reduction",
          },
          {
            id: "reliability",
          },
          {
            id: "performance",
          },
          {
            id: "growth",
          },
          {
            id: "uptime",
          },
        ],
      },
    ],
  } as const satisfies HardSkillSelections<CatalogReference<typeof catalog>> & {
    readonly catalog: typeof catalog;
  },
  soft: [
    {
      id: "analytical-thinking",
      name: "Analytical Thinking",
      description:
        "Breaks down complex problems, examines assumptions, and evaluates alternatives before committing to a solution.",
      evidence:
        "Technical troubleshooting, infrastructure investigations, architectural evaluations, and detailed assessment of constraints.",
      icon: "Search",
    },
    {
      id: "independent-judgment",
      name: "Independent Judgment",
      description:
        "Forms opinions independently, questions conventional approaches, and makes decisions based on evidence and context rather than trends or authority alone.",
      evidence:
        "Consistently evaluates trade-offs, challenges unnecessary complexity, and seeks solutions appropriate to the actual problem.",
      icon: "Scale",
    },
    {
      id: "adaptability",
      name: "Adaptability",
      description:
        "Adjusts to changing technologies, unfamiliar domains, and evolving requirements while continuing to develop new capabilities.",
      evidence:
        "Career transitions across industrial design, systems administration, networking, backend development, and modern frontend engineering.",
      icon: "RefreshCw",
    },
    {
      id: "self-directed-learning",
      name: "Self-Directed Learning",
      description:
        "Takes initiative to acquire knowledge, investigate unfamiliar subjects, and turn learning into practical results.",
      evidence:
        "Self-directed career development, broad technical experience, and independent open-source software projects.",
      icon: "BookOpen",
    },
    {
      id: "problem-solving",
      name: "Complex Problem-Solving",
      description:
        "Investigates problems across multiple layers, identifies relevant constraints, and develops practical paths toward resolution.",
      evidence:
        "Work spanning software, operating systems, networks, security, infrastructure, and disaster recovery.",
      icon: "Puzzle",
    },
    {
      id: "strategic-thinking",
      name: "Strategic Thinking",
      description:
        "Considers long-term implications, dependencies, costs, and future maintenance rather than optimizing only for immediate results.",
      evidence:
        "Infrastructure modernization, technology migrations, system lifecycle management, and disaster recovery planning.",
      icon: "Compass",
    },
    {
      id: "practical-decision-making",
      name: "Practical Decision-Making",
      description:
        "Balances ideal solutions against real-world constraints, prioritizing outcomes that are feasible, maintainable, and proportionate to the problem.",
      evidence:
        "Experience with legacy systems, constrained budgets, operational requirements, and incremental modernization.",
      icon: "CheckCheck",
    },
    {
      id: "attention-to-detail",
      name: "Attention to Detail",
      description:
        "Pays close attention to correctness, edge cases, implementation quality, and constraints that can be overlooked in high-level planning.",
      evidence:
        "Detailed technical investigations, accessibility requirements, semantic implementation, and careful evaluation of system behavior.",
      icon: "ScanSearch",
    },
    {
      id: "cross-functional-communication",
      name: "Cross-Functional Communication",
      description:
        "Connects different technical disciplines and helps translate complex technical issues into practical considerations for different audiences.",
      evidence:
        "Technical leadership, product ownership, and work involving engineering, infrastructure, design, management, vendors, and users.",
      icon: "MessagesSquare",
    },
    {
      id: "ownership-accountability",
      name: "Ownership and Accountability",
      description:
        "Takes responsibility beyond initial implementation, considering maintenance, operational consequences, and the long-term usefulness of a solution.",
      evidence:
        "Long-term infrastructure responsibilities, business-critical systems, and ownership of technical initiatives.",
      icon: "ShieldCheck",
    },
    {
      id: "intellectual-curiosity",
      name: "Intellectual Curiosity",
      description:
        "Explores unfamiliar technologies and ideas, investigates how things work, and pursues understanding beyond immediate requirements.",
      evidence:
        "Broad technical exploration, open-source development, and investigation of legacy hardware and software systems.",
      icon: "Lightbulb",
    },
    {
      id: "continuous-improvement",
      name: "Continuous Improvement",
      description:
        "Looks for opportunities to simplify processes, modernize existing systems, improve quality, and reduce recurring operational friction.",
      evidence:
        "Infrastructure modernization, automation, monitoring, tooling improvements, and software component development.",
      icon: "TrendingUp",
    },
    {
      id: "ambiguity-management",
      name: "Ambiguity Management",
      description:
        "Makes progress when requirements or environments are incompletely documented by investigating the situation and identifying the information needed to move forward.",
      evidence:
        "Legacy infrastructure investigations, undocumented environments, and work across diverse technical domains.",
      icon: "Route",
    },
    {
      id: "systems-level-perspective",
      name: "Holistic Perspective",
      description:
        "Recognizes that technical decisions affect interconnected systems, operational teams, users, and business outcomes.",
      evidence:
        "Experience across the software lifecycle, infrastructure operations, networking, security, and business continuity.",
      icon: "Network",
    },
  ] as const satisfies readonly SoftSkill[],
} as const;
