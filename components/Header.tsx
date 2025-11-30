"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useTheme } from "./ThemeProvider";
import { signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

const aboutItems = [
  { href: "/about/our-story", label: "Our Story" },
  { href: "/about/our-impact", label: "Our Impact" },
  { href: "/about/blogs", label: "Blogs" },
  { href: "/about/reviews", label: "Reviews" },
  { href: "/about/shop-insta", label: "Shop Insta" },
];

const serviceItems = [
  { href: "/services/faq", label: "FAQ" },
  { href: "/services/contact", label: "Contact Us" },
  { href: "/services/size-guide", label: "Size Guide" },
  { href: "/services/payment", label: "Payment" },
  { href: "/services/shipping-policy", label: "Shipping Policy" },
  { href: "/services/return-refund-policy", label: "Return and Refund Policy" },
  { href: "/services/track-order", label: "Track Your Order" },
];

const categoryItems = [
  { href: "/category", label: "All" },
  { href: "/category/bracelets", label: "Bracelets" },
  { href: "/category/earrings", label: "Earrings" },
  { href: "/category/necklaces", label: "Necklaces" },
  { href: "/category/special", label: "Special" },
];

type MenuProps = {
  label: string;
  items: { href: string; label: string }[];
};

function HoverMenu({ label, items }: MenuProps) {
  const [open, setOpen] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timerRef.current = setTimeout(() => setOpen(false), 500);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
    >
      <button
        className="flex cursor-pointer items-center gap-1 rounded-md px-2 py-1 transition hover:bg-[var(--panel-soft)] hover:text-[var(--foreground)] focus:outline-none"
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
      >
        {label}
        <svg
          className="h-4 w-4 text-[var(--muted)]"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M6 8l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open ? (
        <div className="absolute right-0 z-10 mt-2 w-56 rounded-lg border border-[var(--border)] bg-[var(--panel-strong)] shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col py-2">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm text-[var(--muted)] transition hover:bg-[var(--panel-soft)] hover:text-[var(--foreground)]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { status, data } = useSession();
  const isAuthenticated = status === "authenticated";
  const isAdmin = data?.user?.role === "ADMIN";

  const manageClasses =
    theme === "light"
      ? "whitespace-nowrap rounded-full border border-[var(--border)] bg-[var(--panel-strong)] px-3 py-1.5 text-xs font-semibold text-[var(--accent)] shadow-[0_6px_18px_rgba(0,0,0,0.12)] transition hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-white"
      : "whitespace-nowrap rounded-full border border-[var(--accent)] bg-[var(--accent)] px-3 py-1.5 text-xs font-semibold text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition hover:bg-[#8c0e1e] hover:shadow-[0_12px_36px_rgba(0,0,0,0.3)]";

  return (
    <header className="relative z-20 border-b border-[var(--border)] bg-[var(--header)] backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-4 py-4">
        <Link
          href="/"
          className="text-xl font-bold uppercase tracking-[0.18em] text-[var(--foreground)]"
        >
          Goth Store
        </Link>

        <nav className="flex items-center gap-6 text-sm font-semibold text-[var(--muted)]">
          <Link
            href="/"
            className="border-b-2 border-transparent pb-1 transition hover:border-[var(--accent)] hover:text-[var(--foreground)]"
          >
            Home
          </Link>
          <Link
            href="/events"
            className="border-b-2 border-transparent pb-1 transition hover:border-[var(--accent)] hover:text-[var(--foreground)]"
          >
            Events
          </Link>
          <HoverMenu label="Categories" items={categoryItems} />
          <HoverMenu label="About" items={aboutItems} />
          <HoverMenu label="Services" items={serviceItems} />

          <div className="group relative flex items-center gap-2">
            <svg
              className="h-5 w-5 text-[var(--muted)] transition group-hover:text-[var(--foreground)]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m16 16 4 4" />
            </svg>
            <input
              type="search"
              placeholder="Search..."
              aria-label="Search products"
              className="w-0 rounded-full border border-[var(--border)] bg-[var(--panel-strong)] px-3 py-1 text-xs text-[var(--foreground)] opacity-0 transition-[width,opacity] duration-300 ease-out placeholder:text-[var(--muted)] focus:w-48 focus:opacity-100 focus:outline-none group-hover:w-48 group-hover:opacity-100"
            />
          </div>

          {isAuthenticated ? (
            <>
              <Link
                href="/profile"
                className="whitespace-nowrap rounded-full border border-[var(--border)] bg-[var(--panel-strong)] px-3 py-1.5 text-xs font-semibold text-[var(--foreground)] transition hover:border-[var(--accent)] hover:bg-[var(--panel-soft)]"
              >
                {isAdmin ? "👑 My Profile" : "My Profile"}
              </Link>
              {isAdmin ? (
                <Link
                  href="/admin/products"
                  className={manageClasses}
                >
                  Manage Products
                </Link>
              ) : null}
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="whitespace-nowrap rounded-full border border-[var(--border)] bg-[var(--panel-strong)] px-3 py-1.5 text-xs font-semibold text-[var(--foreground)] transition hover:border-[var(--accent)] hover:bg-[var(--panel-soft)]"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/signin"
                className="whitespace-nowrap rounded-full border border-[var(--border)] bg-[var(--panel-strong)] px-3 py-1.5 text-xs font-semibold text-[var(--foreground)] transition hover:border-[var(--accent)] hover:bg-[var(--panel-soft)]"
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                className="whitespace-nowrap rounded-full border border-[var(--accent)] bg-[var(--accent)] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[#8c0e1e]"
              >
                Sign Up
              </Link>
            </>
          )}

          <Link
            href="/cart"
            className="relative flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--panel-strong)] px-3 py-1.5 text-[var(--foreground)] transition hover:border-[var(--accent)] hover:bg-[var(--panel-soft)]"
            aria-label="View cart"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 6h15l-1.5 12h-12z" />
              <path d="M9 6a3 3 0 0 1 6 0" />
            </svg>
            <span className="text-sm font-semibold">Cart</span>
            <span className="absolute -right-2 -top-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-white">
              0
            </span>
          </Link>

          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--panel-strong)] px-3 py-1.5 text-xs font-semibold text-[var(--foreground)] transition hover:border-[var(--accent)] hover:bg-[var(--panel-soft)]"
            aria-label="Toggle theme"
          >
            <span className="text-[var(--muted)]">{theme === "dark" ? "Night" : "Dusk"}</span>
            {theme === "dark" ? (
              <svg
                className="h-4 w-4 text-[var(--accent)]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M12 3v2M12 19v2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M3 12h2M19 12h2M5.6 18.4 7 17M17 7l1.4-1.4" />
                <circle cx="12" cy="12" r="4" />
              </svg>
            ) : (
              <svg
                className="h-4 w-4 text-[var(--accent)]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
              </svg>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
