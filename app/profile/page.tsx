import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import ChangePasswordForm from "./ChangePasswordForm";
import AddressManager from "./AddressManager";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/auth/signin?callbackUrl=/profile");
  }

  const userId = Number(session.user.id);
  const [user, orderCount, reviewCount, addresses] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, email: true, role: true, createdAt: true, emailVerified: true },
    }),
    prisma.order.count({ where: { userId } }),
    prisma.review.count({ where: { userId } }),
    prisma.address.findMany({
      where: { userId },
      orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
    }),
  ]);

  if (!user) {
    redirect("/auth/signin?callbackUrl=/profile");
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-[var(--border)] bg-[var(--panel-strong)] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
        <p className="text-sm uppercase tracking-[0.2em] text-[var(--muted)]">Account</p>
        <h1 className="mt-2 text-3xl font-semibold text-[var(--foreground)]">My Profile</h1>
        <p className="mt-2 text-[var(--muted)]">
          Manage your details, see your orders, and keep everything up to date.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3 rounded-xl border border-[var(--border)] bg-[var(--panel-strong)] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Profile Details</h2>
          <div className="space-y-2 text-sm text-[var(--muted)]">
            <div>
              <span className="font-medium text-[var(--foreground)]">Name: </span>
              {user.name}
            </div>
            <div>
              <span className="font-medium text-[var(--foreground)]">Email: </span>
              {user.email}
            </div>
            <div>
              <span className="font-medium text-[var(--foreground)]">Role: </span>
              {user.role}
            </div>
            <div>
              <span className="font-medium text-[var(--foreground)]">Member since: </span>
              {new Date(user.createdAt).toLocaleDateString()}
            </div>
            <div>
              <span className="font-medium text-[var(--foreground)]">Email verified: </span>
              {user.emailVerified ? "Yes" : "Not yet"}
            </div>
          </div>
        </div>

        <div className="space-y-3 rounded-xl border border-[var(--border)] bg-[var(--panel-strong)] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Security</h2>
          <p className="text-sm text-[var(--muted)]">
            For your safety, keep your password strong and unique.
          </p>
          <ChangePasswordForm />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--panel-strong)] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Orders</p>
          <p className="mt-2 text-3xl font-semibold text-[var(--foreground)]">{orderCount}</p>
          <p className="text-sm text-[var(--muted)]">Total orders placed</p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--panel-strong)] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Reviews</p>
          <p className="mt-2 text-3xl font-semibold text-[var(--foreground)]">{reviewCount}</p>
          <p className="text-sm text-[var(--muted)]">Your product reviews</p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--panel-strong)] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Status</p>
          <p className="mt-2 text-lg font-semibold text-[var(--foreground)]">
            {user.role === "ADMIN" ? "Admin access" : "Customer"}
          </p>
          <p className="text-sm text-[var(--muted)]">Access level for your account</p>
        </div>
      </div>

      <AddressManager initialAddresses={addresses} />
    </div>
  );
}
