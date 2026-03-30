/**
 * Contact information for a portfolio owner.
 */
export type PortfolioContact = {
  /** Primary email address */
  readonly email: string;
  /** Optional LinkedIn profile URL */
  readonly linkedin?: string;
  /** Optional personal website URL */
  readonly website?: string;
};

/**
 * High level expertise summary.
 */
export type PortfolioExpertise = {
  /** Name of the expertise area */
  readonly name: string;
  /** Short list of core expertise areas */
  readonly core?: string[];
  /** Expertise description */
  readonly description: string;
  /** Optional keywords for search or filtering */
  readonly keywords: string[];
};

/**
 * One professional experience entry.
 */
export type PortfolioExperienceItem = {
  /** Employer or project name */
  readonly company: string;
  /** Role or job title */
  readonly role: string;
  /** Start date or month/year */
  readonly start: string;
  /** End date or 'Present' */
  readonly end: string;
  /** Optional location */
  readonly location?: string;
  /** Optional free-form description */
  readonly description?: string;
  /** Notable achievements or responsibilities */
  readonly highlights: string[];
  /** Technologies used in the project */
  readonly technologies?: string[];
  /** Optional image URL for the company or project logo in the assets folder */
  readonly logo?: string;
};

/**
 * Education entry.
 */
export type PortfolioEducationItem = {
  /** Name of the educational institution */
  readonly institution: string;
  /** Name of the program, degree, or course */
  readonly program: string;
  /** Period of study or year of completion */
  readonly years: string;
  /** Optional additional notes or highlights */
  readonly notes?: string;
};

/**
 * Language proficiency entry.
 */
export type PortfolioLanguageItem = {
  /** The language name */
  readonly language: string;
  /** Proficiency level (e.g., "Native", "Fluent", "Conversational") */
  readonly level: string;
};

/**
 * Detailed technical expertise grouped by area.
 */
export type PortfolioTechnical = {
  /** Programming languages, frameworks and libraries */
  readonly programming: string[];
  /** Operating systems */
  readonly operatingSystems: string[];
  /** Hardware */
  readonly hardware: string[];
  /** Servers, services and monitoring tools */
  readonly serversAndServices: string[];
  /** Database technologies */
  readonly databases: string[];
  /** Platforms and tooling */
  readonly platformsAndTools: string[];
  /** Virtualization platforms */
  readonly virtualization: string[];
  /** Networking and security topics */
  readonly networkingAndSecurity: string[];
  /** Backup and recovery tools/strategies */
  readonly backupAndRecovery: string[];
  /** Cloud platforms or migration experience */
  readonly cloud: string[];
  /** Automation tooling and scripts */
  readonly automation: string[];
  /** Miscellaneous useful knowledge */
  readonly other: string[];
};

/**
 * Basic personal and professional information.
 */
export type PortfolioBasic = {
  /** Full name */
  readonly name: string;
  /** Professional title */
  readonly title: string;
  /** Optional label or tagline */
  readonly label?: string;
  /** Human-readable location */
  readonly location: string;
  /** Contact details */
  readonly contact: PortfolioContact;
  /** Short professional summary */
  readonly summary: string;
  /** Optional profile / personality note */
  readonly profile?: string;
  /** Detailed technical expertise */
  readonly technical: PortfolioTechnical;
  /** Expertise information */
  readonly expertise: PortfolioExpertise[];
  /** Optional relative link to resume */
  readonly resume?: string;
  /** Social media links */
  readonly social?: PortfolioSocialLink[];
};

/**
 * Open source or personal project entry.
 */
export type PortfolioProjectItem = {
  /** Project name */
  readonly name: string;
  /** Optional project description */
  readonly description?: string;
  /** Technologies used in the project */
  readonly technologies: string[];
  /** Link to project's demo */
  readonly demo: string;
  /** Link to project's source code */
  readonly github: string;
  /** Optional free-form notes about the project */
  readonly otherLinks?: { label: string; url: string }[];
  /** Optional image URL for the project in the assets folder */
  readonly image?: string;
};

/**
 * Social media or professional network link.
 */
export interface PortfolioSocialLink {
  /** Name of the platform */
  readonly name: string;
  /** Profile URL */
  readonly url: string;
  /** Optional icon identifier or URL */
  readonly icon?: string;
}

/**
 * A professional challenge, describing a problem, actions taken, and results.
 */
export interface PortfolioChallenge {
  /** Title of the challenge or problem */
  readonly title: string;
  /** Company where the challenge occurred */
  readonly company: string;
  /** Optional period when the project took place */
  readonly period?: string;
  /** Detailed description of the challenge */
  readonly challenge: string;
  /** List of actions taken to address the challenge */
  readonly action: string[];
  /** List of results or impact achieved */
  readonly result: string[];
  /** Technologies used during the resolution */
  readonly technologies: string[];
}

/**
 * Complete portfolio data model used across the site.
 */
export type Portfolio = {
  /** Basic personal and professional information */
  readonly basic: PortfolioBasic;
  /** Chronological professional experiences */
  readonly professionalExperience: PortfolioExperienceItem[];
  /** Selected professional challenges and contributions */
  readonly challenges?: PortfolioChallenge[];
  /** Open source projects */
  readonly openSourceProjects: PortfolioProjectItem[];
  /** Education history */
  readonly education: PortfolioEducationItem[];
  /** Languages and proficiency */
  readonly languages: PortfolioLanguageItem[];
  /** Certifications and training */
  readonly certifications: string[];
  /** Any additional free-form information */
  readonly additionalInformation?: string;
};
