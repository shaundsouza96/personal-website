# Development Workflow

## Local repository

`/Users/shaun.dsouza/Documents/Github_Personal/personal-website`

## Branches

- `main` — stable branch
- `hte-interactive` — current feature branch

## Start a work session

```bash
cd /Users/shaun.dsouza/Documents/Github_Personal/personal-website
git checkout hte-interactive
git pull
```

## Save work

```bash
git status
git add .
git commit -m "Describe the milestone"
git push
```

## Recovery rule

Important work should not exist only on the local machine. Push meaningful milestones to GitHub so the repository can be cloned and restored independently.

## Before merging to main

- Confirm the site builds locally.
- Check interactive behavior on desktop and mobile widths.
- Update documentation when setup or architecture changes.
- Review the branch diff.
- Merge through a pull request when practical so the project history explains why changes were made.

## Codex workflow

Give Codex small, explicit tasks tied to the specification in `docs/hte-article.md`. Ask it to keep statistical/simulation logic separate from rendering code and to update documentation when it changes setup or architecture.
