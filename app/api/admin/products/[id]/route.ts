import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const productId = Number(id);

  const body = await request.json();

  const {
    title,
    slug,
    sku,
    basePrice,
    description,
    material,
    style,
    productType,
    categoryId,
    active,
  } = body;

  if (!title || !slug || !basePrice) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const updated = await prisma.product.update({
      where: { id: productId },
      data: {
        title: String(title),
        slug: String(slug),
        sku: sku ? String(sku) : null,
        basePrice: Number(basePrice),
        description: description ? String(description) : null,
        material: material ? String(material) : null,
        style: style ? String(style) : null,
        productType: productType || "OTHER",
        categoryId: categoryId ? Number(categoryId) : null,
        active: active === true || active === "on" || active === "true",
      },
    });
    return NextResponse.json({ product: updated });
  } catch (error) {
    console.error("update product error", error);
    return NextResponse.json({ error: "Unable to update product" }, { status: 500 });
  }
}
