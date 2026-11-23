import { ComponentProps, FC } from "react";

import Link from "next/link";

import { PAGE_NAVIGATION } from "@/components/common/page-transition";

// A link to another page of the site. Its navigation runs the route transition
// (page-transition.tsx); a plain next/link switches pages without one.
// It prefetches the whole page, not just the route's shared shell (the default
// with partialPrefetching): a post's content depends on its slug, so it would
// otherwise load on click, arrive after the navigation, and skip the transition.
// Every page is cached, so the prefetch is served from the cache.
const PageLink: FC<ComponentProps<typeof Link>> = (props) => (
  <Link prefetch transitionTypes={[PAGE_NAVIGATION]} {...props} />
);

export default PageLink;
