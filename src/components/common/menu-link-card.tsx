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
  // useSyncExternalStore, not setState in an effect: React's set-state-in-effect rule
  // forbids the latter. The server snapshot keeps the link inactive until hydration.
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
          "bg-background before:opacity-100": isActive,
          "hover:bg-surface-hover": !isActive,
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
