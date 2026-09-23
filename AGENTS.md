<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project: Personal Website

Personal portfolio for Shaun D'Souza (Senior Data Scientist). The site is built around interactive explanatory essays on statistics and experimentation.

## Stack

- **Next.js 16.3.0** (App Router) — this is a recent release; read `node_modules/next/dist/docs/` before writing routing or server component code
- **React 19.2.7** with TypeScript 5.9
- **No CSS framework** — styles live in `app/globals.css` using plain class names
- **No D3 unless needed for scales/layouts** — use React + SVG for visualizations

## File structure

```
app/
  page.tsx               # Homepage (Shaun D'Souza landing)
  layout.tsx             # Root layout
  globals.css            # All styles
  writing/page.tsx       # Writing index
  cates/page.tsx         # CATE slide deck (10 slides, keyboard-navigable)
  components/            # One file per visualization component
    CATEChart.tsx
    CATEEstimatesChart.tsx
    HeterogeneityMattersChart.tsx
    HolmBonferroniChart.tsx
    InteractionCalculationTable.tsx
    InteractionModelChart.tsx
    OmnibusTestChart.tsx
    PairwiseContrastsChart.tsx
    SeparateTestsTrapChart.tsx
    SimpleRegressionChart.tsx
    SubgroupPowerChart.tsx
    WaldTestChart.tsx
docs/
  architecture.md        # Design principles
  development.md         # Dev workflow
  hte-article.md         # Content spec for the HTE essay
```

## Dev commands

```bash
npm run dev        # Start dev server at http://localhost:3000
npm run typecheck  # tsc --noEmit
npm run build      # Production build (run before merging)
```

## Routes

| Path | Description |
|------|-------------|
| `/` | Portfolio landing page |
| `/writing` | Writing index |
| `/cates` | Interactive CATE slide deck |

## Architecture principles

- Keep statistical/simulation logic separate from rendering components.
- Visual style is editorial, not dashboard-like — one idea per slide/section.
- Build reusable visualization primitives; avoid one-off inline SVG.
- `main` stays stable; feature work goes on named branches.
- Push meaningful milestones — no important work should exist only locally.

## Before pushing

1. `npm run typecheck` — must pass with no errors
2. `npm run build` — must succeed
3. Check interactive behavior at both desktop and mobile widths
4. Update `docs/` if setup or architecture changed
