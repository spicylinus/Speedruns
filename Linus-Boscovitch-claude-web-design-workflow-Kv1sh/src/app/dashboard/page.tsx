import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { RunPipelineButton } from "@/components/pipeline/RunPipelineButton";
import { WorkOrderCard } from "@/components/pipeline/WorkOrderCard";

const DEFAULT_KEYWORDS = ["web design workflow", "AI design system", "claude code", "next.js template"];
const DEFAULT_COMPETITORS = ["https://v0.dev", "https://21st.dev"];
const DEFAULT_SITE = "https://your-site.vercel.app";

export default async function DashboardPage() {
  const [counts, recentOrders, latestBrief] = await Promise.all([
    prisma.workOrder.groupBy({ by: ["status"], _count: { _all: true } }),
    prisma.workOrder.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
      include: { brief: { select: { keywords: true } } },
    }),
    prisma.intelligenceBrief.findFirst({ orderBy: { createdAt: "desc" } }),
  ]);

  const countMap = Object.fromEntries(counts.map((c) => [c.status, c._count._all]));
  const total = Object.values(countMap).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Agentic SEO Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Self-improving pipeline: research → strategy → build → deploy</p>
          </div>
          <nav className="flex gap-4 text-sm text-blue-600">
            <Link href="/dashboard/work-orders" className="hover:underline">Work Orders</Link>
            <Link href="/dashboard/intelligence" className="hover:underline">Intelligence</Link>
          </nav>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          {["pending", "approved", "built", "deployed", "rejected"].map((status) => (
            <div key={status} className="bg-white rounded-lg border border-gray-200 p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{countMap[status] ?? 0}</div>
              <div className="text-xs text-gray-500 capitalize mt-1">{status}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 mb-3">Run Pipeline</h2>
            <p className="text-sm text-gray-500 mb-4">
              Triggers the research agent, then auto-generates work orders via the strategy agent.
            </p>
            <RunPipelineButton
              keywords={DEFAULT_KEYWORDS}
              competitorUrls={DEFAULT_COMPETITORS}
              siteUrl={DEFAULT_SITE}
            />
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 mb-3">Latest Intelligence</h2>
            {latestBrief ? (
              <div>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Keywords:</span> {latestBrief.keywords}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(latestBrief.createdAt).toLocaleString()}
                </p>
                <Link
                  href="/dashboard/intelligence"
                  className="inline-block mt-3 text-sm text-blue-600 hover:underline"
                >
                  View full brief →
                </Link>
              </div>
            ) : (
              <p className="text-sm text-gray-400 italic">No briefs yet. Run the pipeline to start.</p>
            )}
          </div>
        </div>

        {total > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-gray-900">Recent Work Orders</h2>
              <Link href="/dashboard/work-orders" className="text-sm text-blue-600 hover:underline">
                View all →
              </Link>
            </div>
            <div className="space-y-2">
              {recentOrders.map((order) => (
                <WorkOrderCard key={order.id} order={order} />
              ))}
            </div>
          </div>
        )}

        {total === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">&#9881;</p>
            <p className="font-medium">No work orders yet</p>
            <p className="text-sm mt-1">Click &ldquo;Run Pipeline&rdquo; above to start the research cycle.</p>
          </div>
        )}
      </div>
    </div>
  );
}
