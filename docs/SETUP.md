# Setup

## Accounts Needed

- GitHub account
- Vercel account connected to GitHub
- Supabase account
- Codex or Claude Code installed locally

## Local Setup

```bash
git clone YOUR_REPO_URL
cd agent-ready-starter
npm install
npm run setup:guided
npm run setup:doctor
npm run dev
```

Open http://localhost:3000.

## Supabase Setup

1. Create a Supabase project.
2. Copy the project URL and publishable key into `.env.local`.
3. Run `supabase/migrations/0001_initial_schema.sql` in Supabase SQL Editor, or use the Supabase CLI.
4. Optionally run `supabase/seed.sql` for demo data.
5. Add local and Vercel URLs to Supabase Auth redirects when auth is added.

## Vercel Setup

1. Import the GitHub repo into Vercel.
2. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
3. Deploy.
4. Confirm pull requests create preview deployments.


## System Doctor

Run this whenever setup feels unclear:

```bash
npm run setup:doctor
```

It checks Node, dependencies, Git, hooks, GitHub remote, Vercel link, agent instruction files, and Supabase connectivity.

See `docs/CONNECT_SYSTEMS.md` for the full systems checklist.
