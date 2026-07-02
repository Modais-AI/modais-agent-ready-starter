# Supabase

This folder is the source of truth for database setup.

## Managed Supabase Setup

1. Create a Supabase project.
2. Open SQL Editor.
3. Run `supabase/migrations/0001_initial_schema.sql`.
4. Run `supabase/seed.sql` if you want demo data.
5. Copy the project URL and publishable key into `.env.local` and Vercel.

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
