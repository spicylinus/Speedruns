import { prisma } from "@/lib/prisma";
import Link from "next/link";
import type { IntelligenceBriefData } from "@/lib/agents/research-agent";

export default async function IntelligencePage() {
  const brief = await prisma.intelligenceBrief.findFirst({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { workOrders: true } } },
  });

  if (!brief) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-gray-400">
          <p className="text-4xl mb-3">&#128202;</p>
          <p className="font-medium">No intelligence brief yet</p>
          <Link href="/dashboard" className="text-sm text-blue-600 hover:underline mt-2 block">
            ← Go run the pipeline
          </Link>
        </div>
      </div>
    );
  }

  const data: IntelligenceBriefData = JSON.parse(brief.data);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/dashboard" className="text-sm text-blue-600 hover:underline">← Dashboard</Link>
          <span className="text-gray-400">/</span>
          <span className="text-sm text-gray-500">Intelligence Brief</span>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h1 className="text-xl font-bold text-gray-900 mb-1">Intelligence Brief</h1>
          <p className="text-sm text-gray-500">{new Date(brief.createdAt).toLocaleString()} · {brief._count.workOrders} work orders generated</p>
          <p className="text-sm mt-2"><span className="font-medium">Site:</span> {brief.site}</p>
          <p className="text-sm"><span className="font-medium">Keywords:</span> {brief.keywords}</p>
          {data.summary && (
            <p className="mt-4 text-gray-700 text-sm leading-relaxed border-t border-gray-100 pt-4">{data.summary}</p>
          )}
        </div>

        {data.keywordOpportunities?.length > 0 && (
          <section className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
            <h2 className="font-semibold text-gray-900 mb-4">Keyword Opportunities</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-500 border-b border-gray-100">
                  <th className="pb-2 font-medium">Keyword</th>
                  <th className="pb-2 font-medium">Volume</th>
                  <th className="pb-2 font-medium">Difficulty</th>
                  <th className="pb-2 font-medium">Rationale</th>
                </tr>
              </thead>
              <tbody>
                {data.keywordOpportunities.map((kw, i) => (
                  <tr key={i} className="border-b border-gray-50 last:border-0">
                    <td className="py-2 font-mono text-gray-800">{kw.keyword}</td>
                    <td className="py-2 text-gray-600">{kw.estimatedVolume}</td>
                    <td className="py-2 text-gray-600">{kw.difficulty}</td>
                    <td className="py-2 text-gray-500">{kw.rationale}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {data.contentGaps?.length > 0 && (
          <section className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
            <h2 className="font-semibold text-gray-900 mb-4">Content Gaps</h2>
            <div className="space-y-3">
              {data.contentGaps.map((gap, i) => (
                <div key={i} className="text-sm border-b border-gray-50 pb-3 last:border-0">
                  <p className="font-medium text-gray-800">{gap.topic}</p>
                  <p className="text-gray-500 mt-0.5">{gap.opportunity}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.technicalIssues?.length > 0 && (
          <section className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
            <h2 className="font-semibold text-gray-900 mb-4">Technical Issues</h2>
            <div className="space-y-3">
              {data.technicalIssues.map((issue, i) => (
                <div key={i} className="text-sm border-b border-gray-50 pb-3 last:border-0">
                  <p className="font-medium text-red-700">{issue.issue}</p>
                  <p className="text-gray-500 mt-0.5"><span className="font-medium">Fix:</span> {issue.fix}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.authorityOpportunities?.length > 0 && (
          <section className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Authority Opportunities</h2>
            <div className="space-y-3">
              {data.authorityOpportunities.map((opp, i) => (
                <div key={i} className="text-sm border-b border-gray-50 pb-3 last:border-0">
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-700 mb-1">{opp.type}</span>
                  <p className="font-medium text-gray-800">{opp.target}</p>
                  <p className="text-gray-500 mt-0.5">{opp.rationale}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
