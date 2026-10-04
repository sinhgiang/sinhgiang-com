import { describe, expect, it } from "vitest";
import { GET as llmsFullRoute } from "@/app/llms-full.txt/route";
import { GET as llmsRoute } from "@/app/llms.txt/route";
import { buildLlmsFullTxt, buildLlmsTxt, buildPageMarkdown, type LlmsData } from "./llms";
import { links, pages, posts, products, siteUrl, stack, timeline, type PageKey, type Post } from "./site";

const data: LlmsData = { products, posts, stack, timeline };

const newPost: Post = {
  slug: "first-post",
  title: "My first post",
  date: "2026-10-05",
  summary: "What this post is about, in one sentence.",
  body: ["The first paragraph.", "The second paragraph."],
};

describe("llms.txt", () => {
  const text = buildLlmsTxt(data);
  const lines = text.split("\n");

  it("follows the llmstxt.org layout: H1, blockquote, then H2 sections", () => {
    expect(lines[0]).toBe("# Sinh Giang");
    expect(lines[2].startsWith("> ")).toBe(true);
    const headings = lines.filter((line) => line.startsWith("#"));
    expect(headings[0]).toBe("# Sinh Giang");
    expect(headings.slice(1).every((line) => line.startsWith("## "))).toBe(true);
    expect(headings).toContain("## Optional");
  });

  it("uses only Markdown links in list items, all absolute", () => {
    const items = lines.filter((line) => line.startsWith("- "));
    expect(items.length).toBeGreaterThan(0);
    for (const item of items) {
      expect(item).toMatch(/^- \[[^\]]+\]\(https:\/\/[^)\s]+\)(: .+)?$/);
    }
  });

  it("lists every page, product and profile from the site data", () => {
    for (const page of Object.values(pages)) expect(text).toContain(page.description);
    for (const product of products) {
      expect(text).toContain(`[${product.name}](${product.url})`);
      expect(text).toContain(product.tagline);
    }
    for (const link of links) expect(text).toContain(`[${link.label}](${link.href})`);
    expect(text).toContain(`${siteUrl}/llms-full.txt`);
  });

  it("says there are no posts while the list is empty", () => {
    expect(buildLlmsTxt({ ...data, posts: [] })).toContain("No posts yet.");
  });

  it("picks up a new post without any other change", () => {
    const withPost = buildLlmsTxt({ ...data, posts: [newPost] });
    expect(withPost).toContain(`[My first post](${siteUrl}/writing/first-post)`);
    expect(withPost).toContain(newPost.summary);
    expect(withPost).not.toContain("No posts yet.");
  });

  it("follows an edited product", () => {
    const edited = products.map((p, i) => (i === 0 ? { ...p, tagline: "A changed tagline." } : p));
    expect(buildLlmsTxt({ ...data, products: edited })).toContain("A changed tagline.");
  });

  it("is what /llms.txt serves", async () => {
    const response = llmsRoute();
    expect(response.headers.get("content-type")).toBe("text/plain; charset=utf-8");
    expect(await response.text()).toBe(buildLlmsTxt());
  });
});

describe("llms-full.txt", () => {
  it("contains the about text, every product, the stack and the timeline", () => {
    const text = buildLlmsFullTxt(data);
    for (const product of products) expect(text).toContain(`### ${product.name}`);
    for (const item of stack.flatMap((group) => group.items)) expect(text).toContain(item.use);
    for (const entry of timeline) expect(text).toContain(entry.text);
  });

  it("contains the full text of a new post", () => {
    const text = buildLlmsFullTxt({ ...data, posts: [newPost] });
    expect(text).toContain("### My first post");
    expect(text).toContain("The second paragraph.");
  });

  it("is what /llms-full.txt serves", async () => {
    expect(await llmsFullRoute().text()).toBe(buildLlmsFullTxt());
  });
});

describe("page Markdown copies", () => {
  it("exists for every page and links back to the web page", () => {
    for (const key of Object.keys(pages) as PageKey[]) {
      const md = buildPageMarkdown(key, data);
      expect(md.startsWith("# ")).toBe(true);
      expect(md).toContain(pages[key].description);
      expect(md).toContain(`Web page: ${siteUrl}`);
    }
  });

  it("lists a new post on the writing page", () => {
    expect(buildPageMarkdown("writing", { ...data, posts: [newPost] })).toContain("My first post");
  });
});
