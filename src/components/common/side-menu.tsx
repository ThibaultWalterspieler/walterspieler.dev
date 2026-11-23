"use client";

import { FC, PropsWithChildren, use } from "react";

import { ChevronLeft, Command, X } from "lucide-react";

import PageLink from "@/components/common/page-link";
import ScrollArea from "@/components/common/scroll-area";
import { MenuContext } from "@/contexts/menu-context";
import { cn } from "@/lib/utils";

type Props = {
  isInner?: boolean;
  collection?: "blog" | "experiences";
  displayReturnButton?: boolean;
} & PropsWithChildren;

const toggleIconClasses = "col-start-1 row-start-1 transition-[opacity,rotate]";

// Keeps a fixed menu above route transitions (see globals.css).
const menuLayer = "[view-transition-class:menu-layer]";

const SideMenu: FC<Props> = (props) => {
  const { children, isInner, displayReturnButton, collection } = props;

  const {
    isMainMenuOpen,
    openMainMenu,
    closeMainMenu,
    isInnerMenuOpen,
    openInnerMenu,
  } = use(MenuContext) ?? {};

  const scrollAreaClasses = cn(
    "lg:flex lg:flex-col border-r border-border z-50 justify-between",
    "dot-grid",
    {
      "w-screen lg:w-72 xl:w-72": isInner,
      "lg:w-60 xl:w-72": !isInner,
    },
  );

  return (
    <>
      {/* One toggle for the whole site: the root layout's menu renders it. */}
      {!isInner && (
        <button
          aria-expanded={isMainMenuOpen}
          aria-label={isMainMenuOpen ? "Close menu" : "Open menu"}
          className={cn(
            "border-border fixed top-8 right-4 z-50 grid rounded-lg border p-2 backdrop-blur transition-[background-color,scale] [view-transition-name:menu-toggle] active:scale-[0.97] md:hidden",
            menuLayer,
            isMainMenuOpen ? "bg-surface/80" : "bg-surface/5",
          )}
          onClick={isMainMenuOpen ? closeMainMenu : openMainMenu}
          type="button"
        >
          <Command
            aria-hidden
            className={cn(toggleIconClasses, {
              "rotate-90 opacity-0": isMainMenuOpen,
            })}
            size={24}
          />
          <X
            aria-hidden
            className={cn(toggleIconClasses, {
              "-rotate-90 opacity-0": !isMainMenuOpen,
            })}
            size={24}
          />
        </button>
      )}
      {displayReturnButton && (
        <PageLink
          className={cn("block", {
            hidden: isMainMenuOpen || isInnerMenuOpen,
          })}
          href={`/${collection}`}
          onClick={openInnerMenu}
        >
          <div className="border-border bg-surface/5 fixed top-8 left-4 z-50 rounded-lg border p-2 backdrop-blur lg:hidden">
            <ChevronLeft size={24} />
          </div>
        </PageLink>
      )}
      {/* CSS, not JavaScript: the inner menu must show without waiting for hydration.
          On mobile it slides away (rather than vanishing) once a post is picked. */}
      {isInner ? (
        <div
          className={cn(
            "bg-sidebar fixed top-0 z-10 transition-[translate,visibility] duration-250 [view-transition-name:inner-menu]",
            menuLayer,
            { "max-md:invisible max-md:-translate-x-full": !isInnerMenuOpen },
          )}
        >
          <ScrollArea className={scrollAreaClasses}>{children}</ScrollArea>
        </div>
      ) : (
        <>
          <ScrollArea
            className={cn(
              scrollAreaClasses,
              "bg-sidebar hidden md:block lg:sticky lg:top-0 lg:self-start",
            )}
          >
            {children}
          </ScrollArea>
          {/*
            Always mounted, so closing can fade out too; invisible keeps it out
            of the tab order and the accessibility tree while closed. Its items
            read data-open to stagger in (main-menu-items.tsx).
          */}
          <div
            className={cn(
              "group/overlay bg-sidebar/80 fixed top-0 left-0 z-40 w-screen backdrop-blur-3xl transition-[opacity,visibility] [view-transition-name:main-menu] md:hidden",
              menuLayer,
              isMainMenuOpen
                ? "visible opacity-100 duration-400"
                : "invisible opacity-0 duration-250",
            )}
            data-open={isMainMenuOpen}
          >
            <ScrollArea className={cn(scrollAreaClasses)}>
              {children}
            </ScrollArea>
          </div>
        </>
      )}
    </>
  );
};

export default SideMenu;
