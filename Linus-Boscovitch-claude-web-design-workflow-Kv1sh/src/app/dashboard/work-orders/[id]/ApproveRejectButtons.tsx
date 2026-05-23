"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function ApproveRejectButtons({ workOrderId }: { workOrderId: string }) {
  const [loading, setLoading] = useState<"approve" | "reject" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function action(type: "approve" | "reject") {
    setLoading(type);
    setError(null);
    try {
      const endpoint = type === "approve" ? "approve" : "reject";
      const res = await fetch(`/api/pipeline/${endpoint}/${workOrderId}`, { method: "POST" });
      if (!res.ok) throw new Error(await res.text());
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <button
          onClick={() => action("approve")}
          disabled={loading !== null}
          className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 disabled:opacity-50 transition-colors"
        >
          {loading === "approve" ? "Building…" : "Approve & Build"}
        </button>
        <button
          onClick={() => action("reject")}
          disabled={loading !== null}
          className="px-4 py-2 rounded-lg bg-red-100 text-red-700 text-sm font-medium hover:bg-red-200 disabled:opacity-50 transition-colors"
        >
          {loading === "reject" ? "Rejecting…" : "Reject"}
        </button>
      </div>
      {loading === "approve" && (
        <p className="text-sm text-gray-500">Build agent is generating output — this may take 30–60 seconds…</p>
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
