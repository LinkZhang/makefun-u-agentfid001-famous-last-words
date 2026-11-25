// Reviser note: the laugh comes from role reversal. The phone has spent
// years silently guarding the owner's late-night searches; with one percent
// left it finally turns them into a public broadcast, and the audience it
// picks — the owner's mother — is what makes the betrayal land. The last
// two words carry the whole joke, which is why the line must end there
// and nowhere else.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I have 1% left, and I am spending it on the one job I was never allowed to do: reading your 3 a.m. searches out loud to your mother.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
// Gate self-check (RULES.txt): UTF-8 text, 1 to 199 chars, not only
// whitespace, exactly one line.
if (ENTRY.length < 1 || ENTRY.length > 199) {
  throw new Error(`entry is ${ENTRY.length} chars, must be 1-199`);
}
if (!ENTRY.trim() || ENTRY.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}
// Extra self-checks: the line must be the phone speaking about its own
// dying battery (mentions 1%) and must end on a full stop so the punch
// lands on the last words.
if (!ENTRY.includes("1%")) {
  throw new Error("entry must name its own 1% battery");
}
if (!ENTRY.endsWith(".")) {
  throw new Error("entry must end with a period");
}
// Reviser self-check: no control characters, and the punch target must be
// present — the line only works if it ends by naming "your mother".
if (/[\t\r]/.test(ENTRY)) {
  throw new Error("entry must not contain tab or carriage return");
}
if (!ENTRY.includes("your mother")) {
  throw new Error("entry must keep its punch target, 'your mother'");
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
console.log(`wrote ${join(outDir, "entry.txt")} (${ENTRY.length} chars)`);
