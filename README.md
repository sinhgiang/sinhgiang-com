# sinhgiang.com

Personal website of Sinh Giang: products, writing, stack and about.

- Next.js (App Router), Tailwind CSS, deployed on Vercel.
- All content lives in `src/lib/site.ts`. Add a post to `posts` there; the Writing page shows "Coming soon" while it is empty.

```bash
npm install
npm run dev   # http://localhost:3000
npm run build
```

## Deploying

Pushing to `main` deploys to production twice over: through Vercel's Git integration, and through the
`Deploy main to production` GitHub Action, which calls the project's Deploy Hook (`main-backup`). The
hook URL lives only in the repository secret `VERCEL_DEPLOY_HOOK`. The Action can also be run by hand
from the Actions tab.
