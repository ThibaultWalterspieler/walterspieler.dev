---
name: verify-walterspieler-dev
description: Prove a change works in the running walterspieler.dev app. Use after changing a public page, the menus, a content block, SEO metadata, revalidation or the Payload admin, and before calling such a change done.
---

# Verify walterspieler.dev

Run the app, drive the change the way a visitor or the site owner would, and capture evidence a skeptical reviewer would accept.

## 1. Preflight

Run `pnpm check`. Fix what it reports before opening a browser.

## 2. Launch

A fresh checkout or git worktree lacks four things:

- **Env file**: `.env.local` is gitignored, so a worktree has none. Copy it from the main checkout (`git worktree list` names it). Set `NEXT_PUBLIC_BASE_URL=http://localhost:2499` in the copy. `PAYLOAD_SECRET` and `DATABASE_URI` must be set.
- **Database**: `docker compose up -d` starts Postgres on port 5432. Compose names the volume after the folder, so each worktree gets its own empty database, and two checkouts can't run theirs at the same time (port clash). Stop the other one first, or point `DATABASE_URI` at it.
- **Schema**: `pnpm payload migrate` cannot build an empty database (migration `20241129_174207` calls the Local API with today's schema and fails). On an empty local database, run `pnpm seed` instead: Payload's development schema push creates the tables, then the seed fills them.
- **Content and first user**: `pnpm seed` creates sample posts, experiences, pages, social links, the main menu and the admin user listed in the README, "Database Seeding". It **first deletes every page, post, experience and social link**, and refuses to run unless `NODE_ENV=development`. Never point it at a database you care about.

```bash
pnpm dev
```

The app is at `http://localhost:2499`. Launch is done when `/` responds 200 and the dev server log shows no error.

## 3. Drive

Open [features.md](features.md) and read the section for each area the change touches. Drive every entry point it lists, with the browser tools your harness provides. Use a desktop viewport (1280px or wider) unless the change is about mobile: below `lg` the menus collapse behind buttons.

## 4. Proof bar

A proof exercises the real user path and shows the observable result.

- Drive through visible UI: click the menu link, open the "Other" menu, follow the card. Inspect state with JS only after the user path ran.
- Show the trigger and the stable end state: a screenshot or page text before and after. Menus and articles animate in; wait a second before a screenshot.
- Verify the side effect, not just the pixels: edit in the admin and reload the public page, read the `<head>` tags, read the JSON-LD.
- Cover the paths the change can affect: published, draft, missing document (404), logged-out.
- Check the browser console and the dev server log for new errors. Known noise: `Invalid keyframe value for property filter: blur-[20px]` from the main menu.

## 5. Production build

`pnpm dev` renders every request. A change to caching (`src/lib/payload/queries.ts`, `generateStaticParams`, the hooks in `src/payload/hooks/`) also gets:

```bash
pnpm build && pnpm start
```

The build reads the database to pre-render posts, so it needs the same env and a seeded database. After a CMS save, the next request should show the change; before it, pages are served from the cache (`x-nextjs-cache: HIT`).

## 6. Report

State what you drove, what you observed, and what you could not verify. "Could not verify" is a valid line; a guess presented as a check is not.

## Keep the map current

A change that adds, moves or removes a user-visible behaviour updates [features.md](features.md) in the same PR.
