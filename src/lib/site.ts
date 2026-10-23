// Content for the site. Every fact here comes from the public GitHub profile
// (github.com/sinhgiang), the product websites, or GitHub repository and release dates.

// The canonical address of the site. Every absolute URL (canonical, sitemap,
// llms.txt, JSON-LD) is built from it.
export const siteUrl = "https://sinhgiang.com";

export const profile = {
  name: "Sinh Giang",
  headline: "Founder and product builder from Vietnam.",
  role: "Founder and product builder",
  country: "Vietnam",
  intro:
    "I design AI products and ship them end to end with AI coding agents: from the idea and the spec to tests, release, store listing and support.",
  avatar: "/avatar.png",
};

// From the "How I work" section of the GitHub profile README.
export const howIWork = [
  "I own the product: the spec, the decisions and the final review. AI coding agents write, test and review the code under rules I set.",
  "Every change goes through its own branch, automated tests and a review before it is merged and shipped.",
  "I ship with TypeScript, Next.js, Electron, Flutter, Supabase, Vercel and Codemagic.",
];

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
  // schema.org type for JSON-LD: an app, or a website built for a client.
  schemaType: "SoftwareApplication" | "MobileApplication" | "WebApplication" | "WebSite";
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
    schemaType: "SoftwareApplication",
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
    schemaType: "MobileApplication",
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
    schemaType: "WebApplication",
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
    schemaType: "WebApplication",
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
    schemaType: "WebSite",
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
    schemaType: "SoftwareApplication",
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

export type Post = {
  slug: string;
  title: string;
  // Publication date, YYYY-MM-DD.
  date: string;
  // One or two sentences that answer what the post is about.
  summary: string;
  // The post itself, one string per paragraph.
  body: string[];
};

// Add posts here, newest first. Each post gets its own page at /writing/<slug>,
// and the sitemap, llms.txt and llms-full.txt pick it up at the next build.
// The Writing page shows "Coming soon" while the list is empty.
export const posts: Post[] = [];

const statusLabel: Record<ProductStatus, string> = {
  Live: "Live",
  "Coming soon": "Coming soon",
  "Private use": "In private use",
};

// "Live: A, B and C. Coming soon: D. In private use: E." Built from the product list.
function statusSummary(list: Product[]): string {
  return (Object.keys(statusLabel) as ProductStatus[])
    .map((status) => ({ status, names: list.filter((p) => p.status === status).map((p) => p.name) }))
    .filter((group) => group.names.length > 0)
    .map((group) => `${statusLabel[group.status]}: ${listNames(group.names)}.`)
    .join(" ");
}

// The short, direct answer that opens each inner page. The same text is shown on
// the page, repeated in the Markdown copy and in llms.txt, so a fact lives in one place.
const answers = {
  writing: `I write notes on designing AI products and shipping them with AI coding agents.${
    posts.length === 0 ? " The first posts are coming soon." : ` There ${posts.length === 1 ? "is 1 post" : `are ${posts.length} posts`} so far.`
  }`,
  projects: `I've built ${products.length} products with AI coding agents. ${statusSummary(products)}`,
  stack:
    "I write code with Claude Code, run one agent per project with Helme, review every change on GitHub and host on Vercel. Web apps use TypeScript and Next.js, the desktop app Electron and the mobile app Flutter. Supabase holds the data.",
  about: `I'm ${profile.name}, a ${profile.role.toLowerCase()} from ${profile.country}. ${profile.intro}`,
};

// Questions people ask about the site's owner, answered from the data above.
// Shown on the About page, in the FAQPage JSON-LD, in about.md and in llms-full.txt.
const helme = products.find((product) => product.name === "Helme");

export const faq: { question: string; answer: string }[] = [
  {
    question: `Who is ${profile.name}?`,
    answer: `I'm a ${profile.role.toLowerCase()} from ${profile.country}. I've built ${products.length} products with AI coding agents, and I own the spec, the decisions and the final review of each.`,
  },
  {
    question: `What products has ${profile.name} built?`,
    answer: `${products.length} products: ${listNames(products.map((p) => p.name))}. ${statusSummary(products)}`,
  },
  {
    question: `How does ${profile.name} build products with AI coding agents?`,
    answer: `${howIWork[0]} ${howIWork[1]}`,
  },
  {
    question: `Which tools does ${profile.name} use?`,
    answer: `${howIWork[2]} The full list is on the Stack page.`,
  },
  ...(helme
    ? [
        {
          question: "Can I use Helme?",
          answer: `${helme.status === "Private use" ? "Not yet. Helme is in private use today." : `Helme is ${helme.status.toLowerCase()}.`} It is the control room I use to run one AI coding agent per project. More at ${helme.url.replace("https://", "")}.`,
        },
      ]
    : []),
  {
    question: `Where can I follow ${profile.name}'s work?`,
    answer: `On ${listNames(links.map((link) => link.label))}. Code and releases are on GitHub.`,
  },
];

// Title and description of each page, used for metadata, the sitemap and llms.txt.
// `answer` is the short answer that opens the page (the home page opens with its own lead).
export const pages = {
  home: {
    path: "/",
    title: `${profile.name}, founder and product builder from Vietnam`,
    description: `${profile.name} is a founder and product builder from Vietnam who designs AI products and ships them end to end with AI coding agents.`,
  },
  writing: {
    path: "/writing",
    title: "Writing",
    description: `Notes by ${profile.name} on designing AI products and shipping them with AI coding agents.`,
    answer: answers.writing,
  },
  projects: {
    path: "/projects",
    title: "Projects",
    description: `Products ${profile.name} designs and ships with AI coding agents: ${listNames(products.map((p) => p.name))}.`,
    answer: answers.projects,
  },
  stack: {
    path: "/stack",
    title: "Stack",
    description: `The tools ${profile.name} uses to build and ship products, from Claude Code and Helme to Next.js, Flutter, Supabase and Vercel.`,
    answer: answers.stack,
  },
  about: {
    path: "/about",
    title: "About",
    description: `About ${profile.name}, a founder and product builder from Vietnam who ships AI products end to end with AI coding agents.`,
    answer: answers.about,
  },
} as const;

export type PageKey = keyof typeof pages;
export type AnswerPageKey = Exclude<PageKey, "home">;

export function listNames(names: string[]): string {
  return names.length < 2 ? names.join("") : `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}
