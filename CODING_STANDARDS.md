# Coding standards

Read at **review** time (`/mattpocock-skills:code-review` picks this file up), not while implementing. It holds the judgement calls only: anything ESLint, Prettier or `tsc` already enforces stays out. When a rule here turns out to be mechanical, replace it with a lint rule and delete it.

These were derived from the code as it stood in November 2026. A rule the owner doesn't hold is a bug in this file: delete it. Where existing code breaks a rule, the rule names it; fix it when you touch that code.

## Trust boundaries

- **A route handler treats its body as untrusted**: it types every field `unknown` and keeps only the shapes it expects, answering 400 otherwise.
- **An endpoint that changes server state checks a secret from the environment**, sent as `Authorization: Bearer`, and refuses every call when the secret is unset.
- **Server code reads the CMS through the Local API, which skips access control**, so it filters what a visitor may see itself: published posts only (`_status: { equals: "published" }`), as `getPublishedPosts` in `src/lib/payload/queries.ts` does.
- **A collection opens public reads on purpose** with `access: { read: () => true }` (`blog-posts.ts`); without it the REST and GraphQL APIs need a logged-in user, which here means an admin, since `users` is the only auth collection (`pages.ts`, `socials.ts`, `users.ts`).
- **CMS text reaches `dangerouslySetInnerHTML` escaped.** See `escapeHtml` in `src/lib/payload/lexical/Serialize.tsx`; shiki escapes the code it highlights (`src/components/ui/highlight-commands.test.ts`). The JSON-LD scripts (`JSON.stringify` of Me fields) don't escape yet.

## Public pages keep rendering

- **A page that reads one CMS document calls `notFound()` when it is missing**, so the section's `not-found.tsx` renders. See `getExperiencePost` in `src/app/(frontend)/experiences/[slug]/page.tsx`.
- **Optional CMS fields fall back to built-in values**, never to a crash: see `getMetadata` in `src/lib/seo/metadata.ts` (owner's name, default share image) and the Lexical image, which renders without a blur placeholder when its media has none (`Serialize.tsx`).
- **A side effect of a CMS save never fails the save.** It catches, logs through `payload.logger`, and returns. See `src/payload/hooks/revalidate-cms.ts`.

## Payload and data

- **A schema change ships whole in one PR**: the collection, global or block; its migration (`pnpm payload migrate:create <name>`); and the regenerated `src/payload/payload-types.ts` (`pnpm payload generate:types`). Commit `44f0847` (the TweetCard block) is the model.
- **Generated files are regenerated, never hand-edited**: `src/payload/payload-types.ts`, `src/payload/migrations/**`, `src/app/(payload)/**`.
- **A migration moves data with SQL** (``db.execute(sql`…`)``), as `20250916_132141_remove_fr.ts` does. The Local API speaks today's schema: `20241129_174207` calls `payload.update` and can no longer run on an empty database.
- **A script that deletes or overwrites data refuses to run outside development.** See the `NODE_ENV` check in `src/scripts/seed.ts`.
- **A route that reads a page by slug owns that slug.** Renaming it in the admin breaks the route; changing it in code needs the seed updated too.

## Next.js runtime and caching

- **A public page reads the CMS through `src/lib/payload/queries.ts`**, whose functions are `'use cache'`, kept until a save expires `CMS_CACHE_TAG` (ADR 0001). A new read joins that module with the same tag; a new collection or global that pages show gets the `revalidate-cms` hooks. Pages and `generateMetadata` share the cached result, so a read runs once.
- **Prerendered code holds no request-time values** (`new Date()`, `Math.random()`, cookies): Cache Components fails the build. Read them in a `'use cache'` scope or on the client, as `MiscMenu` does for the year.
- **Payload, `pg` and `sharp` run in the Node.js runtime only.** Code on the Edge runtime imports none of them.
- **A remote image host is listed in `images.remotePatterns`** in `next.config.ts` before a page renders it with `next/image`.

## Structure

- **Pages fetch, components render.** A page under `src/app/(frontend)/` reads the CMS and passes plain data down; components in `src/components/` don't call `getPayload`. See `blog/layout.tsx` and `side-menu-content.tsx`.
- **Rules and data shaping live in small pure functions** in `src/lib/` or beside their component as a `.ts` file: `isMenuPathActive` in `src/lib/navigation.ts`, `prepareMainMenuItems` in `src/components/common/prepare-main-menu-items.ts`. The component holds state and markup.
- **A new block is wired end to end**: its config in `src/payload/blocks/`, added to the collections that offer it, and a case in `src/components/common/content.tsx`, as TweetCard was (`44f0847`). Image, Code and Quote have no case today and render nothing.
- **New names come from `GLOSSARY.md`.** A new domain word in a diff either matches the glossary or is added to it in the same PR.

## Tests

- A test sits beside the file it covers as `<name>.test.ts`, and runs in Node with no database, browser or network.
- A test names a behaviour a visitor or the owner would recognise ("keeps a section link active on the posts inside it"), and asserts through the module's exported functions. See `src/lib/navigation.test.ts`.
- A new pure rule arrives with a test. Pages, components and the admin are proven with `verify-walterspieler-dev` instead.

## Comments

- A comment states **why**: the library bug worked around, the platform rule that forced the shape. See the Lexical checklist note in `Serialize.tsx` and the static-rendering note in `src/app/robots.ts`. Code whose reason is obvious carries none.

## Dependencies

- A new dependency is justified in the PR body: what the platform or an installed package could not do. `pnpm add` pins the exact version (`saveExact` in `pnpm-workspace.yaml`).
