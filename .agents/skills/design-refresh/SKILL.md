---
name: design-refresh
description: Use when the user asks Codex to improve page design, visual hierarchy, layout, responsiveness, styling, or perceived polish in this starter app. Do not use for database-only or deployment-only tasks.
---

# Design Refresh Workflow

1. Read `AGENTS.md` and `docs/DESIGN_SYSTEM.md`.
2. Inspect the current route/component before editing.
3. Preserve real content and claims unless the user asks for copy changes.
4. Use existing CSS variables and component patterns.
5. Make mobile and desktop layouts deliberate; avoid overlapping text and controls.
6. Do not invent testimonials, statistics, badges, partner logos, prices, legal claims, or medical claims.
7. Run `npm run typecheck`, `npm run security:secrets`, and `npm run build` for app changes.
8. Summarize changed files and verification results.
