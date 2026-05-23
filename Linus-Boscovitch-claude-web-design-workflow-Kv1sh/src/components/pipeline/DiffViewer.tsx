export function DiffViewer({ diff, targetFile }: { diff: string; targetFile?: string | null }) {
  const isCode = targetFile?.match(/\.(tsx?|jsx?|css|json|html)$/) ?? false;

  return (
    <div className="rounded border border-gray-200 overflow-hidden">
      {targetFile && (
        <div className="bg-gray-100 px-3 py-1.5 text-xs font-mono text-gray-600 border-b border-gray-200">
          {targetFile}
        </div>
      )}
      <pre
        className={`p-4 overflow-auto text-sm leading-relaxed max-h-96 ${
          isCode ? "font-mono bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-800"
        }`}
      >
        {diff}
      </pre>
    </div>
  );
}
