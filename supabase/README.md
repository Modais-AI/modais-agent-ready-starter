# Supabase

This folder is the source of truth for database setup.

## Managed Supabase Setup

1. Create a Supabase project.
2. Open Project Settings -> API.
3. Run `npm run setup:guided` and paste the Project URL and publishable/anon key.
4. Open SQL Editor and run `supabase/migrations/0001_initial_schema.sql`.
5. Run `supabase/seed.sql` if you want demo data.
6. Run `npm run supabase:verify`.
7. Add the same public env vars to Vercel.

## Local Supabase Setup

Requires Docker and the Supabase CLI.

```bash
supabase start
supabase db reset
```

## Rules

- Every table that stores user or business data should have RLS enabled.
- Use migrations for schema changes.
- Do not commit service-role keys.
- Keep server-only data operations out of client components.
