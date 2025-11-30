"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Category, Product } from "@prisma/client";

type Props = {
  product: Product;
  categories: Category[];
};

export default function AdminProductEditForm({ product, categories }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    const res = await fetch(`/api/admin/products/${product.id}`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data?.error || "Unable to update product.");
      return;
    }
    router.push("/admin/products");
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border border-[var(--border)] bg-[var(--panel-strong)] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.35)]"
    >
      {error ? <p className="text-sm text-red-500">{error}</p> : null}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm text-[var(--foreground)]">
          Title
          <input
            name="title"
            defaultValue={product.title}
            className="rounded-md border border-[var(--border)] bg-[var(--panel-soft)] px-3 py-2 text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none"
            required
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-[var(--foreground)]">
          Slug
          <input
            name="slug"
            defaultValue={product.slug ?? ""}
            className="rounded-md border border-[var(--border)] bg-[var(--panel-soft)] px-3 py-2 text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none"
            required
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-[var(--foreground)]">
          SKU
          <input
            name="sku"
            defaultValue={product.sku ?? ""}
            className="rounded-md border border-[var(--border)] bg-[var(--panel-soft)] px-3 py-2 text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-[var(--foreground)]">
          Price (USD)
          <input
            name="basePrice"
            type="number"
            step="0.01"
            defaultValue={Number(product.basePrice)}
            className="rounded-md border border-[var(--border)] bg-[var(--panel-soft)] px-3 py-2 text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none"
            required
          />
        </label>
      </div>

      <label className="flex flex-col gap-2 text-sm text-[var(--foreground)]">
        Description
        <textarea
          name="description"
          defaultValue={product.description ?? ""}
          className="rounded-md border border-[var(--border)] bg-[var(--panel-soft)] px-3 py-2 text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none"
          rows={4}
        />
      </label>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="flex flex-col gap-2 text-sm text-[var(--foreground)]">
          Material
          <input
            name="material"
            defaultValue={product.material ?? ""}
            className="rounded-md border border-[var(--border)] bg-[var(--panel-soft)] px-3 py-2 text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-[var(--foreground)]">
          Style
          <input
            name="style"
            defaultValue={product.style ?? ""}
            className="rounded-md border border-[var(--border)] bg-[var(--panel-soft)] px-3 py-2 text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-[var(--foreground)]">
          Product Type
          <select
            name="productType"
            defaultValue={product.productType}
            className="rounded-md border border-[var(--border)] bg-[var(--panel-soft)] px-3 py-2 text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none"
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
            name="categoryId"
            defaultValue={product.categoryId ?? ""}
            className="rounded-md border border-[var(--border)] bg-[var(--panel-soft)] px-3 py-2 text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none"
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
            defaultChecked={product.active}
            className="h-4 w-4 rounded border-[var(--border)] bg-[var(--panel-soft)] text-[var(--accent)] focus:ring-[var(--accent)]"
          />
          Active
        </label>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#8c0e1e] disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
        <a
          href="/admin/products"
          className="rounded-md border border-[var(--border)] bg-[var(--panel-soft)] px-4 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--accent)]"
        >
          Cancel
        </a>
      </div>
    </form>
  );
}
