name: Tag Protection Rules
target: tag
includes:
  - v*

rules:
  - block_tag_deletion: true
  - require_signed_tags: true
