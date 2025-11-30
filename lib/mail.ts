import nodemailer from "nodemailer";

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  SMTP_FROM,
  NEXTAUTH_URL,
} = process.env;

export async function sendPasswordResetEmail(to: string, token: string) {
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
    throw new Error("SMTP settings are missing");
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  const baseUrl = NEXTAUTH_URL || "http://localhost:3000";
  const resetUrl = `${baseUrl.replace(/\/$/, "")}/auth/reset?token=${encodeURIComponent(token)}`;

  await transporter.sendMail({
    from: SMTP_FROM,
    to,
    subject: "Reset your Goth Store password",
    text: `You requested a password reset. Click the link to set a new password:\n\n${resetUrl}\n\nIf you didn't request this, you can ignore this email.`,
    html: `<p>You requested a password reset. Click the link below to set a new password:</p><p><a href="${resetUrl}">${resetUrl}</a></p><p>If you didn't request this, you can ignore this email.</p>`,
  });

  return resetUrl;
}
