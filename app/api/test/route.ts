import { prisma } from "@/lib/db";

export async function GET() {
  const row = await prisma.test.create({});
  const count = await prisma.test.count();

  return Response.json({
    ok: true,
    createdId: row.id,
    totalRows: count,
  });
}
