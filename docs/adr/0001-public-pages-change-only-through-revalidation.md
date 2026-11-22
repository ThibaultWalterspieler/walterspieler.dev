# Public pages change only through Revalidation

Every CMS read behind a public page is a `'use cache'` function in `src/lib/payload/queries.ts`, with `cacheLife("max")` and one tag, `CMS_CACHE_TAG`, under Next's Cache Components. A CMS save expires that tag in-process (`revalidateTag(tag, { expire: 0 })`) from Payload hooks on every public collection and global, so the next request re-renders. Content only changes through the CMS, so time-based revalidation would only add database traffic and cold starts. Neon scales to zero, and the database lives in Frankfurt.

There is one tag rather than one per document or collection. Blocks populate experiences, social links and media into pages and posts, and every post page lists its whole section in the inner menu. Finer tags would rebuild nearly the same pages while adding a way to forget one and leave a page stale for good. Revalidation is lazy, so expiring the whole site only re-renders the pages visitors open.

The hooks call `revalidateTag` directly because Payload runs inside the same Next.js app. An earlier HTTP self-call to `/api/revalidate`, guarded by a shared secret, was removed. It added a network hop and a secret to manage, and the endpoint was open whenever the secret was unset. Scripts that run outside Next, such as the seed, pass `context.disableRevalidate`.

## Consequences

- A new collection or global that public pages show needs the `revalidate-cms` hooks, and a new read needs the shared tag. Either omission leaves pages stale until the 30-day background refresh of `cacheLife("max")`, the only timer left.
- A draft saved over a draft expires nothing, because visitors see published posts only.
