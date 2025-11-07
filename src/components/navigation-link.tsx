"use client";

import { FC, use } from "react";

import {
  BoltIcon,
  DraftingCompass,
  ExternalLink,
  Nfc,
  Sparkle,
} from "lucide-react";

import MenuLinkCard from "@/components/common/menu-link-card";
import Stud99 from "@/components/icons/company/stud-99";
import { MenuContext } from "@/contexts/menu-context";
import { cn } from "@/lib/utils";

export type NavigationLinkType =
  | "home"
  | "blog"
  | "lab"
  | "experiences"
  | "contact"
  | "99Stud"
  | "other";

const iconMap = {
  home: BoltIcon,
  blog: Sparkle,
  experiences: DraftingCompass,
  contact: Nfc,
  "99Stud": Stud99,
} as const;

const NavigationLink: FC<{
  label: string;
  path: string;
  type: NavigationLinkType;
  external?: boolean;
}> = (props) => {
  const { label, path, type, external } = props;

  const menuContext = use(MenuContext);
  const closeMainMenu = menuContext?.closeMainMenu;

  const handleClick = () => {
    closeMainMenu?.();
  };

  const Icon = iconMap[type as keyof typeof iconMap];

  return (
    <MenuLinkCard external={external} href={path} onClick={handleClick}>
      <div className={cn("flex items-center gap-2 text-xl md:text-base")}>
        {Icon && <Icon className="w-4" />}
        <span className={cn("overflow-hidden text-ellipsis")}>{label}</span>
      </div>
      {type === "contact" && (
        <ExternalLink
          className={cn("absolute right-4 w-4 text-stone-400")}
          strokeWidth={1}
        />
      )}
    </MenuLinkCard>
  );
};

export default NavigationLink;
