import { useQuery } from "@tanstack/react-query";
import { WeatherResponse } from "@/types/api";

export function useWeather() {
  const { data, isLoading, error } = useQuery<WeatherResponse, Error>({
    queryKey: ["weather"],
    queryFn: async () => {
      const res = await fetch("/api/weather");
      if (!res.ok) {
        throw new Error("Failed to fetch weather data");
      }
      return res.json();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // If the API returns { apiKey: null }, treat as disabled
  // Update this check to use a property that exists on WeatherResponse, e.g., data !== null
  const isEnabled = !!data && !error;

  return {
    data: data ?? null,
    isLoading,
    isError: !!error,
    isEnabled,
  };
}
