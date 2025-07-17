import { readFileSync, writeFileSync } from "fs";
import path from "path";

const INPUT = path.resolve("README.md");
const OUTPUT = path.resolve("README.upside-down.md");

function flipMarkdownSections(content: string): string {
  const sections = content.split(/^---+$/gm); // Split on horizontal rules (---)
  const flipped = sections.reverse().join("\n\n---\n\n");
  return flipped.trim();
}

function main() {
  const original = readFileSync(INPUT, "utf-8");
  const flipped = flipMarkdownSections(original);
  writeFileSync(OUTPUT, flipped, "utf-8");
  console.log("✅ Flipped README saved to README.upside-down.md");
}

main();
