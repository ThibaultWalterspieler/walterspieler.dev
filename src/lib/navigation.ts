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

export const menuLinkBaseClasses =
  "group border-grey bg-metal active:bg-eerie-light relative flex items-center justify-between overflow-hidden rounded-lg border p-4 transition-all duration-200 hover:scale-[1.01] active:scale-[0.98]";

export const menuLinkHighlightClasses =
  "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-lg before:bg-chinese-black before:opacity-0 before:transition-opacity before:duration-500 before:content-['']";

