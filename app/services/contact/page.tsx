export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 text-[var(--foreground)]">
      <h1 className="text-3xl font-semibold">Contact Us</h1>
      <p className="mt-2 text-[var(--muted)]">
        We are here to help with sizing, orders, and custom requests.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--panel-strong)] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Email</h2>
          <p className="mt-2 text-[var(--muted)]">
            Send us a note at <span className="font-semibold">support@goth.store</span> and we will reply within one business day.
          </p>
        </div>

        <div className="rounded-lg border border-[var(--border)] bg-[var(--panel-strong)] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Chat</h2>
          <p className="mt-2 text-[var(--muted)]">
            Live chat is available Monday–Friday, 9am–6pm EST directly from the corner icon on any page.
          </p>
        </div>

        <div className="rounded-lg border border-[var(--border)] bg-[var(--panel-strong)] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.35)] md:col-span-2">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Studio Address</h2>
          <p className="mt-2 text-[var(--muted)]">
            Goth Studio, 13 Nightfall Ave, Brooklyn, NY 11211
          </p>
          <p className="mt-2 text-[var(--muted)]">
            Visits by appointment only. Please contact us to schedule.
          </p>
        </div>
      </div>
    </div>
  );
}
