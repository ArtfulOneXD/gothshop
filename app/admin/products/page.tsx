import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function AdminProductsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/auth/signin?callbackUrl=/admin/products");
  }

  if (session.user.role !== "ADMIN") {
    return (
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-xl border border-[var(--border)] bg-[var(--panel-strong)] p-8 text-center shadow-[0_24px_55px_rgba(0,0,0,0.35)]">
        <div className="text-5xl">🧛‍♂️</div>
        <h1 className="text-3xl font-semibold text-[var(--foreground)]">Not Enough Access</h1>
        <p className="text-[var(--muted)]">
          The gate to the vault is sealed. Only crowned admins may pass.
        </p>
        <p className="text-sm text-[var(--muted)]">
          If you believe this is a mistake, whisper to the administrator of shadows.
        </p>
      </div>
    );
  }

  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });

  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: {
      products: {
        include: { category: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  const uncategorized = products.filter((p) => !p.categoryId);

  const categoryImages: Record<string, string> = {
    bracelets:
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=1600&q=80", // bracelet stack
    earrings:
      "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=1600&q=80", // earrings close-up
    necklaces:
      "https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&w=1600&q=80", // layered necklaces
    special:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1600&q=80", // dramatic jewelry
    default:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80",
  };

  return (
    <div className="space-y-6">
      <header className="rounded-xl border border-[var(--border)] bg-[var(--panel-strong)] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-[var(--muted)]">Admin</p>
            <h1 className="text-3xl font-semibold text-[var(--foreground)]">
              Product Management
            </h1>
            <p className="text-sm text-[var(--muted)]">
              View all products. Editing/creation can be added here later.
            </p>
          </div>
          <Link
            href="/admin/products/new"
            className="whitespace-nowrap rounded-full border border-[var(--accent)] bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#8c0e1e]"
          >
            + Add Product
          </Link>
        </div>
      </header>

      <div className="space-y-6">
        {categories.map((category) => {
          const img = categoryImages[category.slug] ?? categoryImages.default;
          return (
            <div
              key={category.id}
              className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--panel-strong)] shadow-[0_18px_45px_rgba(0,0,0,0.35)]"
            >
              <div className="relative h-32 w-full">
                <Image
                  src={img}
                  alt={category.name}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/10" />
                <div className="absolute inset-0 flex items-center justify-between px-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-300">Category</p>
                    <h2 className="text-xl font-semibold text-white">{category.name}</h2>
                  </div>
                  <p className="text-sm font-semibold text-white/80">
                    {category.products.length} item{category.products.length === 1 ? "" : "s"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 bg-[var(--panel-soft)] px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                <span>Title</span>
                <span>SKU</span>
                <span>Price</span>
                <span>Type</span>
                <span>Status</span>
              </div>
              <div className="divide-y divide-[var(--border)]">
                {category.products.length === 0 ? (
                  <div className="px-4 py-6 text-sm text-[var(--muted)]">No products yet.</div>
                ) : (
                  category.products.map((product) => (
                    <div
                      key={product.id}
                      className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] items-center gap-4 px-4 py-3 text-sm text-[var(--foreground)] hover:bg-[var(--panel-soft)]"
                    >
                      <Link
                        href={product.slug ? `/product/${product.slug}` : `/product/${product.id}`}
                        className="font-semibold underline decoration-[var(--muted)] underline-offset-4 hover:decoration-[var(--accent)]"
                      >
                        {product.title}
                      </Link>
                      <span className="text-[var(--muted)]">{product.sku || "—"}</span>
                      <span className="text-[var(--accent)]">
                        ${Number(product.basePrice).toFixed(2)}
                      </span>
                      <span className="text-[var(--muted)]">{product.productType}</span>
                      <span className="text-[var(--muted)]">
                        {product.active ? "Active" : "Inactive"}{" "}
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="ml-2 text-xs font-semibold text-[var(--accent)] underline underline-offset-4"
                        >
                          Edit
                        </Link>
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}

        {uncategorized.length > 0 ? (
          <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--panel-strong)] shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
            <div className="relative h-32 w-full">
              <div className="absolute inset-0 bg-[var(--panel-soft)]" />
              <div className="absolute inset-0 flex items-center justify-between px-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Category</p>
                  <h2 className="text-xl font-semibold text-[var(--foreground)]">Unassigned</h2>
                </div>
                <p className="text-sm font-semibold text-[var(--muted)]">
                  {uncategorized.length} item{uncategorized.length === 1 ? "" : "s"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 bg-[var(--panel-soft)] px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
              <span>Title</span>
              <span>SKU</span>
              <span>Price</span>
              <span>Type</span>
              <span>Status</span>
            </div>
            <div className="divide-y divide-[var(--border)]">
              {uncategorized.map((product) => (
                <div
                  key={product.id}
                  className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] items-center gap-4 px-4 py-3 text-sm text-[var(--foreground)] hover:bg-[var(--panel-soft)]"
                >
                  <Link
                    href={product.slug ? `/product/${product.slug}` : `/product/${product.id}`}
                    className="font-semibold underline decoration-[var(--muted)] underline-offset-4 hover:decoration-[var(--accent)]"
                  >
                    {product.title}
                  </Link>
                  <span className="text-[var(--muted)]">{product.sku || "—"}</span>
                  <span className="text-[var(--accent)]">
                    ${Number(product.basePrice).toFixed(2)}
                  </span>
                  <span className="text-[var(--muted)]">{product.productType}</span>
                  <span className="text-[var(--muted)]">
                    {product.active ? "Active" : "Inactive"}{" "}
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="ml-2 text-xs font-semibold text-[var(--accent)] underline underline-offset-4"
                    >
                      Edit
                    </Link>
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
