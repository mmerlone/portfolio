export enum ThemeEnum {
  LIGHT = "light",
  SYSTEM = "system",
  DARK = "dark",
}

export type Theme = `${ThemeEnum}`;
export const themes: Theme[] = Object.values(ThemeEnum);
