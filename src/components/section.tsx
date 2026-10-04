export function PageTitle({ title, intro }: { title: string; intro?: string }) {
  return (
    <div className="pt-4">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      {intro && <p className="mt-3 leading-relaxed text-muted">{intro}</p>}
    </div>
  );
}
