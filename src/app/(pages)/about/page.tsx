import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageTitle } from "@/components/section";
import { links, products, profile } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: profile.headline,
};

export default function AboutPage() {
  return (
    <>
      <PageTitle title="About" />
      <div className="mt-8 flex items-center gap-4">
        <Image
          src={profile.avatar}
          alt={profile.name}
          width={56}
          height={56}
          className="size-14 rounded-full border border-border"
        />
        <div>
          <p className="font-medium">{profile.name}</p>
          <p className="text-sm text-muted">Founder and product builder, Vietnam</p>
        </div>
      </div>

      <div className="mt-8 space-y-4 leading-relaxed">
        <p>
          I&apos;m a founder and product builder from Vietnam. {profile.intro}
        </p>
        <p>
          Right now I build {products.map((p) => p.name).slice(0, -1).join(", ")} and{" "}
          {products[products.length - 1].name}. See them all on the{" "}
          <Link href="/projects" className="underline underline-offset-4">
            Projects
          </Link>{" "}
          page.
        </p>
      </div>

      <h2 className="mt-12 mb-4 text-sm font-medium text-muted">How I work</h2>
      <ul className="list-disc space-y-3 pl-5 leading-relaxed marker:text-muted">
        <li>
          I own the product: the spec, the decisions and the final review. AI coding agents write, test and review the
          code under rules I set.
        </li>
        <li>Every change goes through its own branch, automated tests and a review before it is merged and shipped.</li>
        <li>
          I ship with TypeScript, Next.js, Electron, Flutter, Supabase, Vercel and Codemagic. More on the{" "}
          <Link href="/stack" className="underline underline-offset-4">
            Stack
          </Link>{" "}
          page.
        </li>
      </ul>

      <h2 className="mt-12 mb-4 text-sm font-medium text-muted">Find me</h2>
      <p className="flex gap-4">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-border underline-offset-4 hover:decoration-foreground"
          >
            {link.label}
          </a>
        ))}
      </p>
    </>
  );
}
