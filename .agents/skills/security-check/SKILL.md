---
name: security-check
description: Use when the user asks Codex to run a security check, inspect secrets, review env vars, review Supabase access, or verify the safe commit/security hook setup in this repo.
---

# Security Check Workflow

1. Read `SECURITY.md` and `docs/SECURITY_CHECKLIST.md`.
2. Run `npm run security:secrets`.
3. Inspect changed files for committed env values, API keys, service-role leaks, private keys, credentials JSON, and unsafe examples.
4. Check Supabase changes for RLS and browser/server key separation.
5. Check GitHub Actions triggers before enabling agent automation.
6. Fix small concrete issues. Report anything requiring owner credentials or platform access.
7. Never bypass the secret scanner.
