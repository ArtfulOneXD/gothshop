export default function PaymentPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 text-[var(--foreground)]">
      <h1 className="text-3xl font-semibold">Payment</h1>
      <p className="mt-2 text-[var(--muted)]">
        Secure checkout with multiple payment options.
      </p>

      <div className="mt-8 space-y-4">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--panel-strong)] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Accepted Methods</h2>
          <p className="mt-2 text-[var(--muted)]">
            We accept Visa, Mastercard, American Express, PayPal, and Shop Pay installments where available.
          </p>
        </div>

        <div className="rounded-lg border border-[var(--border)] bg-[var(--panel-strong)] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Security</h2>
          <p className="mt-2 text-[var(--muted)]">
            All transactions are encrypted. We never store full card numbers on our servers.
          </p>
        </div>
      </div>
    </div>
  );
}
