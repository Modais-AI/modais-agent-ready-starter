# Agent Ready Starter

A Modais-branded starter workspace for non-technical founders or operators who want to ask Codex or Claude Code for useful website/app changes without rebuilding the setup every time.

It includes:

- Next.js app ready for Vercel previews and production deploys.
- Supabase folder with schema, seed data, and setup notes.
- Codex and Claude Code project instructions.
- Repo-scoped Codex skills for design, Supabase changes, and security checks.
- Claude slash-command prompts for the same workflows.
- Git pre-commit secret scanning and GitHub secret-scan CI copied from the Meno Directory pattern.
- Vercel Deploy Button wiring for one guided setup flow.

## Quick Start

```bash
npm install
npm run setup:guided
npm run setup:doctor
npm run dev
```

Open http://localhost:3000. The app also has a setup page at `/setup`.

Public tooling-page mockup: `/tooling/agent-ready-starter`. This is the page intended to lift into the Modais website under Tooling after replacing the placeholder GitHub URL.

## What This Is

This is a ready-to-edit project folder. It includes the app, setup commands, brand rules, Supabase notes, safety checks, and instructions that Codex/Claude can follow. See `/setup` in the app for the plain-English owner guide, and [docs/CONNECT_SYSTEMS.md](docs/CONNECT_SYSTEMS.md) for the technical checklist.

The key commands are:

```bash
npm run setup:guided   # writes .env.local and enables hooks
npm run setup:doctor   # checks every system and prints the next step
npm run supabase:verify # checks only the Supabase connection
```

## One-Click Deploy

Replace `YOUR_GITHUB_ORG/YOUR_TEMPLATE_REPO` after publishing this as a template repo.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_GITHUB_ORG/YOUR_TEMPLATE_REPO&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY&envDescription=Supabase%20browser-safe%20project%20values&project-name=agent-ready-starter&repository-name=agent-ready-starter)

## Folder Map

```txt
src/app/                  Next.js app routes and UI
src/components/           Reusable UI sections
src/lib/supabase/         Supabase browser/server clients and env helpers
supabase/                 Local Supabase config, migrations, and seed data
docs/                     Client handoff, setup, prompting, design, security
.agents/skills/           Repo-scoped Codex skills
.claude/commands/         Claude Code slash-command prompts
.codex/                   Optional Codex project config and notes
.github/workflows/        CI, secret scan, optional agent review workflows
scripts/                  Setup, git, and security utilities
```

## Safe Commit Flow

```bash
npm run commit:safe -- "Describe the change"
```

That scans the repo, stages changes, scans staged changes, then commits only if no likely secret is found.
