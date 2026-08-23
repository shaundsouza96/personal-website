# Personal Website

A personal portfolio site for interactive essays, product/data science work, and technical projects.

## Current project

The first interactive essay explains how to measure heterogeneous treatment effects (HTEs) in A/B tests.

Planned flow:

1. Start with the average treatment effect (ATE).
2. Reveal that subgroups can respond differently.
3. Estimate treatment effects by segment with interaction terms.
4. Test for heterogeneity with an omnibus/Wald test.
5. Inspect segment-level conditional average treatment effects (CATEs) and uncertainty.
6. Connect the statistical result to a product decision about personalization.

## Branches

- `main` — stable version of the site.
- `hte-interactive` — active development branch for the HTE interactive essay.

## Documentation

Project notes live in [`docs/`](docs/):

- [`docs/architecture.md`](docs/architecture.md) — technical structure and implementation principles.
- [`docs/hte-article.md`](docs/hte-article.md) — content and interaction specification for the HTE essay.
- [`docs/development.md`](docs/development.md) — local development and Git workflow.

## Status

The repository has been rebuilt from scratch after the previous local version was lost. Documentation is intentionally being maintained alongside the code so the project can be reproduced from GitHub alone.

## Local path

The project is currently developed locally at:

```text
/Users/shaun.dsouza/Documents/Github_Personal/personal-website
```

## Working principle

Every meaningful feature should be committed and pushed to GitHub. Avoid leaving important work only in a local working tree.
