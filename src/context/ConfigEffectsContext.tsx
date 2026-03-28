"use client";

import {
  createContext,
  type ReactElement,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  EffectsEnum,
  EFFECTS_KEY,
  type ConfigEffectsContextType,
} from "@/types/effects";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const ConfigEffectsContext = createContext<
  ConfigEffectsContextType | undefined
>(undefined);

function isEffectsEnum(value: string): value is EffectsEnum {
  return Object.values(EffectsEnum).includes(value as EffectsEnum);
}

export const ConfigEffectsProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const [storedEffect, setStoredEffect] = useLocalStorage<EffectsEnum>(
    EFFECTS_KEY,
    EffectsEnum.EXPERIMENTAL,
    isEffectsEnum,
  );
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const isValidEffect = (effect: unknown): effect is EffectsEnum => {
    return Object.values(EffectsEnum).includes(effect as EffectsEnum);
  };

  const currentEffect = isValidEffect(storedEffect)
    ? storedEffect
    : EffectsEnum.EXPERIMENTAL;

  const setEffectValue = (newEffect: EffectsEnum): void => {
    if (isValidEffect(newEffect)) {
      setStoredEffect(newEffect);
    } else {
      setStoredEffect(EffectsEnum.EXPERIMENTAL);
    }
  };

  const contextValue = {
    // On server, isMounted is false, so effect is EXPERIMENTAL (from defaultContextValue).
    // On client after mount, isMounted is true, so effect is currentEffect (from localStorage or EXPERIMENTAL).
    effect: isMounted ? currentEffect : EffectsEnum.EXPERIMENTAL,
    setEffect: setEffectValue,
    isMounted: isMounted,
  };

  return (
    <ConfigEffectsContext.Provider value={contextValue}>
      {children}
    </ConfigEffectsContext.Provider>
  );
};

export const useConfigEffects = (): ConfigEffectsContextType => {
  const context = useContext(ConfigEffectsContext);
  if (context === undefined) {
    throw new Error(
      "useConfigEffects must be used within a ConfigEffectsProvider",
    );
  }
  return context;
};
