# walterspieler.dev

Thibault Walterspieler's portfolio: a blog, write-ups of past experiences and a few fixed pages, all edited in a Payload CMS admin that lives in the same Next.js app.

Seeded from the code as it stood in November 2026. `/grill-with-docs` sharpens it: challenge any term that reads wrong.

## Language

### Content

**Page**:
A CMS document with a title, a slug and blocks. Fixed routes read their page by slug: `home` for `/`, plus `blog`, `experiences`, `99stud`, `open-source` and `notice` (served at `/legal/notice`).
_Avoid_: static page, landing page

**Blog post**:
An article written in the CMS and served at `/blog/<slug>`, either a draft or published.
_Avoid_: blog entry, news item

**Experience**:
One engagement at a company: company name, logo, website, start and end dates, technologies used.
_Avoid_: employment, gig

**Experience post**:
The write-up of one experience, served at `/experiences/<slug>`. Older URLs called these "works"; `/works` redirects here.
_Avoid_: case study, portfolio item

**Article**:
The rendered body of a blog post or experience post: title, creation date, description, main image, then its blocks.
_Avoid_: post body, detail view

**Block**:
One section of a page's or post's content, picked by the editor: Paragraph, Image, Code, Quote, Button, MySocials, Experience, ScriptCopyBtn, TweetCard.
_Avoid_: widget, component block

**Draft / Published**:
The two states of a blog post or experience post (`_status`). Visitors are meant to see published posts only.
_Avoid_: live, unpublished, private

**Global**:
A single CMS document shared by every public page: Me or the Main menu.
_Avoid_: settings, singleton

**Media**:
An uploaded file, stored on UploadThing, with a required alt text.
_Avoid_: asset, attachment

**Seed data**:
The sample content `pnpm seed` loads into a development database, after deleting the existing content.
_Avoid_: fixtures, mock data

### Identity and navigation

**Me**:
The global holding the site owner's identity: full name, role, description, email, social links. It heads the main menu and the home page.
_Avoid_: bio, owner settings

**Social link**:
A named, labelled link to one of the owner's accounts elsewhere (LinkedIn, GitHub, Malt…), shown as a button by the MySocials block.
_Avoid_: network, handle

**Main menu**:
The global listing the menu items of the left column, in order.
_Avoid_: navbar, top nav, side menu

**Menu item**:
One entry of the main menu: a label, a type that picks its icon (home, blog, lab, experiences, contact, 99Stud, other), and either a page or an external path.
_Avoid_: nav entry, tab

**Inner menu**:
The second column on blog and experience routes, listing that section's posts.
_Avoid_: submenu, drawer, post list

**"Other" menu**:
The dropdown at the bottom of the main menu, holding the legal notice and open source links.
_Avoid_: footer links, more menu

**99Stud**:
The collective of freelance developers and artists Thibault belongs to, with its own page and menu type. Formerly WeAreStudio99, a name some URLs and emails still carry.
_Avoid_: the studio, the team

### Publishing

**Meta**:
The SEO fields of a page or post (title, description, share image, tags, authors), edited in the SEO tab and turned into `<head>` tags.
_Avoid_: SEO settings, head tags

**Share image**:
The image shown when a page is linked on a social network or in a chat app. Defaults to the images in `public/images/og/`.
_Avoid_: thumbnail, social card

**Structured data**:
The JSON-LD script a page carries for search engines: `ProfilePage` on home, `NewsArticle` on posts, `Organization` on 99Stud.
_Avoid_: rich snippets, microdata

**Revalidation**:
Refreshing the cached public pages after a CMS save, so the next visit shows the change. Between saves, public pages never change.
_Avoid_: cache bust, redeploy, rebuild

**Admin**:
The Payload admin at `/admin`, where the owner edits everything above.
_Avoid_: back office, backend

### Performance

**Fast**:
A public route whose real-visitor p75 metrics pass Core Web Vitals: LCP under 2.5s, INP under 200ms, CLS under 0.1.
_Avoid_: snappy, performant, quick

**Smooth**:
An animation that moves only position, scale, rotation or opacity, never hides content after the first paint, never delays a tap or click, lasts roughly 150–400ms, and is switched off for visitors who ask for reduced motion. Only loading indicators loop; decoration moves in answer to the visitor, then stops.
_Avoid_: fluid, silky, polished
