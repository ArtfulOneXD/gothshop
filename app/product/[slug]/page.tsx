import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/ProductGallery";
import { AddToCartButton } from "@/components/AddToCartButton";
import type {
  Product,
  ProductImage,
  ProductVariant,
  Category,
} from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

type ProductWithRelations = Product & {
  images: ProductImage[];
  variants: ProductVariant[];
  category: Category | null;
};

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

// Helper: try slug, then numeric id
async function getProduct(
  slugOrId: string
): Promise<ProductWithRelations | null> {
  // 1) Try by slug
  let product = (await prisma.product.findUnique({
    where: { slug: slugOrId },
    include: {
      images: {
        orderBy: { sortOrder: "asc" },
      },
      variants: {
        where: { active: true },
        orderBy: { price: "asc" },
      },
      category: true,
    },
  })) as ProductWithRelations | null;

  // 2) If not found and looks like a number, try by id
  if (!product && /^\d+$/.test(slugOrId)) {
    product = (await prisma.product.findUnique({
      where: { id: Number(slugOrId) },
      include: {
        images: {
          orderBy: { sortOrder: "asc" },
        },
        variants: {
          where: { active: true },
          orderBy: { price: "asc" },
        },
        category: true,
      },
    })) as ProductWithRelations | null;
  }

  return product;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug: rawSlug } = await params;

  // Guard so Prisma never sees { slug: undefined }
  if (!rawSlug || typeof rawSlug !== "string") {
    notFound();
  }

  const product = await getProduct(rawSlug);
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user?.role === "ADMIN";

  if (!product) {
    notFound();
  }

  return (
    <div className="grid w-full gap-10 md:grid-cols-[1.1fr_minmax(0,1fr)]">
      {/* Gallery */}
      <ProductGallery images={product.images} alt={product.title} />

      {/* Details */}
      <div className="space-y-4">
        {isAdmin ? (
          <div className="flex items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--panel-strong)] px-3 py-1 text-xs font-semibold text-[var(--muted)] shadow-[0_8px_20px_rgba(0,0,0,0.12)]">
            <span className="rounded-full border border-[var(--border)] bg-[var(--panel-soft)] px-2 py-0.5 text-[var(--muted)]">
              Admin
            </span>
            <Link
              href={`/admin/products/${product.id}`}
              className="rounded-full border border-[var(--border)] bg-[var(--panel-strong)] px-3 py-1 text-[var(--accent)] shadow-[0_6px_18px_rgba(0,0,0,0.12)] transition hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-white hover:shadow-[0_12px_28px_rgba(0,0,0,0.2)]"
            >
              Edit this product
            </Link>
          </div>
        ) : null}
        <div>
          <h1 className="text-2xl font-semibold text-[var(--foreground)]">
            {product.title}
          </h1>
          {product.category && (
            <p className="mt-1 text-xs uppercase tracking-wide text-[var(--muted)]">
              {product.category.name}
            </p>
          )}
        </div>

        <div className="text-2xl font-semibold text-[var(--accent)]">
          ${Number(product.basePrice).toFixed(2)}
        </div>

        {product.description && (
          <p className="text-sm text-[var(--muted)]">{product.description}</p>
        )}

        <div className="grid gap-2 text-sm text-[var(--muted)]">
          {product.material && (
            <p>
              <span className="font-medium">Material:</span> {product.material}
            </p>
          )}
          {product.style && (
            <p>
              <span className="font-medium">Style:</span> {product.style}
            </p>
          )}
        </div>

        {/* Variants */}
        {product.variants.length > 0 && (
          <div className="space-y-2 text-sm text-[var(--muted)]">
            <h2 className="font-medium">Variants</h2>
            <ul className="list-disc pl-5">
              {product.variants.map((v) => (
                <li key={v.id}>
                  {v.name} – ${Number(v.price).toFixed(2)}{" "}
                  {v.stock <= 0 && (
                    <span className="text-red-500">(Out of stock)</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        <AddToCartButton productId={product.id} />
      </div>
    </div>
  );
}
