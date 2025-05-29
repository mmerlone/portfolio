export interface Contribution {
  title: string;
  company: string;
  period?: string;
  challenge: string;
  action: string[]; // Array of actions taken
  result: string[]; // Array of results achieved
  technologies: string[];
}
