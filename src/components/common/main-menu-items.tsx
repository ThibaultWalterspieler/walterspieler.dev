import { CSSProperties, FC } from "react";

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
          // Shown only in the main menu on mobile, whose overlay stays mounted: items pop
          // in one after another when it opens, and leave together when it closes.
          <div
            className="scale-90 opacity-0 transition-[opacity,scale] duration-250 group-data-[open=true]/overlay:scale-100 group-data-[open=true]/overlay:opacity-100 group-data-[open=true]/overlay:delay-(--stagger-delay)"
            key={item.id}
            style={
              { "--stagger-delay": `${150 + index * 40}ms` } as CSSProperties
            }
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
