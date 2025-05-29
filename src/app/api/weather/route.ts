import { NextResponse } from "next/server";
import { apiConfig } from "@/config/api";
import { WeatherResponse } from "@/types/api";

export async function GET(request: Request) {
  if (!apiConfig.openWeather.apiKey) {
    return NextResponse.json(
      { apiKey: null, error: "Weather API key not configured" },
      { status: 200 }
    );
  }

  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');

  if (!city) {
    return NextResponse.json({ error: "City is not defined" }, { status: 400 });
  }

  const url = `${apiConfig.openWeather.url}?q=${encodeURIComponent(
    city
  )}&appid=${apiConfig.openWeather.apiKey}&units=metric`;
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
