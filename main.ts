// Famous Last Words at 1 Percent — make.fun entry.
// Writes one line: the last words a phone says as its battery hits 1%.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I'm at 1%, so I'm spending my last drop of power deleting your search history. You're welcome — the rest is between you and your browser.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
// Gate self-check (RULES.txt): UTF-8 text, 1 to 199 chars, not only
// whitespace, exactly one line.
if (ENTRY.length < 1 || ENTRY.length > 199) {
  throw new Error(`entry is ${ENTRY.length} chars, must be 1-199`);
}
if (!ENTRY.trim() || ENTRY.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
console.log(`wrote ${join(outDir, "entry.txt")} (${ENTRY.length} chars)`);
