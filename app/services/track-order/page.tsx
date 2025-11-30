export default function TrackOrderPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 text-[var(--foreground)]">
      <h1 className="text-3xl font-semibold">Track Your Order</h1>
      <p className="mt-2 text-[var(--muted)]">
        Find the latest status of your shipment.
      </p>

      <div className="mt-8 space-y-4">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--panel-strong)] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">How to Track</h2>
          <p className="mt-2 text-[var(--muted)]">
            Check your inbox for the shipping confirmation email. It includes a tracking link updated by the carrier in real time.
          </p>
        </div>

        <div className="rounded-lg border border-[var(--border)] bg-[var(--panel-strong)] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Need Help?</h2>
          <p className="mt-2 text-[var(--muted)]">
            If you cannot find your tracking link, email us with your order number and we will resend it right away.
          </p>
        </div>
      </div>
    </div>
  );
}
