// Content for the site. Every fact here comes from the public GitHub profile
// (github.com/sinhgiang), the product websites, or GitHub repository and release dates.

export const profile = {
  name: "Sinh Giang",
  headline: "Founder and product builder from Vietnam.",
  intro:
    "I design AI products and ship them end to end with AI coding agents: from the idea and the spec to tests, release, store listing and support.",
  avatar: "/avatar.png",
};

export const links = [
  { label: "X", href: "https://x.com/sinhgiangfd" },
  { label: "GitHub", href: "https://github.com/sinhgiang" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sinh-giang/" },
  { label: "Facebook", href: "https://www.facebook.com/sinhyangfd" },
];

export const nav = [
  { label: "Writing", href: "/writing" },
  { label: "Projects", href: "/projects" },
  { label: "Stack", href: "/stack" },
  { label: "About", href: "/about" },
];

// Status as each product's own website states it (checked 2026-10-04).
export type ProductStatus = "Live" | "Coming soon" | "Private use";

export type Product = {
  name: string;
  // Official logo file from the product's repository or website.
  logo: string;
  // Optional full mark for sizes above 32 px, one file per page background.
  mark?: { light: string; dark: string };
  // Short slogan for the home page card, taken from the product's own website.
  slogan: string;
  tagline: string;
  status: ProductStatus;
  // Screenshot of the product's website, captured 2026-10-04.
  shot: string;
  url: string;
  platforms: string;
  builtWith?: string;
};

export const products: Product[] = [
  {
    name: "Wispra",
    logo: "/logos/wispra.png",
    slogan: "Press one key, speak, and your words appear in any app.",
    status: "Live",
    shot: "/shots/wispra.jpg",
    tagline: "Voice dictation and meeting notes for any app: speak, get clean text, summaries and posts.",
    url: "https://wispra-web.vercel.app",
    platforms: "Windows, macOS",
    builtWith: "Electron, Next.js, Supabase",
  },
  {
    name: "Lenvid",
    logo: "/logos/lenvid.svg",
    slogan: "Script, record, caption and cut a talking video in one app.",
    status: "Coming soon",
    shot: "/shots/lenvid.jpg",
    tagline: "AI teleprompter for creators: write the script, read it on camera, then caption and trim the clip.",
    url: "https://lenvid.vercel.app",
    platforms: "iPhone, Android",
    builtWith: "Flutter, Codemagic",
  },
  {
    name: "Revova",
    logo: "/logos/revova.svg",
    slogan: "Recover failed subscription payments on autopilot.",
    status: "Live",
    shot: "/shots/revova.jpg",
    tagline: "Payment recovery for subscription businesses: emails at the customer's local time, smart retries, win-back.",
    url: "https://revova.io",
    platforms: "Web",
  },
  {
    name: "Timio",
    logo: "/logos/timio.svg",
    slogan: "AI attendance with face recognition, leave and payroll.",
    status: "Live",
    shot: "/shots/timio.jpg",
    tagline: "AI attendance with face recognition, leave and payroll for small teams.",
    url: "https://timio.vn",
    platforms: "Web, iPhone, Android",
    builtWith: "Next.js",
  },
  {
    name: "Trekking Tour Sapa",
    logo: "/logos/trekkingtoursapa.webp",
    slogan: "Sapa trekking tours with local H'mong guides.",
    status: "Live",
    shot: "/shots/trekkingtoursapa.jpg",
    tagline: "Website and booking for a local H'mong-led trekking company in Sapa, Vietnam.",
    url: "https://trekkingtoursapa.com",
    platforms: "Web",
  },
  {
    name: "Helme",
    // Helme logo C: the small icon up to 32 px, the full wheel above that.
    logo: "/logos/helme-icon-small.svg",
    mark: { light: "/logos/helme-mark-on-light.svg", dark: "/logos/helme-mark-on-dark.svg" },
    slogan: "Run a team of AI agents from one screen.",
    status: "Private use",
    shot: "/shots/helme.jpg",
    tagline: "Run a team of AI coding agents from one screen. A Reviewer checks every change before merge.",
    url: "https://helme-web.vercel.app",
    platforms: "Windows",
  },
];

// Dates from GitHub: account creation, repository creation and release dates.
export const timeline = [
  { date: "Jan 2021", text: "Joined GitHub." },
  { date: "Jun 2026", text: "Released Wispra v0.1.0, the first version of the voice dictation app." },
  { date: "Jun 2026", text: "Created the repositories for Timio, Revova and the Trekking Tour Sapa website." },
  { date: "Sep 2026", text: "Started Lenvid, the AI teleprompter for iPhone and Android." },
  { date: "Sep 2026", text: "Started Helme, the control room I use to run one AI coding agent per project." },
  { date: "Oct 2026", text: "Launched the Helme website and this site." },
];

export type StackItem = { name: string; url: string; use: string };

export const stack: { group: string; items: StackItem[] }[] = [
  {
    group: "How I build",
    items: [
      {
        name: "Claude Code",
        url: "https://www.anthropic.com/claude-code",
        use: "Writes, tests and reviews the code under rules I set.",
      },
      {
        name: "Helme",
        url: "https://helme-web.vercel.app",
        use: "Runs one agent per project, a Chief of Staff that plans and a Reviewer before every merge.",
      },
      {
        name: "GitHub",
        url: "https://github.com/sinhgiang",
        use: "Every change goes through its own branch and a review before it is merged.",
      },
    ],
  },
  {
    group: "Web",
    items: [
      { name: "TypeScript", url: "https://www.typescriptlang.org", use: "The language for the web and desktop apps." },
      { name: "Next.js", url: "https://nextjs.org", use: "Timio, the Wispra website and this site." },
    ],
  },
  {
    group: "Desktop and mobile",
    items: [
      { name: "Electron", url: "https://www.electronjs.org", use: "The Wispra desktop app for Windows and macOS." },
      { name: "Flutter", url: "https://flutter.dev", use: "Lenvid for iPhone and Android." },
      { name: "Codemagic", url: "https://codemagic.io", use: "Builds the iOS and Android apps on every push." },
    ],
  },
  {
    group: "Backend and hosting",
    items: [
      { name: "Supabase", url: "https://supabase.com", use: "Database, sign-in and file storage." },
      { name: "Vercel", url: "https://vercel.com", use: "Hosting, with a preview for every branch." },
      { name: "Firebase", url: "https://firebase.google.com", use: "Push notifications and analytics for some apps." },
    ],
  },
];

export type Post = { slug: string; title: string; date: string; summary: string };

// Add posts here. The Writing page shows "Coming soon" while the list is empty.
export const posts: Post[] = [];
