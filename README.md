# 🔐 Gnosis Vault — Custom Safe Wallet Automation Suite

> **Built for humans. Powered by code. Governed by Gnosis-vault🔐 org.**

Secure. Automated. Multichain. GitHub-native.

This repository powers a fully automated multisig coordination system using:

- **Safe{Wallet}**
- **Reown (MPC signing)**
- **GitHub Actions + Discord + Slack + Telegram**
- **Next.js/TypeScript dashboards deployed on Vercel**
- **Proposal pipelines integrated with PRs, issues, and labels**

---

## 🌍 Safe Vaults (Multichain)

| Role                 | Address                                      | Network     | Threshold | Status       |
|----------------------|----------------------------------------------|-------------|-----------|--------------|
| Legacy Vault         | `0x10A1...2e4f`                               | Ethereum    | 2/3       | ✅ Active     |
| Primary Org Vault    | `0x821f...Ed675`                              | Arbitrum    | 2/3       | ✅ Active     |
| Signer Key Vault     | `0xAfD5...A0A0`                               | Ethereum    | 1/1       | ✅ Active     |

Vaults are monitored, updated, and coordinated through GitHub PRs and automated workflows.

---

## 📜 Project Structure

| File/Dir                             | Purpose                                           |
|-------------------------------------|---------------------------------------------------|
| `.github/workflows/update-readme.yml` | Syncs proposal + signer info to this README       |
| `scripts/fetch-proposals.ts`        | Pulls live Safe proposals                        |
| `scripts/generate-upside-down.ts`   | Creates an alternate README (flipped order)      |
| `status.json`                       | Live health data for GitHub, Safe, and dashboard |
| `config/safes.json`                 | Metadata source for multisig addresses           |
| `logs/safe-proposals.json`          | Proposal history log                             |

---

## 🤖 Automation Flow

- 🟢 **GitHub PR/issue/label** → creates Safe proposal
- 🔐 **Reown** handles MPC signing and owner confirmation
- 🛰 **GitHub Actions** pull updates and push to dashboard
- 🔔 **Discord/Slack/Telegram** notify members in real-time
- 🧾 **README.md** is regenerated daily with live status

---

## 🚨 Proposal Activity

> Synced daily from Safe → GitHub

| Date       | Description                        | Status     | Safe                         |
|------------|------------------------------------|------------|------------------------------|
| 2025-07-18 | Transfer 0.5 ETH to `0xCafe...Babe` | ✅ Pending | Arbitrum Vault `0x821f...`   |
| 2025-07-19 | 3.21 ETH to `0xDead...Beef`         | ✅ Signed  | Ethereum Vault `0x10A1...`   |
| 2025-07-20 | 1.00 ETH to `0x1234...5678`         | ⏳ Awaiting | Signer Vault `0xAfD5...`     |

> 📂 View full proposal history → `.github-private/logs/safe-proposals.json`

---

## 🌐 Dashboard + Frontend Status

| Component             | Status    | Link/Source                                   |
|------------------------|-----------|-----------------------------------------------|
| GitHub Action CI       | ✅ Running | `.github/workflows/update-readme.yml`         |
| Replit UI (Dev)        | ✅ Online | [Dev Preview](https://replit.com/@thegoodeth) |
| Vercel (Production)    | ✅ Online | [chatgtp-bot-reown.xyz](https://chatgtp-bot-reown.xyz) |
| Safe Frontend Status   | ✅ Synced | `status.json`                                 |

> 🧪 `/status` endpoint coming soon

---

## 🛠 Onboarding

1. Accept GitHub org invite
2. Join Safe{Wallet} as a signer
3. Install [Reown App](https://reown.com)
4. Join [Discord](https://discord.com/invite/...) & Telegram for alerts
5. Sign proposals via UI or GitHub PRs

---

## 🔐 Org Members

| Name           | Role                             |
|----------------|----------------------------------|
| @thegoodeth12  | Vault Architect, DevOps, Maintainer |
| @gnosisbot     | GitHub bot for proposals          |
| @Reown         | Secure MPC signing logic          |

---

## 💡 Features

- 🌐 **Multichain Safe support** (Arbitrum, Ethereum, Base, etc.)
- 🔐 **Reown signing** (no private keys)
- 🤖 **GitHub PR-to-Proposal flow**
- 🟣 **Discord/Slack notifications**
- 📊 **Proposal dashboard + live README injection**
- 🧠 **Dashboard extensions for signers, balances, history**
- 🧪 **Private GitHub automation + CI/CD**
- 📦 **AppKit + SDK integration**

---

## 🧪 Developer Commands

```bash
# Build project
pnpm install && pnpm run build

# Flip README
pnpm run flip-readme

# Update README manually
pnpm run update-readme

# Clean build
pnpm run clean
