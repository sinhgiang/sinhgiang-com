import { links, profile } from "@/lib/site";

export function Footer() {
  return (
    <footer className="flex flex-col gap-2 border-t border-border py-8 text-sm text-muted sm:flex-row sm:justify-between">
      <span>{profile.name}</span>
      <span className="flex gap-4">
        {links.map((link) => (
          <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="hover:text-foreground">
            {link.label}
          </a>
        ))}
        <a href="#top" className="hover:text-foreground">
          Back to top ↑
        </a>
      </span>
    </footer>
  );
}
