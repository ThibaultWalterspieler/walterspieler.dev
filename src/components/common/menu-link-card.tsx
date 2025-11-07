"use client";

import { FC, PropsWithChildren, useEffect, useState } from "react";

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
  const [clientPathname, setClientPathname] = useState<string | null>(null);

  useEffect(() => {
    setClientPathname(pathname);
  }, [pathname]);

  const isActive =
    typeof isActiveProp === "boolean"
      ? isActiveProp
      : isMenuPathActive(clientPathname ?? "", href, { external });

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
