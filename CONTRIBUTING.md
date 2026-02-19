# Contributing

## Branch Naming

- Feature work: `feat/<scope>`
- Fixes: `fix/<scope>`
- Chores: `chore/<scope>`

Example: `feat/phase-1-content-home`

## Commit Message Format

Use conventional commits:

```text
type(scope): short summary
```

Examples:

- `feat(home): add premium hero sections`
- `fix(seo): correct canonical path builder`
- `chore(docs): update route checklist`

## Pull Request Checklist

- Branch targets `main`
- PR title follows: `type(scope): summary`
- Include what changed
- Include tested routes and outcomes
- Include desktop and mobile screenshots for UI changes
- Include Lighthouse evidence for marketing pages
- Confirm:
  - `npm run lint` passes
  - `npm run build` passes
  - No console/runtime errors on tested routes
