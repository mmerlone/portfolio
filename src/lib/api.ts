import { apiConfig } from "@/config/api";
import { parseQuoteResponses, parseWeatherResponse } from "@/lib/apiParsers";
import { type QuoteResponse, type WeatherResponse, type QuoteInterface } from "@/types/api";

export const errorQuote = (status?: number): QuoteInterface => ({
  q: `Error ${status ?? "unknown"}: Failed to fetch quote.`,
  a: "System",
  h: `<blockquote>&ldquo;Error ${status}: Failed to fetch quote.&rdquo; &mdash; <footer>System</footer></blockquote>`,
  s: {
    anchor: "some bug",
  },
});

export async function fetchQuote(): Promise<QuoteResponse[] | QuoteInterface[]> {
  const response = await fetch("/api/quote");
  if (!response.ok) {
    return [errorQuote(response.status)];
  }

  const payload: unknown = await response.json();
  return parseQuoteResponses(payload);
}

export async function fetchWeather(): Promise<WeatherResponse> {
  const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
  if (!WEATHER_API_KEY) {
    throw new Error("Weather API key is not defined");
  }
  const city = apiConfig.openWeather?.city;
  if (!city) {
    throw new Error("City is not defined in the config");
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${WEATHER_API_KEY}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch weather data: ${response.statusText}`);
    }

    const payload: unknown = await response.json();
    return parseWeatherResponse(payload);
  } catch (error) {
    throw new Error("Failed to fetch weather data", { cause: error });
  }
}

export async function fetchData<T>(
  url: string,
  validate: (payload: unknown) => T,
): Promise<T> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const payload: unknown = await response.json();
    return validate(payload);
  } catch (error) {
    throw new Error(
      `Failed to fetch data: ${error instanceof Error ? error.message : "Unknown error"}`,
      { cause: error },
    );
  }
}
