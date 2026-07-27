# CLAUDE.md

Read this file before working in Claude Code. It mirrors `AGENTS.md` so Claude and Codex follow the same operating rules.

## What This Project Is

Agent Ready Starter is a template for client-editable web apps. It is designed so a non-technical user can open the repo locally, ask Claude Code or Codex for design/content/product changes, and rely on consistent project structure, Supabase setup, deployment notes, and secret protection.

## Stack

- Next.js App Router
- React
- TypeScript
- Supabase
- Vercel
- GitHub Actions

## Hard Rules

- Never commit real API keys, passwords, service-role keys, private keys, `.env`, `.env.local`, credentials JSON, `.npmrc`, or token files.
- Never use `SUPABASE_SERVICE_ROLE_KEY` in client components or browser code.
- Keep Supabase schema changes in `supabase/migrations/`.
- Preserve RLS and auth boundaries.
- For design work, follow `.agents/skills/impeccable.style/SKILL.md` and `docs/DESIGN_SYSTEM.md`.
- For setup or deployment changes, keep `docs/SETUP.md` and `docs/DEPLOYMENT.md` current.
- Use real, client-provided business facts. Do not invent proof, awards, testimonials, pricing, or legal/medical claims.

## Common Commands

```bash
npm run dev
npm run typecheck
npm run build
npm run security:secrets
npm run setup:hooks
npm run commit:safe -- "Describe the change"
```

## Frontend Work

For serious UI, UX, layout, responsiveness, accessibility, or polish work, run the `impeccable.style` workflow. In Claude Code, use `/impeccable-style` before editing frontend files.
