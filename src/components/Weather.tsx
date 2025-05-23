"use client";

import { useState, useEffect } from "react";
import { siteConfig } from "@/config/site";
import { LoadingSpinner } from "./ui/LoadingSpinner";
import { useWeather } from "@/hooks/useWeather";
import Image from "next/image";

const { city } = siteConfig;

interface Weather {
  temp: number | null;
  description: string;
  icon: string;
}

// A reasonable default weather value
const defaultWeather: Weather = {
  temp: null,
  description: "Unknown",
  icon: "01d",
};

const Weather = () => {
  // Initialize weather state with a default value
  const [weather, setWeather] = useState<Weather>(defaultWeather);

  // useWeather provides data, isLoading and isError from the API
  const { data, isLoading, isError } = useWeather();

  useEffect(() => {
    // When data is available, transform it to our Weather interface
    if (data && data.main && data.weather && data.weather[0]) {
      setWeather({
        temp: data.main.temp ? Math.round(data.main.temp) : null,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      });
    }
  }, [data]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-2xl mx-auto my-8">
      <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Image
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.description}
            width={64}
            height={64}
            className="w-16 h-16"
            unoptimized
          />
        )}
        <div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {weather.temp ?? "..."}°C
          </div>
          <div className="text-gray-600 dark:text-gray-300 capitalize">
            {weather.description}
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{city}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
      {isError ? (
        <p className="text-xs m-4 text-gray-500 dark:text-gray-400">
          Unable to fetch weather data for my location. Please try again later.
        </p>
      ) : (
        <p className="text-xs m-4 text-gray-500 dark:text-gray-400">
          Weather data on my location kindly provided by{" "}
          <a
            href="https://openweathermap.org/"
            target="_blank"
            rel="noreferrer"
          >
            OpenWeatherMap
          </a>
        </p>
      )}
    </div>
  );
};

export default Weather;
