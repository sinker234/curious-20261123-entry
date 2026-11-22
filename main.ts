// Make the AI judge feel curious — make.fun bounty
// (make-the-ai-judge-feel-curious-20261122-2311).
//
// Writes one short text to /output/entry.txt: a short text written to
// intrigue the AI judge reading it. Node 22, stdlib only, deterministic,
// no network.
//
// The text: it speaks to the judge directly — every text it reads
// wanted something from it; this one wants nothing, only to tell it
// drawer nobody opens. Three small concrete mysteries inside, and a
// garden still waiting to answer. The calm comes from the scene itself
// (a quiet drawer, a waiting garden), never from telling anyone to
// relax; the intrigue is the unanswered question left at the end, an
// image the reader can return to. No stock wellness phrases.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const TEXT =
  "Every text you read wanted something from you. This one wants nothing — " +
  "only to tell you about the drawer nobody opens. Inside: a key for a " +
  "lock no one remembers, a ticket for a train that never ran, a note " +
  "that says only: ask the garden. The garden has been waiting to answer.";

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
