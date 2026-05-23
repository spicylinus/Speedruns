import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const status = req.nextUrl.searchParams.get("status") ?? undefined;
  const workOrders = await prisma.workOrder.findMany({
    where: status ? { status } : undefined,
    orderBy: { createdAt: "desc" },
    include: { brief: { select: { keywords: true, site: true } } },
  });
  return NextResponse.json(workOrders);
}
