const reviews = [
  {
    name: "Aria M.",
    text: "The Crescent Moon choker feels like it was made for me. The weight, the shine, everything is perfect.",
  },
  {
    name: "Noah L.",
    text: "Finally jewelry that matches my wardrobe without feeling costume-y. The snake bracelet is my daily piece.",
  },
  {
    name: "Jules R.",
    text: "Fast shipping, beautiful packaging, and the quality is solid. Already eyeing my next purchase.",
  },
];

export default function ReviewsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 text-[var(--foreground)]">
      <h1 className="text-3xl font-semibold">Reviews</h1>
      <p className="mt-3 text-[var(--muted)]">
        Words from the community wearing Goth Store pieces every day.
      </p>

      <div className="mt-8 space-y-4">
        {reviews.map((review) => (
          <div
            key={review.name}
            className="rounded-lg border border-[var(--border)] bg-[var(--panel-strong)] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.35)]"
          >
            <p className="text-[var(--muted)]">“{review.text}”</p>
            <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">— {review.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
