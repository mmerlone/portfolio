import { portfolio } from "@/data/portfolio";

export function getSeoKeywords(): string[] {
  const { expertise, technical } = portfolio.basic;

  return [
    ...new Set([
      ...expertise.flatMap(({ name, keywords }) => [name, ...keywords]),
      ...technical.programming,
      ...technical.operatingSystems,
      ...technical.hardware,
      ...technical.serversAndServices,
      ...technical.databases,
      ...technical.platformsAndTools,
      ...technical.virtualization,
      ...technical.networkingAndSecurity,
      ...technical.backupAndRecovery,
      ...technical.cloud,
      ...technical.automation,
      ...technical.other,
    ]),
  ];
}
