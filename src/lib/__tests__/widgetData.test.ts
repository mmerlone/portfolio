import {
  getGitHubRepoStatsWidgetData,
  getQuoteWidgetData,
  getWeatherWidgetData,
} from "@/lib/widgetData";
import { errorQuote } from "@/lib/api";
import {
  type QuoteInterface,
  type RepoStats,
  type WeatherResponse,
} from "@/types/api";

jest.mock("@/app/actions/getQuote", () => ({
  getQuote: jest.fn(),
}));

jest.mock("@/app/actions/getWeather", () => ({
  getWeather: jest.fn(),
}));

jest.mock("@/app/actions/getGitHubRepoStats", () => ({
  getGitHubRepoStats: jest.fn(),
}));

import { getQuote } from "@/lib/actions/getQuote";
import { getWeather } from "@/lib/actions/getWeather";
import { getGitHubRepoStats } from "@/lib/actions/getGitHubRepoStats";

const mockedGetQuote = jest.mocked(getQuote);
const mockedGetWeather = jest.mocked(getWeather);
const mockedGetGitHubRepoStats = jest.mocked(getGitHubRepoStats);

describe("widgetData", () => {
  beforeEach((): void => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2026-03-26T12:00:00.000Z"));
  });

  afterEach((): void => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it("returns fetched quotes when quote loading succeeds", async (): Promise<void> => {
    const quotes: QuoteInterface[] = [
      {
        q: "Stay hungry, stay foolish.",
        a: "Steve Jobs",
        h: "",
        s: {
          anchor: "Example Source",
        },
      },
    ];

    mockedGetQuote.mockResolvedValue(quotes);

    await expect(getQuoteWidgetData()).resolves.toEqual(quotes);
  });

  it("returns an error quote when the quote list is empty", async (): Promise<void> => {
    mockedGetQuote.mockResolvedValue([]);

    await expect(getQuoteWidgetData()).resolves.toEqual([errorQuote(404)]);
  });

  it("formats successful weather payloads for the widget", async (): Promise<void> => {
    const weather: WeatherResponse = {
      main: {
        temp: 23.4,
      },
      weather: [
        {
          description: "clear sky",
          icon: "01d",
          main: "Clear",
        },
      ],
    };

    mockedGetWeather.mockResolvedValue(weather);

    await expect(getWeatherWidgetData("Araucaria")).resolves.toEqual({
      city: "Araucaria",
      data: weather,
      dateLabel: "Thursday, March 26, 2026",
      isError: false,
    });
  });

  it("returns a safe weather fallback on weather errors", async (): Promise<void> => {
    mockedGetWeather.mockRejectedValue(new Error("boom"));

    await expect(getWeatherWidgetData("Araucaria")).resolves.toEqual({
      city: "Araucaria",
      data: null,
      dateLabel: "Thursday, March 26, 2026",
      isError: true,
    });
  });

  it("returns repository stats when the GitHub request succeeds", async (): Promise<void> => {
    const repoStats: RepoStats = {
      stargazers_count: 10,
      forks_count: 2,
      watchers_count: 3,
      html_url: "https://github.com/mmerlone/portfolio",
    };

    mockedGetGitHubRepoStats.mockResolvedValue(repoStats);

    await expect(
      getGitHubRepoStatsWidgetData("https://github.com/mmerlone/portfolio"),
    ).resolves.toEqual({
      stats: repoStats,
      errorMessage: null,
    });
  });

  it("returns a safe error message when the GitHub request fails", async (): Promise<void> => {
    mockedGetGitHubRepoStats.mockRejectedValue(new Error("rate limited"));

    await expect(
      getGitHubRepoStatsWidgetData("https://github.com/mmerlone/portfolio"),
    ).resolves.toEqual({
      stats: null,
      errorMessage: "rate limited",
    });
  });
});
