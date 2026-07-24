# Modais Agent Ready Starter

A Modais-branded starter workspace for people who want to use Codex or Claude Code to make useful website and app changes without rebuilding the technical setup every time.

This repo is designed as a practical handoff template: create a copy, connect the few required services, open it locally, and start prompting against a project that already has structure, safety checks, brand rules, and setup instructions.

## What You Get

- A Next.js app ready for Vercel previews and production deploys.
- A plain-English setup page at `/setup` for non-technical users.
- A public tooling-page mockup at `/tooling/agent-ready-starter` that can be moved into the Modais website.
- Supabase migrations, seed data, and setup notes.
- Codex instructions in `AGENTS.md` and repo-scoped skills in `.agents/skills/`.
- Claude Code instructions in `CLAUDE.md` and reusable commands in `.claude/commands/`.
- A safe commit workflow, local git hook, and GitHub Actions secret scan.
- A guided setup command and a doctor command that tells users what still needs connecting.

## Quick Start

```bash
git clone https://github.com/Modais-AI/modais-agent-ready-starter.git
cd modais-agent-ready-starter
npm install
npm run setup:guided
npm run setup:doctor
npm run dev
```

Open http://localhost:3000.

## First Pages To Visit

- `/` - Modais-branded starter homepage.
- `/setup` - plain-English owner setup guide.
- `/tooling/agent-ready-starter` - public tooling-page mockup for the Modais website.

## Setup Commands

```bash
npm run setup:guided    # creates .env.local, asks for Supabase details, enables hooks
npm run setup:doctor    # checks Node, Git, hooks, Vercel, Supabase, and agent files
npm run supabase:verify # checks only the Supabase connection
npm run security:secrets # scans the repo for likely committed secrets
npm run commit:safe -- "Describe the change"
```

## Supabase Setup

Each person using this template should create their own Supabase project.

1. Create a Supabase project.
2. Copy the Project URL and publishable/anon key from Project Settings -> API.
3. Run `npm run setup:guided` and paste those values.
4. In Supabase SQL Editor, run `supabase/migrations/0001_initial_schema.sql`.
5. Optionally run `supabase/seed.sql` for demo rows.
6. Run `npm run supabase:verify`.

Do not commit real Supabase keys. `.env.local` is ignored by git.

## Vercel Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Modais-AI/modais-agent-ready-starter&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY&envDescription=Supabase%20browser-safe%20project%20values&project-name=modais-agent-ready-starter&repository-name=modais-agent-ready-starter)

In Vercel, add:

```txt
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
```

Only add `SUPABASE_SERVICE_ROLE_KEY` if you build server-only routes or scripts that need it.

## Working With Codex Or Claude

Open the repo in Codex or Claude Code and ask for one small change at a time. Good starter prompts:

```text
Improve the homepage design but keep the Modais style guide.
```

```text
Run the setup doctor and explain what still needs connecting.
```

```text
Add a Supabase table for enquiries and include safe setup notes.
```

The durable project rules live in:

- `AGENTS.md`
- `CLAUDE.md`
- `docs/DESIGN_SYSTEM.md`
- `docs/CONNECT_SYSTEMS.md`
- `SECURITY.md`

## Folder Map

```txt
src/app/                  Next.js app routes and UI
src/lib/supabase/         Supabase browser/server clients and env helpers
supabase/                 Supabase config, migrations, and seed data
docs/                     Setup, prompting, deployment, design, and security docs
.agents/skills/           Repo-scoped Codex skills
.claude/commands/         Claude Code command prompts
.github/workflows/        Build and secret-scan workflows
scripts/                  Guided setup, doctor, git, and security utilities
```

## Safety

This repo intentionally blocks common API keys, private keys, service-role keys, and hardcoded secrets before commit.

Run this once after cloning:

```bash
npm run setup:hooks
```

Use this for commits:

```bash
npm run commit:safe -- "Describe the change"
```

GitHub Actions also runs the same secret scan on push and pull requests.
