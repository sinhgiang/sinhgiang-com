// Builds /llms.txt, /llms-full.txt and a Markdown copy of each page
// (format: https://llmstxt.org) from the same data the pages render, so they
// change whenever the site content changes.
import {
  howIWork,
  links,
  pages,
  posts as allPosts,
  products as allProducts,
  profile,
  stack as allStack,
  timeline as allTimeline,
  type PageKey,
  type Post,
  type Product,
  type StackItem,
} from "./site";
import { absoluteUrl, markdownPath } from "./seo";

export type LlmsData = {
  products: Product[];
  posts: Post[];
  stack: { group: string; items: StackItem[] }[];
  timeline: { date: string; text: string }[];
};

const defaultData: LlmsData = {
  products: allProducts,
  posts: allPosts,
  stack: allStack,
  timeline: allTimeline,
};

function postUrl(post: Post): string {
  return absoluteUrl(`/writing/${post.slug}`);
}

function summary(): string[] {
  return [`> ${profile.headline} ${profile.intro}`, ""];
}

function intro(): string[] {
  return [
    `This is the personal website of ${profile.name}, ${profile.role.toLowerCase()} based in ${profile.country}. It lists the products ${profile.name} builds, the tools used to build them, and posts about building AI products with AI coding agents.`,
    "",
  ];
}

function profilesSection(level: "##" | "###"): string[] {
  return [`${level} Profiles`, "", ...links.map((link) => `- [${link.label}](${link.href})`), ""];
}

function aboutSection(): string[] {
  return [
    `I'm a ${profile.role.toLowerCase()} from ${profile.country}. ${profile.intro}`,
    "",
    "### How I work",
    "",
    ...howIWork.map((item) => `- ${item}`),
    "",
  ];
}

function projectsSection(products: Product[]): string[] {
  return products.flatMap((product) => [
    `### ${product.name}`,
    "",
    product.tagline,
    "",
    `- Website: ${product.url}`,
    `- Platforms: ${product.platforms}`,
    ...(product.builtWith ? [`- Built with: ${product.builtWith}`] : []),
    `- Status: ${product.status}`,
    "",
  ]);
}

function stackSection(stack: LlmsData["stack"]): string[] {
  return stack.flatMap((group) => [
    `### ${group.group}`,
    "",
    ...group.items.map((item) => `- [${item.name}](${item.url}): ${item.use}`),
    "",
  ]);
}

function timelineSection(timeline: LlmsData["timeline"]): string[] {
  return [...timeline.map((entry) => `- ${entry.date}: ${entry.text}`), ""];
}

function postListSection(posts: Post[]): string[] {
  if (posts.length === 0) return ["No posts yet.", ""];
  return [...posts.map((post) => `- [${post.title}](${postUrl(post)}): ${post.summary} (${post.date})`), ""];
}

function postSection(post: Post): string[] {
  return [
    `### ${post.title}`,
    "",
    `Published ${post.date}. Source: ${postUrl(post)}`,
    "",
    post.summary,
    "",
    ...post.body.flatMap((paragraph) => [paragraph, ""]),
  ];
}

function finish(lines: string[]): string {
  return `${lines.join("\n").trimEnd()}\n`;
}

export function buildLlmsTxt(data: LlmsData = defaultData): string {
  const lines = [`# ${profile.name}`, "", ...summary(), ...intro()];

  lines.push("## Pages", "");
  for (const key of Object.keys(pages) as PageKey[]) {
    const page = pages[key];
    const name = key === "home" ? "Home" : page.title;
    lines.push(`- [${name}](${absoluteUrl(markdownPath(key))}): ${page.description} Web page: ${absoluteUrl(page.path)}`);
  }
  lines.push("");

  lines.push("## Products", "");
  for (const product of data.products) {
    lines.push(
      `- [${product.name}](${product.url}): ${product.tagline} Platforms: ${product.platforms}. Status: ${product.status}.`,
    );
  }
  lines.push("");

  lines.push("## Writing", "", ...postListSection(data.posts));
  lines.push(...profilesSection("##"));

  lines.push("## Optional", "");
  lines.push(
    `- [Full text](${absoluteUrl("/llms-full.txt")}): every page of this site in one Markdown file, with the stack, the timeline and the full text of each post.`,
  );

  return finish(lines);
}

export function buildLlmsFullTxt(data: LlmsData = defaultData): string {
  const lines = [`# ${profile.name}`, "", ...summary(), ...intro()];

  lines.push("## About", "", `Source: ${absoluteUrl(pages.about.path)}`, "", ...aboutSection());
  lines.push("## Projects", "", `Source: ${absoluteUrl(pages.projects.path)}`, "", ...projectsSection(data.products));
  lines.push("## Stack", "", `Source: ${absoluteUrl(pages.stack.path)}`, "", ...stackSection(data.stack));
  lines.push("## Timeline", "", `Source: ${absoluteUrl(pages.home.path)}`, "", ...timelineSection(data.timeline));

  lines.push("## Writing", "", `Source: ${absoluteUrl(pages.writing.path)}`, "");
  if (data.posts.length === 0) lines.push("No posts yet.", "");
  for (const post of data.posts) lines.push(...postSection(post));

  lines.push(...profilesSection("##"));
  return finish(lines);
}

// A Markdown copy of one page, with the same content as the web page.
export function buildPageMarkdown(key: PageKey, data: LlmsData = defaultData): string {
  const page = pages[key];
  const lines = [`# ${key === "home" ? profile.name : `${page.title}: ${profile.name}`}`, "", `> ${page.description}`, ""];
  lines.push(`Web page: ${absoluteUrl(page.path)}`, "");

  switch (key) {
    case "home":
      lines.push(...intro());
      lines.push("## Products", "", ...projectsSection(data.products));
      lines.push("## Timeline", "", ...timelineSection(data.timeline));
      lines.push(...profilesSection("##"));
      break;
    case "about":
      lines.push(...aboutSection(), ...profilesSection("##"));
      break;
    case "projects":
      lines.push(...projectsSection(data.products));
      break;
    case "stack":
      lines.push(...stackSection(data.stack));
      break;
    case "writing":
      lines.push(...postListSection(data.posts));
      break;
  }

  return finish(lines);
}
