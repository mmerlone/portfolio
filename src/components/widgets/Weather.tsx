import { use, type ReactElement } from "react";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import Image from "next/image";
import { type WeatherCondition, type WeatherWidgetData } from "@/types/api";
import Link from "next/link";

interface Weather {
  temp: number | null;
  description: string;
  icon: string;
  main: WeatherCondition;
}

const defaultWeather: Weather = {
  temp: null,
  description: "Unknown",
  icon: "01d",
  main: "Clear",
};

interface WeatherWidgetProps {
  weatherPromise: Promise<WeatherWidgetData>;
}

const WeatherWidget = ({
  weatherPromise,
}: WeatherWidgetProps): ReactElement => {
  const { city, data, dateLabel, isError } = use(weatherPromise);
  const weather =
    data?.weather[0] && typeof data.main.temp === "number"
      ? {
          temp: Math.round(data.main.temp),
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          main: data.weather[0].main,
        }
      : defaultWeather;

  return (
    <div className="z-30 mx-auto my-8 max-w-2xl rounded-lg bg-gray-200 p-6 shadow-lg dark:bg-gray-800">
      <div className="flex items-center space-x-4 rounded-lg bg-white p-4 dark:bg-gray-700">
        <Image
          src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt=""
          width={64}
          height={64}
          className="h-16 w-16"
          unoptimized
        />
        <div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {weather.temp ?? "..."}°C
          </div>
          <div className="text-gray-600 capitalize dark:text-gray-300">
            {weather.description}
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{city}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {dateLabel}
          </p>
        </div>
      </div>
      <p className="m-4 text-xs text-gray-500 dark:text-gray-400">
        {isError ? (
          <>Weather unavailable.</>
        ) : (
          <>
            Weather data on my location kindly provided by{" "}
            <Link href="https://openweathermap.org/">OpenWeatherMap</Link>.
          </>
        )}
      </p>
    </div>
  );
};

export const WeatherFallback = (): ReactElement => {
  return (
    <div className="z-30 mx-auto my-8 max-w-2xl rounded-lg bg-gray-200 p-6 shadow-lg dark:bg-gray-800">
      <div className="flex items-center space-x-4 rounded-lg bg-white p-4 dark:bg-gray-700">
        <LoadingSpinner />
        <div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            ...°C
          </div>
          <div className="text-gray-600 capitalize dark:text-gray-300">
            Loading weather...
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
