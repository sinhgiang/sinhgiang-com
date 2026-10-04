import type { MetadataRoute } from "next";
import { absoluteUrl, allowedCrawlers } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: allowedCrawlers, allow: "/" },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
