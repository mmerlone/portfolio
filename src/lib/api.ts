import { apiConfig } from "@/config/api";
import { QuoteResponse, WeatherResponse } from "@/types/api";

export const errorQuote = (status: number) => ({
  q: `Unable to fetch a quote, status: ${status}`,
  a: "TanStack Query",
  h: "",
});

export async function fetchQuote(): Promise<QuoteResponse[]> {
  const response = await fetch("/api/quote");
  if (!response.ok) {
    return [errorQuote(response.status)];
  }
  return response.json();
}

export async function fetchWeather(): Promise<WeatherResponse> {
  // Check if the API key is defined
  const WEATHER_API_KEY = process.env.WEATHER_API_KEY as string;
  if (!WEATHER_API_KEY) {
    // eslint-disable-next-line no-console
    console.error("WEATHER_API_KEY is not defined");
    throw new Error("Weather API key is not defined");
  }
  const city = apiConfig.openWeather?.city;
  if (!city) {
    // eslint-disable-next-line no-console
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
      // eslint-disable-next-line no-console
      console.error(
        "Error fetching weather data:",
        response.status,
        response.statusText
      );
      throw new Error(`Failed to fetch weather data: ${response.statusText}`);
    }
    const data: WeatherResponse = await response.json();
    // eslint-disable-next-line no-console
    console.log("Fetched weather data:", data);
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("fetchWeather encountered an error:", error);
    throw error;
  }
}

export const fetchData = async <T>(url: string): Promise<T> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to fetch data: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
