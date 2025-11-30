"use client";

interface AddToCartButtonProps {
  productId: number;
}

export function AddToCartButton({ productId }: AddToCartButtonProps) {
  const handleClick = () => {
    console.log("Add to cart clicked for", productId);
    alert("Added to cart (demo only)");
  };

  return (
    <button
      onClick={handleClick}
      className="mt-4 w-full rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(177,18,38,0.35)] transition hover:bg-[#8c0e1e] hover:shadow-[0_14px_40px_rgba(177,18,38,0.45)]"
    >
      Add to cart
    </button>
  );
}
