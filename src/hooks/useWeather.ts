import { useQuery } from "@tanstack/react-query";
import { WeatherResponse } from "@/types/api";
import { siteConfig } from "@/config/site";

export function useWeather() {
  const isEnabled = !!siteConfig.weather.apiKey;

  const { data, isLoading, error } = useQuery<WeatherResponse, Error>({
    queryKey: ["weather"],
    queryFn: async () => {
      // if (!isEnabled) {
      //   throw new Error("Weather functionality is not configured");
      // }

      const res = await fetch("/api/weather");
      if (!res.ok) {
        throw new Error("Failed to fetch weather data");
      }
      return res.json();
    },
    enabled: isEnabled,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    data: data ?? null,
    isLoading,
    isError: !!error,
    isEnabled,
  };
}
