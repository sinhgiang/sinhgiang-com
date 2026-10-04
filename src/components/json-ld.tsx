import type { Graph } from "schema-dts";

// Structured data for search engines and AI assistants. "<" is escaped so a
// string in the data can never close the script tag.
export function JsonLd({ data }: { data: Graph }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
