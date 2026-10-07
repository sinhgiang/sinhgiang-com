import { describe, expect, it } from "vitest";
import nextConfig from "../../next.config";

describe("security headers", async () => {
  const rules = await nextConfig.headers!();
  const headers = Object.fromEntries(
    rules[0].headers.map((h) => [h.key, h.value]),
  );

  it("applies to every path", () => {
    expect(rules).toHaveLength(1);
    expect(rules[0].source).toBe("/:path*");
  });

  it("sets the five required headers", () => {
    expect(headers["Content-Security-Policy"]).toContain("frame-ancestors 'none'");
    expect(headers["Strict-Transport-Security"]).toMatch(/max-age=\d{7,}/);
    expect(headers["X-Content-Type-Options"]).toBe("nosniff");
    expect(headers["Referrer-Policy"]).toBe("strict-origin-when-cross-origin");
  });

  it("keeps the CSP closed to other origins", () => {
    const csp = headers["Content-Security-Policy"];
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).not.toMatch(/https?:|\*/);
    expect(csp).not.toContain("unsafe-eval");
  });
});
