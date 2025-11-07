import { NavigationLinkType } from "@/components/navigation-link";
import { MainMenu } from "@payload-types";

export type PreparedNavigationLink = {
  id: string;
  label: string;
  path: string;
  type: NavigationLinkType;
  external: boolean;
};

const getPathFromSlug = (slug: string | null | undefined) => {
  if (slug === "home") {
    return "/";
  }

  return `/${slug ?? ""}`;
};

export const prepareMainMenuItems = (
  items: MainMenu["menuItems"] | undefined,
): PreparedNavigationLink[] => {
  if (!items) {
    return [];
  }

  return items.reduce<PreparedNavigationLink[]>((acc, menuItem, index) => {
    if (typeof menuItem.page === "number") {
      return acc;
    }

    const path = menuItem.external
      ? (menuItem.path ?? "")
      : getPathFromSlug(menuItem.page?.slug);
    const type = (menuItem.type ?? "other") as NavigationLinkType;

    acc.push({
      id: String(
        menuItem.id ?? menuItem.label ?? `${path || "menu-item"}-${index}`,
      ),
      external: menuItem.external ?? false,
      label: menuItem.label ?? "",
      path,
      type,
    });

    return acc;
  }, []);
};
