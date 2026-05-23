import Link from "next/link";
import { StatusBadge, TypeBadge } from "./StatusBadge";

interface WorkOrder {
  id: string;
  type: string;
  title: string;
  expectedResult: string;
  status: string;
  createdAt: Date | string;
}

export function WorkOrderCard({ order }: { order: WorkOrder }) {
  return (
    <Link
      href={`/dashboard/work-orders/${order.id}`}
      className="block p-4 rounded-lg border border-gray-200 hover:border-gray-400 transition-colors bg-white"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <TypeBadge type={order.type} />
            <StatusBadge status={order.status} />
          </div>
          <h3 className="font-medium text-gray-900 truncate">{order.title}</h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{order.expectedResult}</p>
        </div>
        <span className="text-xs text-gray-400 whitespace-nowrap mt-1">
          {new Date(order.createdAt).toLocaleDateString()}
        </span>
      </div>
    </Link>
  );
}
