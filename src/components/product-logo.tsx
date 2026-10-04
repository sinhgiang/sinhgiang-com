import Image from "next/image";
import type { Product } from "@/lib/site";

// Logos up to 32 px use the product's icon file. Above that, a product with a
// full mark shows the version made for the current page background.
export function ProductLogo({ product, size, alt = "" }: { product: Product; size: 32 | 40; alt?: string }) {
  const sizeClass = size === 32 ? "size-8" : "size-10";

  if (size > 32 && product.mark) {
    return (
      <>
        <Image
          src={product.mark.light}
          alt={alt}
          width={size}
          height={size}
          className={`${sizeClass} shrink-0 dark:hidden`}
        />
        <Image
          src={product.mark.dark}
          alt={alt}
          width={size}
          height={size}
          className={`${sizeClass} hidden shrink-0 dark:block`}
        />
      </>
    );
  }

  return (
    <Image
      src={product.logo}
      alt={alt}
      width={size}
      height={size}
      className={`${sizeClass} shrink-0 rounded-lg`}
    />
  );
}
