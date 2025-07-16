name: Demo Repository PR Rules
target: branch
includes:
  - main
repositories:
  - demo-repository

rules:
  - require_pull_request: true
  - require_code_reviews: 1
  - allow_fork_pull_requests: true
  - allow_push_from_maintainers: true
