import fs from "fs";
import path from "path";

const ROOT = path.join(process.cwd(), "src");
const INCLUDE_EXTS = [".tsx", ".ts", ".css", ".md"];
const EXCLUDE_DIRS = ["node_modules", ".next", "generated", "agents"];

interface FileSnapshot {
  path: string;
  content: string;
}

function walk(dir: string, base: string): FileSnapshot[] {
  const results: FileSnapshot[] = [];
  for (const entry of fs.readdirSync(dir)) {
    if (EXCLUDE_DIRS.includes(entry)) continue;
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results.push(...walk(full, base));
    } else if (INCLUDE_EXTS.some((ext) => entry.endsWith(ext))) {
      results.push({
        path: path.relative(base, full),
        content: fs.readFileSync(full, "utf-8"),
      });
    }
  }
  return results;
}

export function getSiteSnapshot(): string {
  const files = walk(ROOT, path.join(process.cwd()));
  return files
    .map((f) => `=== ${f.path} ===\n${f.content}`)
    .join("\n\n");
}
