name: Main Branch Protection (Safe Vault)
target: branch
includes:
  - main
enforcement: active

rules:
  - require_pull_request: true
  - require_code_reviews: 2
  - require_status_checks:
      - build
      - test
      - validate-safe-proposal
      - ping-discord-webhook
  - require_signed_commits: true
  - restrict_push_access:
      - github-actions[bot]
  - restrict_force_push: true
  - restrict_deletions: true
  - require_linear_history: true
