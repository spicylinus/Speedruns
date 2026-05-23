import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { runStrategyAgent } from "@/lib/agents/strategy-agent";
import { getSiteSnapshot } from "@/lib/site-snapshot";

export async function POST(req: NextRequest) {
  const { briefId } = (await req.json()) as { briefId: string };
  if (!briefId) return NextResponse.json({ error: "briefId required" }, { status: 400 });

  const brief = await prisma.intelligenceBrief.findUnique({ where: { id: briefId } });
  if (!brief) return NextResponse.json({ error: "Brief not found" }, { status: 404 });

  const briefData = JSON.parse(brief.data);
  const snapshot = getSiteSnapshot();
  const drafts = await runStrategyAgent(briefData, snapshot);

  const workOrders = await prisma.$transaction(
    drafts.map((d) =>
      prisma.workOrder.create({
        data: {
          briefId,
          type: d.type,
          title: d.title,
          description: d.description,
          evidence: d.evidence,
          expectedResult: d.expectedResult,
          targetFile: d.targetFile ?? null,
        },
      })
    )
  );

  return NextResponse.json({ workOrders });
}
