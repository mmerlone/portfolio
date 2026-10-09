import type { SkillReference } from "@/types/skills";

/**
 * Contact information for a portfolio owner.
 */
interface PortfolioContact {
  /** Primary email address */
  readonly email: string;
  /** Optional LinkedIn profile URL */
  readonly linkedin?: string;
  /** Optional personal website URL */
  readonly website?: string;
}

/**
 * One professional experience entry.
 */
export interface PortfolioExperienceItem {
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
  readonly technologies?: readonly SkillReference[];
  /** Optional image URL for the company or project logo in the assets folder */
  readonly logo?: string;
}

/**
 * Education entry.
 */
export interface PortfolioEducationItem {
  /** Name of the educational institution */
  readonly institution: string;
  /** Name of the program, degree, or course */
  readonly program: string;
  /** Period of study or year of completion */
  readonly years: string;
  /** Optional additional notes or highlights */
  readonly notes?: string;
}

/**
 * Language proficiency entry.
 */
export interface PortfolioLanguageItem {
  /** The language name */
  readonly language: string;
  /** Proficiency level (e.g., "Native", "Fluent", "Conversational") */
  readonly level: string;
}

/**
 * Basic personal and professional information.
 */
export interface PortfolioBasic {
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
  /** Optional relative link to resume */
  readonly resume?: string;
  /** Social media links */
  readonly social?: PortfolioSocialLink[];
  /**Role titles */
  readonly roleTitles: string[];
}

export interface PortfolioHeroImage {
  readonly src: string;
  readonly alt: string;
  readonly width?: number;
  readonly height?: number;
  readonly sizes?: string;
}

/**
 * Open source or personal project entry owned by Marcio Merlone.
 */
export interface PortfolioProjectItem {
  /** Discriminant kind for the work-item union. */
  readonly kind: "owned";
  /** Stable route segment for the case study page. */
  readonly slug: string;
  /** Project name */
  readonly name: string;
  /** Optional project description */
  readonly description?: string;
  /** Technologies used in the project */
  readonly technologies: readonly SkillReference[];
  /** Link to project's demo */
  readonly demo: string;
  /** Link to project's source code */
  readonly github: string;
  /** Optional npm registry URL for published packages */
  readonly npm?: string;
  /** Optional free-form notes about the project */
  readonly otherLinks?: { label: string; url: string }[];
  /** Optional image URL for the project in the assets folder */
  readonly image?: string;
  /** Optional hero image for the case study page. */
  readonly heroImage?: PortfolioHeroImage;
  /** Marcio's personal role in the project */
  readonly role?: string;
  /** Problem or context the project addresses */
  readonly context?: string;
  /** Constraints faced while building the project */
  readonly constraints?: readonly string[];
  /** Key decisions made while building the project */
  readonly decisions?: readonly string[];
  /** Trade-offs accepted while building the project */
  readonly tradeoffs?: readonly string[];
  /** Outcome or result of the project */
  readonly outcome?: string;
}

/**
 * External published article bylined by Marcio Merlone and hosted by a
 * third-party publisher. Content is linked, never hosted or duplicated here.
 */
export interface PortfolioExternalArticle {
  /** Discriminant kind for the work-item union. */
  readonly kind: "external";
  /** Stable route segment for the case study page. */
  readonly slug: string;
  /** Human-readable title of the published article */
  readonly name: string;
  /** Publisher of the externally hosted article */
  readonly publisher: string;
  /** URL of the published article (external link only) */
  readonly articleUrl: string;
  /** Bylined author name */
  readonly author: string;
  /** URL of the author's profile on the publisher's site */
  readonly authorProfileUrl: string;
  /** Optional short factual summary of the article */
  readonly description?: string;
  /** Approved personal-role wording for the published work */
  readonly role?: string;
  /** Technologies or topics covered by the article */
  readonly technologies?: readonly SkillReference[];
  /** Optional image URL for the article in the assets folder */
  readonly image?: string;
  /** Optional hero image for the case study page. */
  readonly heroImage?: PortfolioHeroImage;
}

/**
 * Discriminated union of owned projects and external articles.
 */
export type PortfolioWorkItem = PortfolioProjectItem | PortfolioExternalArticle;

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
  readonly technologies: readonly SkillReference[];
}

/**
 * A career-path stage summarizing a period of professional focus.
 */
export interface PortfolioPathStage {
  /** Name of the stage */
  readonly title: string;
  /** Period the stage covers */
  readonly period: string;
  /** Detailed description of the stage */
  readonly description: string;
  /** Notable achievements or responsibilities during the stage */
  readonly highlights: string[];
  /** Technologies or tools used during the stage */
  readonly technologies: readonly SkillReference[];
}

/**
 * Complete portfolio data model used across the site.
 */
export interface Portfolio {
  /** Basic personal and professional information */
  readonly basic: PortfolioBasic;
  /** Chronological professional experiences */
  readonly professionalExperience: PortfolioExperienceItem[];
  /** Selected professional challenges and contributions */
  readonly challenges?: PortfolioChallenge[];
  /** Selected owned projects and external articles */
  readonly openSourceProjects: PortfolioWorkItem[];
  /** Education history */
  readonly education: PortfolioEducationItem[];
  /** Languages and proficiency */
  readonly languages: PortfolioLanguageItem[];
  /** Certifications and training */
  readonly certifications: string[];
  /** Any additional free-form information */
  readonly additionalInformation?: string;
}
