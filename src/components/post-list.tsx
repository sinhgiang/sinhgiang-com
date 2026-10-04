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
          <span>{post.title}</span>
          <span className="shrink-0 font-mono text-sm text-muted tabular-nums">{post.date}</span>
        </li>
      ))}
    </ul>
  );
}
