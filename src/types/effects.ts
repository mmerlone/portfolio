export enum EffectsEnum {
  OFF = "off",
  // HOT = "hot",
  EXPERIMENTAL = "experimental",
}

export type EffectsType = `${EffectsEnum}`;

export enum BackgroundEffectsEnum {
  AURORA = "aurora",
  PATHS = "paths",
  HERO = "hero",
  STATIC_COLOR = "static-color",
  FOOTER = "footer",
  EXPERIENCE = "experience",
}

export type BackgroundEffectsType = `${BackgroundEffectsEnum}`;

// Key for localStorage
export const EFFECTS_KEY = "effects-preference";

export interface ConfigEffectsContextType {
  effect: EffectsEnum;
  setEffect: (effect: EffectsEnum) => void;
  isMounted: boolean;
}
