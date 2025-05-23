"use client";

import { useState, useEffect } from "react";
import { siteConfig } from "@/config/site";
import { LoadingSpinner } from "./ui/LoadingSpinner";
import { ErrorMessage } from "./ui/ErrorMessage";
import { useWeather } from "@/hooks/useWeather";
import Image from "next/image";

const { city } = siteConfig;

interface Weather {
  temp: number;
  description: string;
  icon: string;
}

const Weather = () => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean | null>(null);

  const { data, isLoading, isError } = useWeather();

  // console.log("Weather data:", data);
  // console.log("Weather loading:", isLoading);
  // console.log("Weather error:", isError);

  useEffect(() => {
    const fetchData = async () => {
      // console.log('Weather useEffect data:', data);
      try {
        if (data) {
          setWeather({
            temp: Math.round(data.main.temp),
            description: data.weather[0].description,
            icon: data.weather[0].icon,
          });
          setLoading(false);
          setError(isError);
        } else {
          setWeather(null);
          setError(true);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
        setLoading(false);
        setWeather(null);
      } finally {
        setLoading(isLoading);
      }
    };

    fetchData();
  }, [data]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-2xl mx-auto my-8">
      <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        {loading && <LoadingSpinner />}
        {error && (
          <ErrorMessage message="No weather information available for today." />
        )}
        {weather && (
          <>
            <Image
              src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt={weather.description}
              width={64}
              height={64}
              className="w-16 h-16"
              unoptimized
            />
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {weather.temp}°C
              </div>
              <div className="text-gray-600 dark:text-gray-300 capitalize">
                {weather.description}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{city}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date().toLocaleDateString(undefined, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </>
        )}
      </div>
      {weather && (
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
