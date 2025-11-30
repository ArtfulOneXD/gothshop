export default function ReturnRefundPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 text-[var(--foreground)]">
      <h1 className="text-3xl font-semibold">
        Return and Refund Policy
      </h1>
      <p className="mt-2 text-[var(--muted)]">
        We want you to love your piece. If not, we can help.
      </p>

      <div className="mt-8 space-y-4">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--panel-strong)] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Eligibility</h2>
          <p className="mt-2 text-[var(--muted)]">
            Returns are accepted within 30 days of delivery in unworn, original condition with packaging.
          </p>
        </div>

        <div className="rounded-lg border border-[var(--border)] bg-[var(--panel-strong)] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Refunds</h2>
          <p className="mt-2 text-[var(--muted)]">
            Refunds are issued to the original payment method within 5–7 business days after inspection.
          </p>
        </div>

        <div className="rounded-lg border border-[var(--border)] bg-[var(--panel-strong)] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Exchanges</h2>
          <p className="mt-2 text-[var(--muted)]">
            Need a different size? Contact us and we will arrange a prepaid return label and ship your exchange once received.
          </p>
        </div>
      </div>
    </div>
  );
}
