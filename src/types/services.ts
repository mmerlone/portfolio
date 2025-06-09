export interface Service {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon?: string;
}

export interface ServicesConfig {
  readonly title: string;
  readonly subtitle?: string;
  readonly services: readonly Service[];
} 