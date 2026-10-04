import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { pages, profile, siteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Defaults for every page. Each page sets its own title, description,
// canonical URL and Open Graph data through src/lib/seo.ts.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: pages.home.title, template: `%s | ${profile.name}` },
  description: pages.home.description,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body id="top" className="min-h-full font-sans">
        {children}
      </body>
    </html>
  );
}
