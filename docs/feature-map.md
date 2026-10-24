# Feature map

## Features

- Home page (profile, product grid, timeline): `src/app/page.tsx`, `src/components/product-grid.tsx`, `src/components/timeline.tsx`; the user gets there by `/`.
- Writing (list and one page per post): `src/app/(pages)/writing/page.tsx`, `src/app/(pages)/writing/[slug]/page.tsx`, `src/components/post-list.tsx`; by `/writing` and `/writing/<slug>`. Shows "Coming soon" while `posts` is empty.
- Projects, Stack, About: `src/app/(pages)/projects/page.tsx`, `stack/page.tsx`, `about/page.tsx`; by the menu in `src/components/header.tsx`.
- Page content (profile, links, products, stack, timeline, posts): `src/lib/site.ts`. Nothing else holds copy.
- Product logos and screenshots: `public/logos`, `public/shots`, `src/components/product-logo.tsx`.
- SEO and AI search: `src/lib/seo.ts` (metadata, JSON-LD), `src/lib/llms.ts` (llms.txt, llms-full.txt, Markdown copies), `src/app/robots.ts`, `src/app/sitemap.ts`, `src/app/*.md/route.ts`, `src/app/llms*.txt/route.ts`.
- Security headers (CSP, HSTS, nosniff, Referrer-Policy, X-Frame-Options, Permissions-Policy): `next.config.ts`, checked by `src/lib/headers.test.ts`.
- CI and deploy: `.github/workflows/ci.yml` (`npm ci`, test, lint, build), `.github/workflows/deploy-main.yml` (production deploy hook), `.github/dependabot.yml`.

The site has no login, database, form or API route that takes input, so there is no user data.

## Run and check

- Open it: `npm ci`, then `npm run dev` and open http://localhost:3000. For the production build: `npm run build`, then `npm run start`.
- Test account: none needed; the site has no sign-in.
- Main flow to go through: open `/`; check the product grid and the timeline; open Projects, Stack, About and Writing from the menu; open `/llms.txt`, `/robots.txt` and `/sitemap.xml`; do it again at a phone width (390x844).
- Checks: `npm test` (vitest), `npm run lint`, `npm run build`. CI runs the same three.
- Screenshot: helme-browser (`navigate_page`, `resize_page` 1440x900 and 390x844, `take_screenshot`).
