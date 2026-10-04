import { ProductLogo } from "@/components/product-logo";
import { PageTitle } from "@/components/section";
import { products } from "@/lib/site";
import { JsonLd } from "@/components/json-ld";
import { projectsJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("projects");

export default function ProjectsPage() {
  return (
    <>
      <JsonLd data={projectsJsonLd()} />
      <PageTitle
        title="Projects"
        intro="Products I design and ship end to end with AI coding agents. I own the spec, the decisions and the final review."
      />
      <ul className="mt-10 divide-y divide-border">
        {products.map((product) => (
          <li key={product.name} className="flex gap-4 py-6">
            <ProductLogo product={product} size={40} alt={`${product.name} logo`} />
            <div className="min-w-0">
              <h2 className="font-medium">
                <a
                  href={product.url}
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-border underline-offset-4 hover:decoration-foreground"
                >
                  {product.name}
                </a>
              </h2>
              <p className="mt-1 leading-relaxed text-muted">{product.tagline}</p>
              <dl className="mt-3 grid grid-cols-[5.5rem_1fr] gap-x-4 gap-y-1 text-sm">
                <dt className="text-muted">Platforms</dt>
                <dd>{product.platforms}</dd>
                {product.builtWith && (
                  <>
                    <dt className="text-muted">Built with</dt>
                    <dd>{product.builtWith}</dd>
                  </>
                )}
                <dt className="text-muted">Website</dt>
                <dd className="truncate">
                  <a href={product.url} target="_blank" rel="noreferrer" className="hover:underline">
                    {new URL(product.url).host}
                  </a>
                </dd>
              </dl>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
