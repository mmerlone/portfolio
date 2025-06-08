import { ApiConfig } from "@/types/api";

export const QUOTES_STALE_TIME = 15 * 60 * 1000; // 15 minutes

export const apiConfig: ApiConfig = {
  zenquotes: {
    url: "https://zenquotes.io/api/quotes",
  },
  openWeather: {
    url: "https://api.openweathermap.org/data/2.5/weather",
    // city: "Araucária, PR, Brazil",
    apiKey: process.env.WEATHER_API_KEY,
  },
};
