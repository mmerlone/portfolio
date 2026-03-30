import type { QuoteResponse, RepoStats, WeatherCondition, WeatherResponse } from "@/types/api";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isWeatherCondition(value: unknown): value is WeatherCondition {
  return (
    value === "Clear" ||
    value === "Clouds" ||
    value === "Rain" ||
    value === "Thunderstorm" ||
    value === "Snow" ||
    value === "Drizzle"
  );
}

export function readErrorMessage(payload: unknown): string | null {
  if (!isRecord(payload) || typeof payload.message !== "string") {
    return null;
  }

  return payload.message;
}

export function parseQuoteResponses(payload: unknown): QuoteResponse[] {
  if (!Array.isArray(payload)) {
    return [];
  }

  return payload.flatMap((item): QuoteResponse[] => {
    if (
      isRecord(item) &&
      typeof item.q === "string" &&
      typeof item.a === "string" &&
      typeof item.h === "string"
    ) {
      return [
        {
          q: item.q,
          a: item.a,
          h: item.h,
        },
      ];
    }

    return [];
  });
}

export function parseWeatherResponse(payload: unknown): WeatherResponse {
  if (!isRecord(payload) || !isRecord(payload.main) || !Array.isArray(payload.weather)) {
    throw new Error("Invalid weather response");
  }

  const weatherEntries: unknown[] = payload.weather;
  const firstWeather = weatherEntries[0];
  if (
    typeof payload.main.temp !== "number" ||
    !isRecord(firstWeather) ||
    typeof firstWeather.description !== "string" ||
    typeof firstWeather.icon !== "string" ||
    !isWeatherCondition(firstWeather.main)
  ) {
    throw new Error("Invalid weather response");
  }

  return {
    main: {
      temp: payload.main.temp,
    },
    weather: [
      {
        description: firstWeather.description,
        icon: firstWeather.icon,
        main: firstWeather.main,
      },
    ],
  };
}

export function parseRepoStats(payload: unknown): RepoStats {
  if (
    !isRecord(payload) ||
    typeof payload.stargazers_count !== "number" ||
    typeof payload.forks_count !== "number" ||
    typeof payload.watchers_count !== "number" ||
    typeof payload.html_url !== "string"
  ) {
    throw new Error("Invalid GitHub repository response");
  }

  return {
    stargazers_count: payload.stargazers_count,
    forks_count: payload.forks_count,
    watchers_count: payload.watchers_count,
    html_url: payload.html_url,
  };
}
