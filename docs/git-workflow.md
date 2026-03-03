# Git Workflow

## Branch Model
- `main`: production-only branch.
- `staging`: pre-production integration and validation branch.
- `feature/*`: task branches created from `staging`.

## Required Merge Flow
`feature/*` -> `staging` -> `main`

## Rules
- Do not push feature work directly to `main`.
- Do not merge `feature/*` directly into `main`.
- Open pull requests into `staging` for feature branches.
- Promote `staging` into `main` only after validation checks pass.
- Keep commit history clean with squash or structured commits.

## Validation Gates
- CI runs on pull requests and pushes to `staging` and `main`.
- CI executes `npm run test` (unit tests + production smoke tests).
- Branch flow guard rejects:
  - PRs to `main` unless source branch is `staging`.
  - PRs to `staging` unless source branch follows `feature/*`.

## Local Usage
```bash
git checkout staging
git pull origin staging
git checkout -b feature/my-task
# implement changes
# open PR: feature/my-task -> staging
# after staging validation, open PR: staging -> main
```
