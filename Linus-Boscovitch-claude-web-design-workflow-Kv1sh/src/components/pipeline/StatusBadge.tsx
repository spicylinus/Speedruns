import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
  approved: "bg-blue-100 text-blue-800 border-blue-300",
  rejected: "bg-red-100 text-red-800 border-red-300",
  built: "bg-purple-100 text-purple-800 border-purple-300",
  deployed: "bg-green-100 text-green-800 border-green-300",
};

const TYPE_STYLES: Record<string, string> = {
  content: "bg-orange-100 text-orange-800 border-orange-300",
  technical: "bg-cyan-100 text-cyan-800 border-cyan-300",
  authority: "bg-indigo-100 text-indigo-800 border-indigo-300",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border",
        STATUS_STYLES[status] ?? "bg-gray-100 text-gray-700 border-gray-300"
      )}
    >
      {status}
    </span>
  );
}

export function TypeBadge({ type }: { type: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border",
        TYPE_STYLES[type] ?? "bg-gray-100 text-gray-700 border-gray-300"
      )}
    >
      {type}
    </span>
  );
}
