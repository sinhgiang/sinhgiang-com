import Link from "next/link";
import { posts } from "@/lib/site";

export function PostList() {
  if (posts.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border px-4 py-8 text-center text-muted">
        Coming soon.
      </div>
    );
  }

  return (
    <ul className="space-y-1">
      {posts.map((post) => (
        <li key={post.slug} className="flex items-baseline justify-between gap-4 py-2">
          <Link href={`/writing/${post.slug}`} className="underline decoration-border underline-offset-4 hover:decoration-foreground">
            {post.title}
          </Link>
          <time dateTime={post.date} className="shrink-0 font-mono text-sm text-muted tabular-nums">
            {post.date}
          </time>
        </li>
      ))}
    </ul>
  );
}
