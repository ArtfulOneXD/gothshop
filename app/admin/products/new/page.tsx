import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

export default async function NewProductPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/auth/signin?callbackUrl=/admin/products/new");
  }
  if (session.user.role !== "ADMIN") {
    return (
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-xl border border-[var(--border)] bg-[var(--panel-strong)] p-8 text-center shadow-[0_24px_55px_rgba(0,0,0,0.35)]">
        <div className="text-5xl">🧛‍♂️</div>
        <h1 className="text-3xl font-semibold text-[var(--foreground)]">Not Enough Access</h1>
        <p className="text-[var(--muted)]">Only crowned admins may create new products.</p>
      </div>
    );
  }

  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <header className="rounded-xl border border-[var(--border)] bg-[var(--panel-strong)] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
        <p className="text-sm uppercase tracking-[0.18em] text-[var(--muted)]">Admin</p>
        <h1 className="text-3xl font-semibold text-[var(--foreground)]">Add New Product</h1>
        <p className="text-sm text-[var(--muted)]">
          Quick form for creating products. Image upload and variants can be added later.
        </p>
      </header>

      <form className="space-y-4 rounded-xl border border-[var(--border)] bg-[var(--panel-strong)] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm text-[var(--foreground)]">
            Title
            <input
              className="rounded-md border border-[var(--border)] bg-[var(--panel-soft)] px-3 py-2 text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none"
              placeholder="Product title"
              required
              name="title"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-[var(--foreground)]">
            <span className="flex items-center gap-2">
              Slug
              <span className="group relative inline-flex h-5 w-5 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--panel-soft)] text-[0.65rem] font-bold text-[var(--muted)]">
                !
                <span className="pointer-events-none absolute left-1/2 bottom-full z-10 mb-2 hidden w-56 -translate-x-1/2 rounded-md border border-[var(--border)] bg-[var(--panel-strong)] px-3 py-2 text-xs font-normal text-[var(--muted)] shadow-[0_12px_30px_rgba(0,0,0,0.35)] group-hover:block">
                  Lowercase, hyphen-separated URL ID (e.g., black-gothic-earrings).
                </span>
              </span>
            </span>
            <input
              className="rounded-md border border-[var(--border)] bg-[var(--panel-soft)] px-3 py-2 text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none"
              placeholder="black-gothic-earrings"
              required
              name="slug"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-[var(--foreground)]">
            <span className="flex items-center gap-2">
              SKU
              <span className="group relative inline-flex h-5 w-5 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--panel-soft)] text-[0.65rem] font-bold text-[var(--muted)]">
                !
                <span className="pointer-events-none absolute left-1/2 bottom-full z-10 mb-2 hidden w-56 -translate-x-1/2 rounded-md border border-[var(--border)] bg-[var(--panel-strong)] px-3 py-2 text-xs font-normal text-[var(--muted)] shadow-[0_12px_30px_rgba(0,0,0,0.35)] group-hover:block">
                  Stock Keeping Unit: your internal unique ID (e.g., BR-SNAKE-001).
                </span>
              </span>
            </span>
            <input
              className="rounded-md border border-[var(--border)] bg-[var(--panel-soft)] px-3 py-2 text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none"
              placeholder="BR-SNAKE-001"
              name="sku"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-[var(--foreground)]">
            Price (USD)
            <input
              type="number"
              step="0.01"
              className="rounded-md border border-[var(--border)] bg-[var(--panel-soft)] px-3 py-2 text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none"
              placeholder="39.00"
              required
              name="basePrice"
            />
          </label>
        </div>

        <label className="flex flex-col gap-2 text-sm text-[var(--foreground)]">
          Description
          <textarea
            className="rounded-md border border-[var(--border)] bg-[var(--panel-soft)] px-3 py-2 text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none"
            rows={4}
            placeholder="Describe the product..."
            name="description"
          />
        </label>

        <div className="grid gap-4 md:grid-cols-3">
          <label className="flex flex-col gap-2 text-sm text-[var(--foreground)]">
            Material
            <input
              className="rounded-md border border-[var(--border)] bg-[var(--panel-soft)] px-3 py-2 text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none"
              placeholder="Stainless steel"
              name="material"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-[var(--foreground)]">
            Style
            <input
              className="rounded-md border border-[var(--border)] bg-[var(--panel-soft)] px-3 py-2 text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none"
              placeholder="Gothic"
              name="style"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-[var(--foreground)]">
            Product Type
            <select
              className="rounded-md border border-[var(--border)] bg-[var(--panel-soft)] px-3 py-2 text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none"
              name="productType"
              defaultValue="OTHER"
            >
              <option value="BRACELET">Bracelet</option>
              <option value="EARRING">Earring</option>
              <option value="NECKLACE">Necklace</option>
              <option value="SPECIAL">Special</option>
              <option value="OTHER">Other</option>
            </select>
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm text-[var(--foreground)]">
            Category
            <select
              className="rounded-md border border-[var(--border)] bg-[var(--panel-soft)] px-3 py-2 text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none"
              name="categoryId"
              defaultValue=""
            >
              <option value="">Unassigned</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm text-[var(--foreground)]">
            <input
              type="checkbox"
              name="active"
              defaultChecked
              className="h-4 w-4 rounded border-[var(--border)] bg-[var(--panel-soft)] text-[var(--accent)] focus:ring-[var(--accent)]"
            />
            Active
          </label>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#8c0e1e]"
          >
            Save Product
          </button>
          <a
            href="/admin/products"
            className="rounded-md border border-[var(--border)] bg-[var(--panel-soft)] px-4 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--accent)]"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
