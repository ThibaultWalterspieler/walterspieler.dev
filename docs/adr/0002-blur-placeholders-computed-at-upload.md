# Blur placeholders are computed at upload

Each media document stores its own `blurDataUrl`, generated once by a Payload hook when the file is uploaded or replaced. Previously, the rich-text renderer downloaded every image over HTTP and ran sharp on it during each render, so builds and every Revalidation paid for network fetches plus image processing per image.

Existing media is backfilled by a one-off `payload run` script rather than a migration. Migrations run on every deploy (`pnpm ci`), and downloading every file from Uploadthing during a deploy is fragile. An image without `blurDataUrl` renders with no placeholder, and nothing is ever fetched at render time.

## Consequences

- Generation uses sharp and lives in a single function. sharp does not run on Cloudflare Workers, so a move to Cloudflare means swapping that function's body for the Cloudflare Images binding. We chose that over a portable WASM decoder now because the move isn't scheduled yet.
