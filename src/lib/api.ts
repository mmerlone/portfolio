import { apiConfig } from "@/config/api";
import { QuoteResponse, WeatherResponse } from "@/types/api";

export async function fetchQuote(): Promise<QuoteResponse[]> {
  const response = await fetch("/api/quote");
  if (!response.ok) {
    return [
      {
        q: `Unable to fetch a quote, status: ${response.status}`,
        a: "TanStack Query",
        h: "",
      },
    ];
  }
  return response.json();
}

export async function fetchWeather(): Promise<WeatherResponse> {
  // Check if the API key is defined
  const WEATHER_API_KEY = process.env.WEATHER_API_KEY as string;
  if (!WEATHER_API_KEY) {
    console.error("WEATHER_API_KEY is not defined");
    throw new Error("Weather API key is not defined");
  }
  const city = apiConfig.city;
  if (!city) {
    console.error("City is not defined in the config");
    throw new Error("City is not defined in the config");
  }

  // Construct URL ensuring proper encoding and correct parameters
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${WEATHER_API_KEY}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(
        "Error fetching weather data:",
        response.status,
        response.statusText
      );
      throw new Error(`Failed to fetch weather data: ${response.statusText}`);
    }
    const data: WeatherResponse = await response.json();
    console.log("Fetched weather data:", data);
    return data;
  } catch (error) {
    console.error("fetchWeather encountered an error:", error);
    throw error;
  }
}
