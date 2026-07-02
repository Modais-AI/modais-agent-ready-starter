# AGENTS.md

Codex reads this file before working in this repository. Follow it for every task unless the user explicitly overrides it.

## Product Intent

This is a client-editable starter app. The goal is to let non-technical users make careful design, content, and light product changes with Codex or Claude Code while keeping deployment, Supabase, and security predictable.

## Architecture

- Framework: Next.js App Router.
- Deploy target: Vercel.
- Data/auth/storage: Supabase.
- Source of truth for schema: `supabase/migrations/`.
- Reusable UI belongs in `src/components/`.
- Supabase clients live in `src/lib/supabase/`.
- Agent workflows live in `.agents/skills/` and `.claude/commands/`.

## Guardrails

- Never commit real API keys, service-role keys, `.env`, `.env.local`, private keys, credentials JSON, `.npmrc`, or downloaded secret files.
- Never expose `SUPABASE_SERVICE_ROLE_KEY` to client components, `NEXT_PUBLIC_*`, browser code, screenshots, or docs.
- Treat `NEXT_PUBLIC_*` values as browser-visible, not private.
- Preserve auth, RLS, payments, and data-writing behavior unless the user explicitly asks to change it.
- Add Supabase schema changes as migrations. Do not hand-edit production data from app code.
- Prefer server components for crawlable content and client components only for interaction.
- Keep copy concrete and honest. Do not fabricate testimonials, pricing, clinical claims, guarantees, partner logos, or customer data.

## Before Editing

- For visual work, read `docs/DESIGN_SYSTEM.md` first.
- For database work, read `supabase/README.md` first.
- For security-sensitive work, read `SECURITY.md` first.

## Verification

Run the narrowest useful checks before finishing:

```bash
npm run typecheck
npm run security:secrets
npm run build
```

## Commit Workflow

```bash
npm run commit:safe -- "Describe the change"
```
