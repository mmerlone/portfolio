"use server";

import { apiConfig } from "@/config/api";
import { parseWeatherResponse } from "@/lib/apiParsers";
import { type WeatherResponse } from "@/types/api";

/**
 * Server action to fetch weather data from OpenWeatherMap API.
 * This replaces the deprecated /api/weather endpoint.
 */
export async function getWeather(
  city: string,
): Promise<WeatherResponse | null> {
  if (!city) {
    throw new Error("City is not defined");
  }

  if (!apiConfig.openWeather.apiKey) {
    return null;
  }

  const url = `${apiConfig.openWeather.url}?q=${encodeURIComponent(city)}&appid=${apiConfig.openWeather.apiKey}&units=metric`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 600 }, // Cache for 10 minutes
    });

    if (!response.ok) {
      return null;
    }

    const payload: unknown = await response.json();
    return parseWeatherResponse(payload);
  } catch {
    return null;
  }
}
