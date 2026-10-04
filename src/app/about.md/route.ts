import { markdownResponse } from "@/lib/markdown-response";

// Built once at build time from the site content.
export const dynamic = "force-static";

export function GET() {
  return markdownResponse("about");
}
