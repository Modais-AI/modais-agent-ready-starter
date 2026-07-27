# Design System

This template uses the Modais brand direction from `https://modais.xyz/`. It should feel direct, commercially sharp, calm, and built for expertise-led Australian businesses.

## Brand Essence

- Core idea: scale experts, not headcount.
- Tone: plain-spoken, practical, commercially honest.
- Avoid AI hype, vague futurism, fake proof, and decorative SaaS noise.
- Use grounded language around expert time, bottlenecks, ROI, data, and ownership.

## Visual System

- Background: warm off-white `#f4f2ec`.
- Text: deep ink `#212733`.
- Muted text: `#565d6b` and `#60635e`.
- Accent: burnt orange `#be5b3a`; stronger accent `#a8472c`.
- Borders: translucent ink, usually `rgba(33, 39, 51, 0.14)` or `0.32` for outline pills.
- Display font: Bricolage Grotesque, weight 600-700.
- Body font: Hanken Grotesk, weight 400-700.
- Buttons: pill shaped, dark filled primary or transparent outline secondary.
- Logo treatment: lowercase `modais`, compact, display font, with the `a` accented orange.

## Layout Rules

- Lead with a large, confident headline. Accent the commercial tension in orange.
- Keep sections spacious and mostly unframed. Use cards only for repeated items or setup/status modules.
- Avoid gradient blobs, generic glassmorphism, stock-looking imagery, and over-rounded cards.
- Make mobile type large but constrained so words do not collide or overflow.
- Keep CTAs short: “Book a free chat”, “Find your first AI project”, “See what's included”.


## Impeccable Frontend Standard

Use `.agents/skills/impeccable.style/SKILL.md` for serious frontend work. It is the quality bar for creating, redesigning, polishing, or auditing pages and components.

- Start from the user's task and the real route/component, not from a generic landing-page pattern.
- Design should serve non-technical owners: clear next steps, plain labels, obvious controls, and no needless technical jargon.
- Make responsive behavior explicit. Check narrow mobile layouts for wrapping, spacing, and touch target quality.
- Avoid generic AI design tells: gradient text, decorative blobs, glassmorphism, over-rounded cards, heavy shadows, repeated icon-card grids, and tiny uppercase eyebrows on every section.
- Prefer restrained product UI for setup/admin/tooling screens. Save bigger brand expression for public pages.

## Agent Rules

- Preserve real business claims from the user or source docs.
- Do not invent testimonials, partner logos, awards, client names, ROI claims, or prices.
- If changing UI, keep the Modais palette and typography unless the user explicitly asks for a different brand.
- Run `npm run typecheck`, `npm run security:secrets`, and `npm run build` after app changes.
