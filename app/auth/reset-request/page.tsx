"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function ResetRequestPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    const res = await fetch("/api/auth/reset-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data?.error || "Unable to process request");
      return;
    }

    setMessage(data?.message || "If that account exists, a reset link has been sent.");
  };

  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 rounded-lg border border-[var(--border)] bg-[var(--panel-strong)] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
      <div>
        <h1 className="text-2xl font-semibold text-[var(--foreground)]">Reset password</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Enter your email and we will send a reset link if the account exists.
        </p>
      </div>

      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <label className="flex flex-col gap-2 text-sm text-[var(--foreground)]">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-md border border-[var(--border)] bg-[var(--panel-soft)] px-3 py-2 text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none"
            required
          />
        </label>

        {error ? <p className="text-sm text-red-400">{error}</p> : null}
        {message ? <p className="text-sm text-green-400">{message}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#8c0e1e] disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send reset link"}
        </button>
      </form>

      <p className="text-sm text-[var(--muted)]">
        Remembered it?{" "}
        <Link href="/auth/signin" className="text-[var(--foreground)] underline">
          Back to sign in
        </Link>
      </p>
    </div>
  );
}
