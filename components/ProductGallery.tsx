import Image from "next/image";
import type { ProductImage } from "@prisma/client";

type ProductGalleryProps = {
  images: ProductImage[];
  alt: string;
};

export default function ProductGallery({ images, alt }: ProductGalleryProps) {
  const mainImage = images[0];

  if (!mainImage) {
    return (
      <div className="flex aspect-square w-full items-center justify-center rounded-lg border border-dashed border-[var(--border)] bg-[var(--panel-muted)] text-[var(--muted)]">
        No image available
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--panel-muted)]">
        <Image
          src={mainImage.url}
          alt={mainImage.altText || alt}
          fill
          className="object-cover brightness-[0.96] contrast-[1.1]"
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority
        />
      </div>

      {images.length > 1 ? (
        <div className="grid grid-cols-4 gap-3">
          {images.map((image) => (
            <div
              key={image.id}
              className="relative aspect-square overflow-hidden rounded-md border border-[var(--border)] bg-[var(--panel-soft)]"
            >
              <Image
                src={image.url}
                alt={image.altText || alt}
                fill
                className="object-cover brightness-[0.96] contrast-[1.08] transition duration-300 hover:scale-105"
                sizes="150px"
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
