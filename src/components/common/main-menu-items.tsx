import { FC } from "react";

import {
  PreparedNavigationLink,
  prepareMainMenuItems,
} from "@/components/common/prepare-main-menu-items";
import NavigationLink from "@/components/navigation-link";
import { cn } from "@/lib/utils";
import { MainMenu } from "@payload-types";

const MainMenuItems: FC<{ items: MainMenu["menuItems"] }> = (props) => {
  const { items } = props;

  const preparedItems: PreparedNavigationLink[] = prepareMainMenuItems(items);

  if (preparedItems.length === 0) return null;

  return (
    <div
      className={cn("flex h-full w-full flex-col justify-between p-4 text-sm")}
    >
      {/* Mobile */}
      <nav className={cn("flex h-full flex-col gap-3 pt-20 md:hidden md:pt-0")}>
        {preparedItems.map((item, index) => (
          // The mobile menu mounts when it opens, so the stagger runs on every open.
          <div
            className="animate-pop"
            key={item.id}
            style={{ animationDelay: `${index * 0.1 + 1.1}s` }}
          >
            <NavigationLink
              external={item.external}
              label={item.label}
              path={item.path}
              type={item.type}
            />
          </div>
        ))}
      </nav>

      {/* Desktop */}
      <nav className={cn("hidden h-full flex-col gap-3 pt-20 md:flex md:pt-0")}>
        {preparedItems.map((item) => (
          <NavigationLink
            external={item.external}
            key={item.id}
            label={item.label}
            path={item.path}
            type={item.type}
          />
        ))}
      </nav>
    </div>
  );
};

export default MainMenuItems;
