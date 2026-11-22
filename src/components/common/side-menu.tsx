"use client";

import { FC, PropsWithChildren, use } from "react";

import { ChevronLeft, Command, X } from "lucide-react";
import { AnimatePresence, m, Variants } from "motion/react";
import Link from "next/link";

import ScrollArea from "@/components/common/scroll-area";
import LazyMotionProvider from "@/components/motion/lazy-motion-provider";
import { MenuContext } from "@/contexts/menu-context";
import { cn } from "@/lib/utils";

type Props = {
  isInner?: boolean;
  collection?: "blog" | "experiences";
  displayReturnButton?: boolean;
} & PropsWithChildren;

const iconVariants: Variants = {
  open: {
    scale: 1,
    opacity: 1,
  },
  closed: {
    scale: 0.3,
    opacity: 0,
  },
};

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
    "lg:flex lg:flex-col border-r border-grey z-50 justify-between",
    "dot-grid",
    {
      "w-screen lg:w-72 xl:w-72": isInner,
      "lg:w-60 xl:w-72": !isInner,
    },
  );

  return (
    <LazyMotionProvider>
      {!isMainMenuOpen ? (
        <>
          <div className="border-grey bg-metal/5 fixed top-8 right-4 z-50 rounded-lg border p-2 backdrop-blur lg:hidden">
            <m.div
              animate={isMainMenuOpen ? "open" : "closed"}
              initial="closed"
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17,
                duration: 0.5,
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Command onClick={openMainMenu} size={24} />
            </m.div>
          </div>
          {displayReturnButton && (
            <Link
              className={cn("block", {
                hidden: isMainMenuOpen || isInnerMenuOpen,
              })}
              href={`/${collection}`}
              onClick={openInnerMenu}
            >
              <div className="border-grey bg-metal/5 fixed top-8 left-4 z-50 rounded-lg border p-2 backdrop-blur lg:hidden">
                <ChevronLeft size={24} />
              </div>
            </Link>
          )}
        </>
      ) : (
        <div className="border-grey bg-metal/80 fixed top-8 right-4 z-50 rounded-lg border p-2 backdrop-blur lg:hidden">
          <m.div
            animate={isMainMenuOpen ? "open" : "closed"}
            initial="closed"
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 17,
              duration: 0.8,
            }}
            variants={iconVariants}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <X onClick={closeMainMenu} size={24} />
          </m.div>
        </div>
      )}
      {isInner ? (
        // CSS, not motion: the post list must show without waiting for JavaScript.
        <div
          className={cn("bg-eerie-dark animate-slide-in fixed top-0 z-10", {
            hidden: !isInnerMenuOpen,
            "md:block": !isInnerMenuOpen || isInnerMenuOpen,
          })}
        >
          <ScrollArea className={scrollAreaClasses}>{children}</ScrollArea>
        </div>
      ) : (
        <>
          <ScrollArea
            className={cn(
              scrollAreaClasses,
              "bg-eerie-dark hidden md:block lg:sticky lg:top-0 lg:self-start",
            )}
          >
            {children}
          </ScrollArea>
          <AnimatePresence>
            {isMainMenuOpen && (
              <>
                <m.div
                  animate={{ opacity: 1 }}
                  className="bg-eerie-dark/80 fixed top-0 left-0 z-40 w-screen backdrop-blur-3xl md:hidden"
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                  transition={{
                    ease: [0.93, -0.01, 0.17, 1],
                    duration: 0.6,
                  }}
                >
                  <ScrollArea className={cn(scrollAreaClasses)}>
                    {children}
                  </ScrollArea>
                </m.div>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </LazyMotionProvider>
  );
};

export default SideMenu;
