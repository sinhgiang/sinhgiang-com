import Link from "next/link";
import { Avatar } from "@/components/avatar";
import { ProductGrid } from "@/components/product-grid";
import { SocialIcons } from "@/components/social-icons";
import { Timeline } from "@/components/timeline";
import { nav, products, profile } from "@/lib/site";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-12">
      <nav className="flex justify-end gap-5 py-6 text-sm text-muted">
        {nav.map((item) => (
          <Link key={item.href} href={item.href} className="transition-colors hover:text-foreground">
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16 xl:gap-24">
        <aside className="lg:sticky lg:top-10 lg:self-start">
          <Avatar size={176} priority className="size-36 sm:size-44" />

          <h1 className="mt-7 text-4xl font-extrabold tracking-tight sm:text-5xl">{profile.name}</h1>

          <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-muted">
            <span className="inline-flex items-center gap-1.5">
              <PinIcon />
              Vietnam
            </span>
            <span className="inline-flex items-center gap-1.5">
              <BoxIcon />
              {products.length} products
            </span>
          </p>

          <p className="mt-7 text-lg font-bold leading-snug">
            I&apos;ve built {products.length} products with AI coding agents.
          </p>

          <ul className="mt-4 space-y-1.5">
            <li>
              <a
                href="https://helme-web.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-accent underline underline-offset-4"
              >
                Helme
              </a>{" "}
              <span className="text-muted">(how I run my agents)</span>
            </li>
            <li>
              <a
                href="https://github.com/sinhgiang"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-accent underline underline-offset-4"
              >
                My GitHub
              </a>{" "}
              <span className="text-muted">(code and releases)</span>
            </li>
          </ul>

          <p className="mt-6 leading-relaxed">
            {profile.headline} {profile.intro}
          </p>

          <div className="-ml-2.5 mt-6">
            <SocialIcons />
          </div>
        </aside>

        <main>
          <ProductGrid />

          <section className="mt-6 rounded-3xl bg-card p-6 sm:p-8">
            <h2 className="mb-6 text-lg font-bold tracking-tight">Timeline</h2>
            <Timeline />
          </section>
        </main>
      </div>
    </div>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function BoxIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}
