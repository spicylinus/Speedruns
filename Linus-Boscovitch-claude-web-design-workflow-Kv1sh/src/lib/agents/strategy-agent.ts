import { anthropic } from "@/lib/claude-client";
import type { IntelligenceBriefData } from "./research-agent";

export interface WorkOrderDraft {
  type: "content" | "technical" | "authority";
  title: string;
  description: string;
  evidence: string;
  expectedResult: string;
  targetFile?: string;
}

export async function runStrategyAgent(
  brief: IntelligenceBriefData,
  siteSnapshot: string
): Promise<WorkOrderDraft[]> {
  const prompt = `You are a senior SEO strategist. Based on the intelligence brief and current site snapshot, generate specific work orders for improving the site's search performance.

INTELLIGENCE BRIEF:
${JSON.stringify(brief, null, 2)}

CURRENT SITE SNAPSHOT (first 8000 chars):
${siteSnapshot.slice(0, 8000)}

Generate 3-6 concrete work orders. Each must have strong evidence from the brief.

Return ONLY valid JSON as an array:
[
  {
    "type": "content" | "technical" | "authority",
    "title": string (short, max 60 chars),
    "description": string (what to change and exactly how),
    "evidence": string (JSON-stringified array of evidence points from the brief),
    "expectedResult": string (specific, measurable outcome),
    "targetFile": string | null (relative file path like "src/app/page.tsx" if applicable)
  }
]

Types:
- "content": page copy, headlines, FAQs, articles, CTAs
- "technical": schema markup, meta tags, internal linking, performance
- "authority": backlink outreach templates, directory listings, link bait ideas`;

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4096,
    messages: [{ role: "user", content: prompt }],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";
  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error("Strategy agent returned no valid JSON");
  return JSON.parse(jsonMatch[0]) as WorkOrderDraft[];
}
