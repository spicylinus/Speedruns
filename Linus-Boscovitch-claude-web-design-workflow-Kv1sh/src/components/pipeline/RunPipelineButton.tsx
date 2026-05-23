"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface RunPipelineButtonProps {
  keywords: string[];
  competitorUrls: string[];
  siteUrl: string;
}

export function RunPipelineButton({
  keywords,
  competitorUrls,
  siteUrl,
}: RunPipelineButtonProps) {
  const [stage, setStage] = useState<"idle" | "researching" | "strategizing" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function run() {
    setStage("researching");
    setError(null);
    try {
      const researchRes = await fetch("/api/pipeline/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keywords, competitorUrls, siteUrl }),
      });
      if (!researchRes.ok) throw new Error(await researchRes.text());
      const { briefId } = await researchRes.json() as { briefId: string };

      setStage("strategizing");
      const stratRes = await fetch("/api/pipeline/strategy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ briefId }),
      });
      if (!stratRes.ok) throw new Error(await stratRes.text());

      setStage("done");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
      setStage("error");
    }
  }

  const labels = {
    idle: "Run Research Pipeline",
    researching: "Researching…",
    strategizing: "Building Work Orders…",
    done: "Done — refreshing",
    error: "Failed — retry",
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={run}
        disabled={stage === "researching" || stage === "strategizing"}
        className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {labels[stage]}
      </button>
      {(stage === "researching" || stage === "strategizing") && (
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="inline-block w-3 h-3 rounded-full bg-blue-400 animate-pulse" />
          {stage === "researching" ? "Research agent running…" : "Strategy agent generating work orders…"}
        </div>
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
