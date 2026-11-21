"use client";

import { FC, PropsWithChildren, useSyncExternalStore } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  isMenuPathActive,
  menuLinkBaseClasses,
  menuLinkHighlightClasses,
} from "@/lib/navigation";
import { cn } from "@/lib/utils";

type Props = PropsWithChildren<{
  className?: string;
  external?: boolean;
  href: string;
  isActive?: boolean;
  onClick?: () => void;
}>;

const subscribeNoop = () => () => {};

export const MenuLinkCard: FC<Props> = (props) => {
  const {
    children,
    className,
    external,
    href,
    isActive: isActiveProp,
    onClick,
  } = props;

  const pathname = usePathname();
  // Server render and hydration see no pathname, so active state only appears on the client.
  const isHydrated = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );

  const isActive =
    typeof isActiveProp === "boolean"
      ? isActiveProp
      : isMenuPathActive(isHydrated ? pathname : "", href, { external });

  const handleClick = () => {
    onClick?.();
  };

  return (
    <Link
      className={cn(
        menuLinkBaseClasses,
        menuLinkHighlightClasses,
        {
          "bg-chinese-black before:opacity-100": isActive,
          "hover:bg-eerie-light": !isActive,
        },
        className,
      )}
      href={href}
      onClick={handleClick}
      rel={external ? "noreferrer nofollow" : undefined}
      target={external ? "_blank" : undefined}
    >
      {children}
    </Link>
  );
};

export default MenuLinkCard;
