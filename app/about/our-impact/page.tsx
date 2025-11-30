export default function OurImpactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 text-[var(--foreground)]">
      <h1 className="text-3xl font-semibold">Our Impact</h1>
      <p className="mt-3 text-[var(--muted)]">
        Responsibility is part of our ritual. We prioritize ethical sourcing and community support with every collection.
      </p>

      <div className="mt-8 space-y-4">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--panel-strong)] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Ethical Materials</h2>
          <p className="mt-2 text-[var(--muted)]">
            We work with suppliers that certify conflict-free metals and reduced-waste production.
          </p>
        </div>

        <div className="rounded-lg border border-[var(--border)] bg-[var(--panel-strong)] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Giving Back</h2>
          <p className="mt-2 text-[var(--muted)]">
            A portion of each drop supports arts education programs that help young creators find their voice.
          </p>
        </div>
      </div>
    </div>
  );
}
