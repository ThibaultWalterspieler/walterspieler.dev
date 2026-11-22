# Feature map

One section per feature area. Each answers the same four questions: what exists, how a user reaches it, how to drive it, what usually lies. For a broad regression sweep, walk the file top to bottom.

## Layout and menus

**What exists**

- The main menu, left: the site owner's name and role (from the **Me** global), then one card per **menu item** of the **Main menu** global, each with the icon of its type (home, blog, experiences, contact, 99Stud; the lab and other types have no icon).
- The "Other" button at the bottom: a dropdown with "Thibault Walterspieler - <year>", "Legal Notice" and "Open source".
- On blog and experience routes, the **inner menu**: a second column listing the section's posts.
- Below `lg`, both menus collapse: a command icon (top right) opens the main menu as an overlay, an X closes it; a back arrow (top left) reopens the inner menu.

**How to get to it**: any public page.

**Driving it**

- Click each menu card; the card of the current section turns active (`/blog/<slug>` keeps "Blog" active).
- Open "Other", follow both links.
- Resize to the mobile preset, open and close the overlay menu.
- Edit the Main menu global in the admin (reorder, add an external item), reload: the cards follow; an external item opens in a new tab.

**Gotchas**

- The active card is computed after hydration: page text taken straight from the server shows no active state.
- A menu item whose page is not loaded is dropped silently.
- The menus animate in. Wait a second before a screenshot, or the inner menu looks empty.

## Home page

**What exists**: the owner's name as the heading with their role below, then the blocks of the page with slug `home` (seeded: paragraphs and social link buttons). A `ProfilePage` JSON-LD script in the page.

**How to get to it**: `/`, or the "Home" menu card.

**Driving it**: edit the `home` page or the Me global in the admin, reload `/`. Read the `script[type="application/ld+json"]` content.

**Gotchas**: if no page has the slug `home`, the page throws instead of showing a 404.

## Blog

**What exists**

- `/blog`: the inner menu lists every blog post (title, month of creation); the main area says "Select a blog post" on desktop.
- `/blog/<slug>`: breadcrumb (Home / Blog / title), title, creation date, description, main image, then the post's blocks. A `NewsArticle` JSON-LD script.
- An unknown slug shows "This blog post does not exist." with "Return to blog".

**How to get to it**: the "Blog" menu card, then a post in the inner menu.

**Driving it**

- Open a post from the inner menu; check the card turns active and the breadcrumb links back.
- Open `/blog/does-not-exist`.
- Create a draft post in the admin and look for it on `/blog`, logged out.

**Gotchas**

- **Drafts leak today**: a never-published draft appears in the inner menu, at its URL and in `/api/blogPosts`, logged out. Only `sitemap.xml` filters on `_status: published`.
- A missing post renders the 404 view with HTTP 200 and `noindex`, because the loading state has already streamed. Check the page text, not the status code.

## Experiences

**What exists**

- `/experiences`: the inner menu lists experience posts with their experience's start and end months; "Select an experience" on desktop.
- `/experiences/<slug>`: same article layout as a blog post.
- **Experience cards**, wherever an Experience block sits on a page: title, dates, duration, company website, technologies, and a "Read more on <title>" button. The whole card links to the experience post.
- An unknown slug shows "This experience does not exist."

**How to get to it**: the "Experiences" menu card.

**Driving it**: open a post from the inner menu; click an experience card on a page that has one; open `/experiences/does-not-exist`.

**Gotchas**

- An experience post whose experience is not loaded is left out of the inner menu.
- The card's duration reads "N years and " with a trailing "and" when the months are zero, and a double space before the months otherwise (`formatDateDiff`).
- `/works` and `/works/<slug>` redirect here.

## Fixed pages: 99Stud, Open source, Legal notice

**What exists**: three routes that each render one CMS page by slug: `/99stud` (slug `99stud`, with an `Organization` JSON-LD script), `/open-source` (slug `open-source`), `/legal/notice` (slug `notice`).

**How to get to it**: the "99Stud" menu card; "Open source" and "Legal Notice" in the "Other" menu.

**Driving it**: open each; edit the page in the admin and reload.

**Gotchas**

- The seed creates `home`, `blog`, `experiences` and `99stud` only: locally, `/open-source` and `/legal/notice` show the 404 view until you create those pages.
- Renaming one of these slugs in the admin breaks its route.

## Content blocks

**What exists**: the blocks an editor can add to a page or post, rendered by `Content`:

