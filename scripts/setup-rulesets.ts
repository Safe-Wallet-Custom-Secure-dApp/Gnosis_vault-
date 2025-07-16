import { Octokit } from "@octokit/rest";
import * as fs from "fs";
import * as path from "path";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const ORG = "Safe-Wallet-Custom-Secure-dApp";

if (!GITHUB_TOKEN) {
  console.error("❌ Missing GITHUB_TOKEN");
  process.exit(1);
}

const octokit = new Octokit({ auth: GITHUB_TOKEN });

const RULESETS_DIR = path.join(__dirname, "../rulesets");

async function applyRulesets() {
  const files = fs.readdirSync(RULESETS_DIR).filter(f => f.endsWith(".json"));

  for (const file of files) {
    const filePath = path.join(RULESETS_DIR, file);
    const ruleset = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    try {
      const res = await octokit.request("POST /orgs/{org}/rulesets", {
        org: ORG,
        name: ruleset.name,
        target: ruleset.target,
        enforcement: ruleset.enforcement,
        conditions: {
          ref_name: {
            include: ruleset.includes
          }
        },
        rules: ruleset.rules,
        bypass_actors: [],
        applies_to: ruleset.repositories || undefined
      });

      console.log(`✅ Applied ruleset: ${ruleset.name}`);
    } catch (err: any) {
      console.error(`❌ Failed to apply ${ruleset.name}:`, err.message);
    }
  }
}

applyRulesets();
