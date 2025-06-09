export interface QuoteResponse {
  q: string; // quote text
  a: string; // author
  h: string; // pre-formatted HTML quote
}

export interface QuoteSource {
  anchor: string;
  href?: string;
  title?: string;
}

export interface QuoteInterface {
  q: string; // quote
  a: string; // author
  h: string; // preformatted HTML quote
  s: QuoteSource; // source
}

export interface UseQuoteOptions {
  enabled?: boolean;
}

export type WeatherCondition =
  | "Clear"
  | "Clouds"
  | "Rain"
  | "Thunderstorm"
  | "Snow"
  | "Drizzle";

export interface WeatherResponse {
  main: {
    temp: number;
  };
  weather: Array<{
    description: string;
    icon: string;
    main: WeatherCondition;
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

export interface ZenquotesConfig {
  url: string;
}

export interface OpenWeatherConfig {
  url: string;
  city?: string;
  apiKey?: string;
}

export interface ApiConfig {
  zenquotes: ZenquotesConfig;
  openWeather: OpenWeatherConfig;
}
