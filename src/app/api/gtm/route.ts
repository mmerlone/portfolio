import { NextResponse } from "next/server";

export async function GET() {
  console.log(
    "GOOGLE_TAG_MANAGER_ID in API route:",
    process.env.GOOGLE_TAG_MANAGER_ID
  );
  if (!process.env.GOOGLE_TAG_MANAGER_ID) {
    return NextResponse.json(
      { error: "Google Tag Manager ID is not defined" },
      { status: 500 }
    );
  }
  return NextResponse.json({ gtmId: process.env.GOOGLE_TAG_MANAGER_ID });
}
