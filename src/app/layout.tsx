import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { profile } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

const description = `${profile.headline} ${profile.intro}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: profile.name, template: `%s | ${profile.name}` },
  description,
  openGraph: {
    title: profile.name,
    description,
    type: "website",
    images: [{ url: profile.avatar, width: 400, height: 400, alt: profile.name }],
  },
  twitter: { card: "summary", creator: "@sinhgiangfd" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">
        <div id="top" className="mx-auto flex min-h-screen max-w-2xl flex-col px-5 sm:px-6">
          <Header />
          <main className="flex-1 pb-16">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
