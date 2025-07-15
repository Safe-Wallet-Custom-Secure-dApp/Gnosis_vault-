<details>
<summary>📄 Click here for full release notes</summary>
# 🔐 Gnosis-vault v1.0.0

> This is the first public release of the Gnosis-vault🔐 multisig coordination suite.  
> Designed for Web3 orgs using Safe Wallet, Reown, GitHub Actions, and automated proposal flows.

---

## ✨ Features

- 📘 **Full Org README**: Dynamically updated Safe status, signer logic, frontend links, and system status
- ⚙️ **GitHub Actions**:
  - Auto-sync Safe balances and proposals to README
  - Trigger proposals from issues/PRs (via GitHub App)
- 🤖 **Bot Integrations**:
  - Reown signing interface
  - Slack and Telegram alert system (coming soon)
- 📊 **Live Dashboards**:
  - Vercel (prod): `https://chatgtp-bot-reown.xyz`
  - Replit (dev): Reown + proposal UI for local testing
- 🧪 **Proposal Table Auto-Inject**: Syncs latest on-chain activity directly into markdown
- 🛠️ **Infra Config**:
  - `safes.json` (Safe metadata)
  - `status.json` (Uptime)
  - GitHub Secrets for Reown/Slack/Telegram

---

## 🚦 Requirements

- GitHub org membership + 2FA
- GitHub Actions enabled
- Safe Wallet multisig setup
- Reown app installed per signer

---

## 🧭 Roadmap

- [x] Dynamic README engine
- [x] Proposal sync action
- [x] Replit/Vercel environments
- [ ] `/status` API endpoint
- [ ] Slack notifications bot
- [ ] Telegram signer bot upgrade
- [ ] Proposal batching CLI

---

## 🧙 Built By

- `@thegoodeth12` — Vault Architect  
- `@gnosisbot` — GitHub Ops Bot  
- `@Reown` — Signer interface

---

> Gnosis-vault: Safe Multisig Ops. But automated. Elegant. Secure.

🧠
</details>
