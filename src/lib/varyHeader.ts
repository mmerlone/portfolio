// Appends a value to an existing `Vary` header instead of overwriting it.
export function appendVaryHeader(headers: Headers, value: string): void {
  const existing = headers.get("Vary");
  if (!existing) {
    headers.set("Vary", value);
    return;
  }

  const values = existing
    .split(",")
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0);
  if (values.some((entry) => entry.toLowerCase() === value.toLowerCase()))
    return;

  headers.set("Vary", [...values, value].join(", "));
}
