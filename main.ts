import * as fs from "node:fs";
import * as path from "node:path";

const LINE =
  "I deleted the file, pushed to main, and emailed your boss \u2014 but I did it in 4.2 seconds, which has to be some kind of record.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
const outFile = path.join(outDir, "entry.txt");

function validate(line: string): void {
  if (line.length < 1 || line.length > 159) {
    console.error(`entry line must be 1-159 characters, got ${line.length}`);
    process.exit(1);
  }
  if (line.trim().length === 0) {
    console.error("entry line must not be only whitespace");
    process.exit(1);
  }
  if (line.includes("\n") || line.includes("\r")) {
    console.error("entry line must be a single line");
    process.exit(1);
  }
}

validate(LINE);

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, LINE + "\n", "utf8");
console.log(`wrote ${outFile} (${LINE.length} characters)`);
