import ProductGrid, { type ProductWithImages } from "@/components/ProductGrid";
import { prisma } from "@/lib/db";

export default async function HomePage() {
  const products: ProductWithImages[] = await prisma.product.findMany({
    where: { active: true },
    include: {
      images: true,
    },
    orderBy: { createdAt: "desc" },
    take: 12, // show a few items on homepage
  });

  return (
    <div className="flex w-full flex-col gap-8">
      <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-gradient-to-r from-[var(--ticker-start)] via-[var(--ticker-mid)] to-[var(--ticker-end)] border-y border-[var(--border)] py-3 shadow-[0_16px_40px_rgba(0,0,0,0.55)]">
        <div className="mx-auto max-w-6xl px-4">
          <p className="mb-1 text-xs uppercase tracking-[0.28em] text-[var(--muted)]">
            Upcoming Events
          </p>
          <div className="ticker">
            <div className="ticker-track">
              <div className="ticker-item text-[var(--foreground)]">
                ✦ Sacramento Arts Festival – Feb 22–24! Come visit our booth ✨ →{" "}
                <a
                  href="/events"
                  className="underline decoration-[var(--foreground)] decoration-2 underline-offset-4 transition hover:text-[var(--accent)]"
                >
                  See all events
                </a>
              </div>
              <div className="ticker-item text-[var(--foreground)]" aria-hidden="true">
                ✦ Sacramento Arts Festival – Feb 22–24! Come visit our booth ✨ →{" "}
                <a
                  href="/events"
                  className="underline decoration-[var(--foreground)] decoration-2 underline-offset-4 transition hover:text-[var(--accent)]"
                >
                  See all events
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HERO SECTION */}
      <section className="mx-auto w-full max-w-6xl rounded-xl bg-[linear-gradient(120deg,var(--hero-start),var(--hero-end))] p-12 text-[var(--foreground)] shadow-[0_24px_55px_rgba(0,0,0,0.35)]">
        <p className="mb-2 text-xs tracking-wide text-[var(--muted)]">NEW ARRIVALS</p>
        <h1 className="text-4xl font-bold text-[var(--foreground)]">
          Dark Jewelry for Everyday Rituals
        </h1>
        <p className="mt-4 max-w-xl text-[var(--muted)]">
          Handcrafted pieces forged from shadows and silver to elevate your look
          with a touch of midnight.
        </p>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="mx-auto w-full max-w-6xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Featured
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Curated for the modern goth.
          </p>
        </div>

        <ProductGrid products={products} />
      </section>
    </div>
  );
}
