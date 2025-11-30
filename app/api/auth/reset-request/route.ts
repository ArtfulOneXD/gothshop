import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendPasswordResetEmail } from "@/lib/mail";
import crypto from "crypto";

const EXPIRATION_MS = 60 * 60 * 1000; // 1 hour

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ message: "If that account exists, a reset link has been sent." });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ message: "If that account exists, a reset link has been sent." });
    }

    // Remove previous tokens for this user
    await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } });

    const token = crypto.randomUUID();
    const expires = new Date(Date.now() + EXPIRATION_MS);

    const resetToken = await prisma.passwordResetToken.create({
      data: {
        token,
        userId: user.id,
        expires,
      },
    });

    await sendPasswordResetEmail(user.email, resetToken.token);

    const payload: Record<string, string> = {
      message: "If that account exists, a reset link has been sent.",
    };

    return NextResponse.json(payload);
  } catch (error) {
    console.error("reset-request error", error);
    return NextResponse.json({ error: "Unable to process request" }, { status: 500 });
  }
}
