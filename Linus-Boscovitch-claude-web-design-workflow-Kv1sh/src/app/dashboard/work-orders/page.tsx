import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { WorkOrderCard } from "@/components/pipeline/WorkOrderCard";

const STATUSES = ["pending", "approved", "built", "deployed", "rejected"];

export default async function WorkOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const activeStatus = STATUSES.includes(status ?? "") ? status : undefined;

  const orders = await prisma.workOrder.findMany({
    where: activeStatus ? { status: activeStatus } : undefined,
    orderBy: { createdAt: "desc" },
    include: { brief: { select: { keywords: true } } },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/dashboard" className="text-sm text-blue-600 hover:underline">← Dashboard</Link>
          <span className="text-gray-400">/</span>
          <span className="text-sm text-gray-500">Work Orders</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-900">Work Orders</h1>
          <span className="text-sm text-gray-500">{orders.length} orders</span>
        </div>

        <div className="flex gap-2 mb-6 flex-wrap">
          <Link
            href="/dashboard/work-orders"
            className={`px-3 py-1 rounded text-sm border ${!activeStatus ? "bg-gray-900 text-white border-gray-900" : "border-gray-300 text-gray-600 hover:border-gray-500"}`}
          >
            All
          </Link>
          {STATUSES.map((s) => (
            <Link
              key={s}
              href={`/dashboard/work-orders?status=${s}`}
              className={`px-3 py-1 rounded text-sm border capitalize ${activeStatus === s ? "bg-gray-900 text-white border-gray-900" : "border-gray-300 text-gray-600 hover:border-gray-500"}`}
            >
              {s}
            </Link>
          ))}
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="font-medium">No work orders found</p>
            <Link href="/dashboard" className="text-sm text-blue-600 hover:underline mt-2 block">
              Run the pipeline to generate some →
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {orders.map((order) => (
              <WorkOrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
