export default function ShippingPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 text-[var(--foreground)]">
      <h1 className="text-3xl font-semibold">Shipping Policy</h1>
      <p className="mt-2 text-[var(--muted)]">
        Delivery timelines and details for every order.
      </p>

      <div className="mt-8 space-y-4">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--panel-strong)] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Processing Time</h2>
          <p className="mt-2 text-[var(--muted)]">
            Orders ship within 2 business days. Made-to-order pieces may require an additional 2 days.
          </p>
        </div>

        <div className="rounded-lg border border-[var(--border)] bg-[var(--panel-strong)] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Transit Estimates</h2>
          <p className="mt-2 text-[var(--muted)]">
            Domestic: 3–5 business days via standard shipping. International: 7–14 business days depending on destination.
          </p>
        </div>

        <div className="rounded-lg border border-[var(--border)] bg-[var(--panel-strong)] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Tracking</h2>
          <p className="mt-2 text-[var(--muted)]">
            You will receive a tracking link by email once your order is in transit.
          </p>
        </div>
      </div>
    </div>
  );
}
