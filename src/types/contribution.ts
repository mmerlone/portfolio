export interface Contribution {
  title: string;
  company: string;
  period?: string; // Optional, as some might span entire roles
  description: string[]; // Array of bullet points detailing the contribution
  technologies: string[]; // Array of key technologies used
}
