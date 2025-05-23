import { NextResponse } from "next/server";

export async function GET() {
  const gtmId = process.env.GOOGLE_TAG_MANAGER_ID;
  if (!gtmId) {
    return NextResponse.json(
      { error: "Google Tag Manager ID is not defined" },
      { status: 500 }
    );
  }
  return NextResponse.json({ gtmId });
}
