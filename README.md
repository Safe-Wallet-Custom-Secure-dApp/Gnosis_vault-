CommonJS Files
==============

The contents of this folder are for using `require` in CommonJS
projects.


Notes
-----

The contents are generated via the `npm run build-commonjs` target
using `tsc` and the `/tsconfig.commonjs.json` configuration.

Do not modify the files in this folder. They are deleted on `build-clean`.

To modify this `README.md`, see the `/output/post-build/lib.commonjs`.
main -- Current Change

Powered by Safe, Reown, GitHub, Discord, and DevOps sauce 🌐  
Maintained by the `Gnosis-vault🔐` org  
Built with 🧠 by `@thegoodeth12`  

This README is more than documentation — it's the **brainstem** of your multisig infrastructure. Automated. Synced. Alive.

> “A vault is only as powerful as the people who coordinate it.”

---

## 🧭 Roadmap — Q3 / Q4

| Feature | Status |
|---------|--------|
| ✅ Proposal table in README | Done |
| ✅ GitHub Action CI | Done |
| ✅ Live signer dashboard | Done |
| ✅ Replit/Vercel deploys | Done |
| 🔜 Telegram signer approval | In beta |
| 🔜 Safe batch proposal builder | Planned |
| 🔜 `/status` JSON endpoint | Planned |
| 🔜 Slack bot notifications | Planned |
| 🔜 Live PR-to-Proposal comment automation | Building |

---

## 👮 Rules of the Vault

- ✅ 2FA required for all contributors  
- 🚫 Never commit secrets, private keys, or RPC URLs  
- 🗳️ All proposals must flow through PR/issue trigger  
- 🔐 Only Reown-verified signers can confirm transactions  
- 🧼 `main` = clean code only — use `dev` for draft logic

---

## 🤖 Integrations

