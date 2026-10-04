import { buildPageMarkdown } from "./llms";
import type { PageKey } from "./site";

// Markdown copy of a page for AI assistants (served at /index.md, /about.md, ...).
export function markdownResponse(key: PageKey): Response {
  return new Response(buildPageMarkdown(key), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
