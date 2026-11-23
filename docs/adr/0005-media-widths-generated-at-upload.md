# Media widths are generated at upload

Every image is stored at 640, 1080 and 1600px as WebP when it is uploaded (`imageSizes` on the Media collection, widths in `src/lib/media-widths.ts`), and pages pick one of those files through a `next/image` loader instead of the Vercel image optimizer. The optimizer resizes on the first request for each image and width, then caches the result. On a low-traffic site that cache is cold for most visits: in November 2026, 15 of 16 images sampled on production were misses, at 0.5 to 1.7 s each, against about 0.1 s for a hit.

A miss also breaks the route transition. Inside a `<ViewTransition>`, React holds a navigation for up to about 800 ms while the new page's eager images load, which on this site is a post's main image. With a miss, the click hangs, the page then animates in with the blurred placeholder, and the image pops in after. Once caches were warm the site felt smooth, so it only looked slow to a first-time visitor.

## Considered Options

- **Resize through Cloudflare** (`/cdn-cgi/image/` behind the zone that already fronts the site). It suits the planned move, but the first request per image and width still waits on a resize, it is billed beyond 5,000 images a month, and it needs dashboard setup outside the repo.
- **Keep the optimizer, warm it.** Request every image's widths after each change, and offer fewer widths. It needs the least code, but the cache keeps evicting, so the lag comes back.

## Consequences

- Each width is a plain UploadThing URL, so it carries over to Cloudflare unchanged. Generation uses sharp at upload, which Workers can't run: the move swaps it for the Cloudflare Images binding, like the blur placeholder (docs/adr/0002).
- `images.deviceSizes` is the list of stored widths, so every `srcset` entry of a Media image from 640px up is a stored file. Next also lists its small `imageSizes` (384px and under), which the 640px file answers. A new width needs its own migration and a rerun of `pnpm backfill:widths`. The setting is global: TweetCard images, which still go through the optimizer, also stop at 1600px.
- The original is never offered: 1600px WebP is the widest choice, and for an image narrower than that it is a quality-80 re-encode of the original. The content column is at most 768px, so only desktop screens denser than 2× could use more.
- An image narrower than a width is stored at its own width there rather than enlarged, so every image has every width, and small images take up to three copies of the same pixels. Each width's file is named after the width (`<name>-w1080.webp`): Payload's default name repeats for same-size copies, and UploadThing would then track only one of them.
- An image without every width, such as one uploaded before the widths existed and not yet backfilled, still goes through the optimizer, cold cache included, since its widths changed too. Run the backfill right after the deploy that adds the widths.
- GIFs are served as uploaded. Payload has no per-type switch for `imageSizes`, so it still stores three animated WebP copies of each new GIF that pages never use.
- `MediaImage` is a client component, because `<Image>` takes a `loader` function only there. `getImageProps` takes one on the server, but nothing would then clear the blur placeholder once the image loads. Each image's whole Media document, stored widths included, travels in the page payload.
- The backfill uploads each image again under its own name, so Payload keeps the old file that pages cached before the next Revalidation still point at. The old files are left on UploadThing, and the backfill's log lists them for removal from the UploadThing dashboard once pages have revalidated.
