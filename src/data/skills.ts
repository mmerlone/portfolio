export interface Skill {
  readonly name: string;
  readonly iconUrl: string;
  readonly level: number;
}

export interface SkillsData {
  readonly title: string;
  readonly categories: Record<string, readonly Skill[]>;
}

export const skillsData: SkillsData = {
  title: "Skills & Expertise",
  categories: {
    "Frontend Development": [
      { name: "React", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", level: 0 },
      { name: "TypeScript", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", level: 0 },
      { name: "JavaScript", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", level: 0 },
      { name: "HTML5", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", level: 0 },
      { name: "CSS3", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", level: 0 },
      { name: "SCSS", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg", level: 0 },
      { name: "Tailwind CSS", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", level: 0 },
      { name: "Next.js", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", level: 0 }
    ],
    "Backend Development": [
      { name: "Node.js", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", level: 0 },
      { name: "PHP", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", level: 0 },
      { name: "REST APIs", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg", level: 0 },
      { name: "Perl", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/perl/perl-original.svg", level: 0 }
    ],
    "Databases": [
      { name: "MySQL", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", level: 0 },
      { name: "PostgreSQL", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", level: 0 },
      { name: "MongoDB", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", level: 0 },
      { name: "MariaDB", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mariadb/mariadb-original.svg", level: 0 },
      { name: "MS SQL Server", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg", level: 0 },
      { name: "Database Design", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", level: 0 }
    ],
    "DevOps & Infrastructure": [
      { name: "Docker", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", level: 0 },
      { name: "Linux", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", level: 0 },
      { name: "Virtualization", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/k3s/k3s-original.svg", level: 0 }
    ],
    "Web Servers & Services": [
      { name: "Nginx", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg", level: 0 },
      { name: "Apache", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg", level: 0 },
      { name: "Postfix", iconUrl: "/images/icons/postfix.png", level: 0 },
      { name: "Dovecot", iconUrl: "/images/icons/dovecot-logo.png", level: 0 },
      { name: "Squid Proxy", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg", level: 0 },
      { name: "Samba", iconUrl: "/images/icons/Everaldo-Crystal-Clear-App-samba.48.png", level: 0 }
    ],
    "Development Tools": [
      { name: "Git", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", level: 0 },
      { name: "VS Code", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", level: 0 },
      { name: "Jest", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg", level: 0 },
      { name: "Cypress", iconUrl: "https://raw.githubusercontent.com/cypress-io/cypress-icons/master/src/logo/cypress-io-logo.svg", level: 0 },
      { name: "Cursor", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", level: 0 }
    ],
    "Network & Security": [
      { name: "Network Administration", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", level: 0 },
      { name: "Network Security", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", level: 0 },
      { name: "Firewall", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", level: 0 },
      { name: "DNS", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", level: 0 },
      { name: "VLAN", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", level: 0 }
    ],
    "Operating Systems": [
      { name: "Linux", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", level: 0 },
      { name: "Windows Server", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg", level: 0 },
      { name: "FreeBSD", iconUrl: "/images/icons/401274_freebsd_icon.png", level: 0 },
      { name: "macOS", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg", level: 0 }
    ],
    "AI & Machine Learning": [
      { name: "AI", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", level: 0 }
    ],
    "Leadership & Soft Skills": [
      { name: "Team Leadership", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", level: 0 },
      { name: "Project Management", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", level: 0 },
      { name: "Problem Solving", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", level: 0 },
      { name: "Communication", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", level: 0 }
    ]
  }
};
