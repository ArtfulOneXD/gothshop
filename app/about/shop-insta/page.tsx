export default function ShopInstaPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 text-[var(--foreground)]">
      <h1 className="text-3xl font-semibold">Shop Insta</h1>
      <p className="mt-3 text-[var(--muted)]">
        Discover the pieces you have seen on our feed. Tag @goth.store and #GothStore for a chance to be featured.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {[1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className="aspect-square rounded-lg border border-[var(--border)] bg-[var(--panel-strong)] shadow-[0_18px_45px_rgba(0,0,0,0.35)]"
          >
            <div className="flex h-full w-full items-center justify-center text-[var(--muted)]">
              Insta look {index}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
