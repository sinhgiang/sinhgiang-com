import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { buildLlmsFullTxt, buildLlmsTxt, buildPageMarkdown } from "./llms";
import { faq, howIWork, pages, products, profile, stack, timeline, type AnswerPageKey, type PageKey } from "./site";

// The rules are written in docs/brand-voice.md; this file keeps the copy to them.
const bannedWords = [
  "revolutionary",
  "unleash",
  "seamless",
  "seamlessly",
  "elevate",
  "supercharge",
  "game-changer",
  "cutting-edge",
  "leverage",
  "delve",
  "empower",
  "unlock",
  "world-class",
  "next-level",
  "robust",
  "innovative",
  "passionate",
  "synergy",
];

const keys = Object.keys(pages) as PageKey[];
const answerKeys = keys.filter((key): key is AnswerPageKey => key !== "home");

// Every sentence a visitor, a search engine or an AI assistant can read.
const copy: { where: string; text: string }[] = [
  ...Object.entries(pages).flatMap(([key, page]) => [
    { where: `${key} title`, text: page.title },
    { where: `${key} description`, text: page.description },
    ...("answer" in page ? [{ where: `${key} answer`, text: page.answer }] : []),
  ]),
  { where: "profile", text: `${profile.headline} ${profile.intro}` },
  ...howIWork.map((text, index) => ({ where: `howIWork ${index}`, text })),
  ...products.flatMap((product) => [
    { where: `${product.name} slogan`, text: product.slogan },
    { where: `${product.name} tagline`, text: product.tagline },
  ]),
  ...stack.flatMap((group) => group.items.map((item) => ({ where: `stack ${item.name}`, text: item.use }))),
  ...timeline.map((entry, index) => ({ where: `timeline ${index}`, text: entry.text })),
  ...faq.flatMap((item) => [
    { where: "faq question", text: item.question },
    { where: "faq answer", text: item.answer },
  ]),
];

describe("brand voice", () => {
  it("never uses a banned word", () => {
    for (const { where, text } of copy) {
      for (const word of bannedWords) {
        expect(text.toLowerCase(), `${where} uses "${word}"`).not.toMatch(new RegExp(`\\b${word}\\b`));
      }
    }
  });

  it("has no exclamation marks and no emoji", () => {
    for (const { where, text } of copy) {
      expect(text, `${where} has "!"`).not.toContain("!");
      expect(text, `${where} has an emoji`).not.toMatch(/\p{Extended_Pictographic}/u);
    }
  });

  it("keeps banned words out of the page code too, not only the data", () => {
    const files = ["src/app/page.tsx", "src/app/not-found.tsx", ...readdirSync(join(process.cwd(), "src/components")).map((file) => `src/components/${file}`)];
    for (const file of files) {
      const source = readFileSync(join(process.cwd(), file), "utf8").toLowerCase();
      for (const word of bannedWords) expect(source, `${file} uses "${word}"`).not.toMatch(new RegExp(`\b${word}\b`));
    }
  });

  it("is written down in docs/brand-voice.md, banned words included", () => {
    const doc = readFileSync(join(process.cwd(), "docs/brand-voice.md"), "utf8").toLowerCase();
    for (const word of bannedWords) expect(doc, `docs/brand-voice.md does not list "${word}"`).toContain(word);
    for (const item of faq) expect(doc, `docs/brand-voice.md does not list "${item.question}"`).toContain(item.question.toLowerCase());
  });

  it("says only what the product list shows about status", () => {
    const projects = pages.projects.answer;
    expect(projects).toContain(`${products.length} products`);
    for (const product of products) expect(projects).toContain(product.name);
    expect(projects).not.toMatch(/\d+\s*(users|customers|downloads|reviews|stars)|\$\s?\d/i);
  });
});

describe("short answers", () => {
  it("opens every inner page with an answer of one to three sentences", () => {
    for (const key of answerKeys) {
      const answer = pages[key].answer;
      const sentences = answer.split(/(?<=[.?])\s+/);
      expect(answer.length, key).toBeGreaterThan(60);
      expect(sentences.length, key).toBeLessThanOrEqual(4);
    }
  });

  it("names the owner on the About page in the first sentence", () => {
    expect(pages.about.answer.split(".")[0]).toContain(profile.name);
  });

  it("names only tools that are in the stack", () => {
    const names = stack.flatMap((group) => group.items.map((item) => item.name));
    for (const tool of ["Claude Code", "Helme", "GitHub", "Vercel", "TypeScript", "Next.js", "Electron", "Flutter", "Supabase"]) {
      expect(pages.stack.answer, `the stack answer does not name ${tool}`).toContain(tool);
      expect(names, `${tool} is not in the stack list`).toContain(tool);
    }
    for (const tool of ["Claude Code", "Helme", "Next.js", "Flutter", "Supabase", "Vercel"]) {
      expect(pages.stack.description).toContain(tool);
    }
  });

  it("follows a product that changes status", () => {
    const answer = faq.find((item) => item.question === "Can I use Helme?")!.answer;
    expect(answer).toContain("Not yet");
    expect(products.find((product) => product.name === "Helme")!.status).toBe("Private use");
  });
});

describe("the same answer everywhere", () => {
  it("repeats each answer in the Markdown copy of its page and in llms-full.txt", () => {
    const full = buildLlmsFullTxt();
    for (const key of answerKeys) {
      expect(buildPageMarkdown(key), `${key}.md`).toContain(pages[key].answer);
      expect(full, `llms-full.txt for ${key}`).toContain(pages[key].answer);
    }
  });

  it("lists the FAQ in about.md and llms-full.txt, question and answer", () => {
    for (const text of [buildPageMarkdown("about"), buildLlmsFullTxt()]) {
      for (const item of faq) {
        expect(text).toContain(item.question);
        expect(text).toContain(item.answer);
      }
    }
  });

  it("keeps llms.txt to the page descriptions, with no FAQ copy", () => {
    expect(buildLlmsTxt()).not.toContain("Questions people ask");
  });
});
