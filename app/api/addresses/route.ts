import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = Number(session.user.id);

  const addresses = await prisma.address.findMany({
    where: { userId },
    orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
  });

  return NextResponse.json({ addresses });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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

    if (!fullName || !line1 || !city || !postalCode || !country) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const data = {
      fullName,
      phone: phone || null,
      line1,
      line2: line2 || null,
      city,
      state: state || null,
      postalCode,
      country,
      isDefault: Boolean(isDefault),
      userId,
    };

    const result = await prisma.$transaction(async (tx) => {
      if (data.isDefault) {
        await tx.address.updateMany({
          where: { userId },
          data: { isDefault: false },
        });
      }

      return tx.address.create({ data });
    });

    return NextResponse.json({ address: result });
  } catch (error) {
    console.error("address POST error", error);
    return NextResponse.json({ error: "Unable to create address" }, { status: 500 });
  }
}
