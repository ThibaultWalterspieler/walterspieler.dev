# Public pages change only through Revalidation

Public pages are cached indefinitely (`'use cache'` + `cacheLife('max')` under Next's Cache Components) and are refreshed only when Revalidation, triggered by a CMS save, invalidates their cache tags. There is deliberately no time-based revalidation: content only changes through the CMS, so a timer would only add DB traffic and cold starts. Neon scales to zero, and the database lives in Frankfurt.

Every Payload read is tagged per document, per collection (for list pages) and per Global. Globals render in the root layout, so saving one refreshes every page. Payload's `afterChange` hooks call `revalidateTag` in-process, because Payload runs inside the same Next app. An earlier HTTP self-call to `/api/revalidate` guarded by a shared secret was removed: it added a network hop, a secret to manage, and an endpoint that was open whenever the secret was unset. Code that runs outside Next, such as the seed script, passes `context.disableRevalidate`.

## Consequences

- A hook that forgets a tag leaves a page stale with no timer to rescue it. When adding a collection, Global or new read, check its tags.
- Unpublishing and renaming a slug must invalidate the old document's tag as well as the new one.
