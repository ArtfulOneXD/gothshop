export default function OurStoryPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 text-[var(--foreground)]">
      <h1 className="text-3xl font-semibold">Our Story</h1>
      <p className="mt-3 text-[var(--muted)]">
        Born in the twilight between streetwear grit and cathedral elegance, Goth Store was
        founded to craft jewelry that feels like a relic from a future myth.
      </p>

      <div className="mt-8 space-y-4">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--panel-strong)] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Design Code</h2>
          <p className="mt-2 text-[var(--muted)]">
            Each piece is sketched by hand, infused with gothic motifs, then forged with modern
            finishes for durability and everyday wear.
          </p>
        </div>

        <div className="rounded-lg border border-[var(--border)] bg-[var(--panel-strong)] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Made to Last</h2>
          <p className="mt-2 text-[var(--muted)]">
            We source stainless steel, sterling silver, and hypoallergenic alloys to ensure the
            pieces stay as bold as the day you unbox them.
          </p>
        </div>
      </div>
    </div>
  );
}
