scripts/update-readme.ts
import fs from "fs";
import path from "path";
import axios from "axios";

const PROPOSALS_START = "<!--START_SAFE_PROPOSALS-->";
const PROPOSALS_END = "<!--END_SAFE_PROPOSALS-->";

async function fetchSafeProposals(): Promise<string> {
  // Placeholder mock data
  const mockData = [
    "✅ Proposal #1: Send 0.5 ETH to 0xABC...123",
    "🔄 Proposal #2: Upgrade contract to v2.3",
  ];
  return mockData.map((line) => `- ${line}`).join("\n");
}

async function updateReadme() {
  const readmePath = path.join(process.cwd(), "README.md");
  const readmeContent = fs.readFileSync(readmePath, "utf8");

  const proposalsContent = await fetchSafeProposals();

  const updated = readmeContent.replace(
    new RegExp(`${PROPOSALS_START}[\\s\\S]*?${PROPOSALS_END}`),
    `${PROPOSALS_START}\n${proposalsContent}\n${PROPOSALS_END}`
  );

  fs.writeFileSync(readmePath, updated);
  console.log("✅ README.md updated");

  if (process.env.DISCORD_WEBHOOK) {
    await axios.post(process.env.DISCORD_WEBHOOK, {
      content: "📢 README.md has been updated with new Safe proposals!",
    });
    console.log("✅ Discord notified");
  }
}

updateReadme().catch((err) => {
  console.error("❌ Error updating README:", err);
  process.exit(1);
});
