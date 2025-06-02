import { useQuery } from "@tanstack/react-query";
import { WeatherResponse } from "@/types/api";

export function useWeather(city: string) {
  const { data, isLoading, isError, error } = useQuery<WeatherResponse | null, Error>({
    queryKey: ["weather", city],
    queryFn: async () => {
      const res = await fetch(`/api/weather?city=${city}`);
      if (!res.ok) {
        throw new Error("Failed to fetch weather data");
      }
      // The response might be null if the API key is not configured server-side
      // Need to check content-type or res.text() before res.json() if null is not valid JSON
      // However, NextResponse.json(null) should produce valid 'null' JSON.
      const responseData = await res.json();
      return responseData;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // isEnabled is true if data is present (not null) and there's no error
  const isEnabled = !!data && !isError;

  return {
    data: data ?? null, // Ensure it's null if undefined (though useQuery should give null for no data with this setup)
    isLoading,
    isError, // Directly use isError from useQuery
    isEnabled,
  };
}
