import { buildLlmsTxt } from "@/lib/llms";

// Built once at build time from the site content (see src/lib/llms.ts).
export const dynamic = "force-static";

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
