import Image from "next/image";
import { PostList } from "@/components/post-list";
import { ProductGrid } from "@/components/product-grid";
import { Section } from "@/components/section";
import { Timeline } from "@/components/timeline";
import { links, profile } from "@/lib/site";

export default function Home() {
  return (
    <>
      <section className="pt-4">
        <Image
          src={profile.avatar}
          alt={profile.name}
          width={80}
          height={80}
          priority
          className="size-20 rounded-full border border-border"
        />
        <h1 className="mt-6 text-2xl font-semibold tracking-tight sm:text-3xl">Hi, I&apos;m {profile.name}.</h1>
        <p className="mt-4 text-lg leading-relaxed">{profile.headline}</p>
        <p className="mt-2 leading-relaxed text-muted">{profile.intro}</p>
        <p className="mt-6 flex gap-4 text-sm">
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
      </section>

      <Section title="Products" more={{ label: "All projects", href: "/projects" }}>
        <ProductGrid />
      </Section>

      <Section title="Writing" more={{ label: "All writing", href: "/writing" }}>
        <PostList />
      </Section>

      <Section title="Timeline">
        <Timeline />
      </Section>
    </>
  );
}
