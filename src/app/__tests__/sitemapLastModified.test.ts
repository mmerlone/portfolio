import { execSync } from "node:child_process";
import sitemap from "@/app/sitemap";
import { buildLogger } from "@/lib/logger/server";

jest.mock("node:child_process", () => ({ execSync: jest.fn() }));
jest.mock("@/lib/logger/server", () => {
  const logger = { warn: jest.fn() };
  return { buildLogger: jest.fn(() => logger) };
});

const mockedExecSync = jest.mocked(execSync);
const warn = jest.mocked(buildLogger("test").warn);

const returnCommitDate = (output: string): void => {
  mockedExecSync.mockReturnValue(Buffer.from(output));
};

const withoutLastModified = (
  entries: ReturnType<typeof sitemap>,
): ReturnType<typeof sitemap> =>
  entries.map(({ lastModified: _lastModified, ...rest }) => rest);

describe("sitemap lastModified", () => {
  beforeEach(() => {
    warn.mockClear();
    mockedExecSync.mockReset();
  });

  it("uses the last commit date on every entry without warning when Git provides one", () => {
    returnCommitDate("2026-01-02T03:04:05-03:00\n");

    const entries = sitemap();

    expect(entries.length).toBeGreaterThan(0);
    for (const entry of entries) {
      expect(entry.lastModified).toEqual(new Date("2026-01-02T03:04:05-03:00"));
    }
    expect(warn).not.toHaveBeenCalled();
  });

  it.each([
    ["empty", ""],
    ["invalid", "not-a-date"],
  ])(
    "warns once and omits lastModified when the output is %s",
    (_label, output) => {
      returnCommitDate(output);

      const entries = sitemap();

      expect(entries.length).toBeGreaterThan(0);
      for (const entry of entries) {
        expect("lastModified" in entry).toBe(false);
      }
      expect(warn).toHaveBeenCalledTimes(1);
      expect(warn).toHaveBeenCalledWith(
        expect.objectContaining({ op: "getLastModified" }),
        expect.stringContaining("omitting lastModified"),
      );
    },
  );

  it("warns once with the error and omits lastModified when Git is unavailable", () => {
    const failure = new Error("git: command not found");
    mockedExecSync.mockImplementation(() => {
      throw failure;
    });

    const entries = sitemap();

    expect(entries.length).toBeGreaterThan(0);
    for (const entry of entries) {
      expect("lastModified" in entry).toBe(false);
    }
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn).toHaveBeenCalledWith(
      expect.objectContaining({ err: failure, op: "getLastModified" }),
      expect.stringContaining("omitting lastModified"),
    );
  });

  it("warns once per sitemap generation, not once per entry", () => {
    returnCommitDate("");

    const entries = sitemap();

    expect(entries.length).toBeGreaterThan(1);
    expect(warn).toHaveBeenCalledTimes(1);
  });

  it("keeps URLs, priorities, and other fields identical with and without a date", () => {
    returnCommitDate("2026-01-02T03:04:05-03:00\n");
    const withDate = sitemap();

    returnCommitDate("");
    const withoutDate = sitemap();

    expect(withoutDate).toEqual(withoutLastModified(withDate));
    expect(withoutDate.map(({ url, priority }) => [url, priority])).toEqual(
      withDate.map(({ url, priority }) => [url, priority]),
    );
  });
});
