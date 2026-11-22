"use client";

import { FC, PropsWithChildren, createContext, useState } from "react";

type MenuContextValue = {
  isMainMenuOpen: boolean;
  isInnerMenuOpen: boolean;
  closeMainMenu: () => void;
  openMainMenu: () => void;
  closeInnerMenu: () => void;
  openInnerMenu: () => void;
};

const MenuContext = createContext<MenuContextValue | undefined>(undefined);

const MenuContextProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const [isInnerMenuOpen, setIsInnerMenuOpen] = useState(false);

  const closeMainMenu = () => {
    setIsMainMenuOpen(false);
    document.body.classList.remove("overflow-hidden", "h-screen");
  };

  const openMainMenu = () => {
    setIsMainMenuOpen(true);
    document.body.classList.add("overflow-hidden", "h-screen");
  };

  const closeInnerMenu = () => {
    setIsInnerMenuOpen(false);
  };

  const openInnerMenu = () => {
    setIsInnerMenuOpen(true);
  };

  const contextValue: MenuContextValue = {
    isMainMenuOpen,
    isInnerMenuOpen,
    closeMainMenu,
    openMainMenu,
    closeInnerMenu,
    openInnerMenu,
  };

  return <MenuContext value={contextValue}>{children}</MenuContext>;
};

export { MenuContext, MenuContextProvider };
