import Link from "next/link";

const errorMessages: Record<string, string> = {
  Configuration: "Auth configuration error. Check NEXTAUTH_SECRET and provider settings.",
  AccessDenied: "You do not have permission to sign in here.",
  CredentialsSignin: "Invalid email or password.",
  OAuthSignin: "OAuth sign-in failed. Try again.",
  OAuthCallback: "OAuth callback failed. Try again.",
  OAuthCreateAccount: "Could not create your account from the provider.",
  EmailSignin: "Email sign-in failed.",
  Default: "Something went wrong during sign-in.",
};

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const resolved = await searchParams;
  const code = resolved?.error || "Default";
  const message = errorMessages[code] || errorMessages.Default;

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-6 rounded-lg border border-[var(--border)] bg-[var(--panel-strong)] px-6 py-10 text-center shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
      <p className="text-sm uppercase tracking-[0.2em] text-[var(--muted)]">Auth Error</p>
      <h1 className="text-2xl font-semibold text-[var(--foreground)]">{code}</h1>
      <p className="text-[var(--muted)]">{message}</p>
      <div className="flex items-center justify-center gap-3">
        <Link
          href="/auth/signin"
          className="rounded-full border border-[var(--border)] bg-[var(--panel-soft)] px-4 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--accent)]"
        >
          Back to Sign In
        </Link>
        <Link
          href="/"
          className="rounded-full border border-[var(--accent)] bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#8c0e1e]"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
