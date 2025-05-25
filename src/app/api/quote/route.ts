import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch("https://zenquotes.io/api/random");
  const data = await response.text(); // get raw text to forward as-is

  // Add CORS headers
  return new NextResponse(data, {
    status: response.status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
