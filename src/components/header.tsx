"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, profile } from "@/lib/site";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between gap-4 py-8">
      <Link href="/" className="font-medium tracking-tight">
        {profile.name}
      </Link>
      <nav className="flex gap-4 text-sm sm:gap-6">
        {nav.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={active ? "text-foreground" : "text-muted transition-colors hover:text-foreground"}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
