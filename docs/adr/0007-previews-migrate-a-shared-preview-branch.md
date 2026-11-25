# Previews migrate a shared Neon `preview` branch

Every Vercel build runs `payload migrate` before it builds. Production deployments read `DATABASE_URI` for Production, which points at the Neon branch `main`. Preview deployments read a Preview-only `DATABASE_URI` that points at a second Neon branch, `preview`, made from `main`. Previews still run their migrations, but against `preview`; only a production build migrates `main`, after the PR is merged.

Until 24 November 2026 one `DATABASE_URI` covered both environments. On 23 November the preview builds of the stacked article PRs (#41 to #44) applied their three new migrations to production before any of them was merged. They only added columns and tables, so the live site kept working, but any schema-changing branch migrated production on push.

Previews keep migrating because a branch that changes the schema can't render against a database without it: its build pre-renders posts through the new schema. Copying `main` rather than starting empty matters too: `payload migrate` cannot build an empty database (see the verify skill), and previews need real posts to show.

## Considered Options

- **A Neon branch per preview.** The Neon Vercel integration is already installed and can create `preview/<git-branch>` for each preview deployment and delete it when the Git branch goes. It isolates every PR, but Payload would read the integration's `DATABASE_URL_UNPOOLED` on previews, preview branching has to be turned on in the Neon console, and it exists only on Vercel: on Cloudflare it would have to be rebuilt, for example with a GitHub Action. The free plan also caps the project at 10 branches.
- **Previews skip migrations.** A schema-changing preview then fails to build or renders broken pages, so the preview stops being a preview.

## Consequences

- Moving to Cloudflare keeps the setup: one production and one preview value of `DATABASE_URI`.
- All previews share `preview`. Payload runs each migration file whose name isn't yet in `payload_migrations` and ignores rows the code doesn't have, so a PR built without another PR's migration still builds; additive migrations, the usual case, don't clash. Two PRs whose migrations conflict, or a migration rewritten after its preview ran, need `preview` reset from `main` (README, "Deployments and Migrations"). A reset also brings back the current production content and drops anything edited in a preview's admin.
- Edits in a preview's admin write to `preview`, not to production, except Media files: a preview writes them to the production R2 bucket (docs/adr/0006). A new upload there is harmless, but deleting or replacing a Media file in a preview's admin deletes the file production's database still points at, and the image breaks in production. This is worse than before the split, when the preview's database was production's and the delete at least removed the document too.
- `preview` drifts from production content until it is reset.
- The Neon integration still sets `DATABASE_URL*` variables, which Payload doesn't read.
