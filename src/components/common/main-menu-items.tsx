"use client";

import { FC, use, useEffect } from "react";

import { motion, useAnimation } from "motion/react";

import {
  PreparedNavigationLink,
  prepareMainMenuItems,
} from "@/components/common/prepare-main-menu-items";
import NavigationLink from "@/components/navigation-link";
import { MenuContext } from "@/contexts/menu-context";
import { cn } from "@/lib/utils";
import { MainMenu } from "@payload-types";

const MainMenuItems: FC<{ items: MainMenu["menuItems"] }> = (props) => {
  const { items } = props;

  const { isMainMenuOpen: isMenuOpen } = use(MenuContext) ?? {};
  const controls = useAnimation();

  const preparedItems: PreparedNavigationLink[] = prepareMainMenuItems(items);

  useEffect(() => {
    if (isMenuOpen) {
      controls.start((i) => ({
        opacity: 1,
        scale: 1,
        filter: "blur-none",
        transition: { delay: i * 0.1 + 1.1 },
      }));
    } else {
      controls.start({
        opacity: 0,
        scale: 0.3,
        filter: "blur-[20px]",
      });
    }
  }, [controls, isMenuOpen]);

  if (preparedItems.length === 0) return null;

  return (
    <div
      className={cn("flex h-full w-full flex-col justify-between p-4 text-sm")}
    >
      {/* Mobile */}
      <nav className={cn("flex h-full flex-col gap-3 pt-20 md:hidden md:pt-0")}>
        {preparedItems.map((item, index) => (
          <motion.div animate={controls} custom={index} key={item.id}>
            <NavigationLink
              external={item.external}
              label={item.label}
              path={item.path}
              type={item.type}
            />
          </motion.div>
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
