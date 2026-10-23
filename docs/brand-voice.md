# Brand voice, keywords and questions

The site is in English only. It speaks as one person: Sinh Giang. This file is the reference for
anyone (or any agent) who writes or changes copy. `src/lib/voice.test.ts` checks the rules marked "tested".

## Who speaks to whom

- **Speaker:** Sinh Giang, in the first person ("I built", "I ship"). Plain facts about a page (meta
  descriptions, `llms.txt`, JSON-LD) use the name in the third person, because a search engine or an
  AI assistant quotes them out of context.
- **Reader:** a developer, founder or product person from the US or Europe who is good with technology,
  reads fast and checks claims before trusting them.
- **Tone:** short, direct and specific, like a person in the trade writing to a peer. A number or a
  name beats an adjective. Say what exists today and what does not exist yet.

## Words

- **Use:** build, ship, product, spec, review, release, agent, AI coding agent, branch, test, live,
  coming soon, private use.
- **Never use (tested):** revolutionary, unleash, seamless, seamlessly, elevate, supercharge,
  game-changer, cutting-edge, leverage, delve, empower, unlock, world-class, next-level, robust,
  innovative, passionate, synergy. No exclamation marks (tested). No emoji as icons (tested).
- **Never claim (tested for the data):** prices, ratings, download counts, user numbers or revenue the
  site cannot show. Every fact comes from `src/lib/site.ts`, which comes from GitHub or the product's
  own website.

## Two lines that sound right, two that do not

| Right | Wrong |
|---|---|
| "I've built 6 products with AI coding agents." | "Unleash the power of AI with 6 revolutionary products!" |
| "Not yet. Helme is in private use today." | "Helme is coming soon to supercharge your workflow." |

## Keywords people search (SEO)

| Page | Main phrases |
|---|---|
| Home | Sinh Giang, founder from Vietnam, build products with AI coding agents |
| Projects | Wispra voice dictation, Lenvid AI teleprompter, Revova payment recovery, Timio attendance, Helme AI agents |
| Stack | Claude Code, Next.js, Electron, Flutter, Supabase, Vercel |
| About | who is Sinh Giang, product builder Vietnam, ship AI products |
| Writing | designing AI products, shipping with AI coding agents |

## Questions people ask (AEO)

These sit on the About page as a real FAQ and in `FAQPage` JSON-LD. The answers are built from
`src/lib/site.ts`, so they cannot drift from the rest of the site.

1. Who is Sinh Giang?
2. What products has Sinh Giang built?
3. How does Sinh Giang build products with AI coding agents?
4. Which tools does Sinh Giang use?
5. Can I use Helme?
6. Where can I follow Sinh Giang's work?

Each inner page opens with one to three sentences that answer the page's own question (`answer` in
`src/lib/site.ts`). The same sentence is shown on the page and repeated in the Markdown copy and in
`llms-full.txt`.
