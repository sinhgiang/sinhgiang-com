import { siFacebook, siGithub, siX } from "simple-icons";
import { links } from "@/lib/site";

// simple-icons no longer ships the LinkedIn mark, so it is drawn here.
const linkedinPath =
  "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z";

const paths: Record<string, string> = {
  X: siX.path,
  GitHub: siGithub.path,
  LinkedIn: linkedinPath,
  Facebook: siFacebook.path,
};

export function SocialIcons() {
  return (
    <ul className="flex gap-2">
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            target="_blank"
            rel="noreferrer"
            aria-label={link.label}
            title={link.label}
            className="flex size-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-card hover:text-foreground"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
              <path d={paths[link.label]} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
