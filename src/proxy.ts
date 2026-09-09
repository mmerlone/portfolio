import { NextResponse, type NextRequest } from "next/server";
import { negotiateHomepageRepresentation } from "@/lib/acceptNegotiation";
import { appendVaryHeader } from "@/lib/varyHeader";

const AVAILABLE_REPRESENTATIONS = "text/html, text/markdown";

// Same-URL `Accept` negotiation for the canonical homepage ("/") only.
export function proxy(request: NextRequest): Response {
  const representation = negotiateHomepageRepresentation(
    request.headers.get("accept"),
  );

  if (representation === "not-acceptable") {
    return new Response(
      `406 Not Acceptable. Available representations: ${AVAILABLE_REPRESENTATIONS}`,
      {
        status: 406,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          Vary: "Accept",
        },
      },
    );
  }

  if (representation === "markdown") {
    const rewrittenUrl = request.nextUrl.clone();
    rewrittenUrl.pathname = "/index.md";
    const response = NextResponse.rewrite(rewrittenUrl);
    appendVaryHeader(response.headers, "Accept");
    return response;
  }

  const response = NextResponse.next();
  appendVaryHeader(response.headers, "Accept");
  return response;
}

export const config = {
  matcher: ["/"],
};
