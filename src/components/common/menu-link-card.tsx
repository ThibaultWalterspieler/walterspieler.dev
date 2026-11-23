"use client";

import { FC, PropsWithChildren, useSyncExternalStore } from "react";

import { useLinkStatus } from "next/link";
import { usePathname } from "next/navigation";

import PageLink from "@/components/common/page-link";
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

// The pathname only changes once the next page has arrived, so a card shows as
// selected from the click instead: while its navigation is pending it carries
// this marker, the card styles itself as selected, and the selected card of the
// same list (the group/menu around the cards) yields to it.
const PendingMarker: FC = () => {
  const { pending } = useLinkStatus();

  return pending ? <span aria-hidden data-link-pending="" hidden /> : null;
};

const selectedClasses =
  "border-accent-muted/50 bg-background before:opacity-100";

const pendingClasses =
  "has-[[data-link-pending]]:border-accent-muted/50 has-[[data-link-pending]]:bg-background has-[[data-link-pending]]:before:opacity-100 not-has-[[data-link-pending]]:hover:bg-surface-hover";

const yieldsToPendingClasses =
  "group-has-[[data-link-pending]]/menu:border-border group-has-[[data-link-pending]]/menu:bg-surface group-has-[[data-link-pending]]/menu:before:opacity-0";

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
    <PageLink
      className={cn(
        menuLinkBaseClasses,
        menuLinkHighlightClasses,
        isActive
          ? [selectedClasses, yieldsToPendingClasses]
          : !external && pendingClasses,
        external && "hover:bg-surface-hover",
        className,
      )}
      href={href}
      onClick={handleClick}
      rel={external ? "noreferrer nofollow" : undefined}
      target={external ? "_blank" : undefined}
    >
      {!external && <PendingMarker />}
      {children}
    </PageLink>
  );
};

export default MenuLinkCard;
