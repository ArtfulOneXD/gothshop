export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-[var(--border)] bg-[var(--header)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-[var(--muted)]">
        <p className="text-[var(--foreground)]">© {year} Goth Store. All rights reserved.</p>
        <p>Contact: support@goth.store</p>
        <p className="text-sm text-[var(--muted)]">
          {/* Social links can be added here later */}
          Follow us on your favorite platforms soon.
        </p>
      </div>
    </footer>
  );
}
