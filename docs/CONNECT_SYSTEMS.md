# Connect Systems

This is the clean setup path for the whole starter: GitHub, Vercel, Supabase, Codex, Claude Code, local hooks, and env vars.

## The Short Version

```bash
npm install
npm run setup:guided
npm run setup:doctor
npm run dev
```

The guided setup writes `.env.local` and enables local git hooks. The doctor checks which systems are connected and what still needs a human click or pasted key.

## What Can Be Automated

- Local `.env.local` creation.
- Local git secret-scanning hook setup.
- Node/dependency checks.
- Codex/Claude instruction file checks.
- Supabase connection verification after keys are pasted.
- GitHub remote detection.
- Vercel local project-link detection.

## What Still Needs Human OAuth Or Dashboard Access

- Creating or choosing the GitHub repo.
- Importing the repo into Vercel or clicking the Vercel Deploy Button.
- Creating a Supabase project.
- Copying Supabase public URL and publishable key.
- Adding env vars to Vercel.
- Adding `OPENAI_API_KEY` or `ANTHROPIC_API_KEY` to GitHub Secrets if optional CI agents are enabled.

## Supabase Connection

1. Create a Supabase project.
2. Open Supabase Project Settings -> API.
3. Copy:
   - Project URL
   - publishable or anon key
4. Run:

```bash
npm run setup:guided
```

5. In Supabase SQL Editor, run:
   - `supabase/migrations/0001_initial_schema.sql`
   - `supabase/seed.sql` if you want demo rows
6. Verify:

```bash
npm run supabase:verify
```

## Vercel Connection

Use the Deploy Button in `README.md`, or import the GitHub repo in Vercel.

Set these env vars in Vercel:

```txt
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
```

Only add `SUPABASE_SERVICE_ROLE_KEY` if a server-only route or script needs it. Never expose it in browser code.

## GitHub Connection

After creating the GitHub repo:

```bash
git remote add origin https://github.com/Modais-AI/modais-agent-ready-starter.git
git push -u origin main
```

Then in GitHub, keep these workflows enabled:

- `.github/workflows/web-ci.yml`
- `.github/workflows/secret-scan.yml`

The optional Codex PR review workflow is disabled by default. Enable it only after adding `OPENAI_API_KEY` to GitHub Secrets and choosing trusted triggers.

## Codex And Claude Code

- Codex reads `AGENTS.md` automatically from the repo root.
- Repo-scoped Codex skills live in `.agents/skills/`.
- Claude Code reads `CLAUDE.md` and can use `.claude/commands/`.

Ask either tool:

```text
Run the setup doctor and tell me what still needs connecting.
```

## Final Check

Before handing a client the project, run:

```bash
npm run setup:doctor
npm run typecheck
npm run security:secrets
npm run build
```
