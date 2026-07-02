---
name: supabase-change
description: Use when the user asks Codex to add or alter Supabase tables, migrations, seed data, RLS policies, generated types, or setup documentation.
---

# Supabase Change Workflow

1. Read `supabase/README.md`, `AGENTS.md`, and `SECURITY.md`.
2. Add schema changes as a new SQL migration in `supabase/migrations/`.
3. Enable RLS for tables with user or business data.
4. Add explicit policies. Avoid broad write policies unless the user requested a public submission flow.
5. Update `supabase/seed.sql` only if demo data improves setup.
6. Keep service-role usage server-only.
7. Run `npm run typecheck` and `npm run security:secrets`.
8. Explain how to apply the migration in managed Supabase.
