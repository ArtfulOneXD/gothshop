import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import AdminProductEditForm from "./EditForm";

interface AdminProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminProductPage({ params }: AdminProductPageProps) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/auth/signin?callbackUrl=/admin/products");
  }
  if (session.user.role !== "ADMIN") {
    return (
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-xl border border-[var(--border)] bg-[var(--panel-strong)] p-8 text-center shadow-[0_24px_55px_rgba(0,0,0,0.35)]">
        <div className="text-5xl">🧛‍♂️</div>
        <h1 className="text-3xl font-semibold text-[var(--foreground)]">Not Enough Access</h1>
        <p className="text-[var(--muted)]">Only crowned admins may edit products.</p>
      </div>
    );
  }

  const { id } = await params;
  const productId = Number(id);
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    notFound();
  }

  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <header className="rounded-xl border border-[var(--border)] bg-[var(--panel-strong)] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
        <p className="text-sm uppercase tracking-[0.18em] text-[var(--muted)]">Admin</p>
        <h1 className="text-3xl font-semibold text-[var(--foreground)]">Edit Product</h1>
        <p className="text-sm text-[var(--muted)]">
          Update product details. Image upload and variants can be added later.
        </p>
      </header>

      <AdminProductEditForm product={product} categories={categories} />
    </div>
  );
}