- **Paragraph**: rich text (bold, italic, underline, strikethrough, code, sub/superscript, headings h1 to h4, bullet lists, checklists, links (in a new tab when the editor ticks it), inline images with a blurred placeholder).
- **Button**: a link to a page, or to an external URL in a new tab.
- **MySocials**: one button per picked social link, with an icon for LinkedIn, Stack Overflow, Instagram and Malt.
- **Experience**: experience cards (see Experiences).
- **ScriptCopyBtn**: a command with one tab per package manager and a copy button.
- **TweetCard**: an embedded tweet.

**How to get to it**: any page or post that uses the block. `/ui/script-copy-btn` and `/ui/tweet-card` render the last two with fixed data.

**Driving it**: add the block to a page in the admin, reload the public page, screenshot it. For ScriptCopyBtn, switch tabs and click copy.

**Gotchas**

- **Image, Code and Quote blocks render nothing**: the admin offers them, but `Content` has no case for them.
- ScriptCopyBtn ignores its "Code language" and "Show multiple package options" fields.
- A rich-text link to an internal document renders "Internal link coming soon".
- TweetCard fetches the tweet from X at render time; offline, or for a deleted tweet, it shows a "not found" card.

## SEO metadata, sitemap, robots

**What exists**

- Each page's `<head>` comes from its **meta** (SEO tab in the admin): title, description, share image. Empty fields fall back to the owner's name, "Portfolio of Thibault Walterspieler" and `/images/og/main_en-gb.png`.
- `/sitemap.xml`: the fixed pages plus every published post, on `https://walterspieler.dev`.
- `/robots.txt`.

**How to get to it**: the `<head>` of any page; the two files.

**Driving it**

- Read `document.title` and the `meta[name=description]`, `meta[property^="og:"]`, `meta[name^="twitter:"]` tags.
- Edit a page's meta in the admin, reload, read the tags again. Clear a field and confirm the fallback.

**Gotchas**

- `og:url` is `/` on every page.
- Sitemap URLs are hard-coded to production, whatever `NEXT_PUBLIC_BASE_URL` says.

## Revalidation

**What exists**: saving a blog post, experience post or page in the admin POSTs its path to `/api/revalidate`, which refreshes the cached page. Unpublishing a post refreshes its old path. Pages map to `/<slug>`, with `home` to `/`.

**How to get to it**: save a document in the admin and watch the dev server log ("Revalidating …").

**Driving it**

- Needs a production build (see SKILL.md, step 5): `next dev` renders every request, so a stale page can't be seen.
- `curl -X POST localhost:2499/api/revalidate -H 'Content-Type: application/json' -d '{"paths":["/blog"]}'`: 401 when `NEXT_REVALIDATE_SECRET` is set and missing from the request, 400 for a bad body.

**Gotchas**

- Without `NEXT_REVALIDATE_SECRET`, the endpoint accepts any caller.
- The legal notice page revalidates `/notice`, not `/legal/notice`.
- Globals (Me, Main menu), experiences and social links have no hook: their changes show once a page's `revalidate` window (1 hour) passes. Post pages have no window and keep the old layout until the post is saved again or the site is rebuilt.
- A failed revalidation is logged and never blocks the save.

## Redirects

**What exists**: permanent redirects for old URLs. `/works` → `/experiences`, `/99Stud` → `/99stud`. A fixed list of `/fr/…` and `/en/…` paths (home, blog, experiences, works, 99Stud, open-source, legal notice) → the same without the prefix; any other `/fr/…` or `/en/…` path is not redirected.

**How to get to it**: request the old URL.

**Driving it**: `curl -sI localhost:2499/fr/blog` shows a 308 to `/blog`.

**Gotchas**: redirects live in `next.config.ts`, except `/99Stud` → `/99stud`, which lives in `src/proxy.ts`: `next.config.ts` matches paths case-insensitively, so that rule would also catch `/99stud` and loop.

## Admin (Payload)

**What exists**: the Payload admin at `/admin`, unbranded. Collections: Users, Pages, Blog Posts, Experience Posts, Experiences, Socials, Media. Globals: Me, Main Menu. Blog and experience posts have drafts with autosave and an SEO tab.

**How to get to it**: `/admin` (logged out shows the login screen).

**Driving it**: log in with the seeded user; create, publish and unpublish a post; check the public side after each step.

**Gotchas**

- Media uploads go to UploadThing and need `UPLOADTHING_TOKEN`; the file is renamed `walterspieler_<uuid>`.
- The REST API is public for blog posts, experience posts, experiences and media; pages, socials and users answer 403 when logged out.

## Analytics

**What exists**: PostHog page views, Vercel Speed Insights, and Umami in production.

**Driving it**: nothing to drive locally. In development PostHog sends no events and Speed Insights only logs to the console.
