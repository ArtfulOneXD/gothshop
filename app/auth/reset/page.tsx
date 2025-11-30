"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

export default function ResetPage() {
  const params = useSearchParams();
  const router = useRouter();
  const initialToken = useMemo(() => params?.get("token") || "", [params]);

  const [token, setToken] = useState(initialToken);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/auth/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data?.error || "Unable to reset password");
      return;
    }

    setMessage(data?.message || "Password reset. You can now sign in.");
    setTimeout(() => router.push("/auth/signin"), 1200);
  };

  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 rounded-lg border border-[var(--border)] bg-[var(--panel-strong)] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
      <div>
        <h1 className="text-2xl font-semibold text-[var(--foreground)]">Set new password</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Enter the reset token from your email and choose a new password.
        </p>
      </div>

      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <label className="flex flex-col gap-2 text-sm text-[var(--foreground)]">
          Reset token
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="rounded-md border border-[var(--border)] bg-[var(--panel-soft)] px-3 py-2 text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none"
            required
          />
        </label>

        <label className="flex flex-col gap-2 text-sm text-[var(--foreground)]">
          New password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-md border border-[var(--border)] bg-[var(--panel-soft)] px-3 py-2 text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none"
            required
          />
        </label>

        <label className="flex flex-col gap-2 text-sm text-[var(--foreground)]">
          Confirm new password
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
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
          {loading ? "Resetting..." : "Reset password"}
        </button>
      </form>

      <p className="text-sm text-[var(--muted)]">
        Back to{" "}
        <Link href="/auth/signin" className="text-[var(--foreground)] underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
