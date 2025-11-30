import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-xl border border-[var(--border)] bg-[var(--panel-strong)] px-8 py-12 text-center shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
      <p className="text-sm uppercase tracking-[0.2em] text-[var(--muted)]">Error 404</p>
      <h1 className="text-3xl font-semibold text-[var(--foreground)]">Realm Not Found</h1>
      <p className="text-[var(--muted)]">
        The page you seek drifted into the shadows. Return to the collection and keep exploring.
      </p>
      <Link
        href="/"
        className="rounded-full border border-[var(--accent)] bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#8c0e1e]"
      >
        Back to Home
      </Link>
    </div>
  );
}
