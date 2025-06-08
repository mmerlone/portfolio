export enum ThemeEnum {
  LIGHT = "light",
  SYSTEM = "system",
  DARK = "dark",
}

export type ThemeType = `${ThemeEnum}`;
export const themes: ThemeType[] = Object.values(ThemeEnum);
