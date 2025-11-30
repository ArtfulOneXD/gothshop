import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name: name && typeof name === "string" && name.trim().length > 0
          ? name.trim()
          : email.split("@")[0],
        passwordHash,
        role: "USER",
      },
      select: { id: true, email: true, name: true },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Register error", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
