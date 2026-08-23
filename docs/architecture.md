# Architecture

This site is a personal portfolio built around interactive explanatory essays.

## Initial technical direction

- Next.js
- React
- TypeScript
- React + SVG for most visualizations
- D3 only when useful for scales or layouts

## Principles

- Keep the visual style editorial rather than dashboard-like.
- Teach one statistical idea at a time.
- Keep simulation and statistical logic separate from presentation components.
- Use reproducible examples where possible.
- Build reusable visualization primitives.
- Make mobile layouts preserve the teaching sequence.

## Initial routes

- `/` — portfolio landing page
- `/heterogeneous-treatment-effects` — interactive HTE essay

## Reliability

- `main` should remain stable.
- Feature work happens on named branches.
- Commit small milestones.
- Push changes regularly.
- Keep setup instructions current.
- Avoid local-only project state.
