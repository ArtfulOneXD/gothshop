import type { Product, ProductImage } from "@prisma/client";
import ProductCard from "./ProductCard";

export type ProductWithImages = Product & { images: ProductImage[] };

type ProductGridProps = {
  products: ProductWithImages[];
};

export default function ProductGrid({ products }: ProductGridProps) {
  if (!products.length) {
    return (
      <div className="rounded-lg border border-dashed border-[var(--border)] bg-[var(--panel-strong)] p-8 text-center text-[var(--muted)]">
        No products found.
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
