import { Skill } from "@/types/skills";

export interface SkillsData {
  readonly title: string;
  readonly categories: Record<string, readonly Skill[]>;
}

export const skillsData: SkillsData = {
  title: "Skills & Expertise",
  categories: {
    "Frontend Development": [
      { name: "React", iconUrl: "react", level: 0 },
      {
        name: "TypeScript",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        level: 0,
      },
      { name: "JavaScript", iconUrl: "js", level: 0 },
      { name: "HTML5", iconUrl: "html5", level: 0 },
      { name: "CSS3", iconUrl: "css3", level: 0 },
      { name: "SCSS", iconUrl: "sass", level: 0 },
      {
        name: "Tailwind CSS",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
        level: 0,
      },
      {
        name: "Next.js",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        level: 0,
      },
    ],
    "Backend Development": [
      { name: "Node.js", iconUrl: "node-js", level: 0 },
      { name: "PHP", iconUrl: "php", level: 0 },
      {
        name: "REST APIs",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg",
        level: 0,
      },
      {
        name: "Perl",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/perl/perl-original.svg",
        level: 0,
      },
    ],
    "CMS & Platforms": [
      { name: "WordPress", iconUrl: "wordpress", level: 0 },
      { name: "Shopify", iconUrl: "shopify", level: 0 },
      { name: "Discourse", iconUrl: "discourse", level: 0 },
      {
        name: "Contentstack",
        iconUrl: "/images/icons/contentstack.webp",
        level: 0,
      },
    ],
    "Databases": [
      {
        name: "MySQL",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
        level: 0,
      },
      {
        name: "PostgreSQL",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
        level: 0,
      },
      {
        name: "MongoDB",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
        level: 0,
      },
      {
        name: "MariaDB",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mariadb/mariadb-original.svg",
        level: 0,
      },
      {
        name: "MS SQL Server",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg",
        level: 0,
      },
      {
        name: "Database Design",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
        level: 0,
      },
    ],
    "DevOps & Infrastructure": [
      { name: "Docker", iconUrl: "docker", level: 0 },
      { name: "Linux", iconUrl: "linux", level: 0 },
      {
        name: "Virtualization",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/k3s/k3s-original.svg",
        level: 0,
      },
      {
        name: "Zabbix",
        iconUrl:
          "https://upload.wikimedia.org/wikipedia/commons/5/5d/Zabbix_logo_square.svg",
        level: 0,
      },
      {
        name: "Bacula",
        iconUrl:
          "https://www.bacula.org/wp-content/uploads/2018/10/logo_bacula11.png",
        level: 0,
      },
    ],
    "Web Servers & Services": [
      {
        name: "Nginx",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg",
        level: 0,
      },
      {
        name: "Apache",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg",
        level: 0,
      },
      { name: "Postfix", iconUrl: "/images/icons/postfix.png", level: 0 },
      { name: "Dovecot", iconUrl: "/images/icons/dovecot-logo.png", level: 0 },
      {
        name: "Squid Proxy",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg",
        level: 0,
      },
      { name: "Samba", iconUrl: "/images/icons/samba.png", level: 0 },
    ],
    "Development Tools": [
      { name: "Git", iconUrl: "git", level: 0 },
      {
        name: "VS Code",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
        level: 0,
      },
      {
        name: "Jest",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg",
        level: 0,
      },
      {
        name: "Cypress",
        iconUrl:
          "https://raw.githubusercontent.com/cypress-io/cypress-icons/master/src/logo/cypress-io-logo.svg",
        level: 0,
      },
      {
        name: "Cursor",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
        level: 0,
      },
      {
        name: "phpMyAdmin",
        iconUrl:
          "https://www.ampps.com/sitepad-data/uploads/2023/03/phpmyadmin.png",
        level: 0,
      },
    ],
    "Network & Security": [
      { name: "Network Administration", iconUrl: "network-wired", level: 0 },
      { name: "Network Security", iconUrl: "shield-alt", level: 0 },
      { name: "Firewall", iconUrl: "fire", level: 0 },
      { name: "pfSense", iconUrl: "/images/icons/pfsense.svg", level: 0 },
      { name: "DNS", iconUrl: "globe", level: 0 },
      { name: "VLAN", iconUrl: "network-wired", level: 0 }, // Re-using network-wired, or consider FaSitemap for network structure
      {
        name: "phpIPAM",
        iconUrl: "https://phpipam.net/css/images/phpipam_logo_small@2x.png",
        level: 0,
      },
    ],
    "Operating Systems": [
      { name: "Linux", iconUrl: "linux", level: 0 }, // Already updated under DevOps, ensuring consistency
      { name: "Windows Server", iconUrl: "windows", level: 0 },
      { name: "FreeBSD", iconUrl: "/images/icons/freebsd.png", level: 0 },
      { name: "macOS", iconUrl: "apple", level: 0 },
    ],
    "AI & Machine Learning": [
      { name: "AI", iconUrl: "/images/icons/ai.svg", level: 0 },
    ],
    "Leadership & Soft Skills": [
      { name: "Team Leadership", iconUrl: "users", level: 0 },
      { name: "Project Management", iconUrl: "project-diagram", level: 0 },
      { name: "Problem Solving", iconUrl: "lightbulb", level: 0 },
      { name: "Communication", iconUrl: "comments", level: 0 },
    ]
  }
};
