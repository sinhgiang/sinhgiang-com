import { notFound } from "next/navigation";
import { ogSize, renderPostOg } from "@/lib/og";
import { posts, profile } from "@/lib/site";

// One image per post, built at build time like the post page.
export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export const alt = `A post by ${profile.name}`;
export const size = { width: ogSize.width, height: ogSize.height };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((candidate) => candidate.slug === slug);
  if (!post) notFound();
  return renderPostOg(post);
}
