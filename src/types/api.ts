export interface QuoteResponse {
  q: string; // quote text
  a: string; // author
  h: string; // pre-formatted HTML quote
}

export interface WeatherResponse {
  main: {
    temp: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
}

export type ApiQuoteData = {
  data: QuoteResponse;
  isLoading: boolean;
  isError: boolean;
  refetch: () => Promise<void>;
};

export type ApiWeatherData = {
  data: WeatherResponse | null;
  isLoading: boolean;
  isError: boolean;
};

export type QuoteCache = {
  data: QuoteResponse[];
  timestamp: number;
};

export interface RepoStats {
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  html_url: string;
}
