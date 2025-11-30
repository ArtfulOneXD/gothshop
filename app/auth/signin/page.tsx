"use client";

import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = useState("admin@goth.store");
  const [password, setPassword] = useState("admin123!");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid credentials");
      return;
    }

    router.push(callbackUrl);
  };

  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 rounded-lg border border-[var(--border)] bg-[var(--panel-strong)] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
      <div>
        <h1 className="text-2xl font-semibold text-[var(--foreground)]">Sign in</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Use your email and password to access your account.
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

        <label className="flex flex-col gap-2 text-sm text-[var(--foreground)]">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-md border border-[var(--border)] bg-[var(--panel-soft)] px-3 py-2 text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none"
            required
          />
        </label>

        {error ? <p className="text-sm text-red-400">{error}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#8c0e1e] disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <p className="text-sm text-[var(--muted)]">
        Need an account?{" "}
        <Link href="/auth/register" className="text-[var(--foreground)] underline">
          Register
        </Link>
      </p>
      <p className="text-sm text-[var(--muted)]">
        Forgot your password?{" "}
        <Link href="/auth/reset-request" className="text-[var(--foreground)] underline">
          Reset it
        </Link>
      </p>
    </div>
  );
}
