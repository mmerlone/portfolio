import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const repoUrl = req.nextUrl.searchParams.get("repoUrl");
  if (!repoUrl) {
    return NextResponse.json(
      { error: "Repository URL is required." },
      { status: 400 },
    );
  }

  const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) {
    return NextResponse.json(
      { error: "Invalid GitHub repository URL." },
      { status: 400 },
    );
  }
  const [, owner, repo] = match;

  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  };
  if (process.env.GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}`,
    { headers },
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    return NextResponse.json(
      { error: errorData.message || "Failed to fetch GitHub stats" },
      { status: response.status },
    );
  }

  const data = await response.json();
  return NextResponse.json(data, { status: 200 });
}
