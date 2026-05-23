import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { runBuildAgent } from "@/lib/agents/build-agent";
import { pushFileToGitHub } from "@/lib/agents/github-push";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const workOrder = await prisma.workOrder.findUnique({ where: { id } });
  if (!workOrder) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (workOrder.status !== "pending") {
    return NextResponse.json({ error: "Work order is not pending" }, { status: 400 });
  }

  await prisma.workOrder.update({ where: { id }, data: { status: "approved" } });

  const diff = await runBuildAgent(workOrder);
  await prisma.workOrder.update({ where: { id }, data: { diff, status: "built" } });

  if (workOrder.targetFile && process.env.GITHUB_TOKEN) {
    try {
      const { commitSha } = await pushFileToGitHub(
        workOrder.targetFile,
        diff,
        `seo(${workOrder.type}): ${workOrder.title}`
      );
      await prisma.workOrder.update({ where: { id }, data: { commitSha, status: "deployed" } });
    } catch (e) {
      console.error("GitHub push failed:", e);
    }
  }

  const updated = await prisma.workOrder.findUnique({ where: { id } });
  return NextResponse.json(updated);
}
