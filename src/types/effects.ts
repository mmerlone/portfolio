export enum EffectsEnum {
  OFF = "off",
  // HOT = "hot",
  EXPERIMENTAL = "experimental",
}

export type EffectsType = `${EffectsEnum}`;

export enum BackgroundEffectsEnum {
  HERO = "hero",
  AURORA = "aurora",
  SERVICES = "services",
  PATHS = "paths",
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
