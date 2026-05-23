import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StatusBadge, TypeBadge } from "@/components/pipeline/StatusBadge";
import { EvidencePanel } from "@/components/pipeline/EvidencePanel";
import { DiffViewer } from "@/components/pipeline/DiffViewer";
import { ApproveRejectButtons } from "./ApproveRejectButtons";

export default async function WorkOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await prisma.workOrder.findUnique({
    where: { id },
    include: { brief: true },
  });
  if (!order) notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/dashboard" className="text-sm text-blue-600 hover:underline">Dashboard</Link>
          <span className="text-gray-400">/</span>
          <Link href="/dashboard/work-orders" className="text-sm text-blue-600 hover:underline">Work Orders</Link>
          <span className="text-gray-400">/</span>
          <span className="text-sm text-gray-500 truncate">{order.title}</span>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TypeBadge type={order.type} />
                <StatusBadge status={order.status} />
              </div>
              <h1 className="text-xl font-bold text-gray-900">{order.title}</h1>
            </div>
            <span className="text-xs text-gray-400 whitespace-nowrap">
              {new Date(order.createdAt).toLocaleString()}
            </span>
          </div>

          {order.targetFile && (
            <p className="text-sm text-gray-500 mb-4">
              <span className="font-medium">Target file:</span>{" "}
              <code className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded">{order.targetFile}</code>
            </p>
          )}

          <div className="prose prose-sm max-w-none text-gray-700">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">What to change</h3>
            <p className="whitespace-pre-wrap">{order.description}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Evidence</h2>
          <EvidencePanel evidence={order.evidence} />
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
          <h2 className="text-sm font-semibold text-gray-900 mb-1">Expected Result</h2>
          <p className="text-sm text-gray-700">{order.expectedResult}</p>
        </div>

        {order.status === "pending" && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Review Action</h2>
            <ApproveRejectButtons workOrderId={order.id} />
          </div>
        )}

        {order.diff && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Generated Output</h2>
            {order.commitSha && (
              <p className="text-xs text-green-600 mb-2">
                &#10003; Committed: <code className="font-mono">{order.commitSha.slice(0, 8)}</code>
              </p>
            )}
            <DiffViewer diff={order.diff} targetFile={order.targetFile} />
          </div>
        )}

        <div className="bg-gray-100 rounded-lg p-4 text-xs text-gray-500">
          <span className="font-medium">Brief:</span> {order.brief.keywords} · {order.brief.site}
        </div>
      </div>
    </div>
  );
}
