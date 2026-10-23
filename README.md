# sinhgiang.com

Personal website of Sinh Giang: products, writing, stack and about.

- Next.js (App Router), Tailwind CSS, deployed on Vercel.
- All content lives in `src/lib/site.ts`: profile, products, stack, timeline, posts, and the title, description and short answer of each page, and the FAQ.
- To publish a post, add it to `posts` in `src/lib/site.ts` (slug, title, date, summary, body). It gets its own page at `/writing/<slug>`, and the sitemap, `llms.txt`, `llms-full.txt` and the JSON-LD pick it up at the next build. The Writing page shows "Coming soon" while the list is empty.

```bash
npm ci
npm run dev   # http://localhost:3000
npm test      # checks llms.txt, sitemap, robots, metadata, JSON-LD, share images and the brand voice
npm run build
```

## Search engines and AI assistants

Everything below is generated at build time from `src/lib/site.ts`; nothing is written by hand.

| URL | What it is | Code |
|---|---|---|
| `/robots.txt` | Allows every crawler, names Google, Bing and the AI search crawlers, points to the sitemap | `src/app/robots.ts` |
| `/sitemap.xml` | Every page and post | `src/app/sitemap.ts` |
| `/llms.txt` | Short guide to the site for AI assistants ([llmstxt.org](https://llmstxt.org)) | `src/lib/llms.ts` |
| `/llms-full.txt` | Every page in one Markdown file, with the full text of each post | `src/lib/llms.ts` |
| `/index.md`, `/about.md`, ... | Markdown copy of each page, linked from the page head | `src/lib/llms.ts` |
| Page `<head>` | Title, description, canonical URL, Open Graph, X card | `src/lib/seo.ts` |
| Share image | One 1200x630 image per page and post (`og:image`, `twitter:image`), drawn from the page title and description | `src/lib/og.tsx`, `opengraph-image.tsx` and `twitter-image.tsx` next to each page |
| JSON-LD | Person, WebSite, ProfilePage, FAQPage, BreadcrumbList, apps, Blog and BlogPosting (schema.org) | `src/lib/seo.ts` |
| 404 page | Answers 404 with `noindex` and links to every page | `src/app/not-found.tsx` |

The JSON-LD only states what the site already says: no prices, ratings or download counts.

The voice, the words to avoid, the keywords and the questions each page answers are in [docs/brand-voice.md](docs/brand-voice.md).

## Deploying

Pushing to `main` deploys to production twice over: through Vercel's Git integration, and through the
`Deploy main to production` GitHub Action, which calls the project's Deploy Hook (`main-backup`). The
hook URL lives only in the repository secret `VERCEL_DEPLOY_HOOK`. The Action can also be run by hand
from the Actions tab.

## Dependency updates

Dependabot opens weekly pull requests for npm packages (minor and patch updates come grouped in one pull
request) and for GitHub Actions. CI (`.github/workflows/ci.yml`) runs `npm ci`, the tests, lint and the
build on each of them. `.github/dependabot.yml` holds back two major updates that do not work yet:

| Package | Held back | Why | Lift it when |
|---|---|---|---|
| `typescript` | 6.1 and later | TypeScript 7.0 has no JavaScript API and `typescript-eslint` 8 supports TypeScript below 6.1 only, so lint stops | TypeScript 7.1 ships its API and `typescript-eslint` supports it |
| `@types/node` | 25 and later | Vercel and CI run Node 24; newer types would allow APIs Node 24 lacks | the site moves to a newer Node |
