import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const addressId = Number(id);
  const userId = Number(session.user.id);

  try {
    const body = await request.json();
    const {
      fullName,
      phone,
      line1,
      line2,
      city,
      state,
      postalCode,
      country,
      isDefault,
    } = body ?? {};

    const existing = await prisma.address.findFirst({
      where: { id: addressId, userId },
    });

    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (!fullName || !line1 || !city || !postalCode || !country) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const updateData = {
      fullName,
      phone: phone || null,
      line1,
      line2: line2 || null,
      city,
      state: state || null,
      postalCode,
      country,
      isDefault: Boolean(isDefault),
    };

    const result = await prisma.$transaction(async (tx) => {
      if (updateData.isDefault) {
        await tx.address.updateMany({
          where: { userId },
          data: { isDefault: false },
        });
      }

      return tx.address.update({
        where: { id: addressId },
        data: updateData,
      });
    });

    return NextResponse.json({ address: result });
  } catch (error) {
    console.error("address PATCH error", error);
    return NextResponse.json({ error: "Unable to update address" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const addressId = Number(id);
  const userId = Number(session.user.id);

  try {
    const existing = await prisma.address.findFirst({
      where: { id: addressId, userId },
    });

    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await prisma.address.delete({
      where: { id: addressId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("address DELETE error", error);
    return NextResponse.json({ error: "Unable to delete address" }, { status: 500 });
  }
}
