import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import {
  aboutJsonLd,
  allowedCrawlers,
  homeJsonLd,
  pageMetadata,
  postJsonLd,
  postMetadata,
  projectsJsonLd,
  sitemapEntries,
  stackJsonLd,
  writingJsonLd,
} from "./seo";
import { links, pages, products, profile, siteUrl, type PageKey, type Post } from "./site";

const post: Post = {
  slug: "first-post",
  title: "My first post",
  date: "2026-10-05",
  summary: "What this post is about.",
  body: ["Paragraph."],
};

type Node = Record<string, unknown> & { "@type": string };

function nodes(graph: object): Node[] {
  // Round-trip through JSON, as the page does, and return the top-level nodes.
  const parsed = JSON.parse(JSON.stringify(graph));
  expect(parsed["@context"]).toBe("https://schema.org");
  return parsed["@graph"];
}

function allNodes(value: unknown): Node[] {
  if (Array.isArray(value)) return value.flatMap(allNodes);
  if (value && typeof value === "object") {
    const object = value as Record<string, unknown>;
    const own = typeof object["@type"] === "string" ? [object as Node] : [];
    return [...own, ...Object.values(object).flatMap(allNodes)];
  }
  return [];
}

const graphs = {
  home: homeJsonLd(),
  about: aboutJsonLd(),
  projects: projectsJsonLd(),
  stack: stackJsonLd(),
  writing: writingJsonLd(),
};

describe("JSON-LD", () => {
  it("is valid JSON with a schema.org context and a type on every node", () => {
    for (const graph of [...Object.values(graphs), postJsonLd(post)]) {
      for (const node of allNodes(nodes(graph))) {
        expect(node["@type"]).toMatch(/^[A-Z][A-Za-z]+$/);
      }
    }
  });

  it("only uses absolute https URLs", () => {
    const text = JSON.stringify(Object.values(graphs));
    for (const match of text.matchAll(/"(?:url|image|@id|mainEntityOfPage)":"([^"]+)"/g)) {
      expect(match[1]).toMatch(/^https:\/\//);
    }
  });

  it("describes the person with the profile links", () => {
    const person = nodes(graphs.home).find((node) => node["@type"] === "Person")!;
    expect(person.name).toBe(profile.name);
    expect(person.sameAs).toEqual(links.map((link) => link.href));
  });

  it("puts the WebSite node on the home page only", () => {
    expect(nodes(graphs.home).some((node) => node["@type"] === "WebSite" && node.url === `${siteUrl}/`)).toBe(true);
    for (const key of ["about", "projects", "stack", "writing"] as const) {
      expect(nodes(graphs[key]).some((node) => node["@type"] === "WebSite" && node["@id"] === `${siteUrl}/#website`)).toBe(
        false,
      );
    }
  });

  it("makes the About page a ProfilePage about the person", () => {
    const page = nodes(graphs.about).find((node) => node["@type"] === "ProfilePage")!;
    expect(page.mainEntity).toEqual({ "@id": `${siteUrl}/#person` });
  });

  it("lists every product with a name, a link and no invented ratings or prices", () => {
    const apps = allNodes(nodes(graphs.projects)).filter((node) =>
      ["SoftwareApplication", "MobileApplication", "WebApplication", "WebSite"].includes(node["@type"]),
    );
    expect(apps.map((app) => app.name)).toEqual(products.map((product) => product.name));
    for (const app of apps) {
      expect(app.url).toMatch(/^https:\/\//);
      expect(app).not.toHaveProperty("aggregateRating");
      expect(app).not.toHaveProperty("offers");
    }
  });

  it("describes a post as a BlogPosting with author and date", () => {
    const article = nodes(postJsonLd(post)).find((node) => node["@type"] === "BlogPosting")!;
    expect(article.headline).toBe(post.title);
    expect(article.datePublished).toBe(post.date);
    expect(article.author).toEqual({ "@id": `${siteUrl}/#person` });
  });

  it("adds a new post to the Writing page's blog", () => {
    const blog = allNodes(nodes(writingJsonLd([post]))).find((node) => node["@type"] === "Blog")!;
    expect(blog.blogPost).toHaveLength(1);
  });
});

describe("metadata", () => {
  const keys = Object.keys(pages) as PageKey[];

  it("gives every page a self canonical, Open Graph URL and Markdown alternate", () => {
    for (const key of keys) {
      const metadata = pageMetadata(key);
      const url = key === "home" ? `${siteUrl}/` : `${siteUrl}${pages[key].path}`;
      expect(metadata.alternates?.canonical).toBe(url);
      expect((metadata.openGraph as { url: string }).url).toBe(url);
      expect(metadata.alternates?.types).toHaveProperty("text/markdown");
    }
  });

  it("uses a different title and description on every page", () => {
    const titles = keys.map((key) => JSON.stringify(pageMetadata(key).title));
    const descriptions = keys.map((key) => pageMetadata(key).description);
    expect(new Set(titles).size).toBe(keys.length);
    expect(new Set(descriptions).size).toBe(keys.length);
  });

  it("gives a post its own canonical and article type", () => {
    const metadata = postMetadata(post);
    expect(metadata.alternates?.canonical).toBe(`${siteUrl}/writing/first-post`);
    expect((metadata.openGraph as { type: string }).type).toBe("article");
  });
});

describe("sitemap and robots", () => {
  it("lists every page, and new posts when they are added", () => {
    const urls = sitemapEntries([]).map((entry) => entry.url);
    for (const page of Object.values(pages)) expect(urls).toContain(page.path === "/" ? `${siteUrl}/` : `${siteUrl}${page.path}`);
    expect(sitemapEntries([post]).map((entry) => entry.url)).toContain(`${siteUrl}/writing/first-post`);
  });

  it("allows Google and the AI search crawlers and points to the sitemap", () => {
    const config = robots();
    const rules = Array.isArray(config.rules) ? config.rules : [config.rules];
    expect(rules.every((rule) => rule.allow === "/" && !rule.disallow)).toBe(true);
    for (const bot of ["Googlebot", "OAI-SearchBot", "Claude-SearchBot", "PerplexityBot", "Bingbot"]) {
      expect(allowedCrawlers).toContain(bot);
    }
    expect(config.sitemap).toBe(`${siteUrl}/sitemap.xml`);
  });
});
