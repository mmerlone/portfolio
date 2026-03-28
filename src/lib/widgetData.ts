import { getGitHubRepoStats } from "@/app/actions/getGitHubRepoStats";
import { getQuote } from "@/app/actions/getQuote";
import { getWeather } from "@/app/actions/getWeather";
import { errorQuote } from "@/lib/api";
import {
  type GitHubRepoStatsWidgetData,
  type QuoteInterface,
  type WeatherWidgetData,
} from "@/types/api";

export async function getQuoteWidgetData(): Promise<QuoteInterface[]> {
  try {
    const quotes = await getQuote();

    if (quotes.length === 0) {
      return [errorQuote(404)];
    }

    return quotes;
  } catch {
    return [errorQuote(500)];
  }
}

export async function getWeatherWidgetData(
  city: string,
): Promise<WeatherWidgetData> {
  const dateLabel = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());

  try {
    const data = await getWeather(city);

    return {
      city,
      data,
      dateLabel,
      isError: false,
    };
  } catch {
    return {
      city,
      data: null,
      dateLabel,
      isError: true,
    };
  }
}

export async function getGitHubRepoStatsWidgetData(
  repoUrl: string,
): Promise<GitHubRepoStatsWidgetData> {
  try {
    return {
      stats: await getGitHubRepoStats(repoUrl),
      errorMessage: null,
    };
  } catch (error) {
    return {
      stats: null,
      errorMessage:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
