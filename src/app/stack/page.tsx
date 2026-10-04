import type { Metadata } from "next";
import { PageTitle } from "@/components/section";
import { stack } from "@/lib/site";

export const metadata: Metadata = {
  title: "Stack",
  description: "The tools I use to design, build and ship my products.",
};

export default function StackPage() {
  return (
    <>
      <PageTitle title="Stack" intro="The tools I use every day to design, build and ship my products." />
      {stack.map((group) => (
        <section key={group.group} className="mt-12">
          <h2 className="mb-4 text-sm font-medium text-muted">{group.group}</h2>
          <ul className="divide-y divide-border">
            {group.items.map((item) => (
              <li key={item.name} className="grid gap-1 py-3 sm:grid-cols-[9rem_1fr] sm:gap-4">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium underline decoration-border underline-offset-4 hover:decoration-foreground"
                >
                  {item.name}
                </a>
                <span className="leading-relaxed text-muted">{item.use}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
