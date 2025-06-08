import { NextResponse } from "next/server";

import { apiConfig } from "@/config/api";
export async function GET() {
  try {
    const response = await fetch(apiConfig.zenquotes.url);
    if (!response.ok) {
      console.error("Failed to fetch quotes from ZenQuotes API:", response.status, response.statusText);
      return new NextResponse(JSON.stringify({ error: "Failed to fetch quotes from external API" }), {
        status: response.status,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
    const data = await response.text(); // get raw text to forward as-is

    // Add CORS headers
    return new NextResponse(data, {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Error in API route /api/quote:", error);
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}
