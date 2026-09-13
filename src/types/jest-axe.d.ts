declare module "jest-axe" {
  export interface AxeNode {
    target: string[];
    html: string;
    failureSummary: string | null;
  }

  export interface AxeViolation {
    id: string;
    impact: string;
    help: string;
    helpUrl: string;
    nodes: AxeNode[];
  }

  export interface AxeResults {
    violations: AxeViolation[];
    passes: unknown[];
    incomplete: unknown[];
    inapplicable: unknown[];
    toolOptions?: Record<string, unknown>;
  }

  export type AxeRunOptions = Record<string, unknown>;

  export function axe(
    element: Element | string,
    options?: AxeRunOptions,
  ): Promise<AxeResults>;

  export function configureAxe(
    options?: Record<string, unknown>,
  ): (
    element: Element | string,
    options?: AxeRunOptions,
  ) => Promise<AxeResults>;

  export const toHaveNoViolations: jest.ExpectExtendMap;
}
