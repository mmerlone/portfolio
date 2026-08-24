export interface RepoStats {
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  html_url: string;
}

export interface GitHubRepoStatsWidgetData {
  stats: RepoStats | null;
  errorMessage: string | null;
}
