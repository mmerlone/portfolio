import { getGitHubRepoStatsWidgetData } from "@/lib/widgetData";
import type { RepoStats } from "@/types/api";

jest.mock("@/lib/actions/getGitHubRepoStats", () => ({
  getGitHubRepoStats: jest.fn(),
}));

import { getGitHubRepoStats } from "@/lib/actions/getGitHubRepoStats";

const mockedGetGitHubRepoStats = jest.mocked(getGitHubRepoStats);

describe("widgetData", () => {
  afterEach((): void => {
    jest.clearAllMocks();
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
