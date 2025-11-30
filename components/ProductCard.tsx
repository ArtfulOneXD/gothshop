import Link from "next/link";
import Image from "next/image";
import type { Product, ProductImage } from "@prisma/client";

type ProductWithImages = Product & { images: ProductImage[] };

type ProductCardProps = {
  product: ProductWithImages;
};

function formatPrice(value: Product["basePrice"]) {
  const numeric = Number(value);
  if (Number.isFinite(numeric)) {
    return `$${numeric.toFixed(2)}`;
  }
  return "$0.00";
}

function getShortDescription(product: Product) {
  if (product.description) {
    const trimmed = product.description.trim();
    if (trimmed.length <= 120) return trimmed;
    return `${trimmed.slice(0, 117)}...`;
  }
  return "Beautifully crafted gothic jewelry.";
}

export default function ProductCard({ product }: ProductCardProps) {
  const href = product.slug ? `/product/${product.slug}` : `/product/${product.id}`;
  const primaryImage =
    product.images.find((img) => img.isPrimary) ?? product.images[0];

  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--panel-strong)] shadow-[0_18px_45px_rgba(0,0,0,0.35)] transition hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
    >
      <div className="relative h-48 w-full overflow-hidden bg-[var(--panel-muted)]">
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={primaryImage.altText || product.title}
            fill
            className="h-full w-full object-cover brightness-[0.94] contrast-[1.1] transition duration-300 group-hover:scale-105"
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            priority={false}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-[var(--muted)]">
            No image
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-lg font-semibold text-[var(--foreground)]">
          {product.title}
        </h3>
        <p className="text-sm text-[var(--muted)]">
          {getShortDescription(product)}
        </p>
        <div className="mt-auto text-base font-semibold text-[var(--foreground)]">
          {formatPrice(product.basePrice)}
        </div>
      </div>
    </Link>
  );
}

export type { ProductWithImages };
