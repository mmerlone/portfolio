/**
 * Contact information for a portfolio owner.
 */
export type PortfolioContact = {
  /** Primary email address */
  email: string;
  /** Optional LinkedIn profile URL */
  linkedin?: string;
  /** Optional personal website URL */
  website?: string;
};

/**
 * High level expertise summary.
 */
export type PortfolioExpertise = {
  /** Name of the expertise area */
  name: string;
  /** Short list of core expertise areas */
  core?: string[];
  /** Expertise description */
  description: string;
  /** Optional keywords for search or filtering */
  keywords: string[];
};

/**
 * One professional experience entry.
 */
export type PortfolioExperienceItem = {
  /** Employer or project name */
  company: string;
  /** Role or job title */
  role: string;
  /** Start date or month/year */
  start: string;
  /** End date or 'Present' */
  end: string;
  /** Optional location */
  location?: string;
  /** Optional free-form description */
  description?: string;
  /** Notable achievements or responsibilities */
  highlights: string[];
};

/**
 * Education entry.
 */
export type PortfolioEducationItem = {
  institution: string;
  program: string;
  years: string;
  notes?: string;
};

/**
 * Language proficiency entry.
 */
export type PortfolioLanguageItem = {
  language: string;
  level: string;
};

/**
 * Detailed technical expertise grouped by area.
 */
export type PortfolioTechnical = {
  /** Programming languages, frameworks and libraries */
  programming: string[];
  /** Operating systems */
  operatingSystems: string[];
  /** Servers, services and monitoring tools */
  serversAndServices: string[];
  /** Database technologies */
  databases: string[];
  /** Platforms and tooling */
  platformsAndTools: string[];
  /** Virtualization platforms */
  virtualization: string[];
  /** Networking and security topics */
  networkingAndSecurity: string[];
  /** Backup and recovery tools/strategies */
  backupAndRecovery: string[];
  /** Cloud platforms or migration experience */
  cloud: string[];
  /** Automation tooling and scripts */
  automation: string[];
  /** Miscellaneous useful knowledge */
  other: string[];
};

export type PortfolioBasic = {
  /** Full name */
  name: string;
  /** Professional title */
  title: string;
  /** Optional label or tagline */
  label?: string;
  /** Human-readable location */
  location: string;
  /** Contact details */
  contact: PortfolioContact;
  /** Short professional summary */
  summary: string;
  /** Optional profile / personality note */
  profile?: string;
  /** Detailed technical expertise */
  technical: PortfolioTechnical;
  /** Expertise information */
  expertise: PortfolioExpertise[];
};

export type PortfolioProjectItem = {
  /** Project name */
  name: string;
  /** Optional project description */
  description?: string;
  /** Technologies used in the project */
  technologies: string[];
  /** Link to project's demo */
  demo: string;
  /** Link to project's source code */
  github: string;
  /** Optional free-form notes about the project */
  otherLinks?: { label: string; url: string }[];
};

/**
 * Complete portfolio data model used across the site.
 */
export type Portfolio = {
  /** Basic personal and professional information */
  basic: PortfolioBasic;
  /** Chronological professional experiences */
  professionalExperience: PortfolioExperienceItem[];
  /** Open source projects */
  openSourceProjects: PortfolioProjectItem[];
  /** Education history */
  education: PortfolioEducationItem[];
  /** Languages and proficiency */
  languages: PortfolioLanguageItem[];
  /** Certifications and training */
  certifications: string[];
  /** Any additional free-form information */
  additionalInformation?: string;
};
