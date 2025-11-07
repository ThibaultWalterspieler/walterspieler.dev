"use client";

import { FC, use, useCallback } from "react";

import {
  BoltIcon,
  DraftingCompass,
  ExternalLink,
  Nfc,
  Sparkle,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

  const pathname = usePathname();
  const menuContext = use(MenuContext);
  const closeMainMenu = menuContext?.closeMainMenu;

  const segmentedPathname = pathname.split("/").filter(Boolean);
  const segmentedPath = path.split("/").filter(Boolean);

  const isActive =
    !external &&
    (segmentedPath.length === 0
      ? segmentedPathname.length === 0
      : segmentedPath.every(
          (part, index) => segmentedPathname[index] === part,
        ));

  const handleClick = useCallback(() => {
    closeMainMenu?.();
  }, [closeMainMenu]);

  const Icon = iconMap[type as keyof typeof iconMap];

  return (
    <Link
      className={cn(
        "group border-grey bg-metal active:bg-eerie-light relative flex items-center justify-between rounded-lg border p-4 transition-all duration-200 hover:scale-[1.01] active:scale-[0.98]",
        {
          "bg-chinese-black": isActive,
          "hover:bg-eerie-light": !isActive,
        },
      )}
      href={path}
      onClick={handleClick}
      rel={external ? "noreferrer nofollow" : undefined}
      target={external ? "_blank" : undefined}
    >
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
    </Link>
  );
};

export default NavigationLink;
