import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";
import { WeatherResponse } from "@/types/api";

export async function GET() {
  // If weather API is not configured, return 404
  if (!siteConfig.weather.apiKey) {
    return NextResponse.json(
      { error: "Weather functionality is not configured" },
      { status: 404 }
    );
  }

  const city = siteConfig.city;
  if (!city) {
    return NextResponse.json({ error: "City is not defined" }, { status: 500 });
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${siteConfig.weather.apiKey}&units=metric`;
  console.log("Fetching weather from:", url);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch weather data: ${response.statusText}` },
        { status: response.status }
      );
    }
    const data: WeatherResponse = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "Error fetching weather data" },
      { status: 500 }
    );
  }
}
