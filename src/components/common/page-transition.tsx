import { FC, PropsWithChildren, ViewTransition } from "react";

// The transition type PageLink gives a navigation. Only those animate: content
// streaming in on first load, browser back and forward, and router.refresh()
// carry no type and switch in place.
export const PAGE_NAVIGATION = "page-navigation";

// Route transitions animate the page content only; the CSS for page-enter
// lives in globals.css. The old page has no exit: it vanishes as the new one
// fades in, so two articles never show through each other.
// Wrap a page's whole output, in the page rather than a layout: React runs enter
// only for a ViewTransition with no newly inserted DOM node above it, and
// layouts stay mounted across navigations, so theirs would never run. The one
// exception is a section layout's content column, which is new DOM itself.
// Never wrap an element that can stop rendering mid-transition (display: none):
// the browser then skips the whole transition.
const PageTransition: FC<PropsWithChildren> = ({ children }) => (
  <ViewTransition
    default="none"
    enter={{ [PAGE_NAVIGATION]: "page-enter", default: "none" }}
  >
    {children}
  </ViewTransition>
);

export default PageTransition;
