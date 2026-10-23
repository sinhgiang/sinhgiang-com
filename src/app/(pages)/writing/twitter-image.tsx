import { ogSize, pageOgAlt, renderPageOg } from "@/lib/og";

export const alt = pageOgAlt("writing");
export const size = { width: ogSize.width, height: ogSize.height };
export const contentType = "image/png";

export default function Image() {
  return renderPageOg("writing");
}