- 🟣 **Discord**: Pings on new proposals, confirmation alerts  
- 🟦 **GitHub App**: Issues/PRs can create Safe proposals  
- 🔐 **Reown**: Secure MPC signing — no keys needed  
- 🟡 **Slack**: (Coming Soon)  
- 🚀 **Telegram Bot**: [@vault_signer_bot](#) (Beta)  
- 🌐 **API Ready**: Turn README & status into a live endpoint

---

## 🧾 Workflow Structure

| File/Dir | Purpose |
|----------|---------|
| `scripts/update-readme.ts` | Injects balances + threshold into this README |
| `scripts/fetch-proposals.ts` | Pulls Safe proposals from Arbitrum/Ethereum |
| `.github/workflows/update-readme.yml` | GitHub Action to sync every 24h |
| `config/safes.json` | Source of truth for Safe metadata |
| `logs/safe-proposals.json` | Proposal log history |
| `status.json` | Tracks frontend + GitHub + Safe uptime |

---

### 🛠 Onboarding Steps
1. Accept GitHub org invite.
2. Get added to Safe signers.
3. Install [Reown](https://reown.com).
4. Join Discord & Telegram for alerts.
5. Approve transactions from UI or GitHub.

### 🧭 Members
- `@thegoodeth12` – Vault Architect, Infra
- `@gnosisbot` – GitHub Bot, Automation
- `@Reown` – Signing interface

## 🧑‍💼 Org Roles & Workflow

---

🧪 Uptime can be tracked via `/status` route (coming soon).

| Component | Badge | Status |
|-----------|-------|--------|
| GitHub Actions | ![CI](https://github.com/Safe-Wallet-Custom-Secure-dApp/.github-private/actions/workflows/update-readme.yml/badge.svg) | ✅ Daily sync running |
| Vercel UI | ![Vercel](https://img.shields.io/badge/vercel-online-brightgreen?style=flat-square&logo=vercel) | ✅ Domain resolves |
| Replit Preview | ![Replit](https://img.shields.io/badge/replit-active-blue?style=flat-square&logo=replit) | ✅ Manually available |
| Safe Frontend Status | [`status.json`](status.json) | ✅ Generated & monitored |

## 📶 System Health & Status

---

| Platform | Link | Description |
|----------|------|-------------|
| 🧪 Replit | [Gnosis-vault Dev](https://replit.com/@thegoodeth12/Gnosis-vault) | Dev testing UI for Safe proposals |
| 🚀 Vercel | [chatgtp-bot-reown.xyz](https://chatgtp-bot-reown.xyz) | Production multichain Safe dashboard |
| 📊 Reown AppKit | [AppKit Interface](https://appkit-lab.reown.com/library/multichain-all) | Safe x Reown integration template |

## 🌐 Frontend Environments

---

📂 [View full proposal history → `.github-private/logs/safe-proposals.json`](.github-private/logs/safe-proposals.json)

| Date | Description | Status | Safe |
|------|-------------|--------|------|
{{proposals_table}}

These are auto-fetched daily via GitHub Actions.

## 🔁 Live Proposals

---

_Last synced: `{{last_updated}}`_

| Role | Safe Address | Network | Balance | Threshold |
|------|--------------|---------|---------|-----------|
| Legacy Vault | `0x10A1...2e4f` | Ethereum | `{{balance_legacy}}` | `{{threshold_legacy}}` |
| Primary Org Vault | `0x821f...Ed675` | Arbitrum | `{{balance_primary}}` | `{{threshold_primary}}` |
| Signer Key Vault | `0xAfD5...A0A0` | Ethereum | `{{balance_signer}}` | `{{threshold_signer}}` |

## ✅ Vault Status

---

Built for humans. Powered by code. Backed by vault-grade security.

- 🧰 A GitHub-native Safe coordination system
- ⚙️ GitHub Actions + Reown-based proposal orchestration
- 📡 Realtime alerts to Discord, Telegram, and frontend dashboards
- 📊 Safe status synced into markdown + APIs
- 🌐 Production dashboards hosted via Vercel + Replit
- 🧪 DevOps logic to manage proposals, signers, and frontend uptime

This is not just a multisig vault. This is:

## 🧠 What Is This?

---

This repository is the operational HQ of the `Safe-Wallet-Custom-Secure-dApp` project, governed and maintained by the Gnosis-vault🔐 org.

> **🚫 PRIVATE: Internal Use Only — Visible to Gnosis-vault🔐 Members**

=======

<!--END_SAFE_PROPOSALS-->
- 🔗 [Proposal #16 → 0x1234...5678 | 1.00 ETH](...)
- 🔗 [Proposal #17 → 0xDead...Beef | 3.21 ETH](...)
- 🔗 [Proposal #18 → 0xCafe...Babe | 0.42 ETH](https://app.safe.global/transactions/tx?id=...)
<!--START_SAFE_PROPOSALS-->

## 🧾 Latest Safe Proposals

This vault is open source. But the security? Rock solid.

Clone, fork, submit a PR, or just drop a `/propose` in Slack.

## 🧙 Want to Contribute?

---

> _🧠 New Proposal Created on Arbitrum Safe:_  
> `Transfer 0.5 ETH to 0xCafe...Babe`  
> `Proposer: @thegoodeth`  
> `Threshold: 2/3`  
> `Link: https://gnosis-safe.io/app/...`

## 🧪 Example Slack Notification

---

- `@safe-global/protocol-kit` + `core-sdk`
- Reown AppKit 🔮
- GitHub Actions workflows
- Slack Webhooks API
- Vercel (or GitHub Pages) frontend hosting
- TypeScript, Next.js, and ✨ magic

## 🛠️ Tech Stack

---

_Proposal feed loading... stay tuned for fresh multisig fire._
<!--START_SAFE_PROPOSALS-->
> Live proposal feed pulled straight from your Safe(s). Updated via GitHub Actions.

## 🧾 Latest Safe Proposals

---

- 🌐 **Multichain Support** — Ethereum, Arbitrum, Optimism, Base, and more.
- 🤖 **GitHub Actions Integration** — Proposals from PRs, issues, comments, or labels.
- 💬 **Slack-First Notifications** — Proposal created, signed, rejected, or executed? You’ll know.
- 🔐 **Reown MPC Integration** — Secure, programmable approvals. No private keys needed.
- 🧩 **Dashboard Extensions** — Owner management, thresholds, transaction history, and signer views.
- 🛡️ **Private by Default** — Runs in private GitHub repos with self-hosted runners.

## ✨ Features

---

Designed for DAOs, protocols, and serious multisig operators who don't have time to click around dashboards.

Trigger Safe proposals from GitHub, approve with Reown, and get real-time updates piped straight into your Slack workspace.

Gnosis Vault is a custom Safe{Wallet} automation suite purpose-built for modern Web3 teams.  
**Your Multisig Ops. Supercharged. Now with Slack Integration.**  
Dev -- Incoming Change

# 🔐 Gnosis-vault Organization README
From 0000000000000000000000000000000000000000 Mon Sep 17 00:00:00 2001
From: Vault Bot <bot@gnosis-vault.xyz>
Date: Fri, 18 Jul 2025 12:00:00 +0000
Subject: [PATCH] chore(setup): full upside-down README sync

---
 .github/workflows/update-readme.yml       |  27 +++++++++++++++++++++++++++
 package.json                              |  16 ++++++++++++++++
 scripts/generate-upside-down.ts           |  42 ++++++++++++++++++++++++++++++++++++++++++
 tsconfig.json                             |   9 +++++++++
 README.upside-down.md                     |   2 ++
 5 files changed, 96 insertions(+)
 create mode 100644 .github/workflows/update-readme.yml
 create mode 100644 scripts/generate-upside-down.ts
 create mode 100644 tsconfig.json
 create mode 100644 README.upside-down.md

diff --git a/.github/workflows/update-readme.yml b/.github/workflows/update-readme.yml
new file mode 100644
index 0000000..aaaaaaaa
--- /dev/null
+++ b/.github/workflows/update-readme.yml
@@ -0,0 +1,27 @@
+name: Update README + Flip
+
+on:
+  push:
+    branches: [main]
+  workflow_dispatch:
+
+jobs:
+  flip-and-commit:
+    runs-on: ubuntu-latest
+    steps:
+      - name: Checkout repo
+        uses: actions/checkout@v4
+
+      - name: Setup Node.js
+        uses: actions/setup-node@v4
+        with:
+          node-version: 20
+
+      - name: Install dependencies
+        run: |
+          npm install
+          npm install -D ts-node typescript
+
+      - name: Generate upside-down README
+        run: npm run flip-readme
+
+      - name: Commit upside-down README if changed
+        run: |
+          if git diff --quiet README.upside-down.md; then
+            echo "No upside-down changes."
+            exit 0
+          fi
+          git config user.name "gnosisbot"
+          git config user.email "actions@users.noreply.github.com"
+          git add README.upside-down.md
+          git commit -m "chore(readme): auto-sync upside-down README [skip ci]"
+          git push
diff --git a/package.json b/package.json
index bbbbbbb..ccccccc 100644
--- a/package.json
+++ b/package.json
@@ -1,5 +1,21 @@
 {
+  "scripts": {
+    "flip-readme": "ts-node scripts/generate-upside-down.ts",
+    "update-readme": "npm run flip-readme && git add README.upside-down.md && git commit -m 'chore(readme): manual flip 📄🔄' || echo 'No changes'",
+    "dev": "ts-node-dev --respawn --transpile-only index.ts",
+    "start": "ts-node index.ts",
+    "lint": "eslint . --ext .ts",
+    "format": "prettier --write .",
+    "typecheck": "tsc --noEmit",
+    "build": "tsc",
+    "clean": "rm -rf dist node_modules && echo '🧹 Cleaned.'"
+  },
+  "devDependencies": {
+    "ts-node": "^10.9.1",
+    "typescript": "^5.0.0"
+  }
 }
diff --git a/scripts/generate-upside-down.ts b/scripts/generate-upside-down.ts
new file mode 100644
index 0000000..ddddddd
--- /dev/null
+++ b/scripts/generate-upside-down.ts
@@ -0,0 +1,42 @@
+#!/usr/bin/env ts-node
+import { readFileSync, writeFileSync } from "fs";
+import path from "path";
+
+const INPUT = path.resolve("README.md");
+const OUTPUT = path.resolve("README.upside-down.md");
+
+function flipMarkdown(content: string): string {
+  const sections = content
+    .split(/\n(?=## )/g)
+    .reverse()
+    .join("\n");
+
+  return `<!-- AUTO-GENERATED FLIPPED README -->\n\n${sections}`;
+}
+
+function main() {
+  const original = readFileSync(INPUT, "utf-8");
+  const flipped = flipMarkdown(original);
+  writeFileSync(OUTPUT, flipped, "utf-8");
+  console.log("✅ README flipped successfully.");
+}
+
+main();
diff --git a/tsconfig.json b/tsconfig.json
new file mode 100644
index 0000000..eeeeeee
--- /dev/null
+++ b/tsconfig.json
@@ -0,0 +1,9 @@
+{
+  "compilerOptions": {
+    "target": "ES2020",
+    "module": "CommonJS",
+    "strict": true,
+    "esModuleInterop": true,
+    "skipLibCheck": true
+  },
+  "include": ["scripts/**/*.ts"]
+}
diff --git a/README.upside-down.md b/README.upside-down.md
new file mode 100644
index 0000000..fffffff
--- /dev/null
+++ b/README.upside-down.md
@@ -0,0 +1,2 @@
+<!-- AUTO-GENERATED FLIPPED README – run `npm run flip-readme` -->
+
-- 
2.35.1 (AppleGit-143)
Safe Smart Account

npm version Build Status Coverage Status

Warning

This branch contains changes that are under development To use the latest audited version make sure to use the correct commit. The tagged versions that are used by the Safe team can be found in the releases.
Usage

Install requirements with npm:

npm i
Testing

To run the tests:

npm run build
npm run test
Optionally, if you want to run the ERC-4337 compatibility test, it uses a live bundler and node, so it contains some pre-requisites:

Define the environment variables:
ERC4337_TEST_BUNDLER_URL=
ERC4337_TEST_NODE_URL=
ERC4337_TEST_SINGLETON_ADDRESS=
ERC4337_TEST_SAFE_FACTORY_ADDRESS=
MNEMONIC=
Pre-fund the executor account derived from the mnemonic with some Native Token to cover the deployment of an ERC-4337 module and the pre-fund of the Safe for the test operation.
Deployments

A collection of the different Safe contract deployments and their addresses can be found in the Safe deployments repository.

To add support for a new network follow the steps of the Deploy section and create a PR in the Safe deployments repository.

Deploy

Warning

Make sure to use the correct commit when deploying the contracts. Any change (even comments) within the contract files will result in different addresses. The tagged versions that are used by the Safe team can be found in the releases.
Current version: The latest release is v1.5.0 on the commit dc437e8
This will deploy the contracts deterministically and verify the contracts on etherscan using Solidity 0.7.6 by default.

Preparation:

Set MNEMONIC in .env
Set INFURA_KEY in .env
npm run deploy-all <network>
This will perform the following steps

npm run build
npx hardhat --network <network> deploy
npx hardhat --network <network> sourcify
npx hardhat --network <network> etherscan-verify
npx hardhat --network <network> local-verify
Custom Networks

It is possible to use the NODE_URL env var to connect to any EVM based network via an RPC endpoint. This connection then can be used with the custom network.

E.g. to deploy the Safe contract suite on that network you would run npm run deploy-all custom.

The resulting addresses should be on all networks the same.

Note: Address will vary if contract code is changed or a different Solidity version is used.

Replay protection (EIP-155)

Some networks require replay protection, making it incompatible with the default deployment process as it relies on a presigned transaction without replay protection (see https://github.com/Arachnid/deterministic-deployment-proxy).

Safe Smart Account contracts use a different deterministic deployment proxy (https://github.com/safe-global/safe-singleton-factory). To make sure that the latest version of this package is installed, run npm i --save-dev @safe-global/safe-singleton-factory before deployment. For more information, including deploying the factory to a new network, please refer to the factory repository.

Note: This will result in different addresses compared to hardhat's default deterministic deployment process.

Verify contract

This command will use the deployment artifacts to compile the contracts and compare them to the onchain code

npx hardhat --network <network> local-verify
This command will upload the contract source to Etherscan

npx hardhat --network <network> etherscan-verify
Documentation

Safe developer portal
Error codes
Coding guidelines
Audits and Formal Verification

for Version 1.5.0 by Certora & Ackee
for Version 1.4.0/1.4.1 by Ackee Blockchain
for Version 1.3.0 by G0 Group
for Version 1.2.0 by G0 Group
for Version 1.1.1 by G0 Group
for Version 1.0.0 by Runtime Verification
for Version 0.0.1 by Alexey Akhunov
Security and Liability

All contracts are WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

License

All smart contracts are released under LGPL-3.0
