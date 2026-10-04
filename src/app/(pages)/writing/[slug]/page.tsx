import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { PageTitle } from "@/components/section";
import { postJsonLd, postMetadata } from "@/lib/seo";
import { posts } from "@/lib/site";

// One page per post in src/lib/site.ts, built at build time.
export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

function findPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export async function generateMetadata({ params }: PageProps<"/writing/[slug]">) {
  const post = findPost((await params).slug);
  return post ? postMetadata(post) : {};
}

export default async function PostPage({ params }: PageProps<"/writing/[slug]">) {
  const post = findPost((await params).slug);
  if (!post) notFound();

  return (
    <article>
      <JsonLd data={postJsonLd(post)} />
      <PageTitle title={post.title} intro={post.summary} />
      <p className="mt-3 font-mono text-sm text-muted tabular-nums">
        <time dateTime={post.date}>{post.date}</time>
      </p>
      <div className="mt-10 space-y-5 leading-relaxed">
        {post.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
