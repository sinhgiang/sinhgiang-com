import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { aboutJsonLd, breadcrumbJsonLd, faqJsonLd, pageMetadata, postJsonLd, projectsJsonLd, stackJsonLd, writingJsonLd } from "./seo";
import { ogSize, pageOgAlt, pageOgContent, postOgContent, renderPageOg, renderPostOg } from "./og";
import { faq, pages, siteUrl, type PageKey, type Post } from "./site";

const keys = Object.keys(pages) as PageKey[];
const root = process.cwd();

const post: Post = {
  slug: "first-post",
  title: "My first post",
  date: "2026-10-05",
  summary: "What this post is about.",
  body: ["Paragraph."],
};

// The folder that holds a page's route, from its URL path.
function routeDir(key: PageKey): string {
  const path = pages[key].path;
  return path === "/" ? join(root, "src/app") : join(root, "src/app/(pages)", path);
}

type Node = Record<string, unknown> & { "@type": string };

function graphNodes(graph: object): Node[] {
  return JSON.parse(JSON.stringify(graph))["@graph"];
}

describe("share images", () => {
  it("has an Open Graph and an X image route next to every page, drawn for that page", () => {
    for (const key of keys) {
      for (const file of ["opengraph-image.tsx", "twitter-image.tsx"]) {
        const path = join(routeDir(key), file);
        expect(existsSync(path), `${key}: ${file} is missing`).toBe(true);
        const source = readFileSync(path, "utf8");
        expect(source, `${key}: ${file} draws another page`).toContain(`renderPageOg("${key}")`);
        expect(source).toContain('contentType = "image/png"');
        expect(source).toContain("ogSize.width");
      }
    }
  });

  it("has the same two routes for a post", () => {
    for (const file of ["opengraph-image.tsx", "twitter-image.tsx"]) {
      const path = join(root, "src/app/(pages)/writing/[slug]", file);
      expect(existsSync(path), file).toBe(true);
      expect(readFileSync(path, "utf8")).toContain("renderPostOg(post)");
    }
  });

  it("does not set a shared image in the page metadata, so each route's own image is used", () => {
    for (const key of keys) {
      const metadata = pageMetadata(key);
      expect(metadata.openGraph).not.toHaveProperty("images");
      expect(metadata.twitter).not.toHaveProperty("images");
      expect((metadata.twitter as { card: string }).card).toBe("summary_large_image");
    }
  });

  it("uses a different title and text on every page", () => {
    const contents = keys.map((key) => pageOgContent(key));
    expect(new Set(contents.map((c) => c.title)).size).toBe(keys.length);
    expect(new Set(contents.map((c) => c.subtitle)).size).toBe(keys.length);
    expect(new Set(keys.map((key) => pageOgAlt(key))).size).toBe(keys.length);
    expect(postOgContent(post).title).toBe(post.title);
  });

  it("draws a real PNG of the right size", async () => {
    for (const response of [await renderPageOg("projects"), await renderPostOg(post)]) {
      expect(response.headers.get("content-type")).toBe("image/png");
      const bytes = new Uint8Array(await response.arrayBuffer());
      expect(Array.from(bytes.slice(0, 8))).toEqual([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
      const view = new DataView(bytes.buffer, bytes.byteOffset);
      expect(view.getUint32(16)).toBe(ogSize.width);
      expect(view.getUint32(20)).toBe(ogSize.height);
    }
  });
});

describe("titles and descriptions", () => {
  it("keep every full title under 60 characters and every description between 70 and 160", () => {
    for (const key of keys) {
      const metadata = pageMetadata(key);
      const title = typeof metadata.title === "object" && metadata.title && "absolute" in metadata.title
        ? metadata.title.absolute
        : `${pages[key].title} | Sinh Giang`;
      expect(title.length, `${key} title`).toBeLessThanOrEqual(60);
      expect(pages[key].description.length, `${key} description`).toBeGreaterThanOrEqual(70);
      expect(pages[key].description.length, `${key} description`).toBeLessThanOrEqual(160);
    }
  });
});

describe("FAQ and breadcrumbs", () => {
  it("puts a FAQPage on the About page with every question and answer, word for word", () => {
    const page = graphNodes(aboutJsonLd()).find((node) => node["@type"] === "FAQPage")!;
    const entries = page.mainEntity as { name: string; acceptedAnswer: { text: string } }[];
    expect(entries.map((entry) => entry.name)).toEqual(faq.map((item) => item.question));
    expect(entries.map((entry) => entry.acceptedAnswer.text)).toEqual(faq.map((item) => item.answer));
    expect(faqJsonLd([faq[0]]).mainEntity).toHaveLength(1);
  });

  it("asks questions people really type and answers each in at least a sentence", () => {
    expect(faq.length).toBeGreaterThanOrEqual(5);
    for (const item of faq) {
      expect(item.question).toMatch(/\?$/);
      expect(item.answer.length).toBeGreaterThan(40);
    }
  });

  it("gives every inner page a Home > page breadcrumb with absolute URLs", () => {
    const graphs = { about: aboutJsonLd(), projects: projectsJsonLd(), stack: stackJsonLd(), writing: writingJsonLd() };
    for (const [key, graph] of Object.entries(graphs)) {
      const crumbs = graphNodes(graph).find((node) => node["@type"] === "BreadcrumbList")!;
      const items = crumbs.itemListElement as { position: number; name: string; item: string }[];
      expect(items.map((item) => item.item)).toEqual([`${siteUrl}/`, `${siteUrl}${pages[key as PageKey].path}`]);
      expect(items.map((item) => item.position)).toEqual([1, 2]);
    }
  });

  it("gives a post a Home > Writing > post breadcrumb", () => {
    const crumbs = graphNodes(postJsonLd(post)).find((node) => node["@type"] === "BreadcrumbList")!;
    expect((crumbs.itemListElement as { item: string }[]).map((item) => item.item)).toEqual([
      `${siteUrl}/`,
      `${siteUrl}/writing`,
      `${siteUrl}/writing/first-post`,
    ]);
    expect(breadcrumbJsonLd([]).itemListElement).toHaveLength(1);
  });
});
