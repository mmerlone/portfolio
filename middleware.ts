import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const langCookie = request.cookies.get("lang");

  // Enforce language to be 'en-US'
  if (langCookie?.value !== "en-US") {
    const response = NextResponse.next();
    response.cookies.set("lang", "en-US", {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  // Apply to all routes (adjust the matcher as needed)
  matcher: "/:path*",
};
