/**
 * Fetches the Google Tag Manager ID from the internal API.
 * Throws a descriptive error if the fetch fails or the result is invalid.
 */
export async function fetchGtmId(): Promise<string> {
  try {
    // Use window.location if available (client-side), fallback to localhost for SSR
    const host =
      typeof window !== "undefined" && window.location.host
        ? window.location.host
        : "localhost:3000";
    const baseUrl = host.includes("3000")
      ? `http://${host}`
      : `https://${host}`;
    const url = `${baseUrl}/api/gtm`;

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      const errorDetail = await res.text();
      throw new Error(
        `Failed to fetch GTM ID - Status ${res.status}: ${errorDetail}`
      );
    }

    const data = await res.json();
    if (!data.gtmId) {
      throw new Error("GTM ID is missing in the response.");
    }

    return data.gtmId;
  } catch (error) {
    // Optionally, add error logging here (e.g. using Sentry)
    throw error;
  }
}
