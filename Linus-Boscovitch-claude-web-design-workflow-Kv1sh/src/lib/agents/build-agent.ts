import { anthropic } from "@/lib/claude-client";
import type { WorkOrder } from "@prisma/client";
import fs from "fs";
import path from "path";

export async function runBuildAgent(workOrder: WorkOrder): Promise<string> {
  let currentContent = "";
  if (workOrder.targetFile) {
    const fullPath = path.join(process.cwd(), workOrder.targetFile);
    if (fs.existsSync(fullPath)) {
      currentContent = fs.readFileSync(fullPath, "utf-8");
    }
  }

  const prompt = `You are a specialized ${workOrder.type} build agent. Implement the following work order.

WORK ORDER:
Title: ${workOrder.title}
Type: ${workOrder.type}
Description: ${workOrder.description}
Evidence: ${workOrder.evidence}
Expected Result: ${workOrder.expectedResult}
Target File: ${workOrder.targetFile ?? "none specified"}

${currentContent ? `CURRENT FILE CONTENT:\n${currentContent}` : ""}

${workOrder.type === "content" ? `
Produce the complete updated file content with SEO-optimized copy.
Include proper heading hierarchy, keyword-rich but natural language, and strong CTAs.
Return ONLY the complete file content, no explanation.` : ""}

${workOrder.type === "technical" ? `
Produce the complete updated file content with technical SEO improvements.
Include JSON-LD schema, optimized meta tags, and proper semantic HTML.
Return ONLY the complete file content, no explanation.` : ""}

${workOrder.type === "authority" ? `
Produce a detailed action plan as a markdown document including:
1. Specific outreach email templates
2. Directory submission targets with URLs
3. Link bait content ideas with headlines
4. Anchor text recommendations

Return ONLY the markdown content, no explanation.` : ""}`;

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 8096,
    messages: [{ role: "user", content: prompt }],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";
  return text;
}
