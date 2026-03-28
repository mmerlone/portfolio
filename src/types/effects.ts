export enum EffectsEnum {
  OFF = "off",
  // HOT = "hot",
  EXPERIMENTAL = "experimental",
}

export type EffectsType = `${EffectsEnum}`;

// Key for localStorage
export const EFFECTS_KEY = "effects-preference";

export interface ConfigEffectsContextType {
  effect: EffectsEnum;
  setEffect: (effect: EffectsEnum) => void;
  isMounted: boolean;
}
