import ProductGrid from "@/components/ProductGrid";
import { prisma } from "@/lib/db";
import type { Product, ProductImage } from "@prisma/client";
import { notFound } from "next/navigation";

type ProductWithImages = Product & { images: ProductImage[] };

interface CategoryPageProps {
  params: { slug: string };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const slug = params.slug;

  // slug must be like "bracelets", "earrings", "necklaces"
  if (!slug || typeof slug !== "string") {
    notFound();
  }

  const category = await prisma.category.findUnique({
    where: { slug }, // uses the Category.slug column which is @unique
    include: {
      products: {
        where: { active: true },
        include: { images: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!category) {
    // if there is no row with this slug, show 404
    notFound();
  }

  const products = category.products as ProductWithImages[];

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-semibold text-[var(--foreground)]">
          {category.name}
        </h1>
        <p className="text-sm text-[var(--muted)]">
          Showing {products.length} item{products.length === 1 ? "" : "s"}
        </p>
      </div>

      <ProductGrid products={products} />
    </div>
  );
}
