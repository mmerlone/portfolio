import { useQuery } from "@tanstack/react-query";
import { WeatherResponse } from "@/types/api";

const fetchWeather = async (city: string): Promise<WeatherResponse> => {
  const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
  if (!res.ok) {
    throw new Error("Failed to fetch weather data");
  }
  return res.json();
};

export const useWeather = (city?: string | null) => {
  return useQuery<WeatherResponse, Error>({
    queryKey: ["weather", city],
    queryFn: () => {
      if (!city) {
        return Promise.reject(new Error("City is not provided"));
      }
      return fetchWeather(city);
    },
    enabled: !!city,
    retry: 1,
  });
};
