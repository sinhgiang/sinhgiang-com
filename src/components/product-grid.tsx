import Image from "next/image";
import { products } from "@/lib/site";

export function ProductGrid() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {products.map((product) => (
        <li key={product.name}>
          <a
            href={product.url}
            target="_blank"
            rel="noreferrer"
            className="flex h-full gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-card-hover"
          >
            <Image
              src={product.logo}
              alt={`${product.name} logo`}
              width={40}
              height={40}
              className="size-10 shrink-0 rounded-lg"
            />
            <div className="min-w-0">
              <p className="font-medium">{product.name}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{product.tagline}</p>
              <p className="mt-2 text-xs text-muted">{new URL(product.url).host} ↗</p>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
