import { siteConfig } from "@/config/site";
import { QuoteResponse, WeatherResponse } from "@/types/api";

export async function fetchQuote(): Promise<QuoteResponse[]> {
  const response = await fetch("https://zenquotes.io/api/random");
  if (!response.ok) {
    return [
      {
        q: `Unable fetching quote, status: ${response.status}`,
        a: "TanStack Query",
        h: "",
      },
    ];
  }
  return response.json();
}

export async function fetchWeather(): Promise<WeatherResponse> {
  const WEATHER_API_KEY = process.env.WEATHER_API_KEY as string;
  const city = siteConfig.city;
  if (!city) {
    throw new Error("City is not defined in the config");
  }
  if (!WEATHER_API_KEY) {
    throw new Error("Weather API key is not defined");
  }
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
  );
  if (!response.ok) {
    console.log("Error fetching weather data:", response.statusText);
    throw new Error("Failed to fetch weather data");
  }
  return response.json();
}
