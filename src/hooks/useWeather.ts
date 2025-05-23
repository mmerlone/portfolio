import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "../lib/api";
import { ApiWeatherData, WeatherResponse } from "@/types/api";

export function useWeather(): ApiWeatherData {
  const { data, isLoading, error } = useQuery<WeatherResponse, Error>({
    queryKey: ["weather"],
    queryFn: fetchWeather,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    data: data ?? null,
    isLoading,
    isError: !!error,
  };
}
