import { FC, PropsWithChildren, ViewTransition } from "react";

// Route transitions animate the page content only; the CSS for the page-enter
// and page-exit classes lives in globals.css.
// Wrap a page's whole output, in the page rather than a layout: React runs enter
// and exit only for a ViewTransition with no newly inserted DOM node above it, and
// layouts stay mounted across navigations, so theirs would never run.
const PageTransition: FC<PropsWithChildren> = ({ children }) => (
  <ViewTransition default="none" enter="page-enter" exit="page-exit">
    {children}
  </ViewTransition>
);

export default PageTransition;
