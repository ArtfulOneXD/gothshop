import ProductGrid from "@/components/ProductGrid";
import { prisma } from "@/lib/db";
import type { Product, ProductImage } from "@prisma/client";

type ProductWithImages = Product & { images: ProductImage[] };

export default async function AllCategoryPage() {
  const products = (await prisma.product.findMany({
    where: { active: true },
    include: { images: true },
    orderBy: { createdAt: "desc" },
  })) as ProductWithImages[];

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-semibold text-[var(--foreground)]">All Products</h1>
        <p className="text-sm text-[var(--muted)]">
          Showing {products.length} item{products.length === 1 ? "" : "s"}
        </p>
      </div>

      <ProductGrid products={products} />
    </div>
  );
}
