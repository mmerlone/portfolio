"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import {
  EffectsEnum,
  EFFECTS_KEY,
  ConfigEffectsContextType,
} from "@/types/effects";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const defaultContextValue: ConfigEffectsContextType = {
  effect: EffectsEnum.EXPERIMENTAL,
  setEffect: (_effect: EffectsEnum) => {},
  isMounted: false,
};

const ConfigEffectsContext = createContext<
  ConfigEffectsContextType | undefined
>(defaultContextValue);

export const ConfigEffectsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [storedEffect, setStoredEffect] = useLocalStorage<EffectsEnum>(
    EFFECTS_KEY,
    EffectsEnum.EXPERIMENTAL,
  );
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const currentEffect = Object.values(EffectsEnum).includes(
    storedEffect as EffectsEnum,
  )
    ? storedEffect
    : EffectsEnum.EXPERIMENTAL;

  const setEffectValue = (newEffect: EffectsEnum) => {
    if (Object.values(EffectsEnum).includes(newEffect as EffectsEnum)) {
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
