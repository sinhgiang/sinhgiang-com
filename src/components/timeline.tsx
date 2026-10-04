import { timeline } from "@/lib/site";

export function Timeline() {
  return (
    <>
      <ol className="space-y-4">
        {timeline.map((entry) => (
          <li key={entry.text} className="grid grid-cols-[5.5rem_1fr] gap-4 leading-relaxed">
            <span className="font-mono text-sm text-muted tabular-nums">{entry.date}</span>
            <span>{entry.text}</span>
          </li>
        ))}
      </ol>
      <p className="mt-6 text-sm text-muted">
        Dates from my{" "}
        <a href="https://github.com/sinhgiang" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-foreground">
          GitHub
        </a>{" "}
        repositories and releases.
      </p>
    </>
  );
}
