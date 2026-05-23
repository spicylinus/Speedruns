interface EvidencePoint {
  fact?: string;
  source?: string;
  [key: string]: string | undefined;
}

export function EvidencePanel({ evidence }: { evidence: string }) {
  let points: EvidencePoint[] | string[] = [];
  try {
    points = JSON.parse(evidence);
  } catch {
    return <p className="text-sm text-gray-600 italic">{evidence}</p>;
  }

  if (!Array.isArray(points)) {
    return <pre className="text-xs bg-gray-50 p-3 rounded overflow-auto">{evidence}</pre>;
  }

  return (
    <ul className="space-y-2">
      {points.map((point, i) => (
        <li key={i} className="flex gap-2 text-sm">
          <span className="text-green-600 mt-0.5">&#10003;</span>
          <span className="text-gray-700">
            {typeof point === "string"
              ? point
              : point.fact ?? point.source ?? JSON.stringify(point)}
          </span>
        </li>
      ))}
    </ul>
  );
}
