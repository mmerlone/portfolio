import { useState, useEffect } from "react";
import { WeatherResponse } from "@/types/api";

function isErrorWithName(error: unknown): error is { name: string } {
  return typeof error === "object" && error !== null && "name" in error;
}

export const useWeather = (city?: string | null) => {
  const [data, setData] = useState<WeatherResponse | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(city));
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchWeather = async () => {
      if (!city) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setIsError(false);
        const res = await fetch(`/api/weather?city=${city}`, {
          signal: abortController.signal,
        });
        if (!res.ok) {
          setIsError(true);
          return;
        }
        const weatherData = await res.json();
        setData(weatherData);
      } catch (err: unknown) {
        if (isErrorWithName(err) && err.name === "AbortError") {
          return; // Request was cancelled
        }
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();

    return () => {
      abortController.abort();
    };
  }, [city]);

  return { data, isLoading, isError };
};
