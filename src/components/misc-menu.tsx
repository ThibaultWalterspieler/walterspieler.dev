"use client";

import { FC, use, useSyncExternalStore } from "react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuContext } from "@/contexts/menu-context";

type Props = {
  title: string;
  labels: {
    legalNotice: string;
  };
};

const subscribeNoop = () => () => {};

const MiscMenu: FC<Props> = (props) => {
  const { title, labels } = props;

  const { closeMainMenu } = use(MenuContext) ?? {};
  // Read on the client only: the menu is prerendered once and cached until the
  // next Revalidation, which may fall in another year.
  const year = useSyncExternalStore(
    subscribeNoop,
    () => new Date().getFullYear(),
    () => null,
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{title}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel>
          Thibault Walterspieler{year && ` - ${year}`}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild onClick={closeMainMenu}>
            <Link href="/legal/notice">{labels.legalNotice}</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild onClick={closeMainMenu}>
            <Link href="/open-source">Open source</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MiscMenu;
