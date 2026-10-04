import type { Metadata } from "next";
import type {
  BlogPosting,
  Blog,
  CollectionPage,
  Graph,
  ItemList,
  Person,
  ProfilePage,
  Thing,
  WebPage,
  WebSite,
} from "schema-dts";
import {
  links,
  pages,
  posts as allPosts,
  products as allProducts,
  profile,
  siteUrl,
  stack,
  type PageKey,
  type Post,
  type Product,
} from "./site";

export function absoluteUrl(path: string): string {
  return path === "/" ? `${siteUrl}/` : `${siteUrl}${path}`;
}

// The Markdown copy of a page lives next to it: / -> /index.md, /about -> /about.md.
export function markdownPath(key: PageKey): string {
  const path = pages[key].path;
  return path === "/" ? "/index.md" : `${path}.md`;
}

const personId = `${siteUrl}/#person`;
const websiteId = `${siteUrl}/#website`;

// Metadata for one page: title, description, canonical URL, Open Graph and X card.
export function pageMetadata(key: PageKey): Metadata {
  const page = pages[key];
  const metadata = buildMetadata({
    path: page.path,
    title: page.title,
    description: page.description,
    absoluteTitle: key === "home",
  });
  return {
    ...metadata,
    alternates: { ...metadata.alternates, types: { "text/markdown": absoluteUrl(markdownPath(key)) } },
  };
}

export function postMetadata(post: Post): Metadata {
  return {
    ...buildMetadata({
      path: `/writing/${post.slug}`,
      title: post.title,
      description: post.summary,
      type: "article",
    }),
    authors: [{ name: profile.name, url: absoluteUrl("/about") }],
  };
}

function buildMetadata({
  path,
  title,
  description,
  absoluteTitle = false,
  type = "website",
}: {
  path: string;
  title: string;
  description: string;
  absoluteTitle?: boolean;
  type?: "website" | "article";
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${profile.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      title: fullTitle,
      description,
      url: absoluteUrl(path),
      siteName: profile.name,
      locale: "en_US",
      type,
      images: [{ url: absoluteUrl(profile.avatar), width: 400, height: 400, alt: profile.name }],
    },
    twitter: { card: "summary", title: fullTitle, description, creator: "@sinhgiangfd" },
  };
}

// JSON-LD. Every value comes from src/lib/site.ts; nothing is added that the
// site does not already say (no prices, ratings or download counts). The
// WebSite node is only on the home page; other pages point to it by @id.

export function personJsonLd(): Person {
  return {
    "@type": "Person",
    "@id": personId,
    name: profile.name,
    url: absoluteUrl("/"),
    image: absoluteUrl(profile.avatar),
    jobTitle: profile.role,
    description: `${profile.headline} ${profile.intro}`,
    nationality: { "@type": "Country", name: profile.country },
    sameAs: links.map((link) => link.href),
  };
}

function websiteJsonLd(): WebSite {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: absoluteUrl("/"),
    name: profile.name,
    description: pages.home.description,
    inLanguage: "en",
    publisher: { "@id": personId },
  };
}

export function productJsonLd(product: Product): Thing {
  const common = {
    name: product.name,
    url: product.url,
    description: product.tagline,
    image: absoluteUrl(product.logo),
    creator: { "@id": personId },
  };
  if (product.schemaType === "WebSite") {
    return { "@type": "WebSite", ...common };
  }
  return { "@type": product.schemaType, ...common, operatingSystem: product.platforms };
}

function pageJsonLd<T extends "WebPage" | "CollectionPage" | "ProfilePage">(key: PageKey, type: T) {
  const page = pages[key];
  return {
    "@type": type,
    "@id": `${absoluteUrl(page.path)}#webpage`,
    url: absoluteUrl(page.path),
    name: key === "home" ? page.title : `${page.title} | ${profile.name}`,
    description: page.description,
    isPartOf: { "@id": websiteId },
    inLanguage: "en",
  } as const;
}

function graph(...nodes: Thing[]): Graph {
  return { "@context": "https://schema.org", "@graph": nodes };
}

export function homeJsonLd(products = allProducts): Graph {
  const itemList: ItemList = {
    "@type": "ItemList",
    name: "Products",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: productJsonLd(product),
    })),
  };
  const page: WebPage = { ...pageJsonLd("home", "WebPage"), about: { "@id": personId }, mainEntity: itemList };
  return graph(websiteJsonLd(), personJsonLd(), page);
}

export function aboutJsonLd(): Graph {
  const page: ProfilePage = { ...pageJsonLd("about", "ProfilePage"), mainEntity: { "@id": personId } };
  return graph(personJsonLd(), page);
}

export function projectsJsonLd(products = allProducts): Graph {
  const page: CollectionPage = {
    ...pageJsonLd("projects", "CollectionPage"),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: productJsonLd(product),
      })),
    },
  };
  return graph(personJsonLd(), page);
}

export function stackJsonLd(): Graph {
  const page: WebPage = {
    ...pageJsonLd("stack", "WebPage"),
    author: { "@id": personId },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: stack
        .flatMap((group) => group.items)
        .map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: { "@type": "SoftwareApplication", name: item.name, url: item.url, description: item.use },
        })),
    },
  };
  return graph(personJsonLd(), page);
}

export function articleJsonLd(post: Post): BlogPosting {
  return {
    "@type": "BlogPosting",
    "@id": `${absoluteUrl(`/writing/${post.slug}`)}#article`,
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    url: absoluteUrl(`/writing/${post.slug}`),
    mainEntityOfPage: absoluteUrl(`/writing/${post.slug}`),
    image: absoluteUrl(profile.avatar),
    author: { "@id": personId },
    inLanguage: "en",
  };
}

export function writingJsonLd(posts = allPosts): Graph {
  const blog: Blog = {
    "@type": "Blog",
    "@id": `${absoluteUrl(pages.writing.path)}#blog`,
    url: absoluteUrl(pages.writing.path),
    name: `${profile.name}: Writing`,
    description: pages.writing.description,
    author: { "@id": personId },
    blogPost: posts.map((post) => articleJsonLd(post)),
  };
  return graph(personJsonLd(), { ...pageJsonLd("writing", "CollectionPage"), mainEntity: blog });
}

export function postJsonLd(post: Post): Graph {
  return graph(personJsonLd(), articleJsonLd(post));
}


export function sitemapEntries(posts = allPosts): { url: string; lastModified?: string }[] {
  return [
    ...Object.values(pages).map((page) => ({ url: absoluteUrl(page.path) })),
    ...posts.map((post) => ({ url: absoluteUrl(`/writing/${post.slug}`), lastModified: post.date })),
  ];
}

// Search engines and AI assistants named explicitly, so it is clear at a glance
// that each one may read the whole site. "*" already allows everyone else.
export const allowedCrawlers = [
  "Googlebot",
  "Google-Extended",
  "Bingbot",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Applebot",
  "Applebot-Extended",
];
