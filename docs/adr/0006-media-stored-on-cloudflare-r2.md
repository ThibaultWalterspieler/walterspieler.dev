# Media is stored on Cloudflare R2

Media files live in the R2 bucket `walterspieler-media` and load from its own domain, `https://media.walterspieler.dev/<filename>`. Payload writes them through R2's S3 API with `@payloadcms/storage-s3`, and builds each URL from the filename when a document is read (`src/payload/media-storage.ts`). On that host, a cache rule keeps every file at Cloudflare's edge for a year and a response header rule tells browsers the same (`immutable`); a missing file is never cached, so a file requested before it is uploaded doesn't stay missing. Smart Tiered Cache lets a data centre fetch a file from another one before going to R2. Every upload gets a new name, so a file's bytes never change.

The stored widths (docs/adr/0005) took the resize out of the first visit, but not the wait. UploadThing caches nothing at the edge: on 23 November 2026 its files took 0.5 to 2.6 s on a first load and 0.3 to 1.4 s after, on both `utfs.io` and the newer `<app>.ufs.sh`. React holds a route transition for up to about 800 ms while a post's main image loads, so the first visit still hung. The same files from R2 took 0.28 to 0.76 s on a first load and 0.06 to 0.26 s once cached.

This supersedes docs/adr/0004 for where files live; its reasoning for serving them straight from storage, not through Payload's file route, still holds.

## Considered Options

- **Stay on UploadThing, behind Cloudflare.** A rewrite such as `/media/:key` to UploadThing, with a cache rule, gives the same cached times. A cold load still waits on UploadThing's slow first byte, and the files stay outside the account the site is moving to.
- **Stop React waiting for the main image.** It removes the hang whatever the host, but the transition then starts on the blurred placeholder. It is still open, and complements this.

## Consequences

- The bucket name, public domain and account endpoint are fixed in `src/payload/media-storage.ts`; only the R2 access keys are secrets (`R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`). Local development and previews write to the same bucket as production, as they did on UploadThing, so deleting or replacing a Media file there deletes the production file.
- A filename is the file's address, so two Media files can never share a name. Payload already renames each upload `walterspieler_<uuid>`, and each stored width has its own name (docs/adr/0005).
- Existing files were copied once with `pnpm copy:media-to-r2`, which reads UploadThing's keys straight from the database. The UploadThing files and the `_key` and `prefix` columns stay until a clean-up migration, so reverting the switch brings the old URLs back. Uploads made after the switch exist only in R2.
- Migration `20261123_212222_media_on_r2` records the schema without those columns and changes nothing, so later migrations leave them alone; the clean-up migration drops them by hand, with the statements listed in it.
- Payload's development schema push offers to drop those columns on a local database that still has them; accept it there.
- A deleted Media file stays in Cloudflare's cache, and loads, for up to a year. To take one down at once, purge its URL in Cloudflare.
- When the site moves to Workers, `@payloadcms/storage-r2` replaces the S3 adapter with a bucket binding. The bucket, filenames and URLs stay the same.
