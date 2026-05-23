import { anthropic } from "@/lib/claude-client";

export interface ResearchInput {
  keywords: string[];
  competitorUrls: string[];
  siteUrl: string;
}

export interface IntelligenceBriefData {
  keywordOpportunities: {
    keyword: string;
    estimatedVolume: string;
    difficulty: string;
    rationale: string;
  }[];
  contentGaps: {
    topic: string;
    competitorCoverage: string;
    ourCoverage: string;
    opportunity: string;
  }[];
  technicalIssues: {
    issue: string;
    impact: string;
    fix: string;
  }[];
  authorityOpportunities: {
    type: string;
    target: string;
    rationale: string;
  }[];
  summary: string;
}

export async function runResearchAgent(
  input: ResearchInput
): Promise<IntelligenceBriefData> {
  const prompt = `You are an expert SEO research agent. Analyze the following information and produce a structured intelligence brief.

Target site: ${input.siteUrl}
Target keywords: ${input.keywords.join(", ")}
Competitor URLs to analyze: ${input.competitorUrls.join(", ")}

Produce a comprehensive SEO intelligence brief covering:
1. Keyword opportunities (with volume estimates and difficulty ratings)
2. Content gaps vs competitors
3. Technical SEO issues to address
4. Authority/backlink opportunities

Return ONLY valid JSON matching this schema:
{
  "keywordOpportunities": [
    { "keyword": string, "estimatedVolume": string, "difficulty": string, "rationale": string }
  ],
  "contentGaps": [
    { "topic": string, "competitorCoverage": string, "ourCoverage": string, "opportunity": string }
  ],
  "technicalIssues": [
    { "issue": string, "impact": string, "fix": string }
  ],
  "authorityOpportunities": [
    { "type": string, "target": string, "rationale": string }
  ],
  "summary": string
}

Base your analysis on real SEO best practices and realistic estimates. Be specific and actionable.`;

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4096,
    messages: [{ role: "user", content: prompt }],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Research agent returned no valid JSON");
  return JSON.parse(jsonMatch[0]) as IntelligenceBriefData;
}
