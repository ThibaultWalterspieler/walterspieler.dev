import { FC, PropsWithChildren, ViewTransition } from "react";

// Route transitions animate the page content only; the CSS for the page-enter
// and page-exit classes lives in globals.css.
// Wrap a page's whole output, in the page rather than a layout: React runs enter
// and exit only for a ViewTransition with no newly inserted DOM node above it, and
// layouts stay mounted across navigations, so theirs would never run. The one
// exception is a section layout's content column, which is new DOM itself.
// Never wrap an element that can stop rendering mid-transition (display: none):
// the browser then skips the whole transition.
const PageTransition: FC<PropsWithChildren> = ({ children }) => (
  <ViewTransition default="none" enter="page-enter" exit="page-exit">
    {children}
  </ViewTransition>
);

export default PageTransition;
