const sizes = [
  { label: "Bracelets", tip: "Measure your wrist and add 0.5 in for a comfortable fit." },
  { label: "Necklaces", tip: "Chokers sit at 13–15 in; pendants sit at 18–22 in." },
  { label: "Rings", tip: "Use a ring sizer or wrap paper around your finger and measure the inner diameter." },
];

export default function SizeGuidePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 text-[var(--foreground)]">
      <h1 className="text-3xl font-semibold">Size Guide</h1>
      <p className="mt-2 text-[var(--muted)]">
        Use these quick tips to choose the right fit for every piece.
      </p>

      <div className="mt-8 space-y-4">
        {sizes.map((size) => (
          <div
            key={size.label}
            className="rounded-lg border border-[var(--border)] bg-[var(--panel-strong)] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.35)]"
          >
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              {size.label}
            </h2>
            <p className="mt-2 text-[var(--muted)]">{size.tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
