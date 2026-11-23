export const isMenuPathActive = (
  pathname: string,
  targetPath: string,
  options?: { external?: boolean },
) => {
  if (options?.external) {
    return false;
  }

  const segmentedPathname = pathname.split("/").filter(Boolean);
  const segmentedTarget = targetPath.split("/").filter(Boolean);

  if (segmentedTarget.length === 0) {
    return segmentedPathname.length === 0;
  }

  return segmentedTarget.every((segment, index) => {
    return segmentedPathname[index] === segment;
  });
};

// Selection and hover cross-fade over 250ms (ease-fade). The press squeezes in
// 150ms on the front-loaded curve, so even a quick click shows it, and settles
// back in 250ms. No hover scale: hover drops during a route
// transition and returns after it, so the card grew a second time after a click.
export const menuLinkBaseClasses =
  "group border-border bg-surface active:bg-surface-hover relative flex items-center justify-between overflow-hidden rounded-lg border p-4 transition-[background-color,border-color,scale] duration-250 ease-fade active:scale-[0.98] active:duration-150 active:ease-smooth";

export const menuLinkHighlightClasses =
  "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-lg before:bg-background before:opacity-0 before:transition-opacity before:duration-250 before:ease-fade before:content-['']";
