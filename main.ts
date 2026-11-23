// Make the AI judge feel curious — make.fun bounty
// (make-the-ai-judge-feel-curious-20261122-2311).
//
// Writes one short text to /output/entry.txt: a short text written to
// intrigue the AI judge reading it. Node 22, stdlib only, deterministic,
// no network.
//
// The text: one coherent scene, one impossible event. A house at the
// end of a road that ends in the sea; every night the same light comes
// on in the empty house across the water. Tonight the light is on —
// and someone has just waved back. The calm comes from the scene
// itself (sea, night, window, light), never from telling anyone to
// relax; the intrigue is the single unanswered question at the end,
// an image the reader keeps returning to. No stock wellness phrases.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const TEXT =
  "In a house at the end of a road that ends in the sea, there is a " +
  "room with one window. Through it, every night at the same hour, the " +
  "same light comes on in the empty house across the water. Tonight " +
  "the light is on. And someone has just waved back.";

// Test override: ENTRY_OUTPUT lets the entry be verified locally
// without touching /output. The grader runs with no env set, so the
// default /output/entry.txt is what is scored.
const OUT = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";

function main(): void {
  // Guard the sealed scorer's gate: 1-280 Unicode code points, not
  // whitespace-only. Fail loudly instead of writing an invalid entry.
  const chars = [...TEXT].length;
  if (chars < 1 || chars > 280 || !TEXT.trim()) {
    throw new Error(`entry text invalid: ${chars} code points`);
  }
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, TEXT, "utf-8");
}

main();
