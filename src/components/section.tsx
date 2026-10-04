import Link from "next/link";

export function Section({
  title,
  more,
  children,
}: {
  title: string;
  more?: { label: string; href: string };
  children: React.ReactNode;
}) {
  return (
    <section className="mt-16">
      <div className="mb-6 flex items-baseline justify-between">
        <h2 className="text-sm font-medium text-muted">{title}</h2>
        {more && (
          <Link href={more.href} className="text-sm text-muted hover:text-foreground">
            {more.label} →
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

export function PageTitle({ title, intro }: { title: string; intro?: string }) {
  return (
    <div className="pt-4">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      {intro && <p className="mt-3 leading-relaxed text-muted">{intro}</p>}
    </div>
  );
}
