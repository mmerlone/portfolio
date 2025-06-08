import { useState, useEffect } from 'react';
import { WeatherResponse } from "@/types/api";

export const useWeather = (city?: string | null) => {
  const [data, setData] = useState<WeatherResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!city) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setIsError(false);
        const res = await fetch(`/api/weather?city=${city}`);
        if (!res.ok) {
          setIsError(true);
          return;
        }
        const weatherData = await res.json();
        setData(weatherData);
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return { data, isLoading, isError };
};
