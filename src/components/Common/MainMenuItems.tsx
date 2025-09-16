"use client";

import { FC, use, useEffect } from "react";

import { motion, useAnimation } from "motion/react";

import NavigationLink from "@/components/NavigationLink";
import { MenuContext } from "@/contexts/MenuContext";
import { cn } from "@/lib/utils";
import { MainMenu } from "@payload-types";

type Props = {
  items: MainMenu["menuItems"];
};

const getPath = (slug: string) => {
  if (slug === "home") {
    return "/";
  }

  return `/${slug || ""}`;
};

const MainMenuItems: FC<Props> = (props) => {
  const { items } = props;

  const { isMainMenuOpen: isMenuOpen } = use(MenuContext) ?? {};
  const controls = useAnimation();

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

  if (!items) return null;

  return (
    <div
      className={cn("flex h-full w-full flex-col justify-between p-4 text-sm")}
    >
      {/* Mobile */}
      <nav className={cn("flex h-full flex-col gap-3 pt-20 md:hidden md:pt-0")}>
        {items.map((item, i) => {
          if (typeof item.page !== "number") {
            return (
              <motion.div animate={controls} custom={i} key={item.label}>
                <NavigationLink
                  external={item.external || false}
                  label={item.label || ""}
                  path={
                    !item.external
                      ? getPath(item.page?.slug || "")
                      : item.path || ""
                  }
                  type={item.type || ""}
                />
              </motion.div>
            );
          }
        })}
      </nav>

      {/* Desktop */}
      <nav className={cn("hidden h-full flex-col gap-3 pt-20 md:flex md:pt-0")}>
        {items.map((item) => {
          if (typeof item.page !== "number") {
            return (
              <NavigationLink
                external={item.external || false}
                key={item.id}
                label={item.label || ""}
                path={
                  !item.external
                    ? getPath(item.page?.slug || "")
                    : item.path || ""
                }
                type={item.type || ""}
              />
            );
          }
        })}
      </nav>
    </div>
  );
};

export default MainMenuItems;
