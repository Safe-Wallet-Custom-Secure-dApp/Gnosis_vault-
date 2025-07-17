import { readFileSync, writeFileSync } from "fs";
import path from "path";

const input = path.resolve("README.md");
const output = path.resolve("README.upside-down.md");

function flipMarkdown(content: string): string {
  const sections = content
    .split(/\n(?=## )/g)
    .reverse()
    .join("\n");

  return `<!-- AUTO-GENERATED FLIPPED README -->\n\n${sections}`;
}

function main() {
  const original = readFileSync(input, "utf-8");
  const flipped = flipMarkdown(original);
  writeFileSync(output, flipped, "utf-8");
  console.log("✅ README flipped successfully.");
}

main();
