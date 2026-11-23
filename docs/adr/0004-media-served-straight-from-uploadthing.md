# Media is served straight from UploadThing

Media URLs point at UploadThing (`https://utfs.io/f/<key>`) instead of Payload's file route (`/api/media/file/<filename>`), through the storage adapter's `disablePayloadAccessControl` on the Media collection. By default Payload proxies every file so its read access control applies to files too. Each proxied request did a database lookup, an UploadThing signed-URL API call, a `HEAD` request and then the download. It took about 5 s uncached, against 0.4 s from UploadThing directly.

The proxy also made every image a "local" image to the Vercel image optimizer, so `images.minimumCacheTTL` never applied. Every cache miss, which on a low-traffic site means most visits after an eviction, paid that 5 s path before resizing. With remote URLs, the optimizer fetches from UploadThing's CDN and keeps the result for the configured year.

Nothing was protected by the proxy. Media's read access is `() => true` and UploadThing stores files as `public-read`.

We keep the adapter's `utfs.io` host rather than UploadThing's newer `<APP_ID>.ufs.sh`. UploadThing still supports `utfs.io`, and the official adapter builds it. Moving would mean a custom `generateFileURL` and the app ID, for no measured gain.

## Consequences

- A file's URL bypasses Payload's access control. Media that must stay private, such as images that are hidden until a draft is published, needs another collection or signed URLs, not this one.
- `/api/media/file/*` no longer serves files: the plugin drops its proxy handler when the flag is set. Old copies of those URLs outside the site return 404. Pages pick up the new URLs on their next render.
- The URL is computed when a document is read, so existing media needed no migration.
- The URLs are plain public URLs, so they carry over to a move to Cloudflare unchanged. Swapping storage then means swapping the adapter, not the pages.
