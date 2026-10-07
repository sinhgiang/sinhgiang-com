# sinhgiang.com

Personal website of Sinh Giang: products, writing, stack and about.

- Next.js (App Router), Tailwind CSS, deployed on Vercel.
- All content lives in `src/lib/site.ts`: profile, products, stack, timeline, posts, and the title and description of each page.
- To publish a post, add it to `posts` in `src/lib/site.ts` (slug, title, date, summary, body). It gets its own page at `/writing/<slug>`, and the sitemap, `llms.txt`, `llms-full.txt` and the JSON-LD pick it up at the next build. The Writing page shows "Coming soon" while the list is empty.

```bash
npm ci
npm run dev   # http://localhost:3000
npm test      # checks llms.txt, sitemap, robots, metadata and JSON-LD
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
| JSON-LD | Person, WebSite, ProfilePage, apps, Blog and BlogPosting (schema.org) | `src/lib/seo.ts` |

The JSON-LD only states what the site already says: no prices, ratings or download counts.

## Deploying

Pushing to `main` deploys to production twice over: through Vercel's Git integration, and through the
`Deploy main to production` GitHub Action, which calls the project's Deploy Hook (`main-backup`). The
hook URL lives only in the repository secret `VERCEL_DEPLOY_HOOK`. The Action can also be run by hand
from the Actions tab.
