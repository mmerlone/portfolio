"use client";

import { useState, useEffect, useCallback } from "react";

function getValueFromLocalStorage<T extends string>(
  key: string,
  initialValue: T,
  isValid: (value: string) => value is T,
): T {
  if (typeof window === "undefined") {
    return initialValue;
  }

  const item = window.localStorage.getItem(key);
  if (item === null) {
    return initialValue;
  }

  return isValid(item) ? item : initialValue;
}

export function useLocalStorage<T extends string>(
  key: string,
  initialValue: T,
  isValid: (value: string) => value is T,
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    return getValueFromLocalStorage(key, initialValue, isValid);
  });

  useEffect(() => {
    setStoredValue(getValueFromLocalStorage(key, initialValue, isValid));
  }, [initialValue, isValid, key]);

  const setValue = useCallback(
    (value: T | ((val: T) => T)): void => {
      setStoredValue((prevStoredValue) => {
        const valueToStore =
          value instanceof Function ? value(prevStoredValue) : value;
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, valueToStore);
        }
        return valueToStore;
      });
    },
    [key],
  );

  return [storedValue, setValue];
}
