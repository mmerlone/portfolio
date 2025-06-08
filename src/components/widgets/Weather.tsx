"use client";

import { useState, useEffect } from "react";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useWeather } from "@/hooks/useWeather";
import Image from "next/image";
import { WeatherCondition } from "@/types/api";
import Link from "next/link";
import { TiltBox } from "@/components/ui/TiltBox";
import { apiConfig } from "@/config/api";

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

const Weather = () => {
  const [weather, setWeather] = useState<Weather>(defaultWeather);
  const [isMounted, setIsMounted] = useState(false);

  const city = apiConfig.openWeather?.city;
  const { data, isLoading, isError } = useWeather(city);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (data?.main?.temp && data?.weather?.[0]) {
      setWeather({
        temp: Math.round(data.main.temp),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        main: data.weather[0].main,
      });
    }
  }, [data]);

  if (!isMounted) return null;

  return (
    <TiltBox>
      <div className="z-30 mx-auto my-8 max-w-2xl rounded-lg bg-gray-200 p-6 shadow-lg dark:bg-gray-800">
        <div className="flex items-center space-x-4 rounded-lg bg-white p-4 dark:bg-gray-700">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <Image
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt={weather.description}
              width={64}
              height={64}
              className="h-16 w-16"
              unoptimized
            />
          )}
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
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
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
    </TiltBox>
  );
};

export default Weather;
