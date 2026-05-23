import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const workOrder = await prisma.workOrder.findUnique({ where: { id } });
  if (!workOrder) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const updated = await prisma.workOrder.update({
    where: { id },
    data: { status: "rejected" },
  });
  return NextResponse.json(updated);
}
