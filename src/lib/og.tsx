// Share images (Open Graph and X card), 1200x630, one per page. Each route has an
// opengraph-image.tsx and a twitter-image.tsx that call renderPageOg or renderPostOg.
// The text comes from src/lib/site.ts, so the image changes with the page.
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { pages, profile, siteUrl, type PageKey, type Post } from "./site";

export const ogSize = { width: 1200, height: 630 };

type OgContent = { title: string; subtitle: string; label: string };

export function pageOgContent(key: PageKey): OgContent {
  const page = pages[key];
  if (key === "home") return { title: profile.name, subtitle: page.description, label: "sinhgiang.com" };
  return { title: page.title, subtitle: page.description, label: `${profile.name} / ${page.title}` };
}

export function postOgContent(post: Post): OgContent {
  return { title: post.title, subtitle: post.summary, label: `${profile.name} / Writing` };
}

export function pageOgAlt(key: PageKey): string {
  return key === "home" ? `${profile.name}: ${profile.headline}` : `${profile.name}: ${pages[key].title}`;
}

async function avatarDataUri(): Promise<string> {
  const file = await readFile(join(process.cwd(), "public", profile.avatar));
  return `data:image/png;base64,${file.toString("base64")}`;
}

// Long titles get a smaller size so they stay on two lines.
function titleSize(title: string): number {
  if (title.length <= 14) return 104;
  if (title.length <= 32) return 76;
  return 58;
}

async function render({ title, subtitle, label }: OgContent): Promise<ImageResponse> {
  const avatar = await avatarDataUri();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0e0e0e",
          color: "#ececec",
          padding: "64px 72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              width: 72,
              height: 72,
              borderRadius: 36,
              overflow: "hidden",
              background: "linear-gradient(135deg, #fde68a, #fcd34d 50%, #fb923c)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> */}
            <img src={avatar} width={72} height={72} alt="" />
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#f0b43c", fontWeight: 700 }}>{label}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", fontSize: titleSize(title), fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
            {title}
          </div>
          <div style={{ display: "flex", fontSize: 32, lineHeight: 1.35, color: "#a8a8a8", maxWidth: 980 }}>
            {subtitle.length > 170 ? `${subtitle.slice(0, 167).trimEnd()}...` : subtitle}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 26, color: "#8a8a8a" }}>{siteUrl.replace("https://", "")}</div>
      </div>
    ),
    { ...ogSize },
  );
}

export function renderPageOg(key: PageKey): Promise<ImageResponse> {
  return render(pageOgContent(key));
}

export function renderPostOg(post: Post): Promise<ImageResponse> {
  return render(postOgContent(post));
}
