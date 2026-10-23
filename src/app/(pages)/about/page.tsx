import Link from "next/link";
import { Avatar } from "@/components/avatar";
import { PageTitle } from "@/components/section";
import { faq, howIWork, links, listNames, pages, products, profile } from "@/lib/site";
import { JsonLd } from "@/components/json-ld";
import { aboutJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("about");

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutJsonLd()} />
      <PageTitle title="About" />
      <div className="mt-8 flex items-center gap-4">
        <Avatar size={56} className="size-14" />
        <div>
          <p className="font-medium">{profile.name}</p>
          <p className="text-sm text-muted">Founder and product builder, Vietnam</p>
        </div>
      </div>

      <div className="mt-8 space-y-4 leading-relaxed">
        <p>{pages.about.answer}</p>
        <p>
          Right now I build {listNames(products.map((p) => p.name))}. See them all on the{" "}
          <Link href="/projects" className="underline underline-offset-4">
            Projects
          </Link>{" "}
          page.
        </p>
      </div>

      <h2 className="mt-12 mb-4 text-sm font-medium text-muted">How I work</h2>
      <ul className="list-disc space-y-3 pl-5 leading-relaxed marker:text-muted">
        {howIWork.map((item, index) => (
          <li key={item}>
            {item}
            {index === howIWork.length - 1 && (
              <>
                {" "}
                More on the{" "}
                <Link href="/stack" className="underline underline-offset-4">
                  Stack
                </Link>{" "}
                page.
              </>
            )}
          </li>
        ))}
      </ul>

      <h2 className="mt-12 mb-4 text-sm font-medium text-muted">Questions people ask</h2>
      <dl className="divide-y divide-border">
        {faq.map((item) => (
          <div key={item.question} className="py-4">
            <dt className="font-medium">{item.question}</dt>
            <dd className="mt-1 leading-relaxed text-muted">{item.answer}</dd>
          </div>
        ))}
      </dl>

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
