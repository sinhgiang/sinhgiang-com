import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { PageTitle } from "@/components/section";
import { nav } from "@/lib/site";

// Next.js answers with status 404 and adds noindex by itself.
export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-5 sm:px-6">
      <Header />
      <main className="flex-1 pb-16">
        <PageTitle
          title="This page doesn't exist"
          intro="The address may have a typo, or the page moved. Start from the home page or one of the pages below."
        />
        <ul className="mt-8 space-y-2">
          {[{ label: "Home", href: "/" }, ...nav].map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="underline decoration-border underline-offset-4 hover:decoration-foreground">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
}
