import Image from "next/image";
import { products, type ProductStatus } from "@/lib/site";

const statusDot: Record<ProductStatus, string> = {
  Live: "bg-emerald-500",
  "Coming soon": "bg-amber-500",
  "Private use": "bg-neutral-400",
};

export function ProductGrid() {
  return (
    <ul className="grid gap-5 md:grid-cols-2 md:gap-6">
      {products.map((product, index) => (
        <li key={product.name}>
          <a
            href={product.url}
            target="_blank"
            rel="noreferrer"
            className="group flex h-full flex-col rounded-3xl bg-card p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] sm:p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <Image
                  src={product.logo}
                  alt=""
                  width={32}
                  height={32}
                  className="size-8 shrink-0 rounded-lg"
                />
                <h3 className="truncate text-lg font-bold tracking-tight">{product.name}</h3>
              </div>
              <span className="mt-1 inline-flex shrink-0 items-center gap-1.5 rounded-full bg-background px-2.5 py-1 text-xs font-medium text-muted">
                <span className={`size-1.5 rounded-full ${statusDot[product.status]}`} />
                {product.status}
              </span>
            </div>
            <p className="mt-2 text-[15px] leading-snug">{product.slogan}</p>
            <p className="mt-1 text-xs text-muted">{product.platforms}</p>
            <div className="relative mt-5 aspect-[2/1] overflow-hidden rounded-2xl border border-border">
              <Image
                src={product.shot}
                alt={`Screenshot of the ${product.name} website`}
                fill
                sizes="(min-width: 1024px) 400px, (min-width: 768px) 45vw, 100vw"
                priority={index < 2}
                className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
