import { ComponentProps, FC } from "react";

import Link from "next/link";

import { PAGE_NAVIGATION } from "@/components/common/page-transition";

// A link to another page of the site. Its navigation runs the route transition
// (page-transition.tsx); a plain next/link switches pages without one.
const PageLink: FC<ComponentProps<typeof Link>> = (props) => (
  <Link transitionTypes={[PAGE_NAVIGATION]} {...props} />
);

export default PageLink;
