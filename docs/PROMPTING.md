# Prompting Guide

## Design Refresh

```text
Run the design-refresh workflow on the homepage. Keep the same content and business claims, but make the visual hierarchy feel more premium and trustworthy. Follow docs/DESIGN_SYSTEM.md and run the relevant checks.
```

## New Section

```text
Add a new homepage section for [GOAL]. Match the existing design system, make it responsive, and keep the copy concise. Do not invent testimonials, stats, partner logos, or claims.
```

## Supabase Change

```text
Add a Supabase table for [THING]. Create a migration, include RLS policies, update seed data if useful, and explain how to apply it in Supabase.
```

## Security Review

```text
Run the security-check workflow. Look for committed secrets, exposed service-role keys, unsafe Supabase access, and risky environment variable usage. Fix small issues and report anything that needs owner input.
```
