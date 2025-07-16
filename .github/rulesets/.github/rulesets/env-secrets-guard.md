name: Sensitive File Change Guard
target: branch
includes:
  - '**'

file_patterns:
  - '**/.env'
  - '**/secrets.yaml'
  - '**/*.key'
  - '**/safe-config.ts'

rules:
  - require_review_by:
      teams:
        - security
        - owners
      members:
        - thegoodeth12
        - 0xAfD5f60aA8eb4F488eAA0eF98c1C5B0645D9A0A0
  - block_unauthorized_pushes: true
