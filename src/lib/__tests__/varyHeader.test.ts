import { appendVaryHeader } from "@/lib/varyHeader";

describe("appendVaryHeader", () => {
  it("sets Vary when none is present", () => {
    const headers = new Headers();
    appendVaryHeader(headers, "Accept");
    expect(headers.get("Vary")).toBe("Accept");
  });

  it("appends to an existing Vary header", () => {
    const headers = new Headers({ Vary: "Accept-Encoding" });
    appendVaryHeader(headers, "Accept");
    expect(headers.get("Vary")).toBe("Accept-Encoding, Accept");
  });

  it("does not duplicate an already-present value", () => {
    const headers = new Headers({ Vary: "Accept-Encoding, Accept" });
    appendVaryHeader(headers, "Accept");
    expect(headers.get("Vary")).toBe("Accept-Encoding, Accept");
  });

  it("is case-insensitive when checking for duplicates", () => {
    const headers = new Headers({ Vary: "accept" });
    appendVaryHeader(headers, "Accept");
    expect(headers.get("Vary")).toBe("accept");
  });
});
