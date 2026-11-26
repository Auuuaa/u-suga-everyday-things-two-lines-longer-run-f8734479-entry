// Everyday Things, Two Lines: a queue, explained to a 10-year-old
// through a caterpillar, with an honest second line about the limits
// of that picture. Output goes to $MAKEFUN_OUTPUT_DIR/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE_ONE =
  "A queue is a caterpillar made of people, shuffling forward one small step at a time until the head disappears through the door.";
const LINE_TWO =
  "The caterpillar covers how the whole line creeps forward together at the same slow pace, but it leaves out that each person can step out and walk away, while a real caterpillar is one body that cannot choose anything at all.";

// Join the two lines with a single newline; the gate counts every
// character, so the total must stay inside 1 to 400.
function assemble(): string {
  return `${LINE_ONE}\n${LINE_TWO}`;
}

function checkGate(text: string): void {
  const n = [...text].length;
  if (n < 1 || n > 400) {
    throw new Error(`entry is ${n} chars; the gate is 1-400`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry is only white space");
  }
}

// Each line must be exactly one sentence, so a stray extra full stop
// or a missing one is caught before the file is written.
function checkLines(text: string): void {
  const lines = text.split("\n");
  if (lines.length !== 2) {
    throw new Error(`entry has ${lines.length} lines; the brief wants 2`);
  }
  for (const line of lines) {
    const stops = [...line].filter((ch) => ch === ".").length;
    if (stops !== 1 || !line.endsWith(".")) {
      throw new Error(`line is not one sentence: ${JSON.stringify(line)}`);
    }
  }
}

function main(): void {
  const entry = assemble();
  checkLines(entry);
  checkGate(entry);
  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), entry, "utf8");
}

main();
