import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { runResearchAgent, type ResearchInput } from "@/lib/agents/research-agent";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as ResearchInput;

  if (!body.keywords?.length || !body.siteUrl) {
    return NextResponse.json({ error: "keywords and siteUrl required" }, { status: 400 });
  }

  const briefData = await runResearchAgent(body);

  const brief = await prisma.intelligenceBrief.create({
    data: {
      keywords: body.keywords.join(", "),
      site: body.siteUrl,
      data: JSON.stringify(briefData),
    },
  });

  return NextResponse.json({ briefId: brief.id, data: briefData });
}

export async function GET() {
  const briefs = await prisma.intelligenceBrief.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
    include: { _count: { select: { workOrders: true } } },
  });
  return NextResponse.json(briefs);
}
