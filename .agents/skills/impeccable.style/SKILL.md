---
name: impeccable.style
description: Use when the user asks Codex or Claude to create, redesign, polish, audit, or refine frontend pages, sections, components, copy hierarchy, responsiveness, accessibility, or visual quality in this starter app. This is the default frontend craft workflow for serious UI work.
---

# Impeccable Style Workflow

Use this workflow for frontend work that should feel production-grade, not just functional.

## Read First

1. Read `AGENTS.md` or `CLAUDE.md` for repo rules.
2. Read `docs/DESIGN_SYSTEM.md` for Modais brand direction, tokens, typography, and content constraints.
3. Inspect the exact route, component, CSS, and any reused patterns before editing.
4. If the change affects setup, deployment, Supabase, or security guidance, read the matching docs before editing those areas.

## Frontend Standard

- Build the real working interface, not a placeholder or loose mockup.
- Make the first screen useful immediately. Avoid landing-page filler unless the user explicitly asks for marketing copy.
- Keep the product calm, direct, and task-focused for non-technical owners.
- Use the established Modais palette and fonts unless the user asks for a new brand.
- Preserve truthful business facts. Do not invent testimonials, client logos, statistics, pricing, medical/legal claims, or guarantees.
- Prefer familiar controls: buttons for actions, tabs for views, toggles for binary settings, inputs/selects for values, and lucide icons where useful.
- Use cards only for repeated items, setup/status modules, or genuinely framed tools. Do not nest cards inside cards.

## Quality Bar

Before finishing frontend work, check:

- Text contrast is readable on every background.
- Mobile and desktop layouts are deliberate, with no overlapping or clipped text.
- Headings fit their containers and wrap cleanly.
- Buttons, links, and form controls have clear hover/focus states.
- Loading, empty, disabled, and error states are covered when the workflow needs them.
- Motion is purposeful and respects `prefers-reduced-motion`.
- The UI does not rely on generic AI design tropes: gradient text, decorative blobs, glass cards, heavy shadows, repeated identical icon-card grids, or tiny uppercase eyebrows everywhere.

## Verification

For app changes, run the narrowest useful checks:

```bash
npm run typecheck
npm run security:secrets
npm run build
```

For docs-only guidance changes, run at least:

```bash
npm run security:secrets
```

Summarize changed files and verification results.
