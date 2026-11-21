## Where things are

- **Check your work**: `pnpm check`, then prove the behaviour in the running app with the `verify-walterspieler-dev` skill.
- **Payload schema** (collections, globals, blocks): the migration and type commands are in `README.md`, "Changing the Schema". Setting up a local database is in the `verify-walterspieler-dev` skill, "Launch": the README's `pnpm payload migrate` fails on an empty database.
- **Before touching caching or revalidation** (`revalidate`, `generateStaticParams`, the hooks in `src/payload/collections/hooks/`, `/api/revalidate`): read the "Revalidation" section of `.claude/skills/verify-walterspieler-dev/features.md`.
- **Reviewing a diff**: `CODING_STANDARDS.md` holds the judgement calls; ESLint and Prettier hold the rest.
- **Which skill for which step**: `docs/agents/workflow.md`.

## Agent skills

### Issue tracker

Issues and specs live in GitHub Issues on `ThibaultWalterspieler/walterspieler.dev`, through the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

The five canonical triage roles, names unchanged. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `GLOSSARY.md` at the root, ADRs in `docs/adr/` (created when the first decision is recorded). See `docs/agents/domain.md`.

## Git conventions

- **Branches** follow Conventional Branch: `<type>/<short-kebab-description>`, e.g. `feat/tweet-card-block`, `fix/blog-draft-leak`. Types: `feat`, `fix`, `perf`, `refactor`, `docs`, `chore`, `ci`, `test`. Tools often create branches under their own prefix (`claude/...`, `codex/...`, `cursor/...`); rename the branch to this convention before its first push. Once a PR is open, the branch name is fixed: GitHub closes a PR whose head branch is renamed.
- **Commits and PR titles** follow Conventional Commits: `<type>(<optional scope>): <summary>`, with the same types.
